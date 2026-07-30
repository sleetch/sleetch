import { to_flat_tree } from '@ladoc/core/compiler';
import { resolve_language, type tree_module, type manifest_module } from '@ladoc/core/compiler';

export const get_tree = async (_language?: string) => {
  const language = resolve_language(_language);
  const { default: manifest }: manifest_module = await import('@ladoc/cache/manifest.js'!);
  const { default: tree }: tree_module = await manifest[language]['tree']();
  return { tree, language };
};

export const get_static_paths = async (_language?: string) => {
  const { tree, language } = await get_tree(_language);
  const paths = to_flat_tree(tree).map((page) => page.path);
  return { paths, language };
};
