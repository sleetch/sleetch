import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: {},
  entry: ['src/**/*.ts'],
  fixedExtension: false,
  format: 'esm',
  clean: true,
  dts: {
    sourcemap: false,
  },
});
