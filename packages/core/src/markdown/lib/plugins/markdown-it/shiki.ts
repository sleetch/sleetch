import { shiki_theme } from '../../../utils/shiki/theme';

import type { BundledLanguage } from 'shiki/bundle/web';
import type { MarkdownItAsync } from 'markdown-it-async';

export const markdown_it_shiki_plugin = async (md: MarkdownItAsync) => {
  const { shiki_transformers } = await import('../../../utils/shiki/transformers');
  const { codeToHtml } = await import('shiki');
  md.options.highlight = async (code, lang, attrs) => {
    if (code.endsWith('\n')) code = code.slice(0, -1);
    const html = await codeToHtml(code, {
      lang: (lang || 'text') as BundledLanguage,
      theme: shiki_theme,
      transformers: [
        {
          name: '@shikijs/markdown-it:block-class',
          code(node) {
            node.properties.class = `language-${lang}`;
          },
        },
        ...shiki_transformers,
      ],
      meta: {
        __raw: attrs,
      },
    });
    return html;
  };
};
