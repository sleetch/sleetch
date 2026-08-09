import type { command } from '@/types/command';

export const build_command: command = {
  name: 'build',
  description: 'Prebuild the content from sources.',
  action: async (args, cli) => {
    await cli.runtime.sources.load();
    await cli.runtime.builder.build();
  },
};
