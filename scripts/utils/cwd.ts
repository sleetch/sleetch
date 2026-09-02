import path from 'node:path';
import { Glob } from 'bun';
import { root } from './constants';

export const packages_to_cwd = new Map<string, string>();

for await (const file of new Glob('**/package.json').scan({ cwd: root })) {
	if (file === 'package.json') continue;
	const pkg = await Bun.file(path.join(root, file)).json();
	if (pkg.name) {
		packages_to_cwd.set(pkg.name, path.dirname(path.join(root, file)));
	}
}
