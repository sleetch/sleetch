import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import '@/assets/styles/global.css';
import { ThemeProvider } from '@/theme/lib';
import { AntiFlickeringScript } from '@/theme/lib/theme-provider';
import { ThemeToggle } from '@/theme/components/theme-toggle';

export const links: Route.LinksFunction = () => [
  // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <AntiFlickeringScript />
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
