#!/usr/bin/env node

import { build_command } from '@/commands/build';
import { create_command } from '@/commands/create';
import { help_command } from '@/commands/help';
import { studio_command } from '@/commands/studio';
import { sleetch_cli } from '@/lib/cli';

const sleetch = new sleetch_cli().add(help_command).add(build_command).add(studio_command).add(create_command);

sleetch.run(process.argv.slice(2));
