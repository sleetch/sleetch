import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: {
    customExports: {
      './markdown.css': {
        default: './src/styles/markdown.css',
      },
      './manifest.js': './.ladoc/manifest.js',
      './trees/*.js': './.ladoc/trees/*.js',
      './markdown-modules/*.js': './.ladoc/markdown-modules/*.js',
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
