import type { Config } from '@react-router/dev/config';
import { get_static_paths } from '@ladoc/server';

export default {
  appDirectory: './src/app',
  ssr: true,
  prerender: {
    paths: async (args) => {
      const { paths } = await get_static_paths(({ path }) => '/' + 'documentation' + path);
      console.log(args.getStaticPaths(), paths);
      return [...paths];
    },
    concurrency: 10,
  },
} satisfies Config;
