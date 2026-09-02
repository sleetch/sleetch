import type MarkdownIt from 'markdown-it';
import { get_mermaid_svg } from '@/markdown/utils/mermaid';

export function markdown_it_mermaid_plugin(md: MarkdownIt) {
	const defaultFenceRenderer = md.renderer.rules.fence;

	md.renderer.rules.fence = (tokens, idx, options, env, self) => {
		const token = tokens[idx];
		const info = token.info ? token.info.trim() : '';

		const [language] = info.split(/\s+/);

		if (language === 'mermaid') {
			return get_mermaid_svg(token.content);
		}

		if (defaultFenceRenderer) {
			return defaultFenceRenderer(tokens, idx, options, env, self);
		}

		return self.renderToken(tokens, idx, options);
	};
}
