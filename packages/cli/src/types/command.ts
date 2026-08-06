import type { ladoc_runtime } from '@ladoc/core/compiler';

export type command = {
  name: string;
  description: string;
  action: (args: string[], runtime: ladoc_runtime) => void;
};
