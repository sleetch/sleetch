import { resolve_language, type tree_module, type manifest_module } from '@ladoc/core/compiler';

export const get_tree = async (_language?: string) => {
  const language = await resolve_language(_language);
  const { default: manifest }: manifest_module = await import('@ladoc/cache/generated/manifest.js'!);
  const { default: tree }: tree_module = await manifest[language]['tree']();
  return { tree, language };
};
