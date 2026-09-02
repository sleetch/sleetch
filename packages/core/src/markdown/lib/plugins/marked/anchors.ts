import type { MarkedExtension } from 'marked';
import { parse_header_content } from '@/markdown/lib/toc';

export const marked_anchors_plugin: MarkedExtension = {
	renderer: {
		heading({ tokens, depth, text }) {
			const data = parse_header_content(text);
			if (data) {
				return `<h${depth} id="${data.id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
			}
			return false;
		},
	},
};
