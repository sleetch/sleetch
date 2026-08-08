import type { command } from '@/types/command';
import { ladoc_runtime } from '@ladoc/core/compiler';
import { styleText } from 'node:util';

export class ladoc_cli {
  private runtime = new ladoc_runtime();
  private commands: command[] = [];

  constructor() {
    this.commands.push({
      name: 'help',
      description: 'Get available commands.',
      action: () => {
        let lines = [
          `${styleText('green', 'ladoc') + styleText('greenBright', '.net')} is a powerful documentation framework.`,
          '',
          `Usage: ${styleText('green', 'ladoc')} ${styleText('gray', '<command>')} ${styleText('greenBright', '[...args]')}`,
          '',
          'Commands:',
          '',
        ];
        for (const command of this.commands) {
          lines.push(`   ${styleText('green', command.name)} ${styleText('gray', '-')} ${command.description}`);
        }

        lines.push('');
        lines.push(`Learn more: ${styleText('gray', 'https://') + styleText('green', 'ladoc') + styleText('greenBright', '.net')} `);
        lines.push(`            ${styleText('gray', 'https://github.com/tornado-softwares/') + styleText('green', 'ladoc')}`);

        console.log(lines.join('\n'));
      },
    });
  }

  add(command: command) {
    this.commands.push(command);
    return this;
  }

  run(args: string[]) {
    if (args.length == 0) {
      this.commands[0].action([], this.runtime);
      return;
    }
    const [command_name, ...command_args] = args;
    for (const command of this.commands) {
      if (command_name == command.name) {
        command.action(command_args, this.runtime);
        return;
      }
    }
    console.error(`ladoc: bad option: ${command_name}`);
  }
}
