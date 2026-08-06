import type { command } from '@/types/command';
import { ladoc_runtime } from '@ladoc/core/compiler';

export class ladoc_cli {
  private runtime = new ladoc_runtime();
  private commands: command[] = [];

  constructor() {}

  add(command: command) {
    this.commands.push(command);
    return this;
  }
  run(args: string[]) {
    if (args.length == 0) {
      console.log('Please use a command');
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
