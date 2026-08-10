import type { NextConfig } from 'next';
import { sleetch_webpack_plugin } from './wepack-plugin';

export function with_sleetch_plugin(next_config: NextConfig = {}): NextConfig {
  console.dir(next_config, { depth: null });
  return {
    ...next_config,
    webpack(webpack_config, options) {
      webpack_config.plugins ??= [];
      webpack_config.plugins.push(new sleetch_webpack_plugin());
      return next_config.webpack ? next_config.webpack(webpack_config, options) : webpack_config;
    },
  };
}
