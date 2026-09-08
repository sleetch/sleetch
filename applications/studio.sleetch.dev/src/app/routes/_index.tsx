import { Button } from '@sleetch/react';
import { useEffect, useRef } from 'react';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { useClient } from '@/shared/hooks/use-client';
import { useClientStore } from '@/shared/stores/client';

export function meta() {
	return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Home() {
	const client = useClient()
	const { languages } = useClientStore()

	return (
		<main className="max-w-337.5 w-full mx-auto fl-px-5/10 relative">
			<div className="absolute right-0">
				<ThemeToggle />
			</div>
			<section className="flex-1 h-full min-h-screen flex items-center justify-center flex-col gap-3">
				Welcome to studio
				<p>{languages}</p>
				<Button onClick={() => {
					client.send({ "id": "get-languages", data: {} })
				}}>Refresh languages </Button >
			</section>
		</main>
	);
}
