import { ladoc_router } from '@/compiler/lib/router';
import { DATA_PAGE_NAME, INDEX_PAGE_NAME } from '@/compiler/utils/constants';
import { data_frontmatter_schema, extract_frontmatter, page_frontmatter_schema } from '@/markdown';
import { get_configuration } from '@/configuration';
import type { file_system_content } from '@/compiler/types/content';
import type { file_system_source } from '@/configuration/types/sources';
import type { file_system_data, file_system_page, file_system_tree_object } from '@/compiler/types/routing';
import { resolve_language } from '@/compiler/utils/resolve-language';
import { list_all_files } from '@/shared/utils/list-files';
import path from 'path';
import fs from 'fs';

export class ladoc_file_system_router {
  constructor(private router: ladoc_router) {}

  async load() {
    const configuration = await get_configuration();
    for (const source of configuration.sources) {
      if (source.type == 'file-system') {
        const files = list_all_files(source.path);
        const language = await resolve_language(source.language);
        for (const file_path of files) {
          const object = this.get_object({ type: 'file-system', file_path }, source);
          this.router.join_object(language, object);
        }
      }
    }
  }

  get_object(content: file_system_content, source: file_system_source): file_system_tree_object {
    const { name } = path.parse(content.file_path);
    const relative = path.relative(source.path, content.file_path);
    const segments = relative.split(path.sep).filter(Boolean);
    segments[segments.length - 1] = name;
    if (name == DATA_PAGE_NAME) {
      return {
        type: 'data',
        path: '/' + segments.join('/'),
        content: content,
        frontmatter: extract_frontmatter(fs.readFileSync(content.file_path, 'utf-8'), data_frontmatter_schema).frontmatter,
      } satisfies file_system_data;
    } else {
      return {
        type: 'page',
        path: '/' + segments.join('/'),
        content: content,
        frontmatter: extract_frontmatter(fs.readFileSync(content.file_path, 'utf-8'), page_frontmatter_schema).frontmatter,
        index: name == INDEX_PAGE_NAME ? true : undefined,
      } satisfies file_system_page;
    }
  }
}
