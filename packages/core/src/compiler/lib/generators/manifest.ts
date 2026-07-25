import { get_configuration } from '@/configuration';
import type { ladoc_router } from '../router';
import { get_root_dir } from '@/shared';
import path from 'path';

export const generate_manifest = async (router: ladoc_router) => {
  const languages = router.get_languages();
  return {
    js: `export default {
    ${(
      await Promise.all(
        languages.map(async (language) => {
          const pages = router.get_flat_tree(language);
          return `
          "${language}" : {
          'tree': () => import('${path.join('@ladoc/cache/generated/trees', language + '.js')}'),

          'markdown_modules':{

          ${pages
            .filter((page) => page.type == 'page')
            .map(
              (page) =>
                `        "${page.path}": () => import('${path.join('@ladoc/cache/generated/markdown-modules', language, page.path + (page.index ? '/_index' : '') + '.js')}')`
            )
            .join(',\n')}
                }
          }
        `;
        })
      )
    ).join(',\n')}
    };`,
    dts: `
        import type { manifest_module } from '@/compiler/types/routing';

        declare const manifest: manifest_module['default'];
        export default manifest;
      `,
  };
};
