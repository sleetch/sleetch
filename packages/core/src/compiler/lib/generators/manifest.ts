import type { ladoc_router } from '../router';
import path from 'path';

export const generate_manifest = (router: ladoc_router) => {
  const languages = router.get_languages();

  const language_manifests = [];

  for (const language of languages) {
    const pages = router.get_flat_tree(language);

    language_manifests.push(`
          "${language}" : {
          'tree': () => import('${path.join('@ladoc/cache/trees', language + '.js')}'),

          'markdown_modules':{

          ${pages
            .filter((page) => page.type == 'page')
            .map(
              (page) =>
                `        "${page.path}": () => import('${path.join(
                  '@ladoc/cache/markdown-modules',
                  language,
                  page.path + (page.index ? '/_index' : '') + '.js'
                )}')`
            )
            .join(',\n')}
                }
          }
        `);
  }

  return {
    '.js': `export default {
    'languages': ${JSON.stringify(languages)},
    ${language_manifests.join(',\n')}
    };`,
    '.d.ts': `
        import type { manifest_module } from '@/compiler/types/routing';

        declare const manifest: manifest_module['default'];
        export default manifest;
      `,
  };
};
