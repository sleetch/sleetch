import type { transformer } from '@/types/builder';
import { get_page, get_pages } from './pages';
import { get_languages, get_static_paths } from './tree';

export async function get_llms(transformer: transformer<string>) {
  const languages = await get_languages();
  let txt = '';
  for (const language of languages) {
    txt += `\n## Documentation : language=${language}\n\n`;
    const { pages } = await get_pages(language);
    for (const page of pages) {
      txt += `- [${page.seo.title}](${transformer({ language, path: page.path })}) : ${page.seo.description}\n`;
    }
  }
  return txt;
}
