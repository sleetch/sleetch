import path from 'path';
import { get_root_dir } from '@/shared';
import fs from 'fs';
import { generate_markdown_module } from '@/compiler/lib/generators/markdown-module';
import type { file_system_data, file_system_page } from '@/compiler/types/routing';
import { write_file } from '@/compiler/utils/write-file';

export class ladoc_file_system_builder {
  private generated_folder_path = path.join(get_root_dir(), '.ladoc/generated/markdown-modules');

  constructor() {}

  async build(language: string, object: file_system_page | file_system_data) {
    const content = fs.readFileSync(object.content.file_path, { encoding: 'utf-8' });
    const markdown_module = await generate_markdown_module(content);
    const write_path = path.join(this.generated_folder_path, language, object.path + '.js');
    write_file(write_path, markdown_module);
    return write_path;
  }
}
