import type { command } from '@/types/command';
import { ladoc_runtime } from '@ladoc/core/compiler';

export class ladoc_cli {
  runtime = new ladoc_runtime();
  commands: command[] = [];
  private fallback?: command;

  constructor() {}

  add(command: command) {
    this.commands.push(command);
    if (command.fallback == true) {
      this.fallback = command;
    }
    return this;
  }

  run(args: string[]) {
    if (args.length == 0) {
      if (this.fallback) this.fallback.action([], this);
      else console.error(`ladoc: no command `);
      return;
    }
    const [command_name, ...command_args] = args;
    console.log(command_name);
    for (const command of this.commands) {
      if (command_name == command.name) {
        command.action(command_args, this);
        return;
      }
    }
    console.error(`ladoc: bad option: ${command_name}`);
  }
}
