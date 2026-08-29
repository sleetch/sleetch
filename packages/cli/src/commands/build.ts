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
        try {
            const { sleetch_runtime } = await import('@sleetch/core/compiler');
            const runtime = new sleetch_runtime();
            await runtime.sources.load();
            await runtime.builder.build();
            if (options.get_boolean_option('watch')) {
                await runtime.sources.watch();
            }
        } catch (error) {
            if (error instanceof Error) cli.error('error', error.message);
        }
    },
};
