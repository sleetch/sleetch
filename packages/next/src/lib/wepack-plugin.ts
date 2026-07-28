import type { Compiler } from 'webpack';

import { ladoc_builder, ladoc_router, ladoc_watcher } from '@ladoc/core/compiler';

export class ladoc_webpack_plugin {
  private static watcher?: ladoc_watcher;
  private static builder?: ladoc_builder;

  constructor(private router: ladoc_router) {}

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tapPromise('LadocWebpackPlugin', async () => {
      if (!ladoc_webpack_plugin.builder) {
        ladoc_webpack_plugin.builder = new ladoc_builder(this.router);
        await ladoc_webpack_plugin.builder.build();
      }
      if (compiler.options.mode === 'development' && !ladoc_webpack_plugin.watcher) {
        const watcher = new ladoc_watcher();
        ladoc_webpack_plugin.watcher = watcher;
        ladoc_webpack_plugin.builder.listen(watcher);
      }
    });
  }
}
