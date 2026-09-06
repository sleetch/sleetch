import type { source } from '@/configuration/types/sources';
import type { sleetch_source } from '../lib/source';
import type { content } from './content';
import type { tree_object } from './routing';

export interface file_info {
	mtimeMs: number;
	size: number;
}

export interface watcher_events {
	"added-page": [content: content, source: sleetch_source<tree_object, content, source>];
	"removed-page": [content: content, source: sleetch_source<tree_object, content, source>];
	"edited-page": [content: content, source: sleetch_source<tree_object, content, source>];
	"updated-tree": [language: string];
	"updated-manifest": [];
}
