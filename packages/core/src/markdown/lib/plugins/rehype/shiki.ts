import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import type { Plugin } from 'unified';
import type { Root, Element } from 'hast';
import type { BundledLanguage } from 'shiki/bundle/web';
import { shiki_theme } from '../../../utils/shiki/theme';
export const rehype_shiki_plugin: Plugin<[], Root> = () => {
  return async (tree) => {
    const { shiki_transformers } = await import('../../../utils/shiki/transformers');
    const { codeToHast } = await import('shiki');

    const targets: { pre: Element; code: Element }[] = [];

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre') return;
      const code = node.children.find((c): c is Element => c.type === 'element' && c.tagName === 'code');
      if (code) targets.push({ pre: node, code });
    });

    await Promise.all(
      targets.map(async ({ pre, code }) => {
        const class_name = (code.properties?.className as string[] | undefined)?.join(' ') ?? '';
        const lang = (class_name.match(/language-(\S+)/)?.[1] || 'text') as BundledLanguage;
        let raw = toString(code);
        const meta = (code.data as any)?.meta ?? '';
        if (raw.endsWith('\n')) raw = raw.slice(0, -1);
        const hast_root = await codeToHast(raw, {
          lang,
          theme: shiki_theme,
          transformers: shiki_transformers,
          meta: { __raw: meta },
        });

        const shiki_pre = hast_root.children[0] as Element;
        Object.assign(pre, shiki_pre);
      })
    );
  };
};
