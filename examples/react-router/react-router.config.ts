import type { Config } from '@react-router/dev/config';
//import { get_static_paths } from '@ladoc/server';

export default {
  appDirectory: './src/app',
  ssr: true,
  /*  prerender: {
    paths: async (args) => {
      console.log(args.getStaticPaths());
      const ladoc_paths = await get_static_paths();
      const documentation = ladoc_paths.map((page) => '/' + 'documentation' + page.path);
      return [...documentation];
    },
    concurrency: 10,
  },*/
} satisfies Config;
