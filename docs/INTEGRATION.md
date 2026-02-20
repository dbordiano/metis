# Integrating Metis with Cursor and Claude

Get Metis into your project with one command, then wire it up so your AI agent (Cursor or Claude) uses the commands and skills.

---

## 1. Download Metis (one command)

From your **project root** (or the folder where you want a `metis` directory):

```bash
curl -sL https://github.com/dbordiano/metis/archive/refs/heads/main.tar.gz | tar -xzf - && mv metis-main metis
```

Or with the install script (same result, optional Cursor setup):

```bash
curl -sL https://raw.githubusercontent.com/dbordiano/metis/main/scripts/install.sh | bash
```

You’ll have a **`metis/`** folder containing `commands/`, `utils/`, `templates/`, and `docs/`.

---

## 2. Cursor

### Option A: Install script (recommended)

From your project root:

```bash
curl -sL https://raw.githubusercontent.com/dbordiano/metis/main/scripts/install.sh | bash -s -- --cursor
```

This downloads Metis and copies the Cursor rule + command JSONs into `.cursor/rules/`.

### Option B: Manual

1. Ensure Metis is in your project (e.g. `./metis/`).
2. Copy the rule and commands:
   - Copy **`metis/cursor/metis-commands.mdc`** → **`.cursor/rules/metis-commands.mdc`**
   - Copy **`metis/commands/*.json`** → **`.cursor/rules/metis-commands/`** (create the folder)
3. Reload Cursor or start a new chat so the rule is active.

The rule tells Cursor to use the Metis command definitions and where to find utils and docs.

---

## 3. Claude

1. Ensure Metis is in your project (e.g. `./metis/`).
2. Open your Claude **project** (or account) **Project Instructions** / **Custom Instructions**.
3. Copy the contents of **`metis/claude/instructions.md`** into that instructions field.
4. Save. New chats will use Metis commands and can run the utils when you ask.

---

## 4. Running the utils from the command line

From the directory that contains `metis/` (usually your project root):

```bash
node metis/utils/css-audit.js path/to/styles.css
node metis/utils/atomic-scaffold.js Button molecule
node metis/utils/atomic-scaffold.js --output ./src/components
node metis/utils/baymard-audit.js path/to/page.html
```

---

## 5. Summary

| Step | What to do |
|------|------------|
| Download | `curl -sL https://github.com/dbordiano/metis/archive/refs/heads/main.tar.gz \| tar -xzf - && mv metis-main metis` |
| Cursor | Run install with `--cursor` or copy `metis/cursor/metis-commands.mdc` and `metis/commands/*.json` into `.cursor/rules/`. |
| Claude | Paste `metis/claude/instructions.md` into Project / Custom Instructions. |
| CLI | `node metis/utils/<script>.js ...` from project root. |
