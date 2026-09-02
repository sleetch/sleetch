import type { page_module } from '@sleetch/core/compiler';
//import styles from '@sleetch/styles/components/Page/header.module.css';
import clsx from 'clsx';
import type { BaseHTMLAttributes } from 'react';
import { Button } from '../../button';

export interface PageHeaderProps extends BaseHTMLAttributes<HTMLDivElement> {
	page: page_module['default'];
}

export function PageHeader({ page, className, children, ...props }: PageHeaderProps) {
	return (
		<div className={clsx(/*styles['default'],*/ className, 'sleetch-markdown')} {...props}>
			<h1>{page.frontmatter.title}</h1>
			<p>{page.frontmatter.description}</p>
			<div style={{ gap: '15px', display: 'flex' }}>
				<Button variant="secondary">View as markdown</Button>
				<Button>Copy for LLM</Button>
			</div>
			<hr />
		</div>
	);
}
