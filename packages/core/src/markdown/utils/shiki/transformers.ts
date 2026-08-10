import type { ShikiTransformer, ShikiTransformerContext } from 'shiki';
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';

import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers';

export function transformerTitle(): ShikiTransformer {
  return {
    name: 'sleetch:title',
    pre(node) {
      const raw = this.options.meta?.__raw;
      const match = raw?.match(/title=["']([^"']+)["']/);
      if (!match) return;
      this.addClassToHast(node, 'has-title');
      node.children.unshift({
        type: 'element',
        tagName: 'div',
        properties: { class: 'code-title' },
        children: [{ type: 'text', value: match[1] }],
      });
    },
  };
}

export function transformerLineNumbers(): ShikiTransformer {
  return {
    name: 'sleetch:line-numbers',
    pre(node) {
      const raw = this.options.meta?.__raw;
      if (!raw?.match(/(?:^|\s)lineNumbers(?:\s|$)/)) return;

      this.addClassToHast(node, 'line-numbers');
    },
  };
}

function parseRangeString(rangeStr: string): number[] {
  const result: number[] = [];
  for (const part of rangeStr.split(',')) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) result.push(i);
    } else {
      result.push(Number(part));
    }
  }
  return result;
}

export function transformerMetaDiff(): ShikiTransformer {
  return {
    name: 'sleetch:meta-diff',
    line(node, line) {
      const raw = this.options.meta?.__raw;
      if (!raw) return;
      const insMatch = raw.match(/ins=["']?([\d,-]+)["']?/);
      const delMatch = raw.match(/del=["']?([\d,-]+)["']?/);
      if (insMatch && parseRangeString(insMatch[1]).includes(line)) {
        this.addClassToHast(node, ['diff', 'add']);
      }
      if (delMatch && parseRangeString(delMatch[1]).includes(line)) {
        this.addClassToHast(node, ['diff', 'remove']);
      }
    },
  };
}

const renderer = rendererRich();

export const shiki_transformers = [
  transformerTwoslash({
    explicitTrigger: true,
    renderer,
  }),
  transformerTitle(), // title="src/index.ts"
  transformerLineNumbers(),
  transformerMetaHighlight(), // {1,3}
  transformerMetaWordHighlight(), // /pattern/
  transformerMetaDiff(), // ins={3} del={1}
  transformerNotationDiff(), // [!code ++] / [!code --]
  transformerNotationHighlight(), // [!code highlight]
  transformerNotationWordHighlight(), // [!code word:xxx]
  transformerNotationFocus(), // [!code focus]
  transformerNotationErrorLevel(), // [!code error] / [!code warning]
];
