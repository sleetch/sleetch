// ClientPage.tsx
'use client';

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
} from '@sleetch/react';

import manifest from '@sleetch/client/manifest.js';

export default function ClientPage({ language, path }: { language: string; path: string }) {
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
              FileSystem,
              File,
              Folder,
            }}
          />
        </Suspense>

        <PageNavigation />
      </DocumentationSidebarContent>

      <Suspense fallback={<p>Loading.</p>}>
        <DocumentationToc page={page} />
      </Suspense>
    </>
  );
}
