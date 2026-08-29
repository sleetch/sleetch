import { Button, File, FileSystem, Folder } from '@sleetch/react';
import '@sleetch/client/markdown.css';

import manifest from '@sleetch/client/manifest.js';
import { Link } from 'react-router';
import type { Route } from './+types/_index';

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="max-w-337.5 w-full mx-auto  sleetch-markdown">
      <h1>Welcome to my Super Documentation !</h1>
      <p>This is a place where you can learn a lot about this framework !</p>

      <FileSystem>
        <Folder name="framework">
          <File name="index.mdx" />

          <File name="current-page.mdx" />

          <File name="other-pages.mdx" />
        </Folder>

        <Folder name="headless (hidden)">
          <File name="my-page.mdx" />
        </Folder>
      </FileSystem>

      <Link to={'/documentation/'}>
        <Button>Let's get started</Button>
      </Link>

      <pre>
        <code>{JSON.stringify(manifest)}</code>
      </pre>
    </main>
  );
}
