export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { get_page } from '@sleetch/server';
import { notFound } from 'next/navigation';
import ClientPage from '@/components/client/documentation-page';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;
	const server_page = await get_page(slug ? slug.join('/') : '/');
	if (!server_page) {
		return notFound();
	}
	const { default: manifest } = await import('@sleetch/client/manifest');
	const page_loader = manifest[server_page.language].pages[server_page.path];
	const { default: page } = await page_loader();
	return <ClientPage page={page} path={server_page.path} />;
}
