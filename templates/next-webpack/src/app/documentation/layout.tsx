import { DocumentationContent, DocumentationSidebar } from '@sleetch/react';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentationContent>
      <DocumentationSidebar />
      {children}
    </DocumentationContent>
  );
}
