import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { AntiFlickeringScript, ThemeProvider } from '@/features/theme/components/provider';
import type { Route } from './+types/root';
import '@/assets/styles/global.css';

export const links: Route.LinksFunction = () => [
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<AntiFlickeringScript />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
