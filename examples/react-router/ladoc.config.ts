import type { partial_ladoc_configuration } from '@ladoc/core/configuration';

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
} satisfies partial_ladoc_configuration;
