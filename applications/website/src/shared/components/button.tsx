import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({ children, ...other }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...other}
            className="cursor-pointer bg-foreground text-background fill-background px-2.5 py-1 rounded-sm flex items-center gap-2 [&_svg]:size-5"
        >
            {children}
        </button>
    );
}
