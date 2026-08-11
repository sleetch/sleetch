import type { Route } from './+types/_index';
import Logo from '@/assets/branding/logo.svg?react';
import '@sleetch/client/markdown.css';
import { Button } from '@sleetch/react';
import Sleeky from '@/assets/branding/sleeky.svg?react';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

// To MOVE
function Card(data: { feature: string }) {
  return (
    <div className="border rounded-sm px-3 py-1 ">
      <p>{data.feature}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className=" max-w-337.5 w-full mx-auto mt-20 border">
      <Sleeky className="fixed m-4 size-20  bottom-0 right-0" />

      <section className="p-8 py-20 gap-16 flex flex-col items-center justify-center border-b border-dashed">
        <div className="flex gap-11.25 items-center ">
          <Logo className="w-37.5" />
          <h1 className="font-brand font-bold text-[131px]">Sleetch</h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card feature="RSS Feed Generation" />
          <Card feature="Sitemap Generation" />
          <Card feature="LLMs.txt Generation" />
          <Card feature="Easy theme customization" />
          <Card feature="Syntax Highlighting" />
          <Card feature="Mermaid Diagrams" />
          <Card feature="Components out of the box" />
          <Card feature="Markdown styling preset" />
          <Card feature="Thinked for I18n and a11y" />
          <Card feature="Easy SEO" />
          <Card feature="LaTeX integration" />
          <Card feature="File-system source" />
          <Card feature="CMS source" />
          <Card feature="Git repository source" />
          <Card feature="Bring your own icons" />
        </div>
      </section>
      <section className="sleetch-markdown ">
        <pre>
          <code>
            {`<h1>Sleetch</h1>
<p>
  This section is <b>automatically styled</b> by the sleetch-markdown class !
</p>
<ul>
  <li>Amazing</li>
  <li>I love it {'<3'}</li>
</ul>
<Button>Read the docs</Button>`}
          </code>
        </pre>
        <h1>Sleetch</h1>
        <p>
          This section is <b>automatically styled</b> by the sleetch-markdown class !
        </p>
        <ul>
          <li>Amazing</li>
          <li>I love it {'<3'}</li>
        </ul>
        <Button>Read the docs</Button>
      </section>
    </main>
  );
}
