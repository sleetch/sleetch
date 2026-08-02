import styles from '@ladoc/styles/components/file-system.module.css';
import type { ReactNode, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

function FolderIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}

function FileIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

export interface FilesProps {
  children?: ReactNode;
  className?: string;
}

export function FileSystem({ children, className = '' }: FilesProps) {
  return <div className={[styles['file-system'], className, 'no-ladoc-markdown'].filter(Boolean).join(' ')}>{children}</div>;
}

export interface FolderProps {
  name: string;
  children?: ReactNode;
  hidden?: boolean;
  className?: string;
}

export function Folder({ name, children, hidden = false, className = '' }: FolderProps) {
  return (
    <div className={[styles.folder, hidden && styles.hidden, className].filter(Boolean).join(' ')}>
      <div className={[styles.row, styles.folderRow].join(' ')}>
        <FolderIcon className={styles.icon} />
        <span className={styles.label}>{name}</span>
      </div>
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
}

export interface FileProps {
  name: string;
  comment?: string;
  selected?: boolean;
  className?: string;
}

export function File({ name, comment, selected = false, className = '' }: FileProps) {
  return (
    <div className={[styles.row, styles.file, selected && styles.selected, className].filter(Boolean).join(' ')}>
      <FileIcon className={styles.icon} />
      <span className={styles.label}>{name}</span>
      <span className={styles.comment}>{comment}</span>
    </div>
  );
}
