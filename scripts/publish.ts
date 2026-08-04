import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const packagesDir = path.resolve("packages");
const entries = await readdir(packagesDir, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory()) continue;

  const packageDir = path.join(packagesDir, entry.name);
  const packageJson = path.join(packageDir, "package.json");

  if (!existsSync(packageJson)) continue;

  console.log(`Publication de ${entry.name}...`);

  const result = Bun.spawnSync({
    cmd: ["bun", "publish", "--no-git-checks", "--access", "public"],
    cwd: packageDir,
    stdout: "inherit",
    stderr: "inherit",
  });

  if (!result.success) {
    process.exit(result.exitCode ?? 1);
  }
}
