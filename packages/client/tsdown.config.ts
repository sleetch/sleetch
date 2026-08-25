import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: {
    customExports: {
      './markdown.css': {
        default: './src/styles/markdown.css',
      },
      './base.css': {
        default: './src/styles/base.css',
      },
      './manifest.js': './.sleetch/manifest.js',
      './trees/*.js': './.sleetch/trees/*.js',
      './markdown-modules/*.js': './.sleetch/pages/*.js',
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
