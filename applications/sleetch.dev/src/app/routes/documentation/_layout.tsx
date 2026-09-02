import { DocumentationContent, DocumentationHeader, DocumentationLayout, DocumentationProvider, DocumentationSidebar } from '@sleetch/react';
import { get_tree } from '@sleetch/server';
import { Outlet } from 'react-router';
import type { Route } from './+types/_layout';

export const loader = async () => {
	return await get_tree();
};

export default function Layout({ loaderData: { tree, language } }: Route.ComponentProps) {
	return (
		<DocumentationProvider tree={tree} language={language} path_transformer={({ path }) => `/documentation${path}`}>
			<DocumentationLayout>
				<DocumentationHeader />
				<DocumentationContent>
					<DocumentationSidebar />
					<Outlet />
				</DocumentationContent>
			</DocumentationLayout>
		</DocumentationProvider>
	);
}
