/*
  AI Generated :(
  Needs more testing
*/

import type { tree_object } from '@sleetch/core/compiler';
import styles from '@sleetch/styles/components/documentation/sidebar/index.module.css';
import clsx from 'clsx';
import { useDocumentationContext } from 'packages/react/src/contexts/documentation';
import type { BaseHTMLAttributes } from 'react';
import { useEffect, useMemo, useState } from 'react';

export interface DocumentationSidebarProps extends BaseHTMLAttributes<HTMLBaseElement> {}

export function DocumentationSidebar({ className, children, ...props }: DocumentationSidebarProps) {
    const { is_sidebar_open, close_sidebar, tree, current_path, path_transformer, icon_transformer } = useDocumentationContext();

    useEffect(() => {
        if (is_sidebar_open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [is_sidebar_open]);

    return (
        <>
            {is_sidebar_open && <div className={styles.overlay} onClick={close_sidebar} />}
            <aside className={clsx(styles.sidebar, is_sidebar_open && styles['sidebar-open'], className)} {...props}>
                <nav className={styles.nav}>
                    <SidebarTree nodes={tree} depth={1} onLinkClick={close_sidebar} />
                </nav>
                {children}
            </aside>
        </>
    );
}

type category_node = Extract<tree_object, { type: 'category' }>;
type page_node = Extract<tree_object, { type: 'page' }>;
type data_node = Extract<tree_object, { type: 'data' }>;

function getOrder(node: tree_object): number {
    if (node.type === 'category') {
        return node?.frontmatter?.order ?? Number.POSITIVE_INFINITY;
    }
    if (node.type === 'page') {
        return (node.frontmatter as { order?: number }).order ?? Number.POSITIVE_INFINITY;
    }
    return Number.POSITIVE_INFINITY;
}

function sortNodes(nodes: tree_object[]): tree_object[] {
    return nodes
        .map((node, index) => ({ node, index }))
        .sort((a, b) => {
            const diff = getOrder(a.node) - getOrder(b.node);
            return diff !== 0 ? diff : a.index - b.index;
        })
        .map(({ node }) => node);
}

function resolveTitle(title: string, fallbackPath: string): string {
    return title && title !== 'No title.' ? title : fallbackPath;
}

function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={clsx(styles.chevron, open && styles['chevron-open'])}
        >
            <polyline points="9 6 15 12 9 18" />
        </svg>
    );
}

interface HrefContext {
    onLinkClick?: () => void;
}

interface SidebarTreeProps extends HrefContext {
    nodes: tree_object[];
    depth: number;
}

function SidebarTree({ nodes, depth, onLinkClick }: SidebarTreeProps) {
    const sorted = useMemo(() => sortNodes(nodes), [nodes]);
    const { icon_transformer, current_path, path_transformer, language } = useDocumentationContext();
    return (
        <ul className={styles.list} data-depth={depth}>
            {sorted.map((node) => {
                if (node.type === 'page') {
                    const isActive = node.path === current_path;
                    const icon = icon_transformer(node.frontmatter.icon);

                    return (
                        <li key={node.path} className={styles.item}>
                            <a
                                href={path_transformer({ language, path: node.path })}
                                className={clsx(styles.link, isActive && styles.active)}
                                style={{ '--depth': depth } as React.CSSProperties}
                                onClick={onLinkClick}
                            >
                                {icon && <span className={styles.icon}>{icon}</span>}
                                <span className={styles.label}>{resolveTitle(node.frontmatter.title, node.path)}</span>
                            </a>
                        </li>
                    );
                }

                if (node.type === 'category') {
                    return <CategoryItem key={node.path} category={node} depth={depth} onLinkClick={onLinkClick} />;
                }

                return null;
            })}
        </ul>
    );
}

interface CategoryItemProps extends HrefContext {
    category: category_node;
    depth: number;
}

function CategoryItem({ category, depth, onLinkClick }: CategoryItemProps) {
    const { icon_transformer, current_path, path_transformer, language } = useDocumentationContext();

    const title = category?.frontmatter?.title ?? (category.page ? resolveTitle(category.page.frontmatter.title, category.path) : category.path);

    const iconName = category?.frontmatter?.icon ?? category?.page?.frontmatter?.icon;
    const icon = icon_transformer(iconName);

    const childNodes = category.children;

    const hasChildren = childNodes.length > 0;
    const isIndexActive = category.page ? category.page.path === current_path : false;

    const [open, setOpen] = useState(true);

    return (
        <li className={styles.item}>
            <div className={styles.row}>
                {category.page ? (
                    <a
                        href={path_transformer({ language, path: category.page.path })}
                        className={clsx(styles.link, styles['category-link'], isIndexActive && styles.active)}
                        style={{ '--depth': depth } as React.CSSProperties}
                        onClick={onLinkClick}
                    >
                        {icon && <span className={styles.icon}>{icon}</span>}
                        <span className={styles.label}>{title}</span>
                    </a>
                ) : (
                    <button
                        type="button"
                        className={clsx(styles.link, styles['category-label'])}
                        style={{ '--depth': depth } as React.CSSProperties}
                        onClick={() => hasChildren && setOpen((o) => !o)}
                    >
                        {icon && <span className={styles.icon}>{icon}</span>}
                        <span className={styles.label}>{title}</span>
                    </button>
                )}

                {hasChildren && (
                    <button
                        type="button"
                        className={styles.toggle}
                        aria-label={open ? 'Collapse' : 'Expand'}
                        aria-expanded={open}
                        onClick={() => setOpen((o) => !o)}
                    >
                        <Chevron open={open} />
                    </button>
                )}
            </div>

            {hasChildren && open && <SidebarTree nodes={childNodes} depth={depth + 1} onLinkClick={onLinkClick} />}
        </li>
    );
}
