import manifest from '@sleetch/client/manifest';
import {
	Button,
	DocumentationSidebarContent,
	DocumentationToc,
	File,
	FileSystem,
	Folder,
	PageContent,
	PageHeader,
	PageLoader,
	PageNavigation,
} from '@sleetch/react';
import { get_page } from '@sleetch/server';
import { Suspense } from 'react';
import { data } from 'react-router';

import type { Route } from './+types/$';

export function meta({ loaderData: data }: Route.MetaArgs) {
	// if (data) return [{ title: data.page.frontmatter.title }, { name: 'description', content: data.page.frontmatter.description }];
}

export async function loader({ params }: Route.LoaderArgs) {
	const page_data = await get_page(`/${params['*']}`, params.locale);
	console.log(`/${params['*']}`, page_data);
	if (!page_data) throw data(null, { status: 404 });
	return { page_data };
}

export default function Page({
	loaderData: {
		page_data: { language, path },
	},
}: Route.ComponentProps) {
	const page_promise = manifest[language]["pages"][path]()
	return (
		<>
			<DocumentationSidebarContent>
				<Suspense fallback={<p>Loading.</p>}>

					<PageLoader page={page_promise}>
						{(page) => <>
							<PageHeader page={page} />

							<PageContent
								page={page}
								components={{
									Button,
									FileSystem,
									File,
									Folder,
								}}
							/>
						</>}
					</PageLoader>

					<PageNavigation />
				</Suspense>
			</DocumentationSidebarContent>
			<Suspense fallback={<p>Loading.</p>}>
				<PageLoader page={page_promise}>
					{(page) => <DocumentationToc page={page} />}
				</PageLoader>
			</Suspense>
		</>
	);
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
