import type { path_transformer } from '@sleetch/core/configuration';
import { get_pages } from './pages';
import { get_languages } from './tree';

export async function get_llms(transformer: path_transformer<string>) {
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
