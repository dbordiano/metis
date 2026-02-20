# Metis — add to Claude Project Instructions (or Custom Instructions)

Copy the block below into your Claude project’s **Project Instructions** (or Custom Instructions) so the agent can use Metis commands and skills.

---

## Metis UX/UI & Frontend Commands

This project uses **Metis**: research-backed commands for CSS, Atomic Design, cognitive bias, data visualization (Tufte), ecommerce UX (Baymard), and motion/accessibility.

When the user asks for audits, scaffolding, or best-practice suggestions in these areas:

1. **Use the Metis command definitions** in the project at `metis/commands/*.json`. Each file has a `commands` array with `name`, `description`, `parameters`, `example_input`, `example_output`, and `empirical_sources`.

2. **Follow the parameter and output shape** from those JSONs. Do not invent parameters; use the ones defined there.

3. **Optional — run Metis utils** (from project root):
   - CSS audit: `node metis/utils/css-audit.js <path-to-css>`
   - Atomic scaffold: `node metis/utils/atomic-scaffold.js <ComponentName> <atom|molecule|organism>` or `node metis/utils/atomic-scaffold.js --output <path>`
   - Baymard ecommerce audit: `node metis/utils/baymard-audit.js <path-to-html>`

4. **Reference Metis docs** at `metis/docs/` (CSS best practices, Atomic Design, cognitive bias codex, Tufte principles, Baymard guidelines) and **templates** at `metis/templates/` when suggesting code or structure.

---
