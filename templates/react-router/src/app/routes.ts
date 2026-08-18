import { better_routing } from 'better-fs-routes';
import path from 'path';

export default better_routing({
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
