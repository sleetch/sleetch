import path from 'node:path';
import type { sleetch_router } from '../router';

export const generate_manifest = (router: sleetch_router) => {
	const languages = router.get_languages();
	const language_manifests = [];
	for (const language of languages) {
		const pages = router.get_flat_tree(language);

		language_manifests.push(`
          "${language}" : {
          'tree': () => import('${path.join('@sleetch/client/trees', language)}'),

          'pages':{

          ${pages
				.map((page) => `        "${page.path}": () => import('${path.join('@sleetch/client/pages', language, page.path == "/" ? "index" : page.path)}')`)
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
        import type { manifest_module } from '@sleetch/core/compiler';
        declare const manifest: manifest_module['default'];
        export default manifest;
      `,
	};
};











// ?v=${build_id}
