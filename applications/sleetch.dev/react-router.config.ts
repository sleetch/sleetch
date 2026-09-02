import type { Config } from '@react-router/dev/config';
import { get_static_paths } from '@sleetch/server';

export default {
    appDirectory: './src/app',
    ssr: true,
    prerender: {
        paths: async (args) => {
            const _static = args.getStaticPaths();
            const { paths } = await get_static_paths(({ path }) => `/documentation${path}`);
            return [..._static, ...paths];
        },
        concurrency: 10,
    },
} satisfies Config;
