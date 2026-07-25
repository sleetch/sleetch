import type { ladoc_router } from '@/compiler/lib/router';
import type { ladoc_watcher } from '@/compiler/lib/watcher';
import { ladoc_file_system_builder } from './sources/file-system/builder';
import { has_content, type file_system_data, type file_system_tree_object, type tree_object } from '../types/routing';
import { resolve_language } from '../utils/resolve-language';
import { generate_tree } from './generators/tree';
import { write_file } from '../utils/write-file';
import { get_root_dir } from '@/shared';
import path from 'path';
import { generate_manifest } from './generators/manifest';

export class ladoc_builder {
  private file_system = new ladoc_file_system_builder();

  constructor(private router: ladoc_router) {}

  listen(watcher: ladoc_watcher) {
    watcher.on('edited', async (content, source) => {
      const language = await resolve_language(source.language);
      const object = this.router.get_object(content, source);
      if (object) {
        this.build_object(language, object);
        this.router.join_object(language, object);
      } else {
        console.error('Not implemented yet EDITED');
      }
      await this.build_tree(language);
      await this.build_manifest();
    });

    watcher.on('added', async (content, source) => {
      const language = await resolve_language(source.language);
      const object = this.router.get_object(content, source);
      if (object) {
        this.build_object(language, object);
        this.router.join_object(language, object);
      } else {
        console.error('Not implemented yet ADDED');
      }
      await this.build_tree(language);
      await this.build_manifest();
    });

    watcher.on('removed', async (content, source) => {
      const language = await resolve_language(source.language);
      const path = this.router.path_from_content(language, content);
      if (path) {
        this.router.remove_object_from_path(language, path);
      } else {
        console.error('Not implemented yet REMOVED');
      }
      await this.build_tree(language);
      await this.build_manifest();
    });
  }

  async build() {
    await this.router.load();
    for (const language of this.router.get_languages()) {
      for (const object of this.router.get_tree(language)) {
        await this.build_object(language, object);
      }
      await this.build_tree(language);
    }
    await this.build_manifest();
    console.timeEnd('Router Build');
  }

  private async build_object(language: string, object: tree_object) {
    if (object.type == 'category') {
      for (const child_object of object.children) {
        await this.build_object(language, child_object);
      }
    } else {
      if (has_content(object, 'file-system')) {
        this.file_system.build(language, object);
      }
    }
  }

  private trees_folder_path = path.join(get_root_dir(), '.ladoc/generated/trees');

  private async build_tree(language: string) {
    const tree = this.router.get_tree(language);
    const content = await generate_tree(tree);
    const write_path = path.join(this.trees_folder_path, language + '.js');
    write_file(write_path, content);
  }

  private manifest_file_path = path.join(get_root_dir(), '.ladoc/generated/manifest.js');
  private manifest_file_path_dts = path.join(get_root_dir(), '.ladoc/generated/manifest.d.ts');

  private async build_manifest() {
    const content = await generate_manifest(this.router);
    write_file(this.manifest_file_path, content.js);
    write_file(this.manifest_file_path_dts, content.dts);
  }
}
