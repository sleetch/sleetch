/*
Half AI Generated :/
Needs review / rewrite
*/

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import z from "zod";
import type { category, page } from "@/compiler/types/routing";
import type { file_info } from "@/compiler/types/watcher";
import {
	DATA_PAGE_NAME,
	INDEX_PAGE_NAME,
	PAGES_CACHE_FOLDER,
} from "@/compiler/utils/constants";
import { resolve_language } from "@/compiler/utils/resolve-language";
import { write_file } from "@/compiler/utils/write-file";
import {
	data_frontmatter_schema,
	extract_frontmatter,
	page_frontmatter_schema,
} from "@/markdown";
import { list_all_files } from "@/shared/utils/list-files";
import type { sleetch_events_emitter } from "../emitter";
import { generate_page_module } from "../generators/page";
import type { sleetch_router } from "../router";
import { sleetch_source } from "../source";

const execFileAsync = promisify(execFile);

const GIT_POLL_INTERVAL_MS = 15_000;
const GIT_SOURCES_CACHE_FOLDER = ".sleetch/git-sources";

export type configuration_git_file_system_source = z.infer<
	typeof sleetch_git_file_system_source.configuration_schema
>;
export type git_file_system_content = {
	source_id: string;
	type: configuration_git_file_system_source["type"];
	file_path: string;
};
export type git_file_system_tree_object =
	| page<git_file_system_content>
	| category<git_file_system_tree_object, git_file_system_content>;

export class sleetch_git_file_system_source extends sleetch_source<
	git_file_system_tree_object,
	git_file_system_content,
	configuration_git_file_system_source
> {
	static configuration_schema = z.object({
		type: z.literal("git-file-system"),
		url: z.string(),
		secret: z.string().optional(),
		language: z.string().optional(),
		branch: z.string().optional(),
	});

	private readonly branch: string;

	private repository_hash;

	constructor(configuration: {
		source: configuration_git_file_system_source;
		events_emitter: sleetch_events_emitter;
	}) {
		super({
			type: "git-file-system",
			source: configuration.source,
			events_emitter: configuration.events_emitter,
			language: resolve_language(configuration.source.language),
			static: false,
		});
		this.branch = configuration.source.branch ?? "main";
		this.repository_hash = createHash("sha256")
			.update(this.source.url)
			.digest("hex");
	}

	public readonly watcher = {
		watch: async () => {
			await this.ensure_repo();
			this.files = await this.scan(this.repo_dir);
			this.poll_timer = setInterval(() => {
				void this.sync();
			}, GIT_POLL_INTERVAL_MS);
		},
		close: () => {
			if (this.poll_timer) {
				clearInterval(this.poll_timer);
				this.poll_timer = undefined;
			}
		},
	};

	public readonly builder = {
		read_object(object: git_file_system_tree_object) {
			if (object.type === "category") {
				if (object.page)
					return fs.readFileSync(object.page.content.file_path, {
						encoding: "utf-8",
					});
				else
					throw new Error(
						"Un-indexed category cannot have a build page",
					);
			} else
				return fs.readFileSync(object.content.file_path, {
					encoding: "utf-8",
				});
		},
		get_path(
			language: string,
			object: git_file_system_tree_object,
			extension = ".js",
		) {
			return path.join(
				PAGES_CACHE_FOLDER,
				language,
				(object.path === "/" ? "index" : object.path) + extension,
			);
		},
		build_object: async (
			language: string,
			object: git_file_system_tree_object,
		): Promise<void> => {
			if (object.type === "category" && !object.page) return; // throw Error('Cannot build an un-indexed category');
			const files = await generate_page_module(
				this.builder.read_object(object),
			);
			for (const extension of Object.keys(
				files,
			) as (keyof typeof files)[]) {
				write_file(
					this.builder.get_path(language, object, extension),
					files[extension],
				);
			}
		},
	};

	public readonly router = {
		load: async (router: sleetch_router) => {
			await this.ensure_repo();
			if (!this.files.size) {
				this.files = await this.scan(this.repo_dir);
			}

			const files = list_all_files(this.repo_dir)
				.filter((file_path) => !this.is_git_internal(file_path))
				.sort((a, b) => this.path_depth(a) - this.path_depth(b));
			/*console.log(
				`[git-file-system source ${this.id}] ${files.length} file(s) found in ${this.repo_dir}`,
				);*/

			for (const file_path of files) {
				try {
					const object = this.router.get_object({
						type: "git-file-system",
						file_path,
						source_id: this.id,
					});
					router.join_object(this.language, object);
					/* 	console.log(
						`[git-file-system source ${this.id}] joined ${object.path} (${object.type})`,
						);*/
				} catch (error) {
					/*console.warn(
						`[git-file-system source ${this.id}] skipping "${file_path}": ${error instanceof Error ? error.message : error}`,
						);*/
				}
			}
		},
		get_object: (content: git_file_system_content) => {
			// supposed to be a file and existant path
			const relative = path.relative(this.repo_dir, content.file_path);
			const relative_folder = path.dirname(relative);

			const { name: page_name } = path.parse(content.file_path);

			const page_path = `/${[...relative.split(path.sep).filter(Boolean).slice(0, -1), page_name].join("/")}`;
			const category_path = `/${(relative_folder === "." ? [] : relative_folder.split(path.sep).filter(Boolean)).join("/")}`;

			const top_category =
				relative_folder === this.repo_dir
					? undefined
					: ({
							type: "category",
							path: category_path,
							children: [],
						} satisfies category<
							git_file_system_tree_object,
							git_file_system_content
						>);

			// biome-ignore-start lint/suspicious/noFallthroughSwitchClause: Expected
			switch (page_name) {
				case DATA_PAGE_NAME:
					if (top_category) {
						return {
							...top_category,
							frontmatter: extract_frontmatter(
								fs.readFileSync(content.file_path, "utf-8"),
								data_frontmatter_schema,
							).frontmatter,
						} satisfies category<
							git_file_system_tree_object,
							git_file_system_content
						>;
					}
				case INDEX_PAGE_NAME:
					if (top_category) {
						return {
							...top_category,
							page: {
								type: "page",
								path: category_path,
								content: content,
								frontmatter: extract_frontmatter(
									fs.readFileSync(content.file_path, "utf-8"),
									page_frontmatter_schema,
								).frontmatter,
							},
						} satisfies category<
							git_file_system_tree_object,
							git_file_system_content
						>;
					}
				default:
					return {
						type: "page",
						path: page_path,
						content,
						frontmatter: extract_frontmatter(
							fs.readFileSync(content.file_path, "utf-8"),
							page_frontmatter_schema,
						).frontmatter,
					} satisfies page<git_file_system_content>;
			}

			// biome-ignore-end lint/suspicious/noFallthroughSwitchClause: Expected
		},
	};

	private files = new Map<string, file_info>();
	private poll_timer?: NodeJS.Timeout;
	private syncing = false;
	private ensure_repo_promise?: Promise<void>;

	private get repo_dir(): string {
		return path.join(
			process.cwd(),
			GIT_SOURCES_CACHE_FOLDER,
			this.repository_hash,
		);
	}

	private is_git_internal(file_path: string): boolean {
		const relative = path.relative(this.repo_dir, file_path);
		return relative.split(path.sep)[0] === ".git";
	}

	private path_depth(file_path: string): number {
		return path.relative(this.repo_dir, file_path).split(path.sep).length;
	}

	private authenticated_url(): string {
		try {
			const url = new URL(this.source.url);
			if (this.source.secret) {
				url.username = this.source.secret;
			}
			return url.toString();
		} catch {
			return this.source.url;
		}
	}

	private async run_git(args: string[], cwd: string): Promise<string> {
		const { stdout } = await execFileAsync("git", args, {
			cwd,
			env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
		});
		return stdout;
	}

	private async ensure_repo(): Promise<void> {
		if (!this.ensure_repo_promise) {
			this.ensure_repo_promise = this.ensure_repo_impl().catch(
				(error) => {
					this.ensure_repo_promise = undefined;
					throw error;
				},
			);
		}
		return this.ensure_repo_promise;
	}

	private async ensure_repo_impl(): Promise<void> {
		if (fs.existsSync(path.join(this.repo_dir, ".git"))) {
			await this.pull();
			return;
		}

		fs.mkdirSync(path.dirname(this.repo_dir), { recursive: true });
		await this.run_git(
			[
				"clone",
				"--branch",
				this.branch,
				"--single-branch",
				this.authenticated_url(),
				this.repo_dir,
			],
			path.dirname(this.repo_dir),
		);
	}

	private async pull(): Promise<boolean> {
		const before = (
			await this.run_git(["rev-parse", "HEAD"], this.repo_dir)
		).trim();
		await this.run_git(["fetch", "origin", this.branch], this.repo_dir);
		await this.run_git(
			["reset", "--hard", `origin/${this.branch}`],
			this.repo_dir,
		);
		const after = (
			await this.run_git(["rev-parse", "HEAD"], this.repo_dir)
		).trim();
		return before !== after;
	}

	private async scan(
		dir: string,
		files = new Map<string, file_info>(),
	): Promise<Map<string, file_info>> {
		let entries: fs.Dirent[];

		try {
			entries = await fs.promises.readdir(dir, { withFileTypes: true });
		} catch {
			return files;
		}

		for (const entry of entries) {
			if (entry.name === ".git") continue;

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

	private async sync(): Promise<void> {
		if (this.syncing) return;
		this.syncing = true;

		try {
			let changed: boolean;
			try {
				/*console.error(
					`[git-file-system source ${this.id}] Pulling repository`,
				);*/
				changed = await this.pull();
			} catch (error) {
				/*console.error(
					`[git-file-system source ${this.id}] failed to sync from remote`,
					error,
				);*/
				return;
			}

			if (!changed) return;

			const previous = this.files;
			const current = await this.scan(this.repo_dir);

			for (const [file, info] of current) {
				const old = previous.get(file);

				if (!old) {
					this.events_emitter.emit(
						"added-page",
						{
							type: "git-file-system",
							file_path: file,
							source_id: this.id,
						},
						this,
					);
					continue;
				}

				if (old.mtimeMs !== info.mtimeMs || old.size !== info.size) {
					this.events_emitter.emit(
						"edited-page",
						{
							type: "git-file-system",
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
						"removed-page",
						{
							type: "git-file-system",
							file_path: file,
							source_id: this.id,
						},
						this,
					);
				}
			}

			this.files = current;
		} finally {
			this.syncing = false;
		}
	}
}
