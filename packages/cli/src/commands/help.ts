import type { command } from '@/types/command';
import { styleText } from 'node:util';

export const help_command: command = {
  name: 'help',
  description: 'Get available commands.',
  fallback: true,
  action: (args, cli) => {
    let lines = [
      `${styleText('cyan', 'sleetch') + styleText('cyanBright', '.net')} is a powerful documentation framework.`,
      '',
      `Usage: ${styleText('cyan', 'sleetch')} ${styleText('gray', '<command>')} ${styleText('cyanBright', '[...args]')}`,
      '',
      'Commands:',
      '',
    ];
    for (const command of cli.commands) {
      lines.push(`   ${styleText('cyan', command.name)} ${styleText('gray', '-')} ${command.description}`);
    }

    lines.push('');
    lines.push(`Learn more: ${styleText('gray', 'https://') + styleText('cyan', 'sleetch') + styleText('cyanBright', '.dev')} `);
    lines.push(`            ${styleText('gray', 'https://github.com/tornado-softwares/') + styleText('cyan', 'sleetch')}`);

    console.log(lines.join('\n'));
  },
};
