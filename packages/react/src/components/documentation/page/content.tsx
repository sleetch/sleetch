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
export function PageContent({ page, components }: { page: page_module["default"]; components?: MDXComponents }) {

	if (page.parsed.type === 'html') {
		return (
			<div className="sleetch-markdown">
				<div dangerouslySetInnerHTML={{ __html: page.parsed.html }} />
			</div>
		);
	}

	const { default: Content } = use(getCompiledMDX(page.parsed.code));

	return (
		<div className="sleetch-markdown">
			<Content components={components} />
		</div>
	);
}
