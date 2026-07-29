import type { Plugin } from 'vite';
import { CACHE_FOLDER, ladoc_runtime } from '@ladoc/core/compiler';

const runtime = new ladoc_runtime();

export function plugin(): Plugin {
  return {
    name: 'ladoc',
    enforce: 'pre',

    config() {
      return {
        resolve: {
          alias: {
            '@ladoc/cache': CACHE_FOLDER,
          },
        },
      };
    },

    async buildStart() {
      if (this.environment.mode === 'build') {
        await runtime.sources.load();
        await runtime.builder.build();
      }
    },

    async configureServer(server) {
      if (server.config.mode == 'development') {
        await runtime.sources.load();
        await runtime.builder.build();
        await runtime.sources.watch();
      }
    },
  };
}
