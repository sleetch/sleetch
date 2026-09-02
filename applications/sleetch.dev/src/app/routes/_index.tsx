import { LandingHeader } from '@/features/landing/components/layout/header';
import { LandingBentoGrid } from '@/features/landing/components/sections/bento';
import { LandingHero } from '@/features/landing/components/sections/hero';
import { LandingLayouts } from '@/features/landing/components/sections/layouts';

export function meta() {
	return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Home() {
	return (
		<>
			<LandingHeader />
			<main className="max-w-337.5 w-full mx-auto space-y-5 mt-5 fl-px-5/10">
				<LandingHero />
				<LandingBentoGrid />
				<LandingLayouts />
				<section className="h-100">
					<img className="mx-auto" src="https://c.tenor.com/kWgGwODhUVIAAAAC/tenor.gif"></img>
				</section>
			</main>
		</>
	);
}
