import type { command } from '@/types/command';
import { create_app_command } from './app';

export const create_command: command = {
  name: 'create',
  description: 'Create.',
  options: {},
  active: false,
  action: (options, _cli) => {
    console.log('create', options);
  },
  subcommands: [create_app_command],
};
