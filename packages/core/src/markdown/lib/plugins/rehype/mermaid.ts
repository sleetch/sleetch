import type { Element, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { toString as hast_to_string } from 'hast-util-to-string';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { get_mermaid_svg } from '@/markdown/utils/mermaid';

export const rehype_mermaid_plugin: Plugin<[], Root> = () => {
    return async (tree) => {
        const targets: { pre: Element; code: Element }[] = [];

        visit(tree, 'element', (node: Element) => {
            if (node.tagName !== 'pre') return;
            const code = node.children.find((c): c is Element => c.type === 'element' && c.tagName === 'code');
            if (!code) return;
            const className = (code.properties?.className as string[] | undefined)?.join(' ') ?? '';
            if (className.includes('language-mermaid')) {
                targets.push({ pre: node, code });
            }
        });

        await Promise.all(
            targets.map(async ({ pre, code }) => {
                const svg = get_mermaid_svg(hast_to_string(code));
                const hast = fromHtml(svg, { fragment: true });
                if (hast.children.length === 1 && hast.children[0].type === 'element') {
                    Object.assign(pre, hast.children[0]);
                }
            })
        );
    };
};
