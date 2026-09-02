import type { MarkdownItAsync } from 'markdown-it-async';
import { parse_header_content } from '@/markdown/lib/toc';

export function markdown_it_anchors_plugin(md: MarkdownItAsync) {
	const defaultRender = md.renderer.rules.heading_open ?? ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
	md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
		const inlineToken = tokens[idx + 1];
		if (inlineToken?.type === 'inline') {
			const text = inlineToken.content;
			const data = parse_header_content(text);
			if (data) {
				tokens[idx].attrSet('id', data.id);
			}
		}
		return defaultRender(tokens, idx, options, env, self);
	};
}
