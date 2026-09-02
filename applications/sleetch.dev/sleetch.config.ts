import type { sleetch_configuration } from '@sleetch/server';

export default {
	languages: {
		default: 'en',
	},
	sources: [{ type: 'file-system', path: './src/documentation' }],
	markdown: {
		engine: 'marked',
		plugins: {
			syntax_highlighting: true,
			latex: true,
			mermaid: true,
		},
	},
} satisfies sleetch_configuration;
