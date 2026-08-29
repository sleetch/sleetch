import { useEffect } from 'react';
import NextLogo from '@/assets/images/logos/nextjs-icon.svg';
import RRLogo from '@/assets/images/logos/react-router.svg';
import TanstackLogo from '@/assets/images/logos/tanstack.svg';
import ViteLogo from '@/assets/images/logos/vite.svg';
import { useSleeky } from '@/shared/components/use-sleeky';

export function LandingBentoGrid() {
    const { Component: Sleeky, set_cursor_position } = useSleeky({ lerp_amount: 0.5 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            set_cursor_position({
                x: e.clientX,
                y: e.clientY,
            });
        };

        const handleMouseLeave = () => {
            set_cursor_position({
                x: 0,
                y: 0,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
        };
    }, [set_cursor_position]);
    return (
        <section className="grid gap-5 grid-cols-1 md:grid-cols-4  ">
            <div className="overflow-hidden col-span-3  sm:h-50 border rounded-xl p-5 space-y-2">
                <h1 className="fl-text-xl/3xl font-brand ">Framework Agnostic</h1>
                <p className="text-muted-foreground fl-text-sm/lg">
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
            <div className="bg-primary relative col-span-3 sm:col-span-2  sm:h-60  rounded-t-xl rounded-bl-xl  flex flex-col ">
                <div className="absolute fl-size-10/15 bg-card bottom-0 right-0 overflow-hidden">
                    <div className="h-full size-30 -rotate-45 -translate-x-[40%] -translate-y-[40%]">
                        <div className="bg-primary contrast-200 size-full" />
                        <div className="bg-background size-full" />
                    </div>
                </div>
                <div className="fl-text-4xl/7xl font-brand font-medium p-5 text-white">
                    <h1>Build docs.</h1>
                    <h1>Not a spaceship.</h1>
                </div>
            </div>

            <div className="overflow-hidden  col-span-3 sm:col-span-2 h-60 border rounded-xl p-5 ">
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
    );
}
