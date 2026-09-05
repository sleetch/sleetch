import styles from '@sleetch/styles/components/documentation/header.module.css';
import clsx from 'clsx';
import type { BaseHTMLAttributes } from 'react';

export interface DocumentationHeaderProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function DocumentationHeader({ className, children, ...props }: DocumentationHeaderProps) {
	return (
		<div className={clsx(styles.default, className)} {...props}>
			{children}
		</div>
	);
}
