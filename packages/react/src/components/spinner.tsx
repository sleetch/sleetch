import styles from '@sleetch/styles/components/spinner.module.css';
import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

export interface SpinnerProps extends ButtonHTMLAttributes<HTMLDivElement> {
	size?: "small" | "medium" | "large"
}

export function Spinner({ size = "small", className, children, ...props }: SpinnerProps) {
	return (
		<div className={clsx(styles['spinner'], styles[size], className)} {...props}>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
			<div className={styles['spinner_bar']}></div>
		</div>
	);
}
