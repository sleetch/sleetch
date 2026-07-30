import { get_rss } from '@ladoc/server';

export const loader = async () => {
  const rss = await get_rss({
    site: 'https://ladoc.net',
    title: 'My Documentation',
    description: 'Documentation updates',
    transformer: ({ path }) => new URL('/documentation' + path, 'https://ladoc.net').toString(),
  });
  return new Response(rss, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
