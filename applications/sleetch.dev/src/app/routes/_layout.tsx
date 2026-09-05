import { DocumentationLayout, DocumentationProvider } from '@sleetch/react';
import { get_tree } from '@sleetch/server';
import { Outlet } from 'react-router';
import type { Route } from './+types/_layout';

export function meta() {
	return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export const loader = async () => {
	return await get_tree();
};

export default function Layout(data: Route.ComponentProps) {
	return (
		<DocumentationProvider
			current_path={'/' + data.params['*']}
			tree={data.loaderData.tree}
			language={data.loaderData.language}
			path_transformer={({ path }) => `/documentation${path}`}
		>
			<DocumentationLayout>
				<Outlet />
			</DocumentationLayout>
		</DocumentationProvider>
	);
}

// <NoiseOverlay size={250} opacity={1} />;
