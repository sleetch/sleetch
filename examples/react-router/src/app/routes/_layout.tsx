import { DocumentationLayout, ConnectedDocumentationHeader } from '@sleetch/react';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <DocumentationLayout>
      <ConnectedDocumentationHeader />
      <Outlet />
    </DocumentationLayout>
  );
}
