import { ConnectedDocumentationSidebar, DocumentationContent } from '@sleetch/react';
import { get_tree } from '@sleetch/server';

export default async function DocumentationLayout({ children }: { children: React.ReactNode }) {
  const { tree } = await get_tree();

  return (
    <DocumentationContent>
      <ConnectedDocumentationSidebar
        tree={tree}
        // hrefBuilder={(href) => "/documentation" + href}
        // currentPath ?
      />

      {children}
    </DocumentationContent>
  );
}
