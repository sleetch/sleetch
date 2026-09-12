import { Button, Spinner } from '@sleetch/react';
import { Gauge, Menu, Notebook, RotateCcw } from 'lucide-react';
import { data, Link } from 'react-router';
import Logo from '@/assets/images/branding/logo.svg?react';
import { Overview } from '@/features/studio/components/tabs/overview';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { ErrorPage } from '@/shared/components/error-page';
import { LoadingPage } from '@/shared/components/loading-page';
import { useClient } from '@/shared/hooks/use-client';
import { useClientStore } from '@/shared/stores/client';
import type { Route } from './+types/$';

export const loader = ({ params }: Route.LoaderArgs) => {
	if ([undefined, ''].includes(params['*'])) {
		throw data(null, { status: 404 });
	}
};

export default function Page({ params }: Route.ComponentProps) {
	const client = useClient(params['*']);
	const state = useClientStore();

	return (
		<main className="w-full h-screen flex">
			<aside className="hover:[--sidebar-content:bg-red-500] h-full min-w-70">
				<header className="flex justify-between items-center gap-2 w-full py-3 pl-3 ">
					<Link to={'https://sleetch.dev'} className="flex items-center gap-2">
						<Logo className="size-8  " />
						<h1 className="font-brand font-bold  text-2xl">Sleetch</h1>
					</Link>
					<Button variant="ghost" className="p-1! m-0">
						<Menu className="size-5" />
					</Button>
				</header>
				<div className="p-3 flex-1 w-full space-y-2">
					<Button variant={state.tab === "overview" ? "secondary" : "ghost"} className="w-full py-2! gap-2 justify-between!" onClick={() => state.set_tab('overview')}>
						<Gauge className="size-5" /> Overview{' '}
					</Button>
					<Button variant={state.tab === "pages" ? "secondary" : "ghost"} className="w-full py-2! gap-2 justify-between!" onClick={() => state.set_tab('pages')}>
						<Notebook className="size-5" /> Pages{' '}
					</Button>
				</div>
			</aside>
			<div id="sidebar-content" className="w-full flex flex-col">
				<header className="flex items-center justify-end gap-2 w-full px-3 pt-3 ">
					<ThemeToggle />
					<Button
						className="p-2!"
						onClick={() => {
							state.reset();
							client.send({ id: 'get-languages', data: {} });
							client.send({ id: 'get-trees', data: {} });
							client.send({ id: 'get-sources', data: undefined });
						}}
						disabled={state.loading}
					>
						{state.loading ? <Spinner /> : <RotateCcw className=" text-muted-foreground size-5" />}
					</Button>
				</header>
				<div className="p-3 size-full min-h-0">
					<div className="rounded-xl bg-card border size-full overflow-auto p-6">
						{(() => {
							if (state.loading) return <LoadingPage height="full" />;
							if (state.tab === 'overview') return <Overview />;
							return <ErrorPage height='full' message='Oops.' details='This section is still in construction !' />;
						})()}
					</div>
				</div>
			</div>
		</main>
	);
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
