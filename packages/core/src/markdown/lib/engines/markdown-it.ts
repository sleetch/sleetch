import MarkdownItAsync from 'markdown-it-async';
import { get_configuration } from '@/configuration';
import { markdown_it_anchors_plugin } from '@/markdown/lib/plugins/markdown-it/anchors';
import type { parser } from '@/markdown/types/engine';

export const markdown_it: parser = async (content: string) => {
	const configuration = get_configuration();
	const _markdown_it = MarkdownItAsync({ html: true }).use(markdown_it_anchors_plugin);
	if (configuration.markdown.plugins.mermaid) {
		const { markdown_it_mermaid_plugin } = await import('@/markdown/lib/plugins/markdown-it/mermaid');
		_markdown_it.use(markdown_it_mermaid_plugin);
	}
	if (configuration.markdown.plugins.syntax_highlighting) {
		const { markdown_it_shiki_plugin } = await import('@/markdown/lib/plugins/markdown-it/shiki');
		_markdown_it.use(markdown_it_shiki_plugin);
	}
	if (configuration.markdown.plugins.latex) {
		const { markdown_it_katex_plugin } = await import('@/markdown/lib/plugins/markdown-it/katex');
		_markdown_it.use(markdown_it_katex_plugin);
	}
	return { type: 'html', html: await _markdown_it.renderAsync(content) };
};
