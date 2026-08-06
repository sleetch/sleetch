import path from "node:path";
import { Glob } from "bun";
import { release_plan_file_path, root } from "./utils/constants";

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

const { releases } = await release_plan_file.json();

for (const release of releases) {
  console.log(`Publishing : ${release.name}@${release.newVersion}`);
  const cwd = packages_to_cwd.get(release.name);

  if (!cwd) {
    console.error("Could not find package cwd :", release.name);
    process.exit(0);
  }

  const build = Bun.spawnSync({
    cmd: ["bun", "run", "build"],
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });

  if (build.exitCode !== 0) {
    throw new Error(`Build failed for ${release.name}`);
  }

  await Bun.write(
    path.join(cwd, ".npmrc"),
    `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\n`,
  );

  const result = Bun.spawnSync({
    cmd: ["bun", "publish", "--no-git-checks", "--access", "public"],
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });

  if (result.exitCode !== 0) {
    throw new Error(`Publish failed for ${release.name}`);
  }
}

if (releases.length == 0) console.log("Nothing to publish..");
else console.log(`Publisheddd ${releases.length} packages.`);
