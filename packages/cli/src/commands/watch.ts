import type { command } from '@/types/command';

export const watch_command: command = {
  name: 'watch',
  description: 'Prebuild the content from sources.',
  action: async (args, cli) => {
    await cli.runtime.sources.load();
    await cli.runtime.builder.build();
    await cli.runtime.sources.watch();
  },
};
