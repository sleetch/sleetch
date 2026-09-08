import { Spinner } from '@sleetch/react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { LoadingPage } from '@/shared/components/loading-page';

export function meta() {
	return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Home() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fake_loading = setTimeout(() => setLoading(false), 3000)
		return () => clearTimeout(fake_loading)
	}, []);

	if (loading) return <LoadingPage />

	return (
		<main className="max-w-337.5 w-full mx-auto fl-px-5/10 relative">
			<div className="absolute right-0">
				<ThemeToggle />
			</div>
			<section className="flex-1 h-full min-h-screen grid place-items-center">
				Welcome to studio
			</section>
		</main>
	);
}
