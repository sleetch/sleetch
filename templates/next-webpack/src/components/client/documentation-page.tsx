// ClientPage.tsx
'use client';

import { Suspense, useEffect } from 'react';
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

import manifest from '@sleetch/client/manifest.js';

export default function ClientPage({ language, path }: { language: string; path: string }) {
  const page = manifest[language]['pages'][path]();
  const { set_current_path } = useDocumentationContext();
  useEffect(() => {
    set_current_path(path);
  }, [path]);
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
