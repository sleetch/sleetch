import z from 'zod';
import type { category, page } from '@/compiler/types/routing';

import type { sleetch_events_emitter } from '../emitter';
import type { sleetch_router } from '../router';
import { sleetch_source } from '../source';

export type configuration_cloud_source = z.infer<typeof sleetch_cloud_source.configuration_schema>;
export type cloud_content = {
	source_id: string;
	type: configuration_cloud_source['type'];
	file_path: string;
};
export type cloud_tree_object = page<cloud_content> | category<cloud_tree_object, cloud_content>;

export class sleetch_cloud_source extends sleetch_source<cloud_tree_object, cloud_content, configuration_cloud_source> {
	static configuration_schema = z.object({
		type: z.literal('cloud'),
		server: z.string(),
		secret: z.string(),
	});

	constructor(configuration: {
		source: configuration_cloud_source;
		events_emitter: sleetch_events_emitter;
	}) {
		super({
			type: 'cloud',
			source: configuration.source,
			events_emitter: configuration.events_emitter,
			language: "en",
		});
	}

	public readonly watcher = {
		watch: async () => {
		},
		close: () => {
		},
	};


	public readonly builder = {
		read_object(object: cloud_tree_object) {
			return ""
		},
		get_path(language: string, object: cloud_tree_object, extension = ".js") {
			return ""
		},
		build_object: async (language: string, object: cloud_tree_object): Promise<void> => {
		},
	};

	public readonly router = {
		load: async (router: sleetch_router) => {
		},
		get_object: (content: cloud_content) => {
			return { "type": "category", "children": [], "path": "" } satisfies cloud_tree_object
		},
	};

}
