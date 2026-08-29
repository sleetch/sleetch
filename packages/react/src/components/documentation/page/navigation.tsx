/*
  AI Generated :(
  Needs more testing
*/

import type { tree_object } from '@sleetch/core/compiler';
import styles from '@sleetch/styles/components/documentation/page/navigation.module.css';
import clsx from 'clsx';
import { useDocumentationContext } from 'packages/react/src/contexts/documentation';
import { type BaseHTMLAttributes, useMemo } from 'react';

type category_node = Extract<tree_object, { type: 'category' }>;
type page_node = Extract<tree_object, { type: 'page' }>;
type data_node = Extract<tree_object, { type: 'data' }>;

export interface DocumentationNavigationProps extends BaseHTMLAttributes<HTMLDivElement> {}

/*
  Meme logique de tri/priorite que la sidebar (getCategoryData, getCategoryIndex,
  getOrder, sortNodes) pour garantir que l'ordre de navigation prev/next
  corresponde exactement a l'ordre affiche dans la sidebar.
*/

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

/*
  Aplatit l'arbre en une liste ordonnee de pages navigables :
  - l'index d'une categorie arrive en premier (c'est le point d'entree),
  - suivi de ses enfants tries recursivement.
*/
function flattenPages(nodes: tree_object[]): page_node[] {
  const sorted = sortNodes(nodes);
  const result: page_node[] = [];

  for (const node of sorted) {
    if (node.type === 'page') {
      result.push(node);
      continue;
    }

    if (node.type === 'category') {
      const indexPage = node.page;
      if (indexPage) result.push(indexPage);
      const rest = node.children;
      result.push(...flattenPages(rest));
    }
  }

  return result;
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.chevron}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.chevron}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function resolveTitle(title: string, fallbackPath: string): string {
  return title && title !== 'No title.' ? title : fallbackPath;
}

function resolveDescription(description: string): string | undefined {
  return description && description !== 'No description.' ? description : undefined;
}

interface NavigationCardProps {
  node: page_node;
  direction: 'previous' | 'next';
}

function NavigationCard({ node, direction }: NavigationCardProps) {
  const title = resolveTitle(node.frontmatter.title, node.path);
  const description = resolveDescription(node.frontmatter.description);
  const { language, path_transformer } = useDocumentationContext();

  return (
    <a href={path_transformer({ language, path: node.path })} className={clsx(styles.card, styles[direction])} data-direction={direction}>
      <span className={styles.meta}>
        {direction === 'previous' && <ChevronLeft />}
        <span className={styles.title}>{title}</span>
        {direction === 'next' && <ChevronRight />}
      </span>
      {description && <span className={styles.description}>{description}</span>}
    </a>
  );
}

export function PageNavigation({ className, ...props }: DocumentationNavigationProps) {
  const { tree, current_path } = useDocumentationContext();
  const { previous, next } = useMemo(() => {
    const pages = flattenPages(tree);
    const currentIndex = pages.findIndex((page) => page.path === current_path);

    if (currentIndex === -1) {
      return { previous: undefined, next: undefined };
    }

    return {
      previous: pages[currentIndex - 1],
      next: pages[currentIndex + 1],
    };
  }, [tree, current_path]);

  if (!previous && !next) return null;

  return (
    <nav className={clsx(styles.navigation, className)} aria-label="Pagination" {...props}>
      <div className={styles.slot}>{previous && <NavigationCard node={previous} direction="previous" />}</div>
      <div className={clsx(styles.slot, styles['slot-end'])}>{next && <NavigationCard node={next} direction="next" />}</div>
    </nav>
  );
}
