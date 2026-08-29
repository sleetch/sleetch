import { get_rss } from '@sleetch/server';

export const loader = async () => {
    const rss = await get_rss({
        site: 'https://sleetch.dev',
        title: 'My Documentation',
        description: 'Documentation updates',
        transformer: ({ path, language }) => new URL(`/${language}/documentation${path}`, 'https://sleetch.dev').toString(),
    });
    return new Response(rss, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
