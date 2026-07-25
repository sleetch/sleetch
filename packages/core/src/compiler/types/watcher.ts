import type { source } from '@/configuration/types/sources';
import type { content } from './content';

export interface file_info {
  mtimeMs: number;
  size: number;
}

export interface watcher_events {
  added: [content: content, source: source];
  removed: [content: content, source: source];
  edited: [content: content, source: source];
}
