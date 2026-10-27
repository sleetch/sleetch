import { reactRouter } from '@react-router/dev/vite';
import sleetch from '@sleetch/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import reactSVG from 'vite-react-svg';

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    sleetch(),
    reactSVG({}),
    {
      name: 'forward-to-trailing-slash',
      configureServer: (server) => {
        server.middlewares.use((req, res, next) => {
          if (!req.url) {
            return next();
          }

          const requestURL = new URL(req.url, `http://${req.headers.host}`);
          if (/^\/(?:[^@]+\/)*[^@./]+$/g.test(requestURL.pathname)) {
            requestURL.pathname += '/';
            req.url = requestURL.toString();
          }

          return next();
        });
      },
    },
  ],
  publicDir: 'src/assets/public',
  resolve: {
    tsconfigPaths: true,
  },
});
