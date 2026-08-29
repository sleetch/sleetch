import type { path_transformer } from '@sleetch/core/configuration';
import { get_pages } from './pages';
import { get_languages } from './tree';

function escapeXml(value: string) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function get_rss({
    site,
    title,
    description,
    transformer,
}: {
    site: string;
    title: string;
    description: string;
    transformer: path_transformer<string>;
}) {
    const languages = await get_languages();
    const items: string[] = [];
    for (const language of languages) {
        const { pages } = await get_pages(language);

        for (const page of pages) {
            const url = transformer({
                language,
                path: page.path,
            });
            items.push(`
    <item>
      <title>${escapeXml(page.seo.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(page.seo.description)}</description>
      <language>${language}</language>
    </item>`);
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${site}</link>
    <description>${escapeXml(description)}</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items.join('\n')}
  </channel>
</rss>`;
}
