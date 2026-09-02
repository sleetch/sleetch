import type { cloud_content } from '../lib/sources/cloud';
import type { file_system_content } from '../lib/sources/file-system';

export type content = cloud_content | file_system_content;
