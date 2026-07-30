import z from 'zod';
import { ladoc_file_system_source } from '@/compiler/lib/sources/file-system';

export const source_schema = z.discriminatedUnion('type', [ladoc_file_system_source.configuration_schema]);
export const sources_schema = z.array(source_schema).default([]);
