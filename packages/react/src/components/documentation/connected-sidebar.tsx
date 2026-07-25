import type { BaseHTMLAttributes, ReactNode } from 'react';
import { DocumentationSidebar } from './sidebar';
import { useDocumentationLayout } from './layout';
import type { tree_object } from 'packages/core/dist/compiler';

export interface ConnectedDocumentationSidebarProps extends BaseHTMLAttributes<HTMLBaseElement> {
  tree: tree_object[];
  currentPath?: string;
  hrefBuilder?: (path: string) => string;
  iconResolver?: (icon?: string) => ReactNode;
}

export function ConnectedDocumentationSidebar(props: ConnectedDocumentationSidebarProps) {
  const { isSidebarOpen, closeSidebar } = useDocumentationLayout();

  return <DocumentationSidebar isOpen={isSidebarOpen} onClose={closeSidebar} {...props} />;
}
