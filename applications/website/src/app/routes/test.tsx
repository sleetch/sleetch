import type { Route } from './+types/_index';
import '@sleetch/client/markdown.css';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}
export default function Home() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center gap-20">
      <h1 className="fw-text-[24px-60px]">Hello</h1>
    </main>
  );
}
