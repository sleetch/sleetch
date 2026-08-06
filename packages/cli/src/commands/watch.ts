import type { command } from '@/types/command';

export const watch_command: command = {
  name: 'watch',
  description: 'Prebuild the content from sources.',
  action: async (args, runtime) => {
    await runtime.sources.load();
    await runtime.builder.build();
    await runtime.sources.watch();
  },
};
