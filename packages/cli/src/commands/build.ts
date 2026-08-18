import type { command, command_options } from '@/types/command';

const options = {
  watch: { type: 'boolean', default: false },
} as const satisfies command_options;

export const build_command: command<typeof options> = {
  name: 'build',
  description: 'Prebuild the content from sources.',
  active: true,
  options,
  action: async (options, cli) => {
    await cli.runtime.sources.load();
    await cli.runtime.builder.build();
    if (options.get_boolean_option('watch')) {
      await cli.runtime.sources.watch();
    }
  },
};
