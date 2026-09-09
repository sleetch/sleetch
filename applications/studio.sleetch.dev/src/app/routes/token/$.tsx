import { Button } from '@sleetch/react';
import { data } from 'react-router';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { useClient } from '@/shared/hooks/use-client';
import { useClientStore } from '@/shared/stores/client';
import type { Route } from './+types/$';

export const loader = ({ params }: Route.LoaderArgs) => {
	if ([undefined, ""].includes(params["*"])) {
		throw data(null, { status: 404 })
	}
}

export default function Page({ params }: Route.ComponentProps) {
	const client = useClient(params["*"]);
	const state = useClientStore();

	return (
		<main className="max-w-337.5 w-full mx-auto fl-px-5/10 relative">
			<div className="absolute right-0">
				<ThemeToggle />
			</div>
			<section className="flex-1 h-full min-h-screen flex items-center justify-center flex-col gap-3">
				Welcome to studio
				{ }
				<p>{JSON.stringify(state, null, 2)}</p>
				<Button
					onClick={() => {
						client.send({ id: 'get-languages', data: {} });
						client.send({ id: 'get-trees', data: {} });
					}}
				>
					Refresh{' '}
				</Button>
			</section>
		</main>
	);
}

export { ErrorBoundary } from '@/shared/components/error-boundary';
