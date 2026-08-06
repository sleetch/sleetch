import type { command } from '@/types/command';

export const build_command: command = {
  name: 'build',
  description: 'Prebuild the content from sources.',
  action: async (args, runtime) => {
    await runtime.sources.load();
    await runtime.builder.build();
  },
};
