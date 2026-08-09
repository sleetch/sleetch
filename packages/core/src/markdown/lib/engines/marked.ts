import type { parser } from '@/markdown/types/engine';
import { Marked } from 'marked';
import { marked_anchors_plugin } from '@/markdown/lib/plugins/marked/anchors';
import { get_configuration } from '@/configuration';

export const marked: parser = async (content: string) => {
  const configuration = get_configuration();
  const _marked = new Marked(marked_anchors_plugin);
  if (configuration.markdown.plugins.mermaid) {
    const { marked_mermaid_plugin } = await import('@/markdown/lib/plugins/marked/mermaid');
    _marked.use(marked_mermaid_plugin);
  }
  if (configuration.markdown.plugins.syntax_highlighting) {
    const { marked_shiki_plugin } = await import('@/markdown/lib/plugins/marked/shiki');
    _marked.use(marked_shiki_plugin);
  }
  if (configuration.markdown.plugins.latex) {
    const { marked_katex_plugin } = await import('@/markdown/lib/plugins/marked/katex');
    _marked.use(marked_katex_plugin);
  }
  return { type: 'html', html: await _marked.parse(content) };
};
