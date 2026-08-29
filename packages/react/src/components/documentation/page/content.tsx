import { use } from 'react';
import '@sleetch/styles/markdown.css';
import '@sleetch/styles/katex.css';
import { run } from '@mdx-js/mdx';
import type { page_module } from '@sleetch/core/compiler';
import type { MDXComponents } from 'mdx/types';
import * as runtime from 'react/jsx-runtime';

const mdxCache = new Map<string, ReturnType<typeof compileMDX>>();

function compileMDX(code: string) {
  return run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });
}

function getCompiledMDX(code: string) {
  let promise = mdxCache.get(code);

  if (!promise) {
    promise = compileMDX(code);
    mdxCache.set(code, promise);
  }

  return promise;
}
export function PageContent({ page, components }: { page: Promise<page_module>; components?: MDXComponents }) {
  const value = use(page);

  if (value.default.parsed.type == 'html') {
    return (
      <div className="sleetch-markdown">
        <div dangerouslySetInnerHTML={{ __html: value.default.parsed.html }} />
      </div>
    );
  }

  const { default: Content } = use(getCompiledMDX(value.default.parsed.code));

  return (
    <div className="sleetch-markdown">
      <Content components={components} />
    </div>
  );
}
