import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Config } from '@react-router/dev/config';
import { get_static_paths } from '@sleetch/server';

async function flatten(dir: string) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    await flatten(full);
    const indexFile = path.join(full, 'index.html');
    const exists = await fs.access(indexFile).then(
      () => true,
      () => false
    );
    if (!exists) continue;
    await fs.rename(indexFile, `${full}.html`);
    if ((await fs.readdir(full)).length === 0) await fs.rmdir(full);
  }
}

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
  async buildEnd({ reactRouterConfig }) {
    await flatten(path.join(reactRouterConfig.buildDirectory, 'client'));
  },
} satisfies Config;
