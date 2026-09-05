import { DocumentationContent, DocumentationSidebar } from '@sleetch/react';
import { Outlet } from 'react-router';
import { CustomDocumentationHeader } from '@/features/documentation/components/header';

export default function Layout() {
	return (
		<>
			<CustomDocumentationHeader />
			<DocumentationContent>
				<DocumentationSidebar />
				<Outlet />
			</DocumentationContent>
		</>
	);
}
