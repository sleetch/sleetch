import type { command, command_options } from '@/types/command';
import { styleText } from 'node:util';

export const help_command: command = {
  name: 'help',
  description: 'Get available commands.',
  active: true,
  options: {},
  fallback: true,
  action: (options, cli) => {
    let lines = [
      `${styleText('cyan', 'sleetch') + styleText('cyanBright', '.net')} is a powerful documentation framework.`,
      '',
      `Usage: ${styleText('cyan', 'sleetch')} ${styleText('gray', '<command>')} ${styleText('cyanBright', '[...args]')}`,
      '',
      'Commands:',
      '',
    ];
    const format_option = (name: string, option: command_options[string]) => {
      const parts: string[] = [];
      if (option.short) parts.push(`-${option.short}`);
      parts.push(`--${name}`);
      if (option.type === 'string') {
        parts[parts.length - 1] += ` <${name}>`;
      }
      let result = parts.join(', ');
      if (option.type) {
        result += ` ${styleText('gray', `- ${String(option.type)}`)}`;
      }
      if (option.default) {
        result += ` ${styleText('gray', `- default=${String(option.default)}`)}`;
      }

      return result;
    };
    const add_commands_lines = (commands: command[], pre_args: string[] = []) => {
      for (const command of commands) {
        const path = [...pre_args, command.name];

        lines.push(`  ${styleText('cyan', path.join(' '))} ${styleText('gray', '-')} ${command.description}`);

        const options = Object.entries(command.options);

        if (options.length > 0) {
          for (const [name, option] of options) {
            lines.push(`     ${styleText('dim', format_option(name, option as any))}`);
          }
        }

        if (command.subcommands) {
          add_commands_lines(command.subcommands, path);
        }
      }
    };
    add_commands_lines(cli.commands);
    lines.push('');
    lines.push(`Learn more: ${styleText('gray', 'https://') + styleText('cyan', 'sleetch') + styleText('cyanBright', '.dev')} `);
    lines.push(`            ${styleText('gray', 'https://github.com/tornado-softwares/') + styleText('cyan', 'sleetch')}`);
    console.log(lines.join('\n'));
  },
};
