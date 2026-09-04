import { Button, File, FileSystem, Folder } from '@sleetch/react';
import '@sleetch/client/markdown.css';

import manifest from '@sleetch/client/manifest';
import { Link } from 'react-router';

export default function Home() {
	return (
		<main className="max-w-337.5 w-full mx-auto sleetch-markdown p-8">
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

			<Link to={'/en/documentation/'}>
				<Button>Let's get started</Button>
			</Link>

			<pre>
				<code>{JSON.stringify(manifest)}</code>
			</pre>
		</main>
	);
}
