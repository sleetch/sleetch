import { ConnectedDocumentationSidebar, DocumentationContent } from '@ladoc/react';
import { get_tree } from '@ladoc/server';
import { Outlet } from 'react-router';
import type { Route } from './+types/_layout';
import { iconResolver } from '@/shared/utils/icons';

export const loader = async ({}: Route.LoaderArgs) => {
  const { tree } = await get_tree();
  return { tree };
};

export default function Layout({ params, loaderData: { tree } }: Route.ComponentProps) {
  return (
    <DocumentationContent>
      <ConnectedDocumentationSidebar
        tree={tree}
        hrefBuilder={(href) => '/documentation' + href}
        currentPath={'/' + params['*']}
        iconResolver={iconResolver}
      />
      <Outlet />
    </DocumentationContent>
  );
}
