import { get_page } from '@sleetch/server';
import { notFound } from 'next/navigation';
import ClientPage from '@/components/client/documentation-page';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const server_page = await get_page(slug ? slug.join('/') : '/');
  if (!server_page) {
    return notFound();
  }
  return <ClientPage language={server_page.language} path={server_page.path} />;
}
