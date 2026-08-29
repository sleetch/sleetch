import styles from '@sleetch/styles/components/documentation/content.module.css';
import clsx from 'clsx';
import type { BaseHTMLAttributes } from 'react';

export interface DocumentationContentProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function DocumentationContent({ className, children, ...props }: DocumentationContentProps) {
    return (
        <div className={clsx(styles.default, className)} {...props}>
            {children}
        </div>
    );
}
