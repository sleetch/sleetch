import Logo from '@/assets/images/branding/logo.svg?react';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export function LandingHeader() {
    return (
        <header className="sticky z-1 border-b  py-2.5 w-full  ">
            <div className="max-w-337.5 flex items-center justify-between mx-auto">
                <Logo className="size-10  " />
                <ThemeToggle />
            </div>
        </header>
    );
}
