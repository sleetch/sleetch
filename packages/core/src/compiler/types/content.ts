import type { file_system_content } from '../lib/sources/file-system';

export type git_content = {
  source_id: string;
  type: 'git';
  file_url: string;
};

export type content = git_content | file_system_content;
