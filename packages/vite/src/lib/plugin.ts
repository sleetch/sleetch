import type { Plugin, ViteDevServer } from 'vite';
import { ladoc_builder, ladoc_watcher } from '@ladoc/core/compiler';
import { ladoc_router } from '@ladoc/core/compiler';
import { get_root_dir } from '@ladoc/core/shared';
import path from 'path';

const router = new ladoc_router();
const builder = new ladoc_builder(router);

export function plugin(): Plugin {
  return {
    name: 'ladoc',
    enforce: 'pre',

    config() {
      return {
        resolve: {
          alias: {
            '@ladoc/cache': path.join(get_root_dir(), '.ladoc'),
          },
        },
      };
    },

    async buildStart() {
      if (this.environment.mode === 'build') {
        await builder.build();
      }
    },

    async configureServer(server) {
      if (server.config.mode == 'development') {
        await builder.build();
        const watcher = new ladoc_watcher();
        builder.listen(watcher);
        watcher.on('added', (content, source) => console.log('added', content, source));
        watcher.on('removed', (content, source) => console.log('removed', content, source));
        watcher.on('edited', (content, source) => console.log('edited', content, source));
      }
    },
  };
}
