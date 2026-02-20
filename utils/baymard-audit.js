#!/usr/bin/env node
/**
 * Baymard-style ecommerce UX audit — checks HTML against product grid / PDP / cart guidelines.
 * Usage: node baymard-audit.js <path-to-html-file>
 * Or: import { audit } from './baymard-audit.js'; audit(htmlString);
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Checklist IDs and labels aligned with docs/baymard-guidelines.md */
const PRODUCT_GRID_CHECKS = [
  { id: 'image-link', label: 'Product image is linked to PDP', test: (doc) => doc.querySelectorAll('a img').length > 0 || doc.querySelectorAll('[data-product-link] img').length > 0 },
  { id: 'visible-price', label: 'Price visible on listing', test: (doc) => /price|\\$|€|£|\d+\.\d{2}/i.test(doc.body?.innerText || '') && (doc.querySelector('[class*="price"]') || doc.querySelector('[itemprop="price"]')) },
  { id: 'cta-add-cart', label: 'Clear add-to-cart or view CTA', test: (doc) => /add to cart|add to bag|buy|view product|shop now/i.test(doc.body?.innerText || '') },
  { id: 'product-title', label: 'Product title/name present', test: (doc) => doc.querySelector('h2, h3, [class*="title"], [class*="name"], [itemprop="name"]') },
  { id: 'semantic-structure', label: 'Semantic structure (e.g. article)', test: (doc) => doc.querySelector('article, [role="listitem"]') || doc.querySelectorAll('.product-card, [class*="product"]').length > 0 },
];

function parseHtml(html) {
  if (typeof document !== 'undefined' && typeof DOMParser !== 'undefined') {
    return new DOMParser().parseFromString(html, 'text/html');
  }
  if (globalThis.JSDOM) {
    return new globalThis.JSDOM(html).window.document;
  }
  if (globalThis.cheerio) {
    const $ = globalThis.cheerio.load(html);
    return {
      querySelector: (s) => $(s).get(0),
      querySelectorAll: (s) => $(s).get(),
      body: { innerText: $('body').text() },
    };
  }
  return null;
}

/**
 * Run product-grid checks. In Node without JSDOM, we do simple regex/string checks.
 */
function runProductGridChecks(html, doc) {
  const results = [];
  const body = (doc?.body?.innerText ?? doc?.body?.text?.() ?? html).replace(/\s+/g, ' ');
  const hasPrice = /\$|€|£|\d+\.\d{2}/.test(body) && (/price|cost/i.test(html) || /itemprop="price"/.test(html));
  const hasCta = /add to cart|add to bag|buy now|view product|shop now/i.test(body);
  const hasTitle = /<h[23]|class="[^"]*title[^"]*"|class="[^"]*name[^"]*"|itemprop="name"/.test(html);
  const hasImageLink = /<a[^>]*>[\s\S]*?<img|href="[^"]*"[^>]*>[\s\S]*?<img/.test(html);
  const hasStructure = /<article|role="listitem"|class="[^"]*product[^"]*"/.test(html);

  results.push({ id: 'visible-price', label: 'Price visible on listing', pass: hasPrice });
  results.push({ id: 'cta-add-cart', label: 'Clear add-to-cart or view CTA', pass: hasCta });
  results.push({ id: 'product-title', label: 'Product title/name present', pass: hasTitle });
  results.push({ id: 'image-link', label: 'Product image linked to PDP', pass: hasImageLink });
  results.push({ id: 'semantic-structure', label: 'Semantic structure (article/card)', pass: hasStructure });

  return results;
}

/**
 * Audit HTML string against Baymard-style ecommerce guidelines.
 */
export function audit(htmlString) {
  const doc = parseHtml(htmlString);
  const productGrid = runProductGridChecks(htmlString, doc);
  const passed = productGrid.filter((r) => r.pass).length;
  const total = productGrid.length;
  return {
    section: 'Product grid / listing',
    checks: productGrid,
    summary: { passed, total, score: total ? Math.round((passed / total) * 100) : 0 },
  };
}

/**
 * Ecommerce audit returning an array of issue messages (failed checks).
 * Use for quick checks: auditEcommerce(html) => ["Missing ...", ...]
 * @param {string} htmlString - HTML to audit (e.g. product grid or page fragment).
 * @returns {string[]} - List of issue descriptions for failed checks.
 */
export function auditEcommerce(htmlString) {
  const result = audit(htmlString);
  const issues = result.checks
    .filter((c) => !c.pass)
    .map((c) => `Missing or insufficient: ${c.label}`);
  return issues;
}

/**
 * Format audit as Markdown.
 */
export function formatReport(auditResult) {
  const lines = [
    '# Baymard-style Ecommerce UX Audit',
    '',
    `## ${auditResult.section}`,
    '',
    `**Score: ${auditResult.summary.passed}/${auditResult.summary.total}** (${auditResult.summary.score}%)`,
    '',
    '| Check | Status |',
    '|-------|--------|',
  ];
  auditResult.checks.forEach((c) => {
    lines.push(`| ${c.label} | ${c.pass ? '✅ Pass' : '❌ Fail'} |`);
  });
  return lines.join('\n');
}

function main() {
  const pathArg = process.argv[2];
  if (!pathArg) {
    console.error('Usage: node baymard-audit.js <path-to-html-file>');
    process.exit(1);
  }
  const filePath = resolve(process.cwd(), pathArg);
  let html;
  try {
    html = readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error('Error reading file:', e.message);
    process.exit(1);
  }
  const result = audit(html);
  console.log(formatReport(result));
}

if (process.argv[1] === resolve(__dirname, 'baymard-audit.js')) {
  main();
}
