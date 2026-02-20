# Tufte Principles for Data Visualization

Guidelines from Edward Tufte’s work for clear, honest, and effective data graphics. Used by **commands/data-viz-commands.json** and **utils/tufte-chart.js**.

## Core ideas

### 1. Maximize data-ink ratio

- **Data-ink** = ink that represents data.
- **Data-ink ratio** = data-ink / total ink.
- Remove non-data ink (decorative grid lines, heavy frames, redundant labels) without losing meaning.

**Practice:** Strip chartjunk; keep axes and labels necessary to read the data.

---

### 2. Small multiples

- Same chart type and scale across multiple panels.
- One variable (e.g. region, year) varies per panel; the rest stay comparable.
- Lets viewers compare across panels without rescaling.

**Practice:** Use **utils/tufte-chart.js** `generateSmallMultiples()` or **templates/small-multiples.svg** as a structural reference.

---

### 3. Avoid chartjunk

- No decorative elements that don’t convey data: 3D, excessive color, clip art, busy backgrounds.
- No redundant representation (e.g. both color and legend for the same dimension when one suffices).

**Practice:** Prefer minimal styling; use color only when it encodes data or critical emphasis.

---

### 4. Lie factor

- **Lie factor** = (size of effect shown in graphic) / (size of effect in data).
- Should be close to 1. Large deviations distort the message (e.g. truncated axes, inflated visuals).

**Practice:** Use the **data-viz-commands** “Check Lie Factor” to compute and correct.

---

### 5. Clear labeling

- Directly label data when possible instead of forcing lookups to a legend.
- Titles and axis labels should state what is measured and units.

**Practice:** Prefer inline labels on series or points; keep legends small and only when needed.

---

## Chart type and message

| Message | Chart types to consider |
|--------|---------------------------|
| Trend over time | Line; small multiples of lines |
| Comparison (categories) | Bar (horizontal when many labels) |
| Part-to-whole | Stacked bar or area; use sparingly |
| Distribution | Histogram, box plot |
| Relationship | Scatter; avoid 3D |

Use **data-viz-commands** “Recommend Chart Type” to align data + message with type and Tufte principles.

---

## Sources

- Tufte, *The Visual Display of Quantitative Information* (Graphics Press).
- Tufte, *Envisioning Information*.
- Toolkit: **utils/tufte-chart.js**, **templates/small-multiples.svg**, **commands/data-viz-commands.json**.
