import type { command } from '@/types/command';
import { styleText } from 'node:util';

export const help_command: command = {
  name: 'help',
  description: 'Get available commands.',
  fallback: true,
  action: (args, cli) => {
    let lines = [
      `${styleText('green', 'sleetch') + styleText('greenBright', '.net')} is a powerful documentation framework.`,
      '',
      `Usage: ${styleText('green', 'sleetch')} ${styleText('gray', '<command>')} ${styleText('greenBright', '[...args]')}`,
      '',
      'Commands:',
      '',
    ];
    for (const command of cli.commands) {
      lines.push(`   ${styleText('green', command.name)} ${styleText('gray', '-')} ${command.description}`);
    }

    lines.push('');
    lines.push(`Learn more: ${styleText('gray', 'https://') + styleText('green', 'sleetch') + styleText('greenBright', '.net')} `);
    lines.push(`            ${styleText('gray', 'https://github.com/tornado-softwares/') + styleText('green', 'sleetch')}`);

    console.log(lines.join('\n'));
  },
};
