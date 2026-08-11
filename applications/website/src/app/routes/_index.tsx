import type { Route } from './+types/_index';
import Logo from '@/assets/branding/logo.svg?react';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Portfolio' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  return (
    <main className="max-w-337.5 w-full mx-auto mt-20 ">
      <section className="space-y-3">
        <div className="flex gap-11.25 items-center">
          <Logo className="w-37.5" />
          <h1 className="font-brand font-bold text-[131px]">Sleetch</h1>
        </div>

        <h1>Is a proudly open-source documentation framework.</h1>
      </section>
    </main>
  );
}
