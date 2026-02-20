# Metis (2026)

**Metis** is a **research-backed**, **actionable** package of skills and commands for AI agentic tools (Cursor, Claude, etc.). Integrate it into your workflow to build **modern, accessible, and high-performing** digital products.

## Features

- **CSS Best Practices**: Modern features (container queries, `:has()`, `clamp()`), performance tips, and Coyier’s reset.
- **Atomic Design**: Modular component libraries and design systems (atoms, molecules, organisms).
- **Cognitive Bias UX**: Bias-aware design, choice architecture, and empathy mapping.
- **Data Visualization**: Tufte’s principles for clear, honest charts and small multiples.
- **Ecommerce UX**: Baymard’s 700+ guidelines for high-conversion product listings, cart, and checkout.
- **Motion & Accessibility**: Reduced-motion support, duration/easing, and motion audits.
- **AI Agent Commands**: Ready-to-use prompts and JSON command definitions for Cursor/Claude.

## Installation

### Option 1: Download zip into your project (recommended)

From your **project root** (where you want a `metis` folder):

```bash
curl -sL https://github.com/dbordiano/metis/archive/refs/heads/main.tar.gz | tar -xzf - && mv metis-main metis
```

Then wire up Cursor or Claude: see **[Integrating Metis with Cursor and Claude](docs/INTEGRATION.md)**.

**One command with Cursor setup:** (downloads Metis and copies rules into `.cursor/rules/`)

```bash
curl -sL https://raw.githubusercontent.com/dbordiano/metis/main/scripts/install.sh | bash -s -- --cursor
```

### Option 2: Clone

```bash
git clone https://github.com/dbordiano/metis.git
cd metis
```

**Node.js** v18+ is recommended for running the utilities (optional; no `npm install` required).

## Quick Start

```bash
# Audit CSS for specificity and maintainability
node utils/css-audit.js path/to/styles.css

# Scaffold an Atomic component (atom, molecule, organism)
node utils/atomic-scaffold.js Button molecule

# Scaffold full Atomic Design folder structure (atoms/, molecules/, organisms/)
node utils/atomic-scaffold.js --output ./my-project/components

# Audit ecommerce product grid (Baymard-style)
node utils/baymard-audit.js templates/product-grid.html
```

## Usage Examples

### 1. CSS Audit

Package uses **ESM**. Import and call `auditCSS` with a CSS string:

```javascript
import { auditCSS } from './utils/css-audit.js';

const report = auditCSS(`.header nav a { color: red; }`);
console.log(report.issues);
// Output: [{ type: "high-specificity", selector: ".header nav a", fix: "Use :where(.header, nav) a" }]
```

### 2. Atomic Design Scaffold

Generate the base folder structure (atoms, molecules, organisms) under a path:

```bash
node utils/atomic-scaffold.js --output ./my-project/components
# Creates: my-project/components/atoms/, molecules/, organisms/ (each with README)
```

Generate a single component:

```bash
node utils/atomic-scaffold.js Button molecule
# Creates: molecules/button/button.jsx, index.js
```

### 3. Baymard Ecommerce Audit

Use `auditEcommerce` for an array of issue messages (failed checks):

```javascript
import { auditEcommerce } from './utils/baymard-audit.js';

const issues = auditEcommerce('<div class="product-grid">...</div>');
console.log(issues);
// Output: ["Missing or insufficient: Price visible on listing", "Missing or insufficient: Clear add-to-cart or view CTA", ...]
```

Use `audit()` for the full report (checks, summary, score) or run from CLI:

```bash
node utils/baymard-audit.js path/to/page.html
```

## Package Structure

| Folder       | Contents |
|-------------|----------|
| **commands/** | JSON command definitions by category (CSS, Atomic Design, Cognitive Bias, Data Viz, Ecommerce UX, Motion). Each command includes `parameters`, `example_input`, `example_output`, and `empirical_sources`. |
| **utils/**    | JavaScript utilities: `css-audit.js`, `atomic-scaffold.js`, `baymard-audit.js`, `tufte-chart.js`. |
| **templates/**| Coyier-style reset, design tokens, Baymard-compliant product grid HTML, small-multiples SVG. |
| **docs/**     | Best-practice docs: CSS (2026), Atomic Design, cognitive-bias codex, Tufte principles, Baymard guidelines. |

## AI Tool Integration

- **Cursor**: Run the install script with `--cursor` (see above) or copy `metis/cursor/metis-commands.mdc` and `metis/commands/*.json` into `.cursor/rules/`. Full steps: [docs/INTEGRATION.md](docs/INTEGRATION.md).
- **Claude**: Paste the contents of `metis/claude/instructions.md` into your project’s Project Instructions (or Custom Instructions). Full steps: [docs/INTEGRATION.md](docs/INTEGRATION.md).

## Empirical Sources

- **CSS**: MDN, Can I Use, W3C, [LogRocket CSS 2026](https://blog.logrocket.com/css-in-2026/), [Project Wallace](https://www.projectwallace.com/the-css-selection/2026)
- **Atomic Design**: [Brad Frost – Atomic Design](https://atomicdesign.bradfrost.com/)
- **Cognitive bias**: [Nielsen Norman Group](https://www.nngroup.com/), behavioral design literature
- **Data viz**: Edward Tufte, *The Visual Display of Quantitative Information*
- **Ecommerce**: [Baymard Institute](https://baymard.com/)
- **Motion**: W3C WCAG, MDN `prefers-reduced-motion`

## License

MIT — see [LICENSE](LICENSE).
