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
} from '@ladoc/react';
import { get_page, get_tree } from '@ladoc/server';
import manifest from '@ladoc/client/manifest.js';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  console.log(slug);
  const p = await get_page('/' + slug.join('/'));
  if (!p) {
    console.log('Not found');
    return notFound();
  }
  const tree = await get_tree();
  const page = manifest[p.language]['markdown_modules'][p.path]();

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
          <PageNavigation
            //hrefBuilder={(href) => '/' + language + '/documentation' + href}
            tree={tree.tree}
            currentPath={p.path}
          />
        </Suspense>
      </DocumentationSidebarContent>
      <Suspense fallback={<p>Loading.</p>}>
        <DocumentationToc page={page} />
      </Suspense>
    </>
  );
}
