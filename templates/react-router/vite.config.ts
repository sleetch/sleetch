import { reactRouter } from '@react-router/dev/vite';
import sleetchPlugin from '@sleetch/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), reactRouter(), sleetchPlugin()],
	publicDir: 'src/assets/public',
	resolve: {
		tsconfigPaths: true,
	},
	ssr: {
		noExternal: ['@sleetch/react']
	}
});
