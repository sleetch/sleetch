import { use, type BaseHTMLAttributes } from 'react';
//import styles from '@sleetch/styles/components/Page/header.module.css';
import clsx from 'clsx';
import { Button } from '../../button';
import type { markdown_module } from 'packages/core/dist/compiler';

export interface PageHeaderProps extends BaseHTMLAttributes<HTMLDivElement> {
  page: Promise<markdown_module>;
}

export function PageHeader({ page, className, children, ...props }: PageHeaderProps) {
  const value = use(page);
  return (
    <div className={clsx(/*styles['default'],*/ className, 'sleetch-markdown')} {...props}>
      <h1>{value.default.frontmatter.title}</h1>
      <p>{value.default.frontmatter.description}</p>
      <div style={{ gap: '15px', display: 'flex' }}>
        <Button variant="secondary">View as markdown</Button>
        <Button>Copy for LLM</Button>
      </div>
      <hr />
    </div>
  );
}
