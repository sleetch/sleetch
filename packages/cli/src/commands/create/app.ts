import { createReadStream, createWriteStream, existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pipeline } from 'node:stream';
import { promisify, styleText } from 'node:util';
import zlib from 'node:zlib';
import tar from 'tar-fs';
import cli_package_json from '@/../package.json' with { type: 'json' };
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
  action: async (options, cli) => {
    const temp_directory = path.join(tmpdir(), 'sleetch');
    const cwd = process.cwd();
    const source_code_tarball_url = 'https://github.com/sleetch/sleetch/archive/main.tar.gz';
    const source_code_download_path = path.join(temp_directory, 'source.tar.gz');
    const source_code_extract_path = temp_directory;

    await rm(temp_directory, { recursive: true, force: true });
    await mkdir(temp_directory, { recursive: true });

    const templates: Record<string, any> = {
      'react-router': '/sleetch-main/templates/react-router',
      'next-webpack': '/sleetch-main/templates/next-webpack',
    };

    const name = options.get_string_option('name');
    const framework = options.get_string_option('framework');
    if (name === undefined) return cli.error('missing arg', 'name is missing.');
    if (framework === undefined) return cli.error('missing arg', 'framework is missing.');
    if (!Object.keys(templates).includes(framework)) return cli.error('bad option', `framework must be : ${Object.keys(templates).join(' / ')}`);

    const final_template_directory = path.join(cwd, name);

    if (existsSync(final_template_directory)) {
      return cli.error('error', `${final_template_directory} already exist on your filesystem.`);
    }

    await mkdir(final_template_directory, { recursive: true });

    const response = await fetch(source_code_tarball_url);
    if (response.ok && response.body) {
      await promisify(pipeline)(response.body, createWriteStream(source_code_download_path));
      await promisify(pipeline)(createReadStream(source_code_download_path), zlib.createGunzip(), tar.extract(source_code_extract_path, {}));
      const temp_project_path = path.join(temp_directory, templates[framework]);
      const temp_project_package_json_path = path.join(temp_directory, templates[framework], 'package.json');
      const package_json_content = await readFile(temp_project_package_json_path, { encoding: 'utf-8' });
      await writeFile(temp_project_package_json_path, package_json_content.replaceAll('workspace:*', cli_package_json.version), {
        encoding: 'utf-8',
      });
      await cp(temp_project_path, final_template_directory, { recursive: true });
      await rm(temp_directory, { recursive: true, force: true });
    } else {
      return cli.error('error', 'could not fetch the template.');
    }

    const lines = [`${styleText('cyan', 'sleetch') + styleText('cyanBright', '.dev')} is a powerful documentation framework.`];
    lines.push('');
    lines.push(
      `The sleetch ${styleText('dim', framework)} documentation template has been downloaded. I hope it will be useful for ${styleText('dim', name)}. `
    );
    lines.push('');
    lines.push(`Check your project: cd ./${name} `);
    lines.push(
      `Install the dependencies: ${styleText('cyan', 'bun') + styleText('dim', '/') + styleText('white', 'npm') + styleText('dim', '/') + styleText('white', 'pnpm')} install`
    );
    lines.push('');
    lines.push(`Learn more: ${styleText('gray', 'https://') + styleText('cyan', 'sleetch') + styleText('cyanBright', '.dev')} `);
    lines.push(`            ${styleText('gray', 'https://github.com/tornado-softwares/') + styleText('cyan', 'sleetch')}`);
    console.log(lines.join('\n'));
  },
};
