import { data } from 'react-router';
import type { Route } from './+types/$';
import { Suspense } from 'react';
import { Button, DocumentationSidebarContent, DocumentationToc, PageContent, PageHeader, PageNavigation } from '@ladoc/react';
import { get_page, get_tree } from '@ladoc/server';
import manifest from '@ladoc/cache/manifest.js';

export function meta({ params, loaderData: data }: Route.MetaArgs) {
  if (data) {
    return [{ title: data.page.seo.title }, { name: 'description', content: data.page.seo.description }];
  }
  return [];
}

export async function loader({ params }: Route.LoaderArgs) {
  const page = await get_page('/' + params['*'], params.locale);
  if (!page) throw data(null, { status: 404 });
  const tree = await get_tree(params.locale);
  return { page, tree };
}

export default function Page({
  loaderData: {
    page: { language, path },
    tree: { tree },
  },
}: Route.ComponentProps) {
  const page = manifest[language]['markdown_modules'][path]();
  return (
    <>
      <DocumentationSidebarContent>
        <Suspense fallback={<p>Loading.</p>}>
          <PageHeader page={page} />
          <PageContent
            page={page}
            components={{
              Button,
            }}
          />
          <PageNavigation hrefBuilder={(href) => '/' + language + '/documentation' + href} tree={tree} currentPath={path} />
        </Suspense>
      </DocumentationSidebarContent>
      <Suspense fallback={<p>Loading.</p>}>
        <DocumentationToc page={page} />
      </Suspense>
    </>
  );
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
