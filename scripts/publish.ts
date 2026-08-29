import type { ReleasePlan } from '@changesets/types';
import { release } from 'process';
import { release_plan_file, root } from './utils/constants';
import { packages_to_cwd } from './utils/cwd';

if (!(await release_plan_file.exists())) {
  console.error('release-plan.json is missing');
  process.exit(0);
}

const release_plan: ReleasePlan = await release_plan_file.json();
const releases = release_plan.releases
  .filter((release) => {
    const exists =
      Bun.spawnSync({
        cmd: ['npm', 'view', `${release.name}@${release.newVersion}`, 'version'],
        stdout: 'pipe',
        stderr: 'ignore',
      }).exitCode === 0;

    if (exists) {
      console.warn(`Skipping ${release.name}@${release.newVersion} (already published)`);
      return false;
    }
    if (!packages_to_cwd.has(release.name)) {
      console.warn(`Skipping ${release.name}@${release.newVersion} (cwd not found)`);
      return false;
    }
    return true;
  })
  .map((release) => {
    return {
      ...release,
      cwd: packages_to_cwd.get(release.name)!,
    };
  });

if (releases.length > 0) {
  Bun.spawnSync({
    cmd: ['bun', 'run', 'build'],
    cwd: root,
    stdout: 'inherit',
    stderr: 'inherit',
  });

  for (const release of releases) {
    console.log(`Publishing : ${release.name}@${release.newVersion}`);

    const result = Bun.spawnSync({
      cmd: ['bun', 'publish', '--no-git-checks', '--access', 'public'],
      cwd: release.cwd,
      stdout: 'inherit',
      stderr: 'inherit',
      env: {
        ...process.env,
        NPM_CONFIG_TOKEN: process.env.NPM_TOKEN,
      },
    });

    if (result.exitCode !== 0) {
      throw new Error(`Publish failed for ${release.name}`);
    }
  }
  console.log(`Publisheddd ${releases.length} packages.`);
} else if (releases.length == 0) {
  console.log('Nothing to publish..');
}
