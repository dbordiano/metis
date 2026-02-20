#!/usr/bin/env node
/**
 * CSS Audit utility — analyzes CSS for specificity and performance.
 * Usage: node css-audit.js <path-to-css-file>
 * Or: import { audit } from './css-audit.js'; audit(cssString);
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Compute specificity for a simple selector string (a,b,c format).
 * IDs, classes/attributes/pseudo-classes, elements/pseudo-elements.
 */
function specificity(selector) {
  const s = selector.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  let a = (s.match(/#[a-zA-Z_-][\w-]*/g) || []).length;
  const classes = (s.match(/\.[a-zA-Z_-][\w-]*/g) || []).length;
  const attrs = (s.match(/\[[^\]]+\]/g) || []).length;
  const pseudos = (s.match(/:[a-zA-Z_-][\w-]*(?:\s|$|\))/g) || []).length;
  let b = classes + attrs + pseudos;
  const elements = (s.match(/(?<=^|[\s+>~])([a-zA-Z][\w-]*)/g) || []).length;
  const pseudoElements = (s.match(/::[a-zA-Z_-][\w-]*/g) || []).length;
  let c = elements + pseudoElements;
  return { a, b, c, score: a * 100 + b * 10 + c };
}

/**
 * Parse CSS into rules (simplified; doesn't handle @keyframes etc. in detail).
 */
function parseRules(css) {
  const rules = [];
  const block = /([^{]+)\{([^}]*)\}/g;
  let m;
  while ((m = block.exec(css)) !== null) {
    const selectors = m[1].split(',').map(s => s.trim()).filter(Boolean);
    const decls = m[2];
    const importantCount = (decls.match(/!important/g) || []).length;
    rules.push({
      selectors,
      decls,
      importantCount,
      specificity: selectors.map(s => specificity(s)),
    });
  }
  return rules;
}

/**
 * Audit CSS and return a report object.
 */
export function audit(cssString) {
  const rules = parseRules(cssString);
  const report = {
    totalRules: rules.length,
    highSpecificity: [],
    importantUsage: [],
    suggestions: [],
  };

  for (const rule of rules) {
    const maxSpec = rule.specificity.reduce((acc, s) => (s.score > acc.score ? s : acc), { score: 0 });
    if (maxSpec.score >= 100) {
      report.highSpecificity.push({
        selectors: rule.selectors,
        specificity: maxSpec,
      });
    }
    if (rule.importantCount > 0) {
      report.importantUsage.push({
        selectors: rule.selectors,
        count: rule.importantCount,
      });
    }
  }

  if (report.highSpecificity.length > 0) {
    report.suggestions.push('Consider lowering specificity with :where() or cascade layers (@layer).');
  }
  if (report.importantUsage.length > 0) {
    report.suggestions.push('Reduce !important; prefer cascade order or custom properties.');
  }
  if (report.suggestions.length === 0 && rules.length > 0) {
    report.suggestions.push('No major specificity or !important issues found.');
  }

  return report;
}

/**
 * Audits CSS for specificity, performance, and maintainability.
 * Returns an issues array and suggested_code compatible with the css-audit command schema.
 * @param {string} css - CSS code to audit.
 * @returns {{ issues: Array<{ type: string, selector: string, fix: string }>, suggested_code: string }} - Audit report with issues and fixes.
 */
export function auditCSS(css) {
  const issues = [];
  const beforeAfter = [];

  const rules = parseRules(css);
  for (const rule of rules) {
    for (const sel of rule.selectors) {
      const trimmed = sel.trim();
      const spec = specificity(trimmed);
      const parts = trimmed.split(/\s+/).filter(Boolean);
      const isCompound = parts.length > 1;
      const highSpec = spec.score >= 100 || spec.b >= 2;
      if (isCompound && (highSpec || parts.length > 2)) {
        const fixSelector = `:where(${parts.slice(0, -1).join(', ')}) ${parts[parts.length - 1]}`;
        issues.push({
          type: 'high-specificity',
          selector: trimmed,
          fix: `Use :where() to lower specificity: ${fixSelector}`,
        });
        beforeAfter.push({ before: trimmed, after: fixSelector });
      }
    }
    if (rule.importantCount > 0) {
      issues.push({
        type: 'important-usage',
        selector: rule.selectors.join(', '),
        fix: 'Remove !important; use cascade order or custom properties instead.',
      });
    }
  }

  const suggested_code = beforeAfter.length > 0
    ? beforeAfter.map(({ before, after }) => `/* Before */\n${before} { ... }\n/* After */\n${after} { ... }`).join('\n\n')
    : '/* No high-specificity selectors to fix */';

  return { issues, suggested_code };
}

/**
 * Format audit report as Markdown.
 */
export function formatReport(report) {
  const lines = [
    '# CSS Audit Report',
    '',
    `- **Total rules:** ${report.totalRules}`,
    '',
  ];
  if (report.highSpecificity.length > 0) {
    lines.push('## High specificity');
    report.highSpecificity.forEach(({ selectors, specificity: s }) => {
      lines.push(`- \`${selectors.join(', ')}\` → (${s.a},${s.b},${s.c})`);
    });
    lines.push('');
  }
  if (report.importantUsage.length > 0) {
    lines.push('## !important usage');
    report.importantUsage.forEach(({ selectors, count }) => {
      lines.push(`- \`${selectors.join(', ')}\` — ${count} use(s)`);
    });
    lines.push('');
  }
  lines.push('## Suggestions');
  report.suggestions.forEach((s) => lines.push(`- ${s}`));
  return lines.join('\n');
}

function main() {
  const pathArg = process.argv[2];
  if (!pathArg) {
    console.error('Usage: node css-audit.js <path-to-css-file>');
    process.exit(1);
  }
  const filePath = resolve(process.cwd(), pathArg);
  let css;
  try {
    css = readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error('Error reading file:', e.message);
    process.exit(1);
  }
  const report = audit(css);
  console.log(formatReport(report));
}

if (process.argv[1] === resolve(__dirname, 'css-audit.js')) {
  main();
}
