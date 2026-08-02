import { Button, File, FileSystem, Folder } from '@ladoc/react';
import '@ladoc/client/markdown.css';
import { Link } from 'react-router';
import type { Route } from './+types/_index';

import manifest from '@ladoc/cache/manifest.js';

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="max-w-337.5 w-full mx-auto  ladoc-markdown">
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

      <Link to={'/documentation'}>
        <Button>Let's get started</Button>
      </Link>

      <pre>
        <code>{JSON.stringify(manifest)}</code>
      </pre>
    </main>
  );
}
