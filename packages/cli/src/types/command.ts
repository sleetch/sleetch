import type { ladoc_cli } from '@/lib/cli';

export type command = {
  name: string;
  description: string;
  fallback?: boolean;
  action: (args: string[], cli: ladoc_cli) => void;
};
