import { use } from 'react';
import '@sleetch/styles/markdown.css';
import '@sleetch/styles/katex.css';
import { run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import type { MDXComponents } from 'mdx/types';
import type { markdown_module } from '@sleetch/core/compiler';

function compileMDX(code: string) {
  return run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });
}

export function PageContent({ page, components }: { page: Promise<markdown_module>; components?: MDXComponents }) {
  const value = use(page);

  if (value.default.parsed.type == 'html') {
    return (
      <div className="sleetch-markdown">
        <div dangerouslySetInnerHTML={{ __html: value.default.parsed.html }} />
      </div>
    );
  }

  const compiled = use(compileMDX(value.default.parsed.code));
  const Content = compiled.default;

  return (
    <div className="sleetch-markdown">
      <Content components={components} />
    </div>
  );
}
