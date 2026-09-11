import type { manifest_module } from '@sleetch/core/compiler';

export const isBareESM =
	typeof module === 'undefined' &&
	typeof import.meta !== 'undefined' &&
	typeof process !== 'undefined' &&
	(!import.meta.env || (!import.meta.env.DEV && !import.meta.env.PROD));


const dynamic_import = new Function(
	'specifier',
	'return import(specifier)'
) as (specifier: string) => Promise<any>;

export const get_manifest = async () => {
	if (isBareESM) {
		const { default: manifest }: manifest_module =
			await dynamic_import(
				`@sleetch/client/manifest-cache-bust?t=${Date.now()}`
			);

		return manifest;
	}

	const { default: manifest }: manifest_module =
		await import('@sleetch/client/manifest');

	return manifest;
};
