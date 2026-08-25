/*
AI Generated :(
Needs more testing
*/

import { use, useEffect, useRef, useState, type BaseHTMLAttributes, type CSSProperties } from 'react';
import styles from '@sleetch/styles/components/documentation/toc/index.module.css';
import clsx from 'clsx';
import type { page_module } from '@sleetch/core/compiler';

export interface DocumentationTocProps extends BaseHTMLAttributes<HTMLBaseElement> {
  page: Promise<page_module>;
}

interface TocLinkStyle extends CSSProperties {
  '--depth'?: number;
}

export function DocumentationToc({ className, children, page, ...props }: DocumentationTocProps) {
  const value = use(page);
  const toc = value.default.toc;
  if (toc.length == 0) return null;

  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const [gapY, setGapY] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const lastActiveIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;

    const elements = toc.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveIds((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              next.add(entry.target.id);
            } else {
              next.delete(entry.target.id);
            }
          }
          return next;
        });
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0,
      }
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [toc]);

  useEffect(() => {
    if (activeIds.size > 0) {
      let maxIndex = -1;
      toc.forEach((item, i) => {
        if (activeIds.has(item.id)) maxIndex = i;
      });
      lastActiveIndexRef.current = maxIndex;
      setGapY(null);
      return;
    }

    const track = trackRef.current;
    const lastIndex = lastActiveIndexRef.current;

    if (!track || lastIndex === null || lastIndex >= toc.length - 1) {
      setGapY(null);
      return;
    }

    const currentLi = itemRefs.current.get(toc[lastIndex].id);
    const nextLi = itemRefs.current.get(toc[lastIndex + 1].id);

    if (!currentLi || !nextLi) {
      setGapY(null);
      return;
    }

    const trackRect = track.getBoundingClientRect();
    const currentRect = currentLi.getBoundingClientRect();
    const nextRect = nextLi.getBoundingClientRect();

    const y = (currentRect.bottom - trackRect.top + (nextRect.top - trackRect.top)) / 2;

    setGapY(y);
  }, [activeIds, toc]);

  return (
    <aside className={clsx(styles['default'], className)} {...props}>
      <h3 className={styles['title']}>On this page</h3>
      <div className={styles['track']} ref={trackRef}>
        <span className={styles['line']} aria-hidden="true" />
        {gapY !== null && <span className={styles['gapDot']} style={{ top: gapY }} aria-hidden="true" />}
        <ul className={styles['list']}>
          {toc.map((item) => {
            const focused = activeIds.has(item.id);
            const linkStyle: TocLinkStyle = { '--depth': item.level };

            return (
              <li
                key={item.id}
                className={styles['item']}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el);
                  else itemRefs.current.delete(item.id);
                }}
              >
                <a
                  href={`#${item.id}`}
                  title={item.title}
                  aria-current={focused ? 'location' : undefined}
                  className={clsx(styles['link'], focused && styles['active'])}
                  style={linkStyle}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
