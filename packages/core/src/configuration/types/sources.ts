import type z from 'zod';
import type { file_system_schema } from '../lib/schemas/sources/file-system';
import type { git_schema } from '../lib/schemas/sources/git';
import type { source_schema } from '../lib/schemas/sources';

export type file_system_source = z.infer<typeof file_system_schema>;
export type git_source = z.infer<typeof git_schema>;
export type source = z.infer<typeof source_schema>;
