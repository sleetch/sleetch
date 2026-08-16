import type { Route } from './+types/_index';

import { LandingHero } from '@/features/landing/components/sections/hero';
import { LandingBentoGrid } from '@/features/landing/components/sections/bento';

import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { LandingLayouts } from '@/features/landing/components/sections/layouts';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Home() {
  return (
    <main className="max-w-337.5 w-full mx-auto space-y-5 mt-20 fl-px-5/10">
      <LandingHero />
      <LandingBentoGrid />
      <LandingLayouts />
      <section className="h-100">
        <ThemeToggle />
        <img className="mx-auto" src="https://c.tenor.com/kWgGwODhUVIAAAAC/tenor.gif"></img>
      </section>
    </main>
  );
}
