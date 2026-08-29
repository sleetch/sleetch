import type { MarkedExtension } from 'marked';
import type { BundledLanguage } from 'shiki';
import { shiki_theme } from '../../../utils/shiki/theme';

export const marked_shiki_plugin: MarkedExtension = {
  async: true,
  async walkTokens(token) {
    const { shiki_transformers } = await import('../../../utils/shiki/transformers');
    const { codeToHtml } = await import('shiki');

    if (token.type !== 'code') return undefined;
    const [lang = 'text', ...props] = token.lang?.split(' ') ?? [];
    if (lang === 'mermaid') return undefined;
    const { text } = token;
    const html = await codeToHtml(text, {
      lang: (lang || 'text') as BundledLanguage,
      theme: shiki_theme,
      transformers: shiki_transformers,
      meta: {
        __raw: props.join(' '),
      },
    });
    Object.assign(token, {
      type: 'html',
      block: true,
      text: `${html}\n`,
    });
  },
};
