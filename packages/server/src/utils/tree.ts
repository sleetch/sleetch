import { type manifest_module, resolve_language, to_flat_tree, type tree_module } from '@sleetch/core/compiler';
import type { path_transformer } from '@sleetch/core/configuration';

export const get_tree = async (_language?: string) => {
    const language = resolve_language(_language);
    const { default: manifest }: manifest_module = await import('@sleetch/client/manifest.js');
    const { default: tree }: tree_module = await manifest[language].tree();
    return { tree, language };
};

export const get_static_paths = async <T>(transformer: path_transformer<T>, _language?: string) => {
    const { tree, language } = await get_tree(_language);
    const paths = to_flat_tree(tree).map((page) => transformer({ language, path: page.path }));
    return { paths, language };
};

export const get_languages = async () => {
    const { default: manifest }: manifest_module = await import('@sleetch/client/manifest.js');
    return manifest.languages;
};
