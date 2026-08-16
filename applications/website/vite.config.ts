import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import reactSVG from 'vite-react-svg';
import sleetch from '@sleetch/vite';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), sleetch(), reactSVG({})],
  publicDir: 'src/assets/public',
  resolve: {
    tsconfigPaths: true,
  },
});
