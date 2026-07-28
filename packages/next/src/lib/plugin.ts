import { CACHE_FOLDER, ladoc_router } from '@ladoc/core/compiler';
import type { NextConfig } from 'next';
import { ladoc_webpack_plugin } from './wepack-plugin';

export function with_ladoc_plugin(next_config: NextConfig = {}): NextConfig {
  const router = new ladoc_router();
  console.dir(next_config, { depth: null });
  return {
    ...next_config,
    turbopack: {
      ...next_config.turbopack,
      resolveAlias: {
        ...next_config.turbopack?.resolveAlias,
        '@ladoc/cache': CACHE_FOLDER,
      },
    },
    webpack(webpack_config, options) {
      webpack_config.resolve ??= {};
      webpack_config.resolve.alias ??= {};
      webpack_config.resolve.alias['@ladoc/cache'] = CACHE_FOLDER;
      webpack_config.plugins ??= [];
      webpack_config.plugins.push(new ladoc_webpack_plugin(router));
      return next_config.webpack ? next_config.webpack(webpack_config, options) : webpack_config;
    },
  };
}
