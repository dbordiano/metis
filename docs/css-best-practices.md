# Modern CSS Best Practices

Concise reference for modern CSS features and tips used by Metis commands and audits.

---

## CSS Best Practices (2026)

### Modern CSS Features

- **Container Queries** — Let components respond to their container size instead of only the viewport. Use `container-type` on the parent, then query with `@container`.

```css
.card-wrapper {
  container-type: inline-size;
}

@container (max-width: 600px) {
  .card { flex-direction: column; }
}
```

- **`:has()`** — Style a parent based on its children (e.g. form fields with errors, cards that contain an image).
- **`clamp()`** — Fluid typography and spacing: `font-size: clamp(1rem, 2vw + 1rem, 1.5rem);`.

See **commands/css-commands.json** → `modern-css` for AI-generated 2026-style code.

---

## Cascade layers (`@layer`)

Control cascade order without changing selector specificity:

```css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; box-sizing: border-box; }
}

@layer components {
  .btn { padding: 0.5rem 1rem; }
}
```

- Later layers override earlier ones; unlayered CSS overrides layered.
- Use for: reset → base → components → utilities.

**Sources:** [MDN @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), [W3C CSS Cascading](https://www.w3.org/TR/css-cascade-5/#layering).

---

## Custom properties (variables)

Design tokens as CSS variables:

```css
:root {
  --color-primary: #2563eb;
  --space-2: 0.5rem;
  --font-sans: system-ui, sans-serif;
}

.card {
  color: var(--color-primary);
  padding: var(--space-2);
  font-family: var(--font-sans);
}
```

- Use for theming: override in `[data-theme="dark"]` or `.dark`.
- Fallback: `var(--color-primary, #2563eb)`.

**Sources:** [MDN Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*), [W3C CSS Variables](https://www.w3.org/TR/css-variables-1/).

---

## Lowering specificity: `:where()` and `:is()`

- **`:where(selector)`** — specificity 0. Use to add selectors without increasing weight.
- **`:is(selector)`** — takes the specificity of the most specific argument.

```css
:where(.card, .panel) h2 { margin-block-end: 0.5rem; }  /* (0,0,1) */
.card h2 { margin-block-end: 0.5rem; }                  /* (0,1,1) */
```

Prefer `:where()` for resets and base styles so overrides stay simple.

**Sources:** [MDN :where()](https://developer.mozilla.org/en-US/docs/Web/CSS/:where), [MDN :is()](https://developer.mozilla.org/en-US/docs/Web/CSS/:is).

---

## Containment

Improve performance by isolating layout/paint:

```css
.widget {
  container-type: inline-size;  /* Enables container queries */
  container-name: widget;
}

@container widget (min-width: 400px) {
  .widget__list { grid-template-columns: 1fr 1fr; }
}
```

- `content` — layout/paint/size contained.
- `layout`, `paint`, `size` — use when you need container queries or repaint isolation.

**Sources:** [MDN contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain), [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries).

---

## Logical properties

RTL-friendly and clearer intent:

| Physical   | Logical (block/inline)   |
|-----------|---------------------------|
| `margin-left` | `margin-inline-start` |
| `margin-top`  | `margin-block-start`  |
| `width`       | `inline-size`         |
| `height`      | `block-size`          |

**Sources:** [MDN Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).

---

## Container queries

Style by container size, not viewport:

```css
.card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card { display: grid; grid-template-columns: auto 1fr; }
}
```

**Sources:** [MDN Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries), [Can I Use](https://caniuse.com/css-container-queries).

---

## Modern reset

- Universal `box-sizing: border-box`.
- `scroll-behavior: smooth` with `prefers-reduced-motion: reduce` override.
- `:focus-visible` for keyboard focus only.
- Form and media defaults (e.g. `font: inherit`, `max-width: 100%` on images).

See **templates/coyier-reset.css** in this package.

---

## Summary

| Topic              | Use for                                      |
|--------------------|----------------------------------------------|
| `@layer`           | Predictable cascade order                    |
| Custom properties  | Tokens and theming                           |
| `:where()`         | Low-specificity base/reset selectors         |
| Containment        | Performance and container queries            |
| Logical properties | RTL and maintainability                      |
| Container queries  | Component-level responsive design            |
