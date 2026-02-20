#!/usr/bin/env bash
# Metis install script: download into current directory and optionally set up Cursor/Claude.
# Usage: curl -sL https://raw.githubusercontent.com/dbordiano/metis/main/scripts/install.sh | bash
#    or: curl -sL ... | bash -s -- --cursor   # also copy rule + commands into .cursor
#    or: curl -sL ... | bash -s -- --cursor --claude  # print Claude instructions too

set -e
METIS_URL="https://github.com/dbordiano/metis/archive/refs/heads/main.tar.gz"
SETUP_CURSOR=false
SHOW_CLAUDE=false

for arg in "$@"; do
  case "$arg" in
    --cursor)  SETUP_CURSOR=true ;;
    --claude)  SHOW_CLAUDE=true ;;
  esac
done

# Install into current directory
WORKDIR="$(pwd)"
METIS_DIR="$WORKDIR/metis"

echo "→ Downloading Metis..."
if command -v curl >/dev/null 2>&1; then
  curl -sL "$METIS_URL" -o /tmp/metis.tar.gz
elif command -v wget >/dev/null 2>&1; then
  wget -q -O /tmp/metis.tar.gz "$METIS_URL"
else
  echo "Need curl or wget to download."
  exit 1
fi

echo "→ Extracting to $METIS_DIR..."
tar -xzf /tmp/metis.tar.gz -C /tmp
rm -f /tmp/metis.tar.gz

if [ -d "$METIS_DIR" ] && [ -d "$METIS_DIR/commands" ]; then
  echo "→ Metis already present at $METIS_DIR. Updating..."
  rm -rf "$METIS_DIR"
fi
mv /tmp/metis-main "$METIS_DIR"
echo "→ Installed to $METIS_DIR"

if [ "$SETUP_CURSOR" = true ]; then
  CURSOR_RULES="$WORKDIR/.cursor/rules"
  mkdir -p "$CURSOR_RULES"
  mkdir -p "$CURSOR_RULES/metis-commands"
  [ -f "$METIS_DIR/cursor/metis-commands.mdc" ] && cp "$METIS_DIR/cursor/metis-commands.mdc" "$CURSOR_RULES/"
  for f in "$METIS_DIR"/commands/*.json; do
    [ -f "$f" ] && cp "$f" "$CURSOR_RULES/metis-commands/"
  done
  echo "→ Cursor: rule and commands copied to .cursor/rules/"
fi

if [ "$SHOW_CLAUDE" = true ]; then
  echo ""
  echo "--- Paste the following into Claude Project / Custom Instructions ---"
  echo ""
  [ -f "$METIS_DIR/claude/instructions.md" ] && cat "$METIS_DIR/claude/instructions.md"
  echo ""
  echo "---"
fi

echo ""
echo "Done. Next:"
echo "  - Cursor: use .cursor/rules/ (or run again with --cursor)."
echo "  - Claude: paste metis/claude/instructions.md into your project instructions."
echo "  - Utils:  node metis/utils/css-audit.js <file>  (from project root)"
echo ""
