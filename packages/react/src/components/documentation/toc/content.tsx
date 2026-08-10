import type { BaseHTMLAttributes } from 'react';
import styles from '@sleetch/styles/components/documentation/toc/content.module.css';
import clsx from 'clsx';

export interface DocumentationTocContentProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function DocumentationTocContent({ className, children, ...props }: DocumentationTocContentProps) {
  return (
    <div className={clsx(styles['default'], className)} {...props}>
      {children}
    </div>
  );
}
