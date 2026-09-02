// biome-ignore-all lint/suspicious/noExplicitAny: Supported by native node JS

import type { ParseArgsConfig } from 'node:util';
import type { sleetch_cli } from '@/lib/cli';

export type command_options = NonNullable<ParseArgsConfig['options']>;

type BooleanOptionKeys<O extends command_options> = {
	[K in keyof O]: O[K] extends { type: 'boolean' } ? K : never;
}[keyof O];

type StringOptionKeys<O extends command_options> = {
	[K in keyof O]: O[K] extends { type: 'string' } ? K : never;
}[keyof O];

export type command_action<O extends command_options> = (
	options: {
		args: string[];
		get_boolean_option: <K extends BooleanOptionKeys<O>>(name: K) => boolean | undefined;
		get_string_option: <K extends StringOptionKeys<O>>(name: K) => string | undefined;
	},
	cli: sleetch_cli,
) => void;

export type command<O extends command_options = {}> = {
	name: string;
	description: string;
	options: O;
	fallback?: boolean;
	action: command_action<O>;
	subcommands?: command<any>[];
	active: boolean;
};
