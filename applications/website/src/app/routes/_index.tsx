import type { Route } from './+types/_index';
import Logo from '@/assets/branding/logo.svg?react';
import '@sleetch/client/markdown.css';
import { Button } from '@sleetch/react';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sleetch' }, { name: 'description', content: 'Welcome to Sleetch !' }];
}

// To MOVE
function Card(data: { feature: string }) {
  return (
    <div className="border rounded-sm px-3 py-1.5 text-sm bg-secondary">
      <p>{data.feature}</p>
    </div>
  );
}

import preview from '@/assets/previews/landing.png';

import ViteLogo from '@/assets/logos/vite.svg';
import TanstackLogo from '@/assets/logos/tanstack.svg';
import RRLogo from '@/assets/logos/react-router.svg';
import NextLogo from '@/assets/logos/nextjs-icon.svg';
import { useSleeky } from '@/shared/components/use-sleeky';
import PixelBlast from '@/shared/components/effects/pixel-blast';

export default function Home() {
  const { Component: Sleeky, set_cursor_position } = useSleeky({ lerp_amount: 0.5 });
  return (
    <main
      onMouseMove={(e) => {
        set_cursor_position({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={(e) => {
        set_cursor_position({ x: 0, y: 0 });
      }}
      className="max-w-337.5 w-full mx-auto space-y-5 mt-20 sm:px-5"
    >
      <section className="min-h-45 bg-card border rounded-xl p-8 py-20  flex flex-col items-center justify-center border-b border-dashed">
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

          <Button> Read the docs</Button>
        </div>
      </section>
      <section className="grid gap-5 grid-cols-1 md:grid-cols-4 sm:grid-cols-1">
        <div className="col-span-3  h-50 border rounded-xl p-5 space-y-2">
          <h1 className="text-3xl font-brand ">Framework Agnostic</h1>
          <p className="text-muted-foreground text-lg">
            The stack doesn't matter anymore, Sleetch works on any React JS framework, we adapt you don't.
          </p>
          <div className="flex items-center gap-5 flex-1 justify-baseline">
            <img className="aspect-square w-20 px-2 " src={NextLogo} />
            <img className="aspect-square w-20 px-2 " src={ViteLogo} />
            <img className="aspect-square w-20 px-2 " src={TanstackLogo} />
            <img className="aspect-square w-20 px-2 " src={RRLogo} />
            <div />
          </div>
        </div>
        <div className="col-span-1 h-50 border rounded-xl overflow-hidden md:block hidden ">
          <Sleeky className="absolute top-[1%] m-5" />
        </div>

        <div className="bg-primary relative col-span-2 h-60  rounded-t-xl rounded-bl-xl  flex flex-col ">
          <div className="absolute size-15 bg-card bottom-0 right-0 overflow-hidden">
            <div className="h-full w-30 -rotate-45 -translate-x-[40%] -translate-y-[40%]">
              <div className="bg-primary contrast-200 size-full" />
              <div className="bg-background size-full" />
            </div>
          </div>
          <div className="text-7xl font-brand font-medium p-5 text-white">
            <h1>Build docs.</h1>
            <h1>Not a spaceship.</h1>
          </div>
          <div className="flex justify-between px-16 pb-5 hidden">
            <img className="aspect-square w-20 px-4 " src={NextLogo} />
            <img className="aspect-square w-20 px-4 " src={ViteLogo} />
            <img className="aspect-square w-20 px-4 " src={TanstackLogo} />
            <img className="aspect-square w-20 px-4  " src={RRLogo} />
          </div>
        </div>
        <div className="col-span-2 h-60 border rounded-xl p-5 ">
          <h1 className="text-3xl font-brand ">Production Ready </h1>
          <div className="flex gap-10 justify-around items-center size-full">
            <div className="flex flex-col items-center justify gap-2">
              <div className="bg-green-500/20 size-20 rounded-full border-green-300 border-5 grid place-content-center">
                <p className="text-green-500 text-xl font-mono">100</p>
              </div>
              <p>Performance</p>
            </div>

            <div className="flex flex-col items-center justify gap-2">
              <div className="bg-green-500/20 size-20 rounded-full border-green-300 border-5 grid place-content-center">
                <p className="text-green-500 text-xl font-mono">100</p>
              </div>
              <p>Accessibility</p>
            </div>

            <div className="flex flex-col items-center justify gap-2">
              <div className="bg-green-500/20 size-20 rounded-full border-green-300 border-5 grid place-content-center">
                <p className="text-green-500 text-xl font-mono">100</p>
              </div>
              <p>Best Practices</p>
            </div>

            <div className="flex flex-col items-center justify gap-2">
              <div className="bg-green-500/20 size-20 rounded-full border-green-300 border-5 grid place-content-center">
                <p className="text-green-500 text-xl font-mono">100</p>
              </div>
              <p>SEO</p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden rounded-xl border">
        <div className="absolute z-1 size-full flex items-end justify-center">
          <img src={preview} className="rounded-t-3xl border-t border-x h-[80%] aspect-video" alt="Preview" />
        </div>
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#235edf"
          patternScale={3}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples={false}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.25}
          transparent
          className="absolute inset-0 z-0 size-full"
        />
      </section>
      <section className="h-100">
        <ThemeToggle />
      </section>
    </main>
  );
}
