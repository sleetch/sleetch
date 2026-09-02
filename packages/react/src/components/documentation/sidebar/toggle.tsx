import styles from '@sleetch/styles/components/documentation/sidebar/toggle.module.css';
import clsx from 'clsx';
import { useDocumentationContext } from 'packages/react/src/contexts/documentation';
import type { BaseHTMLAttributes } from 'react';

export interface DocumentationHeaderProps extends BaseHTMLAttributes<HTMLButtonElement> { }

export function DocumentationSidebarToggle({ className, ...props }: DocumentationHeaderProps) {
	const { toggle_sidebar } = useDocumentationContext();

	return (
		<button {...props} className={clsx(styles['default'], className)} onClick={toggle_sidebar} aria-label="Toggle sidebar" type="button">
			<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<line x1="3" y1="12" x2="21" y2="12" />
				<line x1="3" y1="6" x2="21" y2="6" />
				<line x1="3" y1="18" x2="21" y2="18" />
			</svg>
		</button>
	);
}
