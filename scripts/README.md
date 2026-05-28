# scripts/ — PII redaction toolkit

A small, dependency-free Node script that scans the repo for PII patterns
(phone numbers, email addresses, street addresses, anything you put in the
config) and either reports them or rewrites them in place.

## Files

| File | Purpose | Tracked? |
|---|---|---|
| `redact-pii.mjs` | The scanner / redactor itself | yes |
| `secrets-patterns.example.json` | Public template with placeholder patterns | yes |
| `secrets-patterns.json` | **Your real PII patterns** | **NO — gitignored** |
| `setup-hooks.sh` | One-shot installer for the pre-commit hook | yes |
| `../.githooks/pre-commit` | Hook that blocks commits containing PII | yes |

## One-time setup (after cloning)

```sh
cp scripts/secrets-patterns.example.json scripts/secrets-patterns.json
$EDITOR scripts/secrets-patterns.json    # replace placeholders with real patterns
bash scripts/setup-hooks.sh              # wires .githooks/ as core.hooksPath
```

That's it. Future `git commit`s will refuse to land if any staged file
matches a pattern in `secrets-patterns.json`.

## Daily use

```sh
node scripts/redact-pii.mjs              # scan all tracked text files
node scripts/redact-pii.mjs --redact     # rewrite files in place
node scripts/redact-pii.mjs --verbose    # show every match (don't paste this publicly)
node scripts/redact-pii.mjs --staged     # scan only `git diff --cached` (what the hook does)
node scripts/redact-pii.mjs assets/x.js  # scan one explicit file
```

Exit codes: **0** clean, **1** matches found, **2** config error.

## What it does NOT do

- It does **not** scan binary files (`.docx`, `.pdf`, `.png`, etc.). Those
  are listed at the bottom of the report so you can delete or sanitize
  them yourself.
- It does **not** rewrite git history. Anything already pushed needs
  separate cleanup (`git filter-repo` or BFG) if you want to scrub it.
- It does **not** know your patterns until you put them in
  `secrets-patterns.json`. The example file ships with deliberately
  placeholder values — copying it without editing would catch nothing.

## How patterns work

Each entry in `secrets-patterns.json` is a JavaScript RegExp plus a label
and an optional replacement string:

```json
{
  "label": "phone-mine",
  "pattern": "\\+?1?[\\s.-]?\\(?217\\)?[\\s.-]?200[\\s.-]?1842",
  "flags": "g",
  "replace": "[REDACTED-PHONE]"
}
```

Remember: JSON requires `\\` to express a regex `\` (so `\d` becomes
`\\d` in JSON).

## Why the config is gitignored

Putting your phone number in a regex inside the repo defeats the purpose
of redacting it. The example file is committed so future contributors
understand the schema, but the file containing your actual digits/strings
lives only on your machine.
