import { getDocumentationTree } from '@/actions/tree';
import { ConnectedDocumentationSidebar, DocumentationContent } from '@sleetch/react';

export default async function DocumentationLayout({ children }: { children: React.ReactNode }) {
  const tree = await getDocumentationTree();

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
