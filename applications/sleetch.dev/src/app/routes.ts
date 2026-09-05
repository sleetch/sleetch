import path from 'node:path';
import { better_routing } from 'better-fs-routes';

const routes = better_routing({
	routes: {
		directory: path.join(process.cwd(), '/src/app/routes'),
		extensions: ['.js', '.jsx', '.ts', '.tsx'], // '.md', '.mdx'
		naming: {
			index: '_index',
			layout: '_layout',
			param: {
				prefix: '$',
			},
			optional: {
				start: '(',
				end: ')',
			},
			escape: {
				start: '[',
				end: ']',
			},
		},
	},
});

export default routes;
