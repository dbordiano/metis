# Cognitive Bias Codex for UX

Reference table of cognitive biases relevant to UX, their risks, and mitigations. Used by **commands/cognitive-bias-commands.json**.

## Bias | UX risk | Mitigation

| Bias | Short description | UX risk | Mitigation (design / copy / IA) |
|------|--------------------|--------|----------------------------------|
| **Anchoring** | First number or option disproportionately influences decisions. | Users over-rely on first price or option; unfair comparisons. | Show multiple anchors, clear “from” vs “for”; avoid hiding cheaper options. |
| **Choice overload** | Too many options reduce satisfaction and increase abandonment. | Paralysis, lower conversions, regret. | Curate options; progressive disclosure; good defaults; comparison tools. |
| **Confirmation bias** | People seek and weight information that confirms existing beliefs. | Filter bubbles; missed errors; poor decisions. | Surface disconfirming info; encourage “review your choice”; neutral framing. |
| **Decoy effect** | Adding a dominated option makes a target option more attractive. | Can feel manipulative; backlash if obvious. | Prefer clarity; if used, keep decoy relevant and not deceptive. |
| **Framing** | Same fact presented positively vs negatively changes behavior. | Unintended nudges; loss of trust if framing is skewed. | Prefer neutral or balanced framing; disclose tradeoffs. |
| **Loss aversion** | Losses weigh more than equivalent gains. | Dark patterns (“You’ll lose…”); anxiety. | Avoid fear-based copy; emphasize gains and control; no fake scarcity. |
| **Social proof** | People follow others’ behavior. | Fake reviews, inflated numbers; trust damage. | Use real data; avoid fabricated social proof; show source when possible. |
| **Scarcity** | Limited availability increases perceived value. | Fake urgency; regret; distrust. | Only show real scarcity; no fake “only 2 left” or fake countdowns. |
| **Default effect** | Pre-selected options are chosen more often. | Users stuck with bad or paid defaults. | Sensible, user-beneficial defaults; easy to change; clear what’s selected. |
| **Status quo bias** | Tendency to keep current state. | Inertia; hard to improve flows or correct wrong choices. | Make better path easy; reduce friction to change; confirmations for destructive actions only. |

---

## Using this codex with AI commands

- **bias-checklist** — Run a flow or screen set against this list; get risks and mitigations.
- **bias-copy-review** — Check copy for framing, anchoring, scarcity, social proof.
- **bias-choice-architecture** — Improve choice presentation and flag dark patterns.
- **bias-mitigation-table** — Request a subset of biases and get this table (or a slice) for the product type.

---

## Empirical and further reading

- Nielsen Norman Group: [Persuasion](https://www.nngroup.com/articles/persuasion/), [Dark Patterns](https://www.nngroup.com/articles/dark-patterns/).
- Cialdini, *Influence* (principles of persuasion).
- Baymard / ecommerce: checkout and product page guidelines (see **baymard-guidelines.md**).
