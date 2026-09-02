import z from 'zod';
import { languages_schema } from './languages';
import { logger_schema } from './logger';
import { markdown_schema } from './markdown';
import { sources_schema } from './sources';

export const configuration_schema = z.object({
	logger: logger_schema,
	markdown: markdown_schema,
	languages: languages_schema,
	sources: sources_schema,
});
