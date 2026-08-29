import { defineConfig } from 'tsdown';

export default defineConfig({
    exports: {
        legacy: true,
        bin: {
            sleetch: 'src/bin/index.ts',
        },
    },
    entry: ['src/**/index.ts'],
    deps: {
        neverBundle: [/^@sleetch\/cache(\/.*)?$/],
    },
    fixedExtension: false,
    format: 'esm',
    clean: true,
    dts: {
        sourcemap: false,
    },
});
