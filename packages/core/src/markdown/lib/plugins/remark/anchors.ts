import type { Heading } from 'mdast';
import { toString as mdast_to_string } from 'mdast-util-to-string';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { parse_header_content } from '@/markdown/lib/toc';

export const remark_anchors_plugin: Plugin = () => {
	return (tree) => {
		visit(tree, 'heading', (node: Heading) => {
			const text = ` ${mdast_to_string(node)}`;
			const data = parse_header_content(text);
			if (data) {
				node.data ??= {};
				node.data.hProperties = {
					...node.data.hProperties,
					id: data.id,
				};
			}
		});
	};
};
