import path from "node:path";
import { Glob } from "bun";
import { release_plan_file_path, root } from "./utils/constants";
import type { ReleasePlan } from "@changesets/types";

const packages_to_cwd = new Map<string, string>();

for await (const file of new Glob("**/package.json").scan({ cwd: root })) {
  if (file === "package.json") continue;
  const pkg = await Bun.file(path.join(root, file)).json();
  if (pkg.name) {
    packages_to_cwd.set(pkg.name, path.dirname(path.join(root, file)));
  }
}

const release_plan_file = Bun.file(release_plan_file_path);

if (!(await release_plan_file.exists())) {
  console.error("release-plan.json is missing");
  process.exit(0);
}

const release_plan: ReleasePlan = await release_plan_file.json();
const releases = release_plan.releases.filter((release) => {
  const npmCheck = Bun.spawnSync({
    cmd: ["npm", "view", `${release.name}@${release.newVersion}`, "version"],
    stdout: "pipe",
    stderr: "ignore",
  });

  const exists = npmCheck.exitCode === 0;

  if (exists) {
    console.log(
      `Skipping ${release.name}@${release.newVersion} (already published)`,
    );
    return false;
  }

  return true;
});

if (releases.length > 0) {
  Bun.spawnSync({
    cmd: ["bun", "run", "build"],
    cwd: root,
    stdout: "inherit",
    stderr: "inherit",
  });

  for (const release of releases) {
    const cwd = packages_to_cwd.get(release.name);

    console.log(`Publishing : ${release.name}@${release.newVersion}`);

    if (!cwd) {
      console.error("Could not find package cwd :", release.name);
      process.exit(0);
    }

    const result = Bun.spawnSync({
      cmd: ["bun", "publish", "--no-git-checks", "--access", "public"],
      cwd,
      stdout: "inherit",
      stderr: "inherit",
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
} else if (releases.length == 0) console.log("Nothing to publish..");
