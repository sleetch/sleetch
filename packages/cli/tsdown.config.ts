import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: {
    legacy: true,
    bin: {
      ladoc: 'src/bin/index.ts',
    },
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
