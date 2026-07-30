import type { ladoc_configuration } from '@ladoc/server';

export default {
  languages: {
    default: 'en',
  },
  sources: [
    { type: 'file-system', path: './src/assets/content/default' },
    { type: 'file-system', path: './src/assets/content/french', language: 'fr' },
  ],
  markdown: {
    engine: 'marked',
    plugins: {
      syntax_highlighting: true,
      latex: true,
      mermaid: true,
    },
  },
} satisfies ladoc_configuration;
