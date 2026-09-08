import type z from 'zod';

export type from = 'client' | 'server';

export interface event<I extends string, S extends z.ZodType, F extends from> {
	id: I;
	schema: S;
	from: F;
}

export function defineEvent<T extends string, S extends z.ZodType, F extends from>(data: event<T, S, F>): event<T, S, F> {
	return data;
}

export type events = event<any, any, any>[];
