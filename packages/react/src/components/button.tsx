import type { ButtonHTMLAttributes } from 'react';
import styles from '@sleetch/styles/components/button.module.css';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary';
}

export function Button({ variant = 'default', className, children, ...props }: ButtonProps) {
  return (
    <button className={clsx(styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
