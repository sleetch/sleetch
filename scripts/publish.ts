import path from "node:path";
import { Glob } from "bun";
import get_release_plan from "@changesets/get-release-plan";

const root = process.cwd();
const packages_to_cwd = new Map<string, string>();

for await (const file of new Glob("**/package.json").scan({ cwd: root })) {
  if (file === "package.json") continue;
  const pkg = await Bun.file(path.join(root, file)).json();
  if (pkg.name) {
    packages_to_cwd.set(pkg.name, path.dirname(path.join(root, file)));
  }
}

const release_plan = await get_release_plan(root);

for (const release of release_plan.releases) {
  if (release.oldVersion !== release.newVersion) {
    console.log(`Publishing : ${release.name}@${release.newVersion}`);
    const result = Bun.spawnSync({
      cmd: ["bun", "publish", "--no-git-checks", "--access", "public"],
      cwd: packages_to_cwd.get(release.name),
      stdout: "inherit",
      stderr: "inherit",
    });

    if (!result.success) {
      process.exit(result.exitCode ?? 1);
    }
  }
}
