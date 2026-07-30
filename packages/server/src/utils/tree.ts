import type { path_builder } from '@/types/builder';
import { to_flat_tree } from '@ladoc/core/compiler';
import { resolve_language, type tree_module, type manifest_module } from '@ladoc/core/compiler';

export const get_tree = async (_language?: string) => {
  const language = resolve_language(_language);
  const { default: manifest }: manifest_module = await import('@ladoc/cache/manifest.js'!);
  const { default: tree }: tree_module = await manifest[language]['tree']();
  return { tree, language };
};

export const get_static_paths = async (path_builder: path_builder, _language?: string) => {
  const { tree, language } = await get_tree(_language);
  const paths = to_flat_tree(tree).map((page) => path_builder({ language, path: page.path }));
  return { paths, language };
};

export const get_languages = async () => {
  const { default: manifest }: manifest_module = await import('@ladoc/cache/manifest.js'!);
  return manifest.languages;
};
