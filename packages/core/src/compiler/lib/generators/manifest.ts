import type { sleetch_router } from "../router";

const to_file = (page_path: string) =>
	page_path.replace(/^\/+|\/+$/g, "") || "index";

export const generate_manifest = (router: sleetch_router) => {
	const languages = router.get_languages();
	const languages_json = JSON.stringify(languages);

	const _import = (relative_path: string, fresh: boolean) =>
		fresh
			? `import(/* @vite-ignore */ \`./${relative_path}.js?fresh=\${v}\`)`
			: `import("./${relative_path}.js")`;

	const body = (fresh: boolean) =>
		languages
			.map((language) => {
				const pages = router
					.get_flat_tree(language)
					.map(
						(page) =>
							`      ${JSON.stringify(page.path)}: () => ${_import(`pages/${language}/${to_file(page.path)}`, fresh)}`,
					)
					.join(",\n");

				return `  ${JSON.stringify(language)}: {
    tree: () => ${_import(`trees/${language}`, fresh)},
    pages: {
${pages}
    },
  }`;
			})
			.join(",\n");

	return {
		".js": `export default {\n  languages: ${languages_json},\n${body(false)}\n};\n`,
		".d.ts": `import type { manifest_module } from '@sleetch/core/compiler';
	declare const manifest: manifest_module['default'];
	export default manifest;
	`,
		"-esm-cache-bust.js": `export const create_manifest = (v) => ({\n  languages: ${languages_json},\n${body(true)}\n});\nexport default create_manifest("0");\n`,
		"-esm-cache-bust.d.ts": `import type { manifest_module } from '@sleetch/core/compiler';
export declare const create_manifest: (version: string) => manifest_module['default'];
declare const manifest: manifest_module['default'];
export default manifest;
`,
	};
};
