import { ConnectedDocumentationSidebar, DocumentationContent } from '@sleetch/react';
import { get_tree } from '@sleetch/server';
import { Outlet } from 'react-router';
import type { Route } from './+types/_layout';
//import { iconResolver } from '@/shared/utils/icons';

export const loader = async ({ params }: Route.LoaderArgs) => {
  return await get_tree(params.locale);
};

export default function Layout({ params, loaderData: { tree, language } }: Route.ComponentProps) {
  return (
    <DocumentationContent>
      <ConnectedDocumentationSidebar
        tree={tree}
        hrefBuilder={(href) => '/' + language + '/' + 'documentation' + href}
        currentPath={'/' + params['*']}
        //iconResolver={iconResolver}
      />
      <Outlet />
    </DocumentationContent>
  );
}
