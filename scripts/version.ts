import get_release_plan from '@changesets/get-release-plan';
import { release_plan_file_path, root } from './utils/constants';

const release_plan = await get_release_plan(root);
const releases = release_plan.releases
  .filter((r) => r.oldVersion !== r.newVersion)
  .map((r) => ({
    name: r.name,
    oldVersion: r.oldVersion,
    newVersion: r.newVersion,
    type: r.type,
  }));
await Bun.write(release_plan_file_path, JSON.stringify({ releases }, null, 2));
console.log(`Saved ${releases.length} releases.`);

const version = Bun.spawnSync(['changeset', 'version'], {
  stdio: ['inherit', 'inherit', 'inherit'],
});

if (version.exitCode !== 0) {
  process.exit(version.exitCode);
}

const update = Bun.spawnSync(['bun', 'update'], {
  stdio: ['inherit', 'inherit', 'inherit'],
});

process.exit(update.exitCode);
