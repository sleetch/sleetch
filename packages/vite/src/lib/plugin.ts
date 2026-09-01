import { sleetch_runtime } from '@sleetch/core/compiler';
import type { Plugin } from 'vite';

const runtime = new sleetch_runtime();

export function plugin(): Plugin {
	return {
		name: 'sleetch',
		enforce: 'pre',

		config(config) {
			return {
				optimizeDeps: {
					exclude: [...(config.optimizeDeps?.exclude ?? []), "@sleetch/client"],
				},
				server: {
					watch: {
						ignored: [
							...(Array.isArray(config.server?.watch?.ignored)
								? config.server.watch.ignored
								: config.server?.watch?.ignored
									? [config.server.watch.ignored]
									: []),
							`!**/node_modules/@sleetch/client/**`,
						],
					},
				},
			};
		},

		async buildStart() {
			if (this.environment.mode === 'build' && !runtime.sources.loaded()) {
				console.log('buildStart', this.environment.name, this.environment.mode);
				await runtime.sources.load();
				await runtime.builder.build();
			}
		},

		async configureServer(server) {
			server.watcher.add(`**/node_modules/@sleetch/client/**`);

			if (server.config.mode === 'development') {
				console.log('configServer', server.config.mode);
				await runtime.sources.load();
				await runtime.builder.build();
				await runtime.sources.watch();
			}
		},
	};
}
