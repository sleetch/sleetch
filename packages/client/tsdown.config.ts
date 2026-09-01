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
			'./manifest': './.sleetch/manifest.js',
			'./trees/*': './.sleetch/trees/*.js',
			'./pages/*': './.sleetch/pages/*.js',
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
