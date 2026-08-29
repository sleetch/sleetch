import styles from '@sleetch/styles/components/documentation/sidebar/content.module.css';
import clsx from 'clsx';
import type { BaseHTMLAttributes } from 'react';

export interface DocumentationSidebarContentProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function DocumentationSidebarContent({ className, children, ...props }: DocumentationSidebarContentProps) {
  return (
    <div className={clsx(styles.default, className)} {...props}>
      {children}
    </div>
  );
}
