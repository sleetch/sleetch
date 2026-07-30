import type { Compiler } from 'webpack';
import { ladoc_runtime } from '@ladoc/core/compiler';

const runtime = new ladoc_runtime();

export class ladoc_webpack_plugin {
  constructor() {}

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tapPromise('LadocWebpackPlugin', async () => {
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
