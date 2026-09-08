import { defineEvent } from '@sleetch/websockets';
import z from 'zod';
import type { tree_object } from '@/compiler';

export const studio_events = [
	defineEvent({
		id: 'get-tree',
		from: 'client',
		schema: z.object({
			language: z.string()
		}),
	}),
	defineEvent({
		id: 'get-trees',
		from: 'client',
		schema: z.object({}),
	}),
	defineEvent({
		id: 'update-tree',
		from: 'server',
		schema: z.object({
			language: z.string(),
			tree: z.custom<tree_object[]>()
		})
	}),

	defineEvent({
		id: 'get-languages',
		from: 'client',
		schema: z.object({}),
	}),
	defineEvent({
		id: 'update-languages',
		from: 'server',
		schema: z.object({
			languages: z.array(z.string())
		}),
	})
];

export type studio_events = typeof studio_events
