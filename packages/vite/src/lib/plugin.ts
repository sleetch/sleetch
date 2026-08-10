import type { Plugin } from 'vite';
import { sleetch_runtime } from '@sleetch/core/compiler';

const runtime = new sleetch_runtime();

export function plugin(): Plugin {
  return {
    name: 'sleetch',
    enforce: 'pre',

    async buildStart() {
      if (this.environment.mode === 'build' && !runtime.sources.loaded()) {
        console.log('buildStart', this.environment.name, this.environment.mode);
        await runtime.sources.load();
        await runtime.builder.build();
      }
    },

    async configureServer(server) {
      if (server.config.mode == 'development') {
        console.log('configServer', server.config.mode);
        await runtime.sources.load();
        await runtime.builder.build();
        await runtime.sources.watch();
      }
    },
  };
}
