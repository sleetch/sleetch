// ClientPage.tsx
'use client';

import manifest from '@sleetch/client/manifest.js';
import {
    Button,
    DocumentationSidebarContent,
    DocumentationToc,
    File,
    FileSystem,
    Folder,
    PageContent,
    PageHeader,
    PageNavigation,
    useDocumentationContext,
} from '@sleetch/react';
import { Suspense, useEffect } from 'react';

export default function ClientPage({ language, path }: { language: string; path: string }) {
    const page = manifest[language].pages[path]();
    const { set_current_path } = useDocumentationContext();
    useEffect(() => {
        set_current_path(path);
    }, [path, set_current_path]);
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
