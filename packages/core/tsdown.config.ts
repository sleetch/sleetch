import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: {
    legacy: true,
  },
  publint: true,
  entry: ['src/**/index.ts', '!src/**/lib/**/index.ts'],
  unbundle: true,
  fixedExtension: false,
  format: ['esm'],
  clean: true,
  dts: {
    sourcemap: false,
  },
});
