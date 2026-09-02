import { compile } from '@mdx-js/mdx';
import type { PluggableList } from 'unified';
import { get_configuration } from '@/configuration';
import { remark_anchors_plugin } from '@/markdown/lib/plugins/remark/anchors';
import { remark_gfm_plugin } from '@/markdown/lib/plugins/remark/gfm';
import type { parser } from '@/markdown/types/engine';

export const mdx_js: parser = async (content: string) => {
	const remarkPlugins: PluggableList = [[remark_anchors_plugin], [remark_gfm_plugin]];
	const rehypePlugins: PluggableList = [];
	const configuration = get_configuration();
	if (configuration.markdown.plugins.mermaid) {
		const { rehype_mermaid_plugin } = await import('@/markdown/lib/plugins/rehype/mermaid');
		rehypePlugins.push([rehype_mermaid_plugin]);
	}
	if (configuration.markdown.plugins.syntax_highlighting) {
		const { rehype_shiki_plugin } = await import('@/markdown/lib/plugins/rehype/shiki');
		rehypePlugins.push([rehype_shiki_plugin]);
	}
	if (configuration.markdown.plugins.latex) {
		const { remark_math_plugin } = await import('@/markdown/lib/plugins/remark/math');
		const { rehype_katex_plugin } = await import('@/markdown/lib/plugins/rehype/katex');
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
