import type { source } from '@/configuration/types/sources';
import type { sleetch_source } from '../lib/source';
import type { content } from './content';
import type { tree_object } from './routing';

export interface file_info {
	mtimeMs: number;
	size: number;
}

export interface watcher_events {
	added: [content: content, source: sleetch_source<tree_object, content, source>];
	removed: [content: content, source: sleetch_source<tree_object, content, source>];
	edited: [content: content, source: sleetch_source<tree_object, content, source>];
}
