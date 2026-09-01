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
import { get_page, get_tree } from '@sleetch/server';
import { Suspense } from 'react';
import { data } from 'react-router';
import type { Route } from './+types/$';

export function meta({ loaderData: data }: Route.MetaArgs) {
	if (data) {
		return [{ title: data.page.seo.title }, { name: 'description', content: data.page.seo.description }];
	}
	return [];
}

export async function loader({ params }: Route.LoaderArgs) {
	const page = await get_page(`/${params['*']}`);
	if (!page) throw data(null, { status: 404 });
	const tree = await get_tree();
	return { page, tree };
}

export default function Page({
	loaderData: {
		page: { language, path },
		tree: { tree },
	},
}: Route.ComponentProps) {
	const page = manifest[language].markdown_modules[path]();
	return (
		<>
			<DocumentationSidebarContent>
				<Suspense fallback={<p>Loading.</p>}>
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
					<PageNavigation hrefBuilder={(href) => `/documentation${href}`} tree={tree} currentPath={path} />
				</Suspense>
			</DocumentationSidebarContent>
			<Suspense fallback={<p>Loading.</p>}>
				<DocumentationToc page={page} />
			</Suspense>
		</>
	);
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
