import manifest from '@sleetch/client/manifest';
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
} from '@sleetch/react';
import { get_page, get_tree } from '@sleetch/server';
import { data } from 'react-router';
import { Book } from '@/features/storybook/book';
import type { Route } from './+types/$';

export function meta({ loaderData: data }: Route.MetaArgs) {
  if (data) {
    return [
      { title: data.page.frontmatter.title },
      { name: 'description', content: data.page.frontmatter.description },
      { property: 'twitter:title', content: data.page.frontmatter.title },
      { property: 'og:title', content: data.page.frontmatter.title },
      { property: 'og:description', content: data.page.frontmatter.description },
      { property: 'twitter:description', content: data.page.frontmatter.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:image', content: data.open_graph },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'twitter:card', content: 'summary_large_image' },
    ];
  }
  return [];
}

export async function loader({ params }: Route.LoaderArgs) {
  const path = `/${params['*'] ?? ''}`;
  const page_data = await get_page(path);
  if (!page_data) throw data(null, { status: 404 });
  const tree = await get_tree();
  const { default: page } = await manifest[page_data.language].pages[page_data.path]();
  return { page, tree, open_graph: `https://sleetch.dev/documentation/open-graph${page_data.path}.png` };
}

export default function Page({ loaderData: { page } }: Route.ComponentProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: page.frontmatter.title,
            description: page.frontmatter.description,
          }).replace(/</g, '\\u003c'),
        }}
      />
      <DocumentationSidebarContent>
        <PageHeader page={page} />
        <PageContent
          baseUrl={'http://localhost:5173/'}
          page={page}
          components={{
            Button,
            FileSystem,
            File,
            Folder,
            Book,
          }}
        />
        <PageNavigation />
      </DocumentationSidebarContent>
      <DocumentationToc page={page} />
    </>
  );
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
