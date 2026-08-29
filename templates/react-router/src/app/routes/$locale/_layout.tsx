import { DocumentationContent, DocumentationSidebar } from '@sleetch/react';
import { Outlet } from 'react-router';

export default function Layout() {
    return (
        <DocumentationContent>
            <DocumentationSidebar />
            <Outlet />
        </DocumentationContent>
    );
}
