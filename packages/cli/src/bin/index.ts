#!/usr/bin/env node

import { build_command } from '@/commands/build';
import { help_command } from '@/commands/help';
import { watch_command } from '@/commands/watch';
import { sleetch_cli } from '@/lib/cli';

const sleetch = new sleetch_cli().add(help_command).add(build_command).add(watch_command);

sleetch.run(process.argv.slice(2));
