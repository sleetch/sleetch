import { get_sitemap } from '@sleetch/server';

export const loader = async () => {
  const sitemap = await get_sitemap(({ path, language }) => new URL('/' + language + '/' + 'documentation' + path, 'https://sleetch.dev').toString());
  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};
