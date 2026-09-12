import { Button } from '@sleetch/react';
import { ExternalLink } from 'lucide-react';
import { redirect } from 'react-router';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import type { Route } from './+types/_index';

export const loader = ({ url }: Route.LoaderArgs) => {
	const token = url.searchParams.get('token');
	if (token) return redirect(`/token/${token}`);
};

export default function Home() {

	return (
		<>
			<div className="absolute inset-0 h-full w-full
		bg-[radial-gradient(circle,#73737350_1px,transparent_1px)]
		bg-[size:30px_30px]" />
			<main className="max-w-337.5 w-full mx-auto fl-px-5/10 relative">

				<div className="absolute right-0">
					<ThemeToggle />
				</div>
				<section className="flex-1 h-full min-h-screen flex items-center justify-center flex-col gap-3">

					<div className='flex flex-col gap-2 items-start'>
						<h1 className="font-brand text-4xl">Enter  the <em>studio</em>.</h1>
						<h1 className="font-brand text-xl">1. Open a terminal.</h1>
						<div className='flex gap-2'>
							<h1 className="font-brand text-xl">2. Run </h1>
							<div className='bg-card px-2 py-1 rounded-sm'>
								<p className='font-mono  '> <span className='text-primary/90'>bunx</span> <span className='text-blue-400'>sleetch@latest studio</span></p>
							</div>
						</div>
						<h1 className="font-brand text-xl">3. Open the studio link. </h1>

						<Button variant="primary" className='gap-2'>
							RTFM <ExternalLink className='size-5' />
						</Button>
					</div>

				</section>
			</main>
		</>);
}
