import { DocumentationHeader, DocumentationLayout, DocumentationProvider } from '@sleetch/react';
import { get_tree } from '@sleetch/server';
import { Outlet } from 'react-router';
import type { Route } from './+types/_layout';

export async function loader({ params }: Route.LoaderArgs) {
  return await get_tree(params.locale);
}

export default function Layout({ params, loaderData: { tree, language } }: Route.ComponentProps) {
  return (
    <DocumentationProvider
      tree={tree}
      language={language}
      path_transformer={({ language, path }) => '/' + language + '/documentation' + path}
      current_path={'/' + params['*']}
    >
      <DocumentationLayout>
        <DocumentationHeader />
        <Outlet />
      </DocumentationLayout>
    </DocumentationProvider>
  );
}
