import { DocumentationSidebar, DocumentationContent } from '@sleetch/react';
import { Outlet } from 'react-router';
import type { Route } from './+types/_layout';

export default function Layout({ params }: Route.ComponentProps) {
  return (
    <DocumentationContent>
      <DocumentationSidebar />
      <Outlet />
    </DocumentationContent>
  );
}
