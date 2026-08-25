import type { BaseHTMLAttributes } from 'react';
import styles from '@sleetch/styles/components/documentation/header.module.css';
import clsx from 'clsx';
import { useDocumentationContext } from '../../contexts/documentation';

export interface DocumentationHeaderProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function DocumentationHeader({ className, children, ...props }: DocumentationHeaderProps) {
  const { toggle_sidebar } = useDocumentationContext();
  return (
    <div className={clsx(styles['default'], className)} {...props}>
      <button className={styles['menu-toggle']} onClick={toggle_sidebar} aria-label="Toggle sidebar" type="button">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {children}
    </div>
  );
}
