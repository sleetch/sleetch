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
	PageNavigation,
} from '@sleetch/react';
import { get_page } from '@sleetch/server';
import { data } from 'react-router';

import type { Route } from './+types/$';

export function meta({ loaderData: data }: Route.MetaArgs) {
	if (data) return [{ title: data.page.frontmatter.title }, { name: 'description', content: data.page.frontmatter.description }];
}

export async function loader({ params }: Route.LoaderArgs) {
	const page_data = await get_page(`/${params['*']}`, params.locale);
	console.log(`/${params['*']}`, page_data);
	if (!page_data) throw data(null, { status: 404 });
	const { default: page } = await manifest[page_data.language]['pages'][page_data.path]();
	return { page_data, page };
}

export default function Page({ loaderData: { page } }: Route.ComponentProps) {
	return (
		<>
			<DocumentationSidebarContent>
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

				<PageNavigation />
			</DocumentationSidebarContent>
			<DocumentationToc page={page} />
		</>
	);
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
