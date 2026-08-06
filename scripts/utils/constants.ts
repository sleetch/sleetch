import path from 'path';

export const root = process.cwd();

export const release_plan_file_path = path.join(root, '.changeset', 'release-plan.json');

export const release_plan_file = Bun.file(release_plan_file_path);
