import { resolve_language, type manifest_module } from '@ladoc/core/compiler';

export const get_page = async (_path: string, _language?: string) => {
  const language = await resolve_language(_language);
  const { default: manifest }: manifest_module = await import('@ladoc/cache/generated/manifest.js'!);
  for (const path of Object.keys(manifest[language]['markdown_modules'])) {
    if (path == _path) {
      return { language, path };
    }
  }
};
