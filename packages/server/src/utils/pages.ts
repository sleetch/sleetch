import { resolve_language, type manifest_module } from '@ladoc/core/compiler';

export const get_page = async (_path: string, _language?: string) => {
  if (_path.length > 1 && _path.slice(-1) == '/') _path = _path.slice(0, -1);
  const language = resolve_language(_language);
  const { default: manifest }: manifest_module = await import('@ladoc/cache/manifest.js'!);
  for (const path of Object.keys(manifest[language]['markdown_modules'])) {
    if (path == _path) {
      const { default: page } = await manifest[language]['markdown_modules'][path]();
      return { language, path, seo: { title: page.frontmatter.title, description: page.frontmatter.description } };
    }
  }
};
