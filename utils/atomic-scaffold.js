#!/usr/bin/env node
/**
 * Atomic Design scaffold — generates folder and stub files for atoms, molecules, organisms.
 * Usage: node atomic-scaffold.js <ComponentName> <atom|molecule|organism>
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LEVELS = ['atom', 'molecule', 'organism'];

function toPascal(str) {
  return str.replace(/(?:^|-|\s)(\w)/g, (_, c) => c.toUpperCase());
}

function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate folder structure and files for an Atomic component.
 * @param {string} componentName - e.g. "Button", "ProductCard"
 * @param {string} level - "atom" | "molecule" | "organism"
 * @param {string} basePath - directory to create component in (default cwd)
 * @returns {{ path: string, files: string[] }}
 */
export function scaffold(componentName, level, basePath = process.cwd()) {
  const normalizedLevel = level.toLowerCase();
  if (!LEVELS.includes(normalizedLevel)) {
    throw new Error(`Level must be one of: ${LEVELS.join(', ')}`);
  }
  const name = toPascal(componentName);
  const kebab = toKebab(name);
  const folder = join(basePath, normalizedLevel + 's', kebab);
  const files = [];

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }

  const componentContent = getComponentStub(name, normalizedLevel);
  const indexPath = join(folder, 'index.js');
  const componentPath = join(folder, `${kebab}.jsx`);

  writeFileSync(componentPath, componentContent, 'utf8');
  files.push(componentPath);

  const indexContent = `export { default } from './${kebab}';\n`;
  writeFileSync(indexPath, indexContent, 'utf8');
  files.push(indexPath);

  return { path: folder, files };
}

function getComponentStub(name, level) {
  const comment = {
    atom: 'Single UI element; use design tokens for colors/spacing.',
    molecule: 'Combination of atoms; keep to one responsibility.',
    organism: 'Section of UI combining molecules and/or atoms.',
  }[level];

  return `/**
 * ${name} — ${level}
 * ${comment}
 * Tokens: var(--color-*), var(--space-*), var(--font-*), var(--radius-*)
 */

export default function ${name}(props) {
  return (
    <div className="${toKebab(name)}" data-level="${level}">
      {/* TODO: implement using design tokens */}
    </div>
  );
}
`;
}

/**
 * Generate base Atomic Design folder structure (atoms/, molecules/, organisms/) under output path.
 * @param {string} basePath - Directory to create structure in.
 * @returns {{ path: string, dirs: string[] }}
 */
export function scaffoldStructure(basePath = process.cwd()) {
  const names = ['atoms', 'molecules', 'organisms'];
  const dirs = names.map((name) => join(basePath, name));
  dirs.forEach((dir, i) => {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const readme = join(dir, 'README.md');
    const label = names[i].replace(/s$/, '');
    if (!existsSync(readme)) {
      writeFileSync(readme, `# ${names[i]}\n\nAdd ${label} components here.\n`, 'utf8');
    }
  });
  return { path: basePath, dirs };
}

function main() {
  const args = process.argv.slice(2);
  const outputIdx = args.indexOf('--output');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    const outputPath = resolve(process.cwd(), args[outputIdx + 1]);
    try {
      const { path: folder, dirs } = scaffoldStructure(outputPath);
      console.log('Created structure at:', folder);
      dirs.forEach((d) => console.log('  -', d));
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
    return;
  }
  const [componentName, level] = args;
  if (!componentName || !level) {
    console.error('Usage: node atomic-scaffold.js <ComponentName> <atom|molecule|organism>');
    console.error('   or: node atomic-scaffold.js --output <path>   # e.g. ./my-project/components');
    process.exit(1);
  }
  try {
    const { path: folder, files } = scaffold(componentName, level);
    console.log('Created:', folder);
    files.forEach((f) => console.log('  -', f));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

if (process.argv[1] === resolve(__dirname, 'atomic-scaffold.js')) {
  main();
}
