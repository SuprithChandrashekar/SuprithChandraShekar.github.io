#!/usr/bin/env node
/* eslint-disable */
/**
 * redact-pii.mjs
 *
 * Scans (and optionally redacts) PII from the repo based on user-provided
 * patterns kept in scripts/secrets-patterns.json (gitignored).
 *
 * Usage:
 *   node scripts/redact-pii.mjs              # scan-only, exit 1 on hit
 *   node scripts/redact-pii.mjs --redact     # rewrite files in place
 *   node scripts/redact-pii.mjs --verbose    # show every match
 *   node scripts/redact-pii.mjs --staged     # scan only `git diff --cached` (used by pre-commit hook)
 *   node scripts/redact-pii.mjs path/to/file # scan a specific path
 *
 * The script intentionally never prints the actual matched text in non-
 * verbose mode — it only reports counts + the pattern label — so the
 * console output itself doesn't leak the PII you're trying to hide.
 *
 * Binary documents (.docx, .pdf, .pptx, .xlsx) are NOT scanned but ARE
 * called out so you can delete or sanitize them manually.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith('--') || a.startsWith('-')));
const positional = args.filter(a => !a.startsWith('-'));

const MODE = flags.has('--redact') ? 'redact' : 'scan';
const VERBOSE = flags.has('--verbose') || flags.has('-v');
const STAGED = flags.has('--staged');
const SHOW_HELP = flags.has('--help') || flags.has('-h');

if (SHOW_HELP) {
  console.log(`redact-pii.mjs — scan/redact PII patterns from this repo.

Usage:
  node scripts/redact-pii.mjs                scan all tracked text files
  node scripts/redact-pii.mjs --redact       rewrite files in place
  node scripts/redact-pii.mjs --staged       scan only staged files (hook mode)
  node scripts/redact-pii.mjs --verbose      print every match (DO NOT pipe to public logs)
  node scripts/redact-pii.mjs <path>         scan one explicit file

Exit codes: 0 = clean, 1 = matches found (scan mode), 2 = config error.`);
  process.exit(0);
}

// ----- Load patterns -----
const cfgPath = path.join(repoRoot, 'scripts', 'secrets-patterns.json');
if (!fs.existsSync(cfgPath)) {
  console.error(`[redact-pii] No secrets-patterns.json found at ${path.relative(repoRoot, cfgPath)}.
Copy scripts/secrets-patterns.example.json to scripts/secrets-patterns.json
and fill in your real patterns. The .json file is gitignored so your
patterns never leak into the repo.`);
  process.exit(2);
}

let cfg;
try {
  cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
} catch (e) {
  console.error(`[redact-pii] Failed to parse ${path.relative(repoRoot, cfgPath)}: ${e.message}`);
  process.exit(2);
}

const patterns = (cfg.patterns || []).map(p => ({
  label: p.label || 'PII',
  re: new RegExp(p.pattern, p.flags || 'g'),
  replace: p.replace || `[REDACTED-${(p.label || 'PII').toUpperCase()}]`,
}));

if (patterns.length === 0) {
  console.error(`[redact-pii] secrets-patterns.json contains no patterns. Nothing to scan.`);
  process.exit(2);
}

// ----- Determine which files to scan -----
// Document formats that commonly contain text PII (fail-worthy).
const DOC_EXTS = new Set([
  '.docx', '.doc', '.pdf', '.pptx', '.ppt', '.xlsx', '.xls',
  '.odt', '.ods', '.odp', '.rtf', '.pages', '.numbers', '.key',
]);
// Media/archives/fonts — flagged as informational only, do not fail the run.
const MEDIA_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.bmp',
  '.tif', '.tiff', '.svg', '.mp4', '.mov', '.mp3', '.wav',
  '.zip', '.gz', '.tar', '.7z', '.ttf', '.woff', '.woff2',
  '.eot', '.otf',
]);
const SKIP_PATHS = ['.git/', 'node_modules/', 'scripts/secrets-patterns.json'];

function listFiles() {
  if (positional.length > 0) return positional;
  let raw;
  if (STAGED) {
    raw = execSync('git diff --cached --name-only --diff-filter=ACM', { cwd: repoRoot, encoding: 'utf8' });
  } else {
    raw = execSync('git ls-files', { cwd: repoRoot, encoding: 'utf8' });
  }
  return raw.split('\n').filter(Boolean);
}

const allFiles = listFiles();
const textFiles = [];
const docBinaries = [];
const mediaBinaries = [];
for (const f of allFiles) {
  if (SKIP_PATHS.some(p => f.startsWith(p))) continue;
  const ext = path.extname(f).toLowerCase();
  if (DOC_EXTS.has(ext)) docBinaries.push(f);
  else if (MEDIA_EXTS.has(ext)) mediaBinaries.push(f);
  else textFiles.push(f);
}

// ----- Scan -----
let totalHits = 0;
const report = [];

for (const f of textFiles) {
  const abs = path.resolve(repoRoot, f);
  if (!fs.existsSync(abs)) continue;
  let content;
  try {
    content = fs.readFileSync(abs, 'utf8');
  } catch {
    continue;
  }
  let updated = content;
  const fileHits = [];
  for (const p of patterns) {
    p.re.lastIndex = 0;
    let m;
    while ((m = p.re.exec(content)) !== null) {
      fileHits.push({ label: p.label, snippet: m[0], idx: m.index });
      totalHits++;
      if (p.re.lastIndex === m.index) p.re.lastIndex++; // guard against zero-width
    }
    updated = updated.replace(p.re, p.replace);
  }
  if (fileHits.length > 0) {
    report.push({ file: f, hits: fileHits });
    if (MODE === 'redact' && updated !== content) {
      fs.writeFileSync(abs, updated, 'utf8');
    }
  }
}

// ----- Report -----
const hasFailures = report.length > 0 || docBinaries.length > 0;

if (!hasFailures && mediaBinaries.length === 0) {
  console.log('[redact-pii] No PII matches found.  Clean.');
  process.exit(0);
}

if (report.length > 0) {
  console.log(`[redact-pii] ${MODE.toUpperCase()} — ${totalHits} match(es) across ${report.length} file(s):\n`);
  for (const r of report) {
    console.log(`  ${r.file}`);
    if (VERBOSE) {
      for (const h of r.hits) {
        const safe = h.snippet.length > 40 ? h.snippet.slice(0, 40) + '…' : h.snippet;
        console.log(`     [${h.label}]  "${safe}"  @ char ${h.idx}`);
      }
    } else {
      const counts = r.hits.reduce((acc, h) => { acc[h.label] = (acc[h.label] || 0) + 1; return acc; }, {});
      const summary = Object.entries(counts).map(([l, n]) => `${l}×${n}`).join(', ');
      console.log(`     ${summary}`);
    }
  }
}

if (docBinaries.length > 0) {
  console.log(`\n[redact-pii] ${docBinaries.length} document binary file(s) require manual review (cannot auto-scan):`);
  for (const f of docBinaries) console.log(`  ${f}`);
  console.log(`  → Delete, or replace with a sanitized version, then re-run.`);
}

if (mediaBinaries.length > 0 && VERBOSE) {
  console.log(`\n[redact-pii] ${mediaBinaries.length} media/archive file(s) skipped (low PII risk):`);
  for (const f of mediaBinaries) console.log(`  ${f}`);
}

if (MODE === 'redact' && totalHits > 0) {
  console.log(`\n[redact-pii] Redacted ${totalHits} match(es). Review with: git diff`);
  if (docBinaries.length > 0) process.exit(1); // still warn about binaries
  process.exit(0);
}

if (hasFailures) {
  console.log(`\n[redact-pii] FAIL — sensitive content present.
  Redact text matches:  node scripts/redact-pii.mjs --redact
  Inspect each match:   node scripts/redact-pii.mjs --verbose
  Document binaries:    remove or sanitize manually, then re-run.`);
  process.exit(1);
}

console.log('[redact-pii] No actionable PII. Clean.');
process.exit(0);
