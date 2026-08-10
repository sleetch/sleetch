import { Button } from '@sleetch/react';
import Link from 'next/link';
import '@sleetch/client/markdown.css';

export default function Home() {
  return (
    <main className="max-w-337.5 w-full mx-auto  sleetch-markdown">
      <h1>Welcome to my Super Documentation !</h1>
      <p>This is a place where you can learn a lot about this framework !</p>
      <div className="no-sleetch-markdown">
        <Link href={'/documentation'}>
          <Button>Let's get started</Button>
        </Link>
      </div>
    </main>
  );
}
