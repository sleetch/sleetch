import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	prerender: {
		paths: async (args) => {
			const _static = args.getStaticPaths();
			return [..._static];
		},
		concurrency: 10,
	},
} satisfies Config;
