import path from 'node:path';
import type { sleetch_router } from '../router';

export const generate_manifest = (router: sleetch_router) => {
	const languages = router.get_languages();

	const get_manifests = (cache_bust: boolean) => {
		const language_manifests = [];
		for (const language of languages) {
			const pages = router.get_flat_tree(language);

			language_manifests.push(`
          "${language}" : {
          'tree': () => import('${path.join('@sleetch/client/trees', language)}${cache_bust ? `?version=${Date.now()}` : ""}'),

          'pages':{

          ${pages
					.map(
						(page) =>
							`        "${page.path}": () => import('${path.join('@sleetch/client/pages', language, page.path === '/' ? 'index' : page.path)}${cache_bust ? `?version=${Date.now()}` : ""}')`,
					)
					.join(',\n')}
                }
          }
        `);
		}
		return language_manifests
	}

	return {
		'.js': `export default {
    'languages': ${JSON.stringify(languages)},
    ${get_manifests(false).join(',\n')}
    };`,
		'-esm-cache-bust.js': `export default {
      'languages': ${JSON.stringify(languages)},
      ${get_manifests(true).join(',\n')}
      };`,
		'.d.ts': `
        import type { manifest_module } from '@sleetch/core/compiler';
        declare const manifest: manifest_module['default'];
        export default manifest;
      `,
	};
};

// ?v=${build_id}
