import { get_sitemap } from '@ladoc/server';

export const loader = async () => {
  const sitemap = await get_sitemap(({ path }) => 'https://ladoc.net' + '/documentation' + path);
  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};
