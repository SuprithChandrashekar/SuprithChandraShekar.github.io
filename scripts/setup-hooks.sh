#!/bin/sh
# Wire the .githooks/ directory as the active hooks path for this clone.
# Run once after cloning:  bash scripts/setup-hooks.sh
set -e
git config core.hooksPath .githooks
chmod +x .githooks/* 2>/dev/null || true
echo "✓ Git hooks active. Pre-commit will now run scripts/redact-pii.mjs."
echo ""
echo "Next step (if you haven't already):"
echo "  cp scripts/secrets-patterns.example.json scripts/secrets-patterns.json"
echo "  \$EDITOR scripts/secrets-patterns.json   # fill in your real patterns"
