import { sleetch_runtime } from '@sleetch/core/compiler';
import type { Compiler } from 'webpack';

const runtime = new sleetch_runtime();

export class sleetch_webpack_plugin {
	apply(compiler: Compiler) {
		compiler.hooks.beforeCompile.tapPromise('SleetchWebpackPlugin', async () => {
			if (!runtime.sources.loaded()) {
				await runtime.sources.load();
				await runtime.builder.build();
				if (compiler.options.mode === 'development') {
					await runtime.sources.watch();
					runtime.watcher.on('edited', async (a, b) => {
						compiler.watching?.invalidate();
					});
				}
			}
		});
	}
}
