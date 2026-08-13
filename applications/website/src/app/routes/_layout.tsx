import type { Route } from './+types/_index';
import { Outlet } from 'react-router';
import { NoiseOverlay } from '@/shared/components/effects/noise';
import { LandingHeader } from '@/features/landing/components/header';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Layout() {
  return (
    <main className="min-h-screen relative">
      {/*<LandingHeader /> */}
      <Outlet />
    </main>
  );
}

// <NoiseOverlay size={250} opacity={1} />;
