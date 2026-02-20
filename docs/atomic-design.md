# Atomic Design Methodology

Summary of Brad Frost’s Atomic Design for component-based UIs and how Metis supports it.

## What is Atomic Design?

Atomic Design breaks UIs into a hierarchy of components:

1. **Atoms** — Single UI elements: buttons, labels, inputs, icons. Cannot be broken down further without losing meaning.
2. **Molecules** — Groups of atoms that form one unit: search field (input + button), form field (label + input + error).
3. **Organisms** — Sections of the interface: header, product card, footer. Combine molecules and/or atoms.
4. **Templates** — Page-level structure: placement of organisms and layout.
5. **Pages** — Specific instances of templates with real content.

This package’s **atomic-scaffold** utility and **atomic-design-commands** focus on atoms, molecules, and organisms.

**Source:** [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/).

---

## Folder structure

A common convention:

```
components/
  atoms/
    button/
      button.jsx
      index.js
    label/
  molecules/
    form-field/
    product-thumbnail/
  organisms/
    product-card/
    header/
```

Use **utils/atomic-scaffold.js** to generate `atoms/`, `molecules/`, or `organisms/` + component folder and stubs.

---

## Design tokens first

Atoms and molecules should use **design tokens** (e.g. CSS custom properties), not hardcoded values:

- Colors: `var(--color-primary)`, `var(--color-text-muted)`
- Spacing: `var(--space-2)`, `var(--space-4)`
- Typography: `var(--font-sans)`, `var(--font-size-base)`, `var(--font-weight-medium)`
- Radius, shadows: `var(--radius-md)`, `var(--shadow-sm)`

See **templates/design-tokens.json** for a token structure. Map these to CSS in `:root` or a design system layer.

---

## Composition rules

- **Atoms** — No other Atomic components inside; only DOM and tokens.
- **Molecules** — Compose atoms (and maybe other molecules only when it stays a single responsibility).
- **Organisms** — Compose molecules and atoms; can contain other organisms when it matches the page section (e.g. header organism).

Keep props minimal and purposeful; avoid prop drilling by using context or composition where it makes sense.

---

## Commands and utils in this package

| Asset | Purpose |
|-------|--------|
| **commands/atomic-design-commands.json** | AI prompts to scaffold, check tokens, suggest composition, document components. |
| **utils/atomic-scaffold.js** | CLI to generate component folder + stub (atom/molecule/organism). |
| **templates/design-tokens.json** | Example tokens to drive components. |

Use the command “Check Token Usage” to find hardcoded values and replace them with token references.
