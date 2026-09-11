import fs from 'node:fs';
import z from 'zod';
import type { parsed_sleetch_configuration } from '../types/configuration';
import { configuration_schema } from './schemas/configuration';

let cache: parsed_sleetch_configuration | undefined;
let cache_mtime: number | undefined;

export const get_configuration = () => {
	const mtime = fs.existsSync(CONFIGURATION_FILE_PATH) ? fs.statSync(CONFIGURATION_FILE_PATH).mtimeMs : undefined;
	if (!cache || cache_mtime !== mtime) {
		cache = load_configuration();
		cache.logger.debug(cache_mtime ? 'cached sleetch configuration.' : 'refreshed sleetch configuration.');
		cache_mtime = mtime;
	}
	return cache;
};

import { createRequire } from 'node:module';
import { CONFIGURATION_FILE_PATH } from '@/compiler/utils/constants';

const require = createRequire(import.meta.url);

const load_configuration = (): parsed_sleetch_configuration => {
	if (fs.existsSync(CONFIGURATION_FILE_PATH)) {
		delete require.cache[CONFIGURATION_FILE_PATH];
		const mod = require(CONFIGURATION_FILE_PATH); // await import(/* @vite-ignore */ `${file_path}`); // ?t=${Date.now()}
		if ('default' in mod && typeof mod.default === 'object') {
			const { data: configuration, error } = configuration_schema.safeParse(mod.default);
			if (error) {
				throw new Error('Your sleetch configuration contains incorrect information.\n' + z.prettifyError(error));
			}
			return configuration;
		}
	}
	return configuration_schema.parse({});
};
