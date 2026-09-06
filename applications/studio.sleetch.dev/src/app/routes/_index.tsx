import { Spinner } from '@sleetch/react';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export function meta() {
	return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Home() {
	return (
		<main className="max-w-337.5 w-full mx-auto fl-px-5/10 relative">
			<div className="absolute right-0">
				<ThemeToggle />
			</div>
			<section className="flex-1 h-full min-h-screen grid place-items-center">
				<div className='flex items-center gap-2'>
					<Spinner size='medium' />
				</div>
			</section>
		</main>
	);
}
