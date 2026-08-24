import { get_page } from '@sleetch/server';
import { notFound } from 'next/navigation';
import ClientPage from '@/components/documentation-page';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  console.log(slug);
  const server_page = await get_page('/' + slug.join('/'));
  console.log(server_page);

  if (!server_page) {
    return notFound();
  }
  return <ClientPage language={server_page.language} path={server_page.path} />;
}
