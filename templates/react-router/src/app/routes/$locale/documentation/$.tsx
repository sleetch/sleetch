import { data } from 'react-router';
import type { Route } from './+types/$';
import { Suspense } from 'react';
import {
  Button,
  FileSystem,
  File,
  Folder,
  DocumentationSidebarContent,
  DocumentationToc,
  PageContent,
  PageHeader,
  PageNavigation,
  useDocumentationContext,
} from '@sleetch/react';
import { get_page } from '@sleetch/server';
import manifest from '@sleetch/client/manifest.js';

export function meta({ params, loaderData: data }: Route.MetaArgs) {
  if (data) return [{ title: data.page.seo.title }, { name: 'description', content: data.page.seo.description }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const page = await get_page('/' + params['*'], params.locale);
  console.log('/' + params['*'], page);
  if (!page) throw data(null, { status: 404 });
  return { page };
}

export default function Page({
  loaderData: {
    page: { language, path },
  },
}: Route.ComponentProps) {
  const { set_current_path } = useDocumentationContext();
  set_current_path(path);
  const page = manifest[language]['pages'][path]();
  return (
    <>
      <DocumentationSidebarContent>
        <Suspense fallback={<p>Loading.</p>}>
          <PageHeader page={page} />
          <PageContent
            page={page}
            components={{
              Button,
              FileSystem,
              File,
              Folder,
            }}
          />
          <PageNavigation />
        </Suspense>
      </DocumentationSidebarContent>
      <Suspense fallback={<p>Loading.</p>}>
        <DocumentationToc page={page} />
      </Suspense>
    </>
  );
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
