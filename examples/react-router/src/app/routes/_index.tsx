import { Button } from '@ladoc/react';
import '@ladoc/client/markdown.css';
import { Link } from 'react-router';
import type { Route } from './+types/_index';

export async function loader({ params }: Route.LoaderArgs) {}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="max-w-337.5 w-full mx-auto  ladoc-markdown">
      <h1>Welcome to my Super Documentation !</h1>
      <p>This is a place where you can learn a lot about this framework !</p>
      <div className="no-ladoc-markdown">
        <Link to={'/documentation'}>
          <Button>Let's get started</Button>
        </Link>
      </div>
    </main>
  );
}
