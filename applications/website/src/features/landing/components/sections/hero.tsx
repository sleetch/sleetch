import { Button } from '@sleetch/react';
import { Link } from 'react-router';
import Logo from '@/assets/images/branding/logo.svg?react';

function Card(data: { feature: string }) {
  return (
    <div className="border rounded-sm px-3 py-1.5 text-sm bg-secondary">
      <p>{data.feature}</p>
    </div>
  );
}

export function LandingHero() {
  return (
    <section className=" min-h-45 bg-card border rounded-xl p-8 py-20  flex flex-col items-center justify-center border-b border-dashed">
      <div className="flex flex-col gap-4">
        <div className="flex fl-gap-5/11.25 items-center sm:flex-row flex-col">
          <Logo className="fl-w-20/37.5 h-auto " />
          <h1 className="font-brand font-bold  fl-text-[70px/131px]">Sleetch</h1>
        </div>
        <p className=" text-base">A proudly open-source documentation framework.</p>

        <div className="hidden grid grid-cols-3 gap-4 pt-6">
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

        <div className="space-x-4 ">
          <Link to="/documentation">
            <Button variant="outline">Explore</Button>
          </Link>
          <Link to="/documentation/getting-started/introduction">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
