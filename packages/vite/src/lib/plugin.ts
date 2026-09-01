import { sleetch_runtime } from '@sleetch/core/compiler';
import type { Plugin } from 'vite';

const runtime = new sleetch_runtime();

export function plugin(): Plugin {
	return {
		name: 'sleetch',
		enforce: 'pre',

		config(config) {
			return {
				ssr: {
					noExternal: ["@sleetch/client"],
				},
				optimizeDeps: {
					exclude: [
						...(config.optimizeDeps?.exclude ?? []),
						"@sleetch/client",
					],
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
			console.log("Hello bitch")

			const invalidateAll = (file: string) => {
				console.log("invalidate", file)
				for (const env of Object.values(server.environments)) {
					const mods = env.moduleGraph.getModulesByFile(file);
					if (mods) for (const mod of mods) env.moduleGraph.invalidateModule(mod);
				}
			};

			if (server.config.mode === 'development') {
				await runtime.sources.load();
				await runtime.builder.build();
				await runtime.sources.watch();

				runtime.watcher.on("edited", (content, source) => {
					const object = source.router.get_object(content)
					const build_path = source.builder.get_path(source.language, object)
					invalidateAll(build_path)
				});
			}
		},
	};
}
