import type { path_builder } from '@/types/builder';
import { get_page } from './pages';
import { get_languages, get_static_paths } from './tree';

export async function get_llms(path_builder: path_builder<string>) {
  const languages = await get_languages();
  let txt = '';
  for (const language of languages) {
    txt += `\n## Documentation : language=${language}\n\n`;
    const { paths } = await get_static_paths((x) => x, language);
    for (const path of paths) {
      const page = await get_page(path.path, language);
      if (page) {
        txt += `- [${page.seo.title}](${path_builder(path)}):${page.seo.description}\n`;
      }
    }
  }
  return txt;
}
