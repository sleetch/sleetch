import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: {
    customExports: {
      './markdown.css': {
        default: './src/styles/markdown.css',
      },
    },
  },
  entry: ['src/**/*.ts'],
  fixedExtension: false,
  format: 'esm',
  clean: true,
  dts: {
    sourcemap: false,
  },
});
