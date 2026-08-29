import { extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [react(), libInjectCss(), dts()],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'sleetch',
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      external: ['react', 'react-dom', /^react\/.*/, /^react-dom\/.*/],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: ['src/**/*.d.ts'],
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('src', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        // preserveModules: true,
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].[format].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    cssCodeSplit: true,
  },
});
