import type { parser } from '@/markdown/types/engine';
import { compile } from '@mdx-js/mdx';
import { remark_anchors_plugin } from '@/markdown/lib/plugins/remark/anchors';
import { rehype_mermaid_plugin } from '@/markdown/lib/plugins/rehype/mermaid';
import { rehype_shiki_plugin } from '@/markdown/lib/plugins/rehype/shiki';
import { remark_gfm_plugin } from '@/markdown/lib/plugins/remark/gfm';
import { remark_math_plugin } from '@/markdown/lib/plugins/remark/math';
import { rehype_katex_plugin } from '@/markdown/lib/plugins/rehype/katex';
import { get_configuration } from '@/configuration';
import type { PluggableList } from 'unified';

export const mdx_js: parser = async (content: string) => {
  const remarkPlugins: PluggableList = [[remark_anchors_plugin], [remark_gfm_plugin]];
  const rehypePlugins: PluggableList = [];
  const configuration = get_configuration();
  if (configuration.markdown.plugins.mermaid) rehypePlugins.push([rehype_mermaid_plugin]);
  if (configuration.markdown.plugins.syntax_highlighting) rehypePlugins.push([rehype_shiki_plugin]);
  if (configuration.markdown.plugins.latex) {
    remarkPlugins.push([remark_math_plugin]);
    rehypePlugins.push([rehype_katex_plugin]);
  }
  const compiled = await compile(content, {
    outputFormat: 'function-body',
    remarkPlugins,
    rehypePlugins,
  });
  return { type: 'module', code: String(compiled) };
};
