import { Outlet } from 'react-router';
import { LandingHeader } from '@/features/landing/components/header';
import { NoiseOverlay } from '@/shared/components/effects/noise';
import type { Route } from './+types/_index';

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
