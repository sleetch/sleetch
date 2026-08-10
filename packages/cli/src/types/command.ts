import type { sleetch_cli } from '@/lib/cli';

export type command = {
  name: string;
  description: string;
  fallback?: boolean;
  action: (args: string[], cli: sleetch_cli) => void;
};
