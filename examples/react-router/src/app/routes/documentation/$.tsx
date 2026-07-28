import { data } from 'react-router';
import type { Route } from './+types/$';
import { Suspense } from 'react';
import { Button, DocumentationSidebarContent, DocumentationToc, PageContent, PageHeader } from '@ladoc/react';
import { get_page } from '@ladoc/server';
import manifest from '@ladoc/cache/generated/manifest.js';

export function meta({ params, loaderData }: Route.MetaArgs) {
  if (loaderData) {
    return [{ title: loaderData.language }, { name: 'description', content: 'This is a React Router website.' }];
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const page = await get_page('/' + params['*']);
  if (!page) throw data(null, { status: 404 });
  return page;
}

export default function Page({ params, loaderData: { language, path } }: Route.ComponentProps) {
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
        </Suspense>
      </DocumentationSidebarContent>
      <Suspense fallback={<p>Loading.</p>}>
        <DocumentationToc page={page} />
      </Suspense>
    </>
  );
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
