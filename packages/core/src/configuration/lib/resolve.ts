import { configuration_schema } from './schemas/configuration';
import fs from 'fs';
import path from 'path';
import { get_root_dir } from '@/shared/utils/root';
import type { parsed_sleetch_configuration } from '../types/configuration';
import z from 'zod';

let cache: parsed_sleetch_configuration | undefined;
let cache_mtime: number | undefined;

export const get_configuration = () => {
  const root = get_root_dir();
  const file_path = path.join(root, 'sleetch.config.ts');
  const mtime = fs.existsSync(file_path) ? fs.statSync(file_path).mtimeMs : undefined;
  if (!cache || cache_mtime !== mtime) {
    cache = load_configuration();
    cache.logger.debug(cache_mtime ? 'cached sleetch configuration.' : 'refreshed sleetch configuration.');
    cache_mtime = mtime;
  }
  return cache;
};

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const load_configuration = (): parsed_sleetch_configuration => {
  const root = get_root_dir();
  const file_path = path.join(root, 'sleetch.config.ts');
  if (fs.existsSync(file_path)) {
    const mod = require(file_path); // await import(/* @vite-ignore */ `${file_path}`); // ?t=${Date.now()}
    if ('default' in mod && typeof mod.default == 'object') {
      const { data: configuration, error } = configuration_schema.safeParse(mod.default);
      if (error) {
        console.error('Your sleetch configuration contains incorrect information.');
        throw new Error(z.prettifyError(error));
      }
      return configuration;
    }
  }
  return configuration_schema.parse({});
};
