import { DocumentationContent, DocumentationSidebar } from '@sleetch/react';
import { Outlet } from 'react-router';
import { CustomDocumentationHeader } from '@/features/documentation/components/header';

export default function Layout() {
	const Poop = <Outlet />

	return (
		<>
			<CustomDocumentationHeader />
			<DocumentationContent>
				<DocumentationSidebar />
				{Poop == null ? "NULL" : Poop}
			</DocumentationContent>
		</>
	);
}
