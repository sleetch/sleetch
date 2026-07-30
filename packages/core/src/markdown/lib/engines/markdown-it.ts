import type { parser } from '@/markdown/types/engine';
import MarkdownItAsync from 'markdown-it-async';
import { markdown_it_anchors_plugin } from '@/markdown/lib/plugins/markdown-it/anchors';
import { markdown_it_shiki_plugin } from '@/markdown/lib/plugins/markdown-it/shiki';
import { markdown_it_mermaid_plugin } from '@/markdown/lib/plugins/markdown-it/mermaid';
import { markdown_it_katex_plugin } from '../plugins/markdown-it/katex';
import { get_configuration } from '@/configuration';

export const markdown_it: parser = async (content: string) => {
  const configuration = get_configuration();
  const _markdown_it = MarkdownItAsync({ html: true }).use(markdown_it_anchors_plugin);
  if (configuration.markdown.plugins.mermaid) _markdown_it.use(markdown_it_mermaid_plugin);
  if (configuration.markdown.plugins.syntax_highlighting) _markdown_it.use(markdown_it_shiki_plugin);
  if (configuration.markdown.plugins.latex) _markdown_it.use(markdown_it_katex_plugin);
  return { type: 'html', html: await _markdown_it.renderAsync(content) };
};
