import type { Config } from '@react-router/dev/config';
import { get_static_paths } from '@sleetch/server';

export default {
  appDirectory: './src/app',
  ssr: true,
  prerender: {
    paths: async (args) => {
      const _static = ['/llms.txt', '/rss.xml', '/sitemap.xml', '/'];
      const { paths } = await get_static_paths(({ path }) => `/documentation${path}`);
      const { paths: open_graph_paths } = await get_static_paths(({ path }) => `/documentation/open-graph${path}.png`);
      return [..._static, ...paths, ...open_graph_paths];
    },
    concurrency: 10,
  },
} satisfies Config;
