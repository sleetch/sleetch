import { sleetch_source } from '../source';

import { data_frontmatter_schema, extract_frontmatter, page_frontmatter_schema } from '@/markdown';
import { generate_markdown_module } from '../generators/markdown-module';
import { write_file } from '@/compiler/utils/write-file';

import type { file_info } from '@/compiler/types/watcher';
import type { sleetch_router } from '../router';
import type { sleetch_events_emitter } from '../emitter';
import type { category, data, page } from '@/compiler/types/routing';

import { CACHE_FOLDER, DATA_PAGE_NAME, INDEX_PAGE_NAME } from '@/compiler/utils/constants';

import path from 'node:path';
import fs from 'node:fs';
import { list_all_files } from '@/shared/utils/list-files';
import { resolve_language } from '@/compiler/utils/resolve-language';
import z from 'zod';

export type configuration_file_system_source = z.infer<typeof sleetch_file_system_source.configuration_schema>;
export type file_system_content = {
  source_id: string;
  type: configuration_file_system_source['type'];
  file_path: string;
};
export type file_system_tree_object = data<file_system_content> | page<file_system_content> | category<file_system_tree_object>;

export class sleetch_file_system_source extends sleetch_source<file_system_tree_object, file_system_content, configuration_file_system_source> {
  static configuration_schema = z.object({
    type: z.literal('file-system'),
    language: z.string().optional(),
    path: z.string(),
  });

  constructor(configuration: { source: configuration_file_system_source; events_emitter: sleetch_events_emitter }) {
    super({
      type: 'file-system',
      source: configuration.source,
      events_emitter: configuration.events_emitter,
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
    build_object: async (language: string, object: file_system_tree_object): Promise<void> => {
      if (object.type == 'category') throw Error('Cannot build a category');
      const files = await generate_markdown_module(this.get_object_build_path(object));
      for (const extension of Object.keys(files) as (keyof typeof files)[]) {
        write_file(path.join(this.build_folder_path, language, object.path + extension), files[extension]);
      }
    },
  };

  public readonly router = {
    load: async (router: sleetch_router) => {
      const files = list_all_files(this.source.path);
      const language = resolve_language(this.source.language);
      for (const file_path of files) {
        const object = this.router.get_object({ type: 'file-system', file_path, source_id: this.id });
        router.join_object(language, object);
      }
    },
    get_object: (content: file_system_content) => {
      // supposed to be a file and existant path
      const { name } = path.parse(content.file_path);
      const relative = path.relative(this.source.path, content.file_path);
      const segments = relative.split(path.sep).filter(Boolean);
      segments[segments.length - 1] = name;
      if (name == DATA_PAGE_NAME) {
        return {
          type: 'data',
          path: '/' + segments.join('/'),
          content: content,
          frontmatter: extract_frontmatter(fs.readFileSync(content.file_path, 'utf-8'), data_frontmatter_schema).frontmatter,
        } satisfies data<file_system_content>;
      } else {
        return {
          type: 'page',
          path: '/' + segments.join('/'),
          content: content,
          frontmatter: extract_frontmatter(fs.readFileSync(content.file_path, 'utf-8'), page_frontmatter_schema).frontmatter,
          index: name == INDEX_PAGE_NAME ? true : undefined,
        } satisfies page<file_system_content>;
      }
    },
  };

  private build_folder_path = path.join(CACHE_FOLDER, 'markdown-modules');
  private files = new Map<string, file_info>();
  private debounce?: NodeJS.Timeout;

  private get_object_build_path(object: file_system_tree_object) {
    if (object.type == 'category') throw Error('Cannot generate build_path for category');
    return fs.readFileSync(object.content.file_path, { encoding: 'utf-8' });
  }
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
          this
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
          this
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
          this
        );
      }
    }

    this.files = current;
  }
}
