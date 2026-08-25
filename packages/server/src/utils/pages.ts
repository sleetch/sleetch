import { resolve_language, type manifest_module } from '@sleetch/core/compiler';
import { get_static_paths } from './tree';

export const get_page = async (_path: string, _language?: string) => {
  if (_path.length == 0) _path = '/';
  else if (!_path.startsWith('/', 0)) _path = '/' + _path;
  if (_path.length > 1 && _path.slice(-1) == '/') _path = _path.slice(0, -1);

  const language = resolve_language(_language);
  const { default: manifest }: manifest_module = await import('@sleetch/client/manifest.js'!);
  for (const path of Object.keys(manifest[language]['pages'])) {
    if (path == _path) {
      const { default: page } = await manifest[language]['pages'][path]();
      return { language, path, seo: { title: page.frontmatter.title, description: page.frontmatter.description } };
    }
  }
};

export const get_pages = async (_language?: string) => {
  const { language, paths } = await get_static_paths(async ({ path, language }) => await get_page(path, language), _language);
  const pages = (await Promise.all(paths)).filter((x) => x != undefined);
  return { language, pages };
};
