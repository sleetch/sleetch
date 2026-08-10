import type { Compiler } from 'webpack';
import { sleetch_runtime } from '@sleetch/core/compiler';

const runtime = new sleetch_runtime();

export class sleetch_webpack_plugin {
  constructor() {}

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tapPromise('SleetchWebpackPlugin', async () => {
      if (!runtime.sources.loaded()) {
        await runtime.sources.load();
        await runtime.builder.build();
      }
      if (compiler.options.mode === 'development' && !runtime.sources.loaded()) {
        await runtime.sources.watch();
      }
    });
  }
}
