import { useSleeky } from '@/shared/components/use-sleeky';
import type { Route } from './+types/_index';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

export default function Home() {
  const { Component: C1, set_cursor_position: sc1 } = useSleeky({ lerp_amount: 0.5 });
  const { Component: C2, set_cursor_position: sc2 } = useSleeky({ lerp_amount: 0.4 });
  const { Component: C3, set_cursor_position: sc3 } = useSleeky({ lerp_amount: 0.4 });
  return (
    <main
      onMouseMove={(e) => {
        sc1({ x: e.clientX, y: e.clientY });
        sc2({ x: e.clientX, y: e.clientY });
        sc3({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={(e) => {
        sc1({ x: 0, y: 0 });
        sc2({ x: 0, y: 0 });
        sc3({ x: 0, y: 0 });
      }}
      className="w-full min-h-screen flex items-center justify-center gap-20"
    >
      <C1 className="size-20" />
      <C2 className="size-50" />
      <C3 className="size-80" />
    </main>
  );
}
