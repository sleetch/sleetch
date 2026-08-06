import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: {
    legacy: true,
  },
  entry: ['src/**/index.ts'],
  deps: {
    neverBundle: [/^@ladoc\/cache(\/.*)?$/],
  },
  fixedExtension: false,
  format: 'esm',
  clean: true,
  dts: {
    sourcemap: false,
  },
});
