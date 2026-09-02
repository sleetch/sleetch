import type { MarkedExtension } from 'marked';
import { get_mermaid_svg } from '@/markdown/utils/mermaid';

export const marked_mermaid_plugin: MarkedExtension = {
	renderer: {
		code({ text, lang }) {
			const [language] = lang?.split(' ') ?? [];
			if (language === 'mermaid') {
				return get_mermaid_svg(text);
			}
			return false;
		},
	},
};
