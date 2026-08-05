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
const releases = release_plan.releases.filter(
  (r) => r.oldVersion !== r.newVersion,
);

for (const release of releases) {
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

if (releases.length == 0) console.log("Nothing to publish..");
else console.log(`Publisheddd ${releases.length} packages.`);
