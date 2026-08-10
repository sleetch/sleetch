import type { ReactNode, BaseHTMLAttributes } from 'react';
import { createContext, useContext, useState } from 'react';
import styles from '@sleetch/styles/components/documentation/layout.module.css';
import clsx from 'clsx';

export interface DocumentationLayoutProps extends BaseHTMLAttributes<HTMLDivElement> {}

interface LayoutContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function useDocumentationLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useDocumentationLayout must be used within DocumentationLayout');
  }
  return context;
}

export function DocumentationLayout({ children, className, ...props }: DocumentationLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar }}>
      <main className={clsx(styles['default'], className)} {...props}>
        {children}
      </main>
    </LayoutContext.Provider>
  );
}
