import fs from 'node:fs';
import path from 'node:path';

function walk(dir: string, base = './src', out: Record<string, string> = {}) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        const rel = path.relative('src', full).replace(/\\/g, '/');

        if (entry.isDirectory()) {
            walk(full, base, out);
        } else if (entry.name.endsWith('.css')) {
            out[`./${rel}`] = `./src/${rel}`;
        }
    }

    return out;
}

const exports = walk('./src');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

packageJson.exports = exports;

fs.writeFileSync('package.json', `${JSON.stringify(packageJson, null, 2)}\n`);

console.log('Exported', Object.keys(exports).length, 'css files !');
