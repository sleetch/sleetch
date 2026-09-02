import fs from 'node:fs';
import path from 'node:path';
import z from 'zod';
import type { category, page } from '@/compiler/types/routing';

import type { file_info } from '@/compiler/types/watcher';
import { DATA_PAGE_NAME, INDEX_PAGE_NAME, PAGES_CACHE_FOLDER } from '@/compiler/utils/constants';
import { resolve_language } from '@/compiler/utils/resolve-language';
import { write_file } from '@/compiler/utils/write-file';
import { data_frontmatter_schema, extract_frontmatter, page_frontmatter_schema } from '@/markdown';
import { list_all_files } from '@/shared/utils/list-files';
import type { sleetch_events_emitter } from '../emitter';
import { generate_page_module } from '../generators/page';
import type { sleetch_router } from '../router';
import { sleetch_source } from '../source';

export type configuration_file_system_source = z.infer<typeof sleetch_file_system_source.configuration_schema>;
export type file_system_content = {
	source_id: string;
	type: configuration_file_system_source['type'];
	file_path: string;
};
export type file_system_tree_object = page<file_system_content> | category<file_system_tree_object, file_system_content>;

export class sleetch_file_system_source extends sleetch_source<file_system_tree_object, file_system_content, configuration_file_system_source> {
	static configuration_schema = z.object({
		type: z.literal('file-system'),
		language: z.string().optional(),
		path: z.string(),
	});

	constructor(configuration: {
		source: configuration_file_system_source;
		events_emitter: sleetch_events_emitter;
	}) {
		super({
			type: 'file-system',
			source: configuration.source,
			events_emitter: configuration.events_emitter,
			language: resolve_language(configuration.source.language),
		});
	}

	public readonly watcher = {
		watch: async () => {
			const root = this.source.path;
			this.files = await this.scan(root);
			fs.watch(root, { recursive: true }, () => {
				if (this.debounce) {
					clearTimeout(this.debounce);
				}
				this.debounce = setTimeout(() => {
					void this.sync();
				}, 50);
			});
		},
		close: () => {
			if (this.debounce) {
				clearTimeout(this.debounce);
				this.debounce = undefined;
			}
		},
	};

	public readonly builder = {
		read_object(object: file_system_tree_object) {
			if (object.type === 'category') {
				if (object.page)
					return fs.readFileSync(object.page.content.file_path, {
						encoding: 'utf-8',
					});
				else throw new Error('Un-indexed category cannot have a build path');
			} else return fs.readFileSync(object.content.file_path, { encoding: 'utf-8' });
		},
		get_path(language: string, object: file_system_tree_object, extension = '.js') {
			return path.join(PAGES_CACHE_FOLDER, language, (object.path === '/' ? 'index' : object.path) + extension);
		},
		build_object: async (language: string, object: file_system_tree_object): Promise<void> => {
			if (object.type === 'category' && !object.page) throw Error('Cannot build an un-indexed category');
			const files = await generate_page_module(this.builder.read_object(object));
			for (const extension of Object.keys(files) as (keyof typeof files)[]) {
				write_file(this.builder.get_path(language, object, extension), files[extension]);
			}
		},
	};

	public readonly router = {
		load: async (router: sleetch_router) => {
			const files = list_all_files(this.source.path);
			for (const file_path of files) {
				const object = this.router.get_object({
					type: 'file-system',
					file_path,
					source_id: this.id,
				});
				router.join_object(this.language, object);
			}
		},
		get_object: (content: file_system_content) => {
			// supposed to be a file and existant path
			const relative = path.relative(this.source.path, content.file_path);
			const relative_folder = path.dirname(relative);

			const { name: page_name } = path.parse(content.file_path);

			const page_path = `/${[...relative.split(path.sep).filter(Boolean).slice(0, -1), page_name].join('/')}`;
			const category_path = `/${(relative_folder === '.' ? [] : relative_folder.split(path.sep).filter(Boolean)).join('/')}`;

			const top_category =
				relative_folder === this.source.path
					? undefined
					: ({
						type: 'category',
						path: category_path,
						children: [],
					} satisfies category<file_system_tree_object, file_system_content>);

			// biome-ignore-start lint/suspicious/noFallthroughSwitchClause: Expected
			switch (page_name) {
				case DATA_PAGE_NAME:
					if (top_category) {
						return {
							...top_category,
							frontmatter: extract_frontmatter(fs.readFileSync(content.file_path, 'utf-8'), data_frontmatter_schema).frontmatter,
						} satisfies category<file_system_tree_object, file_system_content>;
					}
				case INDEX_PAGE_NAME:
					if (top_category) {
						return {
							...top_category,
							page: {
								type: 'page',
								path: category_path,
								content: content,
								frontmatter: extract_frontmatter(fs.readFileSync(content.file_path, 'utf-8'), page_frontmatter_schema).frontmatter,
							},
						} satisfies category<file_system_tree_object, file_system_content>;
					}
				default:
					return {
						type: 'page',
						path: page_path,
						content,
						frontmatter: extract_frontmatter(fs.readFileSync(content.file_path, 'utf-8'), page_frontmatter_schema).frontmatter,
					} satisfies page<file_system_content>;
			}

			// biome-ignore-end lint/suspicious/noFallthroughSwitchClause: Expected
		},
	};

	private files = new Map<string, file_info>();
	private debounce?: NodeJS.Timeout;

	private async scan(dir: string, files = new Map<string, file_info>()): Promise<Map<string, file_info>> {
		let entries: fs.Dirent[];

		try {
			entries = await fs.promises.readdir(dir, { withFileTypes: true });
		} catch {
			return files;
		}

		for (const entry of entries) {
			const filePath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				await this.scan(filePath, files);
				continue;
			}

			try {
				const stat = await fs.promises.stat(filePath);

				files.set(filePath, {
					mtimeMs: stat.mtimeMs,
					size: stat.size,
				});
			} catch {
				// File disappeared while scanning.
			}
		}

		return files;
	}
	private async sync() {
		const previous = this.files;
		const current = await this.scan(this.source.path);

		for (const [file, info] of current) {
			const old = previous.get(file);

			if (!old) {
				this.events_emitter.emit(
					'added',
					{
						type: 'file-system',
						file_path: file,
						source_id: this.id,
					},
					this,
				);
				continue;
			}

			if (old.mtimeMs !== info.mtimeMs || old.size !== info.size) {
				this.events_emitter.emit(
					'edited',
					{
						type: 'file-system',
						file_path: file,
						source_id: this.id,
					},
					this,
				);
			}
		}

		for (const file of previous.keys()) {
			if (!current.has(file)) {
				this.events_emitter.emit(
					'removed',
					{
						type: 'file-system',
						file_path: file,
						source_id: this.id,
					},
					this,
				);
			}
		}

		this.files = current;
	}
}
