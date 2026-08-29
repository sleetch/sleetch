import styles from '@sleetch/styles/components/button.module.css';
import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'primary' | 'ghost' | 'destructive' | 'outline';
}

export function Button({ variant = 'default', className, children, ...props }: ButtonProps) {
    return (
        <button className={clsx(styles[variant], className)} {...props}>
            {children}
        </button>
    );
}
