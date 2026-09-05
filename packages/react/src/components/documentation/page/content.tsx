import { use } from 'react';
import '@sleetch/styles/markdown.css';
import '@sleetch/styles/katex.css';
import { run } from '@mdx-js/mdx';
import type { page_module } from '@sleetch/core/compiler';
import type { MDXComponents } from 'mdx/types';
import * as runtime from 'react/jsx-runtime';

const mdxCache = new Map<string, ReturnType<typeof compileMDX>>();

function compileMDX(code: string, baseUrl: string) {
	return run(code, {
		...runtime,
		baseUrl
	});
}

function getCompiledMDX(code: string, baseUrl: string) {
	let promise = mdxCache.get(code);

	if (!promise) {
		promise = compileMDX(code, baseUrl);
		mdxCache.set(code, promise);
	}

	return promise;
}
export function PageContent({ page, components, baseUrl }: { page: page_module['default']; components?: MDXComponents, baseUrl: string }) {
	if (page.parsed.type === 'html') {
		return (
			<div className="sleetch-markdown">
				<div dangerouslySetInnerHTML={{ __html: page.parsed.html }} />
			</div>
		);
	}

	const { default: Content } = use(getCompiledMDX(page.parsed.code, baseUrl));

	return (
		<div className="sleetch-markdown">
			<Content baseUrl={baseUrl} components={components} />
		</div>
	);
}
