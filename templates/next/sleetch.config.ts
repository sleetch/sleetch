import type { sleetch_configuration } from '@sleetch/server';

export default {
  languages: {
    default: 'en',
  },
  sources: [
    { type: 'file-system', path: './src/content/default' },
    { type: 'file-system', path: './src/content/french', language: 'fr' },
  ],
  markdown: {
    engine: 'marked',
    plugins: {
      syntax_highlighting: true,
      latex: true,
      mermaid: true,
    },
  },
} satisfies sleetch_configuration;
