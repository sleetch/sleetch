import type { parser } from '@/markdown/types/engine';
import { Marked } from 'marked';
import { marked_anchors_plugin } from '@/markdown/lib/plugins/marked/anchors';
import { marked_shiki_plugin } from '@/markdown/lib/plugins/marked/shiki';
import { marked_mermaid_plugin } from '@/markdown/lib/plugins/marked/mermaid';
import { marked_katex_plugin } from '../plugins/marked/katex';
import { get_configuration } from '@/configuration';

export const marked: parser = async (content: string) => {
  const configuration = get_configuration();
  const _marked = new Marked(marked_anchors_plugin);
  if (configuration.markdown.plugins.mermaid) _marked.use(marked_mermaid_plugin);
  if (configuration.markdown.plugins.syntax_highlighting) _marked.use(marked_shiki_plugin);
  if (configuration.markdown.plugins.latex) _marked.use(marked_katex_plugin);
  return { type: 'html', html: await _marked.parse(content) };
};
