/**
 * Tufte-style chart utility — generates small multiples and minimal data-ink SVGs.
 * Use: import { generateSmallMultiples } from './tufte-chart.js';
 */

const DEFAULT_OPTIONS = {
  width: 400,
  height: 300,
  margin: { top: 20, right: 20, bottom: 30, left: 40 },
  stroke: '#333',
  fill: 'rgba(0,0,0,0.1)',
  fontSize: 12,
  fontFamily: 'Georgia, serif',
};

/**
 * Generate SVG for a single small-multiple panel (one series).
 */
function singlePanel(data, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { width, height, margin, stroke, fill, fontSize, fontFamily } = opts;
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;
  const values = data.map((d) => (typeof d === 'number' ? d : d.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = margin.left + (i / (values.length - 1 || 1)) * w;
    const y = margin.top + h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  const pathD = points ? `M ${points.split(' ').join(' L ')}` : '';

  return `
  <g class="panel">
    <path d="${pathD}" fill="none" stroke="${stroke}" stroke-width="1.5"/>
    <text x="${margin.left}" y="${margin.top - 6}" font-size="${fontSize}" font-family="${fontFamily}" fill="${stroke}">${max.toFixed(1)}</text>
    <text x="${margin.left}" y="${margin.top + h + 4}" font-size="${fontSize}" font-family="${fontFamily}" fill="${stroke}">${min.toFixed(1)}</text>
  </g>`;
}

/**
 * Generate a full small-multiples SVG (multiple panels, same scale).
 */
export function generateSmallMultiples(datasets, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { width, height, margin } = opts;
  const cols = options.columns ?? 2;
  const rows = Math.ceil(datasets.length / cols);
  const totalWidth = width * cols;
  const totalHeight = height * rows;
  const allValues = datasets.flatMap((d) => d.map((v) => (typeof v === 'number' ? v : v.value)));
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);

  const panels = datasets.map((data, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * width;
    const y = row * height;
    const panelOpts = { ...opts, globalMin, globalMax };
    const panelSvg = singlePanel(data, panelOpts);
    return `<g transform="translate(${x},${y})">${panelSvg}</g>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}" class="tufte-small-multiples">
  <title>Small multiples</title>
  ${panels}
</svg>`;
}

/**
 * Generate a simple line chart SVG (single series, Tufte-style: minimal ink).
 */
export function generateLineChart(data, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { width, height, margin, stroke, fontSize, fontFamily } = opts;
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;
  const values = data.map((d) => (typeof d === 'number' ? d : d.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = margin.left + (i / (values.length - 1 || 1)) * w;
    const y = margin.top + h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const pathD = points.length ? `M ${points.join(' L ')}` : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" class="tufte-line-chart">
  <path d="${pathD}" fill="none" stroke="${stroke}" stroke-width="1.5"/>
  <text x="${margin.left}" y="${margin.top - 6}" font-size="${fontSize}" font-family="${fontFamily}">${max.toFixed(1)}</text>
  <text x="${margin.left}" y="${margin.top + h + 4}" font-size="${fontSize}" font-family="${fontFamily}">${min.toFixed(1)}</text>
</svg>`;
}
