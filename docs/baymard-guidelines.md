# Baymard-Style Ecommerce UX Guidelines

Summary of ecommerce UX best practices aligned with Baymard Institute research. Used by **commands/ecommerce-ux-commands.json** and **utils/baymard-audit.js**.

## Product listing / grid

- **Image:** Product image present; ideally linked to PDP. Clear, consistent aspect ratio.
- **Price:** Visible in listing (no “view for price” unless B2B and justified). Clear currency and format.
- **Title/name:** Product name or title; link to PDP.
- **CTA:** Clear primary action (e.g. “Add to cart”, “View product”). Not buried in hover-only UI on critical viewports.
- **Structure:** Semantic markup (e.g. `article`, list items) and/or ARIA where it helps. Consistent card structure.

**Template:** See **templates/product-grid.html** for a minimal compliant example.

---

## Product detail page (PDP)

- **Images:** Main image + thumbnails or gallery; zoom or larger view where useful.
- **Price:** Prominent; any discount/savings clearly stated.
- **Add to cart:** Visible, labeled; quantity and options (size, color) before add.
- **Stock/availability:** Shown when relevant (e.g. “In stock”, “Low stock”, “Out of stock”).
- **Trust:** Reviews summary, return/shipping info, secure payment cues where appropriate.

---

## Cart

- **Line items:** Image, title, price, quantity, subtotal; edit/remove possible.
- **Totals:** Subtotal, shipping (or “calculated at checkout”), tax if shown, total. No surprise at checkout.
- **Persistent access:** Cart link/icon with count; cart visible or reachable from key pages.
- **Clear next step:** Prominent “Checkout” or “View cart” as appropriate.

---

## Checkout

- **Progress:** Steps visible (e.g. shipping → payment → review).
- **Guest checkout:** Option to checkout without account; account creation optional.
- **Form design:** Labels, validation, minimal fields; autocomplete where standard (address, email).
- **Trust:** Security and payment badges near payment step; clear policy links.

---

## Trust and credibility

- **Security:** HTTPS; clear payment security (e.g. “Secure checkout”).
- **Policies:** Return, shipping, contact easily findable (footer, checkout).
- **Reviews:** Real reviews where shown; avoid fake or misleading social proof (see **cognitive-bias-codex.md**).

---

## How Metis uses these

| Item | Use |
|------|-----|
| **commands/ecommerce-ux-commands.json** | AI prompts to audit product grid, cart/checkout, trust signals; request guideline summaries. |
| **utils/baymard-audit.js** | Script to run product-grid checks (image link, price, CTA, title, structure) on HTML. |
| **templates/product-grid.html** | Reference HTML for a Baymard-style product card. |

**Empirical source:** [Baymard Institute](https://baymard.com/) (ecommerce UX research and guidelines). This doc is a concise summary for implementation and auditing, not a substitute for full Baymard reports.
