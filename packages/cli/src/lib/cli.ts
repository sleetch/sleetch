import { parseArgs, styleText } from 'node:util';
import type { command } from '@/types/command';

export class sleetch_cli {
    commands: command[] = [];
    private fallback?: command;

    add(command: command) {
        this.commands.push(command);
        if (command.active === true && command.fallback === true) {
            this.fallback = command;
        }
        return this;
    }

    resolve(args: string[]): { found: true; command: command; args: string[] } | { found: false; error: string; type: string } {
        if (args.length === 0) {
            if (this.fallback) {
                return { found: true, command: this.fallback, args };
            }
            return { found: false, type: 'empty args', error: 'no command found' };
        }
        const [command_name, ...command_args] = args;
        for (const command of this.commands) {
            if (command_name === command.name) {
                if (!command.subcommands || command.subcommands.length === 0) {
                    if (command.active) {
                        return { found: true, command, args: command_args };
                    } else {
                        return { found: false, type: 'bad option', error: `inactive command: ${command_name}` };
                    }
                } else {
                    const sub_cli = new sleetch_cli();
                    sub_cli.add({ ...command, fallback: true });
                    for (const sub_command of command.subcommands) {
                        sub_cli.add(sub_command);
                    }
                    const sub_command = sub_cli.resolve(command_args);
                    if (sub_command.found) {
                        return sub_command;
                    } else if (command.active) {
                        return { found: true, command, args: command_args };
                    }
                }
            }
        }
        return { found: false, type: 'bad option', error: args.join(' ') };
    }

    run(args: string[]) {
        const resolve = this.resolve(args);
        if (resolve.found === true) {
            const { command, args } = resolve;

            const parsed = parseArgs({
                args,
                options: command.options,
                allowPositionals: true,
                strict: false,
            });

            const get_boolean_option = (name: string): boolean | undefined => {
                const value = parsed.values[name];
                return typeof value === 'boolean' ? value : undefined;
            };

            const get_string_option = (name: string): string | undefined => {
                const value = parsed.values[name];
                return typeof value === 'string' ? value : undefined;
            };

            command.action(
                {
                    args,
                    get_boolean_option,
                    get_string_option,
                },
                this
            );
        } else {
            const { error, type } = resolve;
            this.error(type, error);
        }
    }

    error(type: string, error: string) {
        console.error(styleText('red', `sleetch: ${type}: ${error}`));
    }
}
