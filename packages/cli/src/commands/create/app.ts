import type { command, command_options } from '@/types/command';

const options = {
  name: { type: 'string' },
  framework: { type: 'string', default: 'react-router' },
} as const satisfies command_options;

export const create_app_command: command<typeof options> = {
  name: 'app',
  options,
  description: 'Create app.',
  active: true,
  action: (options, cli) => {
    const templates: Record<string, any> = {
      'react-router': undefined,
      'tanstack-start': undefined,
      'next-js': undefined,
    };
    const name = options.get_string_option('name');
    const framework = options.get_string_option('framework');
    if (name == undefined) return cli.error('missing arg', 'name is missing.');
    if (framework == undefined) return cli.error('missing arg', 'framework is missing.');
    if (!Object.keys(templates).includes(framework)) return cli.error('bad option', 'framework must be : ' + Object.keys(templates).join(' / '));

    console.log('create app', options.args);
  },
};
