import type { Config } from '@react-router/dev/config';
import { get_static_paths } from '@sleetch/server';

export default {
  appDirectory: './src/app',
  ssr: true,
  prerender: {
    paths: async (args) => {
      const _static = args.getStaticPaths();
      const { paths: en } = await get_static_paths(({ path, language }) => `/${language}/documentation${path}`, 'en');
      const { paths: fr } = await get_static_paths(({ path, language }) => `/${language}/documentation${path}`, 'fr');
      return [..._static, ...en, ...fr];
    },
    concurrency: 10,
  },
} satisfies Config;
