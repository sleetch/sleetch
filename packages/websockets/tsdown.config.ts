import { defineConfig } from 'tsdown';

export default defineConfig({
	exports: {
		legacy: true,
	},
	entry: ['src/client.ts', 'src/server.ts', 'src/index.ts'],
	fixedExtension: false,
	format: 'esm',
	clean: true,
	dts: {
		sourcemap: false,
	},
});
