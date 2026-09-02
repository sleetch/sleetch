import z from 'zod';
import { sleetch_cloud_source } from '@/compiler/lib/sources/cloud';
import { sleetch_file_system_source } from '@/compiler/lib/sources/file-system';

export const source_schema = z.discriminatedUnion('type', [
	sleetch_file_system_source.configuration_schema,
	sleetch_cloud_source.configuration_schema,
]);
export const sources_schema = z.array(source_schema).default([]);
