import { redirect } from 'react-router';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import type { Route } from './+types/_index';

export function meta() {
	return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export const loader = ({ url }: Route.LoaderArgs) => {
	const token = url.searchParams.get('token');
	if (token) return redirect(`/token/${token}`);
};

export default function Home() {
	return (
		<main className="max-w-337.5 w-full mx-auto fl-px-5/10 relative">
			<div className="absolute right-0">
				<ThemeToggle />
			</div>
			<section className="flex-1 h-full min-h-screen flex items-center justify-center flex-col gap-3">Welcome to the studio</section>
		</main>
	);
}
