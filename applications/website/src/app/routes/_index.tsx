import type { Route } from './+types/_index';
import Logo from '@/assets/branding/logo.svg?react';
import '@sleetch/client/markdown.css';
import { Button } from '@sleetch/react';
import Sleeky from '@/assets/branding/sleeky.svg?react';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

// To MOVE
function Card(data: { feature: string }) {
  return (
    <div className="border rounded-sm px-3 py-1 text-sm">
      <p>{data.feature}</p>
    </div>
  );
}

import ViteLogo from '@/assets/logos/vite.svg';
import TanstackLogo from '@/assets/logos/tanstack.svg';
import RRLogo from '@/assets/logos/react-router.svg';
import NextLogo from '@/assets/logos/nextjs-icon.svg';

export default function Home() {
  return (
    <main className=" max-w-337.5 w-full mx-auto mt-20 border">
      <Sleeky className="fixed m-4 size-20  bottom-0 right-0" />

      <section className="p-8 py-20  flex flex-col items-center justify-center border-b border-dashed">
        <div className="flex flex-col gap-4">
          <div className="flex gap-11.25 items-center ">
            <Logo className="w-37.5" />
            <h1 className="font-brand font-bold text-[131px]">Sleetch</h1>
          </div>
          <p className="text-base">A proudly open-source documentation framework.</p>

          <div className="grid grid-cols-3 gap-4 pt-6">
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
        </div>
      </section>
      <section className="border-b h-100"></section>
      <section className="border-b sleetch-markdown ">
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
        <ThemeToggle />
      </section>
      <section className="flex border-b divide-x">
        <div className="px-8 flex items-center justify-center">
          <h1 className="text-2xl font-brand ">Framework Agnostic</h1>
        </div>
        <div className="flex divide-x items-center flex-1 justify-baseline">
          <img className="aspect-square w-20 px-4 " src={NextLogo} />
          <img className="aspect-square w-20 px-4 " src={ViteLogo} />
          <img className="aspect-square w-20 px-4 " src={TanstackLogo} />
          <img className="aspect-square w-20 px-4  " src={RRLogo} />
          <div />
        </div>
      </section>
    </main>
  );
}
