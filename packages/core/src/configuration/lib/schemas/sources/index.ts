import z from 'zod';
import { file_system_schema } from './file-system';
import { git_schema } from './git';

export const source_schema = z.discriminatedUnion('type', [file_system_schema, git_schema]);
export const sources_schema = z.array(source_schema).default([]);
