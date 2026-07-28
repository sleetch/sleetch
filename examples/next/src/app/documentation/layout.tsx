import {
  ConnectedDocumentationSidebar,
  DocumentationTocContent,
} from "@ladoc/react";

export default async function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { get_tree } = await import("@ladoc/server");
  const { tree } = await get_tree();

  return (
    <DocumentationTocContent>
      <ConnectedDocumentationSidebar
        tree={tree}
        hrefBuilder={(href) => "/documentation" + href}
        // currentPath ?
      />

      {children}
    </DocumentationTocContent>
  );
}
