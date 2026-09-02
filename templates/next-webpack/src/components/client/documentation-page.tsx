// ClientPage.tsx
'use client';

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
	useDocumentationContext,
} from '@sleetch/react';
import { Suspense, useEffect } from 'react';
import type { page_module } from '../../../../../packages/core/dist/compiler/types/modules';

export default function ClientPage({ path, page }: { page: page_module['default']; path: string }) {
	const { set_current_path } = useDocumentationContext();
	useEffect(() => {
		set_current_path(path);
	}, [path, set_current_path]);
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
				</Suspense>

				<PageNavigation />
			</DocumentationSidebarContent>

			<Suspense fallback={<p>Loading.</p>}>
				<DocumentationToc page={page} />
			</Suspense>
		</>
	);
}
