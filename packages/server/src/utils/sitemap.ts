import type { path_transformer } from '@sleetch/core/configuration';
import { get_languages, get_static_paths } from './tree';

export async function get_sitemap(path_builder: path_transformer) {
  const languages = await get_languages();
  const urls: string[] = [];
  for (const language of languages) {
    const { paths } = await get_static_paths(path_builder, language);
    for (const path of paths) {
      urls.push(
        `<url>
            <loc>${path}</loc>
          </url>`
      );
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n   ')}
  </urlset>`;
}
