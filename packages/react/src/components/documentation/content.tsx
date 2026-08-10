import type { BaseHTMLAttributes } from 'react';
import styles from '@sleetch/styles/components/documentation/content.module.css';
import clsx from 'clsx';

export interface DocumentationContentProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function DocumentationContent({ className, children, ...props }: DocumentationContentProps) {
  return (
    <div className={clsx(styles['default'], className)} {...props}>
      {children}
    </div>
  );
}
