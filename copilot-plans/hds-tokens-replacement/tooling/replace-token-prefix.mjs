#!/usr/bin/env node
// @ts-check
/*
 * replace-token-prefix.mjs
 *
 * Reusable, dependency-free transform for step 3 of the HDS token
 * naming-convention effort: replace the literal CSS custom property prefix
 * `--token-` with `--hds-` at every consumption site in an Ember codebase.
 *
 * See ../generated-plan.md for the full plan. The rule is a LITERAL prefix swap
 * and is collision-free + idempotent by construction (the replacement contains no
 * occurrence of the match prefix).
 *
 * This file is the REUSABLE CORE — do not edit it per repo. All repo-specific
 * inputs live in an external JSON config (see ./config/hds-pilot.config.json).
 *
 * Usage:
 *   node replace-token-prefix.mjs [--config <path>] [mode] [options]
 *
 * Modes:
 *   (default)           Apply: rewrite in-scope files in place.
 *   --check             Dry run: report remaining match-prefix occurrences,
 *                       write nothing, exit non-zero if any remain.
 *   --audit-coupling    Scan in-scope .js/.ts/.gts for indirect `token-` name
 *                       coupling. Add --annotate to insert TODO markers.
 *
 * Options:
 *   --config <path>     Config file (default: ./config/hds-pilot.config.json
 *                       resolved relative to this script).
 *   --root <path>       Repo root to scan (default: current working directory).
 *   --annotate          With --audit-coupling, insert TODO marker comments.
 *   --json              Emit the summary as JSON on stdout.
 *
 * Exit codes:
 *   0  success / nothing left to do
 *   1  (--check) residual occurrences remain
 *   2  (--audit-coupling) candidates found
 *   3  usage / config error
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, relative, extname } from 'node:path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const MARKER_TAG = '[HDS-TOKEN-RENAMING]';
const MARKER_TEXT =
  '🚧 TODO [HDS-TOKEN-RENAMING]: verify manually — token-name prefix coupling';

/* ------------------------------------------------------------------ args --- */

function parseArgs(argv) {
  const args = {
    mode: 'apply',
    config: null,
    root: process.cwd(),
    annotate: false,
    json: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--check':
        args.mode = 'check';
        break;
      case '--audit-coupling':
        args.mode = 'audit-coupling';
        break;
      case '--annotate':
        args.annotate = true;
        break;
      case '--json':
        args.json = true;
        break;
      case '--config':
        args.config = argv[++i];
        break;
      case '--root':
        args.root = resolve(argv[++i]);
        break;
      default:
        fail(`Unknown argument: ${a}`);
    }
  }
  return args;
}

function fail(msg) {
  process.stderr.write(`error: ${msg}\n`);
  process.exit(3);
}

/* ---------------------------------------------------------------- config --- */

function loadConfig(configPath) {
  const path = configPath
    ? resolve(configPath)
    : join(SCRIPT_DIR, 'config', 'hds-pilot.config.json');
  let raw;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    fail(`cannot read config file: ${path}`);
  }
  let cfg;
  try {
    cfg = JSON.parse(raw);
  } catch (e) {
    fail(`invalid JSON in config: ${path} (${e.message})`);
  }
  cfg.roots ??= ['.'];
  cfg.extensions ??= ['scss', 'css', 'gts', 'hbs', 'ts', 'js'];
  cfg.excludeGlobs ??= [
    '**/dist/**',
    '**/node_modules/**',
    '**/.git/**',
    '**/*.map',
    '**/*.md',
  ];
  cfg.matchPrefix ??= '--token-';
  cfg.replacePrefix ??= '--hds-';
  cfg.couplingPatterns ??= [
    'replace\\(/\\^token-',
    'match\\(/\\^token-',
    "startsWith\\('token-",
    'startsWith\\("token-',
  ];
  return { cfg, path };
}

/* ------------------------------------------------------------ glob match --- */

// Minimal glob → RegExp supporting **, *, ? on POSIX-style paths.
function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        // ** (optionally followed by /) matches across path separators
        i++;
        if (glob[i + 1] === '/') i++;
        re += '(?:.*/)?';
      } else {
        re += '[^/]*';
      }
    } else if (c === '?') {
      re += '[^/]';
    } else if ('\\^$.|+()[]{}'.includes(c)) {
      re += '\\' + c;
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re + '$');
}

function makeExcluder(globs) {
  const regexes = globs.map(globToRegExp);
  return (relPath) => regexes.some((r) => r.test(relPath));
}

/* -------------------------------------------------------------- walking --- */

function* walk(dir, root, isExcluded, extSet) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const abs = join(dir, entry.name);
    const rel = relative(root, abs).split('\\').join('/');
    if (entry.isDirectory()) {
      // cheap prune of common heavy/generated dirs before glob test
      if (
        entry.name === 'node_modules' ||
        entry.name === '.git' ||
        entry.name === 'dist'
      ) {
        continue;
      }
      if (isExcluded(rel + '/')) continue;
      yield* walk(abs, root, isExcluded, extSet);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).slice(1);
      if (!extSet.has(ext)) continue;
      if (isExcluded(rel)) continue;
      yield { abs, rel };
    }
  }
}

function collectFiles(cfg, root) {
  const isExcluded = makeExcluder(cfg.excludeGlobs);
  const extSet = new Set(cfg.extensions);
  const files = [];
  for (const r of cfg.roots) {
    const base = resolve(root, r);
    let st;
    try {
      st = statSync(base);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      for (const f of walk(base, root, isExcluded, extSet)) files.push(f);
    }
  }
  // Deterministic order for byte-identical runs.
  files.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
  return files;
}

function countOccurrences(haystack, needle) {
  let count = 0;
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    count++;
    idx = haystack.indexOf(needle, idx + needle.length);
  }
  return count;
}

/* --------------------------------------------------------------- modes --- */

function runApply(cfg, root, jsonOut) {
  const files = collectFiles(cfg, root);
  const changed = [];
  let total = 0;
  for (const { abs, rel } of files) {
    const src = readFileSync(abs, 'utf8');
    const n = countOccurrences(src, cfg.matchPrefix);
    if (n === 0) continue;
    const out = src.split(cfg.matchPrefix).join(cfg.replacePrefix);
    writeFileSync(abs, out);
    changed.push({ file: rel, occurrences: n });
    total += n;
  }
  report(
    {
      mode: 'apply',
      filesScanned: files.length,
      filesChanged: changed.length,
      totalReplacements: total,
      changed,
    },
    jsonOut,
    () => {
      let s = `apply: ${total} replacement(s) across ${changed.length} file(s) (scanned ${files.length}).\n`;
      for (const c of changed) s += `  ${c.file}  (${c.occurrences})\n`;
      return s;
    },
  );
  return 0;
}

function runCheck(cfg, root, jsonOut) {
  const files = collectFiles(cfg, root);
  const remaining = [];
  let total = 0;
  for (const { abs, rel } of files) {
    const src = readFileSync(abs, 'utf8');
    const n = countOccurrences(src, cfg.matchPrefix);
    if (n > 0) {
      remaining.push({ file: rel, occurrences: n });
      total += n;
    }
  }
  report(
    {
      mode: 'check',
      filesScanned: files.length,
      residualFiles: remaining.length,
      residualOccurrences: total,
      remaining,
    },
    jsonOut,
    () => {
      if (total === 0)
        return `check: 0 remaining "${cfg.matchPrefix}" occurrences in source scope (scanned ${files.length}). ✅\n`;
      let s = `check: ${total} remaining "${cfg.matchPrefix}" occurrence(s) in ${remaining.length} file(s):\n`;
      for (const c of remaining) s += `  ${c.file}  (${c.occurrences})\n`;
      return s;
    },
  );
  return total === 0 ? 0 : 1;
}

function runAuditCoupling(cfg, root, annotate, jsonOut) {
  const codeExt = new Set(['js', 'ts', 'gts']);
  const auditCfg = { ...cfg, extensions: cfg.extensions.filter((e) => codeExt.has(e)) };
  if (auditCfg.extensions.length === 0) auditCfg.extensions = ['js', 'ts', 'gts'];
  const files = collectFiles(auditCfg, root);
  const patterns = cfg.couplingPatterns.map((p) => new RegExp(p));
  const candidates = [];
  let annotatedCount = 0;

  for (const { abs, rel } of files) {
    const src = readFileSync(abs, 'utf8');
    const lines = src.split('\n');
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
      if (patterns.some((r) => r.test(lines[i]))) hits.push(i);
    }
    if (hits.length === 0) continue;
    for (const i of hits)
      candidates.push({ file: rel, line: i + 1, text: lines[i].trim() });

    if (annotate) {
      const ext = extname(abs).slice(1);
      // Anchored coupling patterns live in JS logic → line comment.
      // .hbs (or a future template-only match) uses the mustache-comment form.
      const commentFor = (indent) =>
        ext === 'hbs'
          ? `${indent}{{! ${MARKER_TEXT} }}`
          : `${indent}// ${MARKER_TEXT}`;
      // Insert from bottom to top so indices stay valid.
      let touched = false;
      for (let k = hits.length - 1; k >= 0; k--) {
        const i = hits[k];
        // Idempotent: skip if preceding non-empty line already has the tag.
        let p = i - 1;
        while (p >= 0 && lines[p].trim() === '') p--;
        if (p >= 0 && lines[p].includes(MARKER_TAG)) continue;
        const indent = (lines[i].match(/^\s*/) || [''])[0];
        lines.splice(i, 0, commentFor(indent));
        annotatedCount++;
        touched = true;
      }
      if (touched) writeFileSync(abs, lines.join('\n'));
    }
  }

  report(
    {
      mode: 'audit-coupling',
      annotated: annotate,
      filesScanned: files.length,
      candidateCount: candidates.length,
      annotatedCount,
      candidates,
    },
    jsonOut,
    () => {
      let s = `audit-coupling: ${candidates.length} candidate line(s)${
        annotate ? `, ${annotatedCount} newly annotated` : ''
      } (scanned ${files.length}).\n`;
      for (const c of candidates) s += `  ${c.file}:${c.line}  ${c.text}\n`;
      if (candidates.length && !annotate)
        s += `\nRe-run with --annotate to insert TODO markers.\n`;
      return s;
    },
  );
  return candidates.length === 0 ? 0 : 2;
}

/* --------------------------------------------------------------- output --- */

function report(data, jsonOut, textFn) {
  process.stdout.write(jsonOut ? JSON.stringify(data, null, 2) + '\n' : textFn());
}

/* ----------------------------------------------------------------- main --- */

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { cfg } = loadConfig(args.config);
  let code = 0;
  switch (args.mode) {
    case 'apply':
      code = runApply(cfg, args.root, args.json);
      break;
    case 'check':
      code = runCheck(cfg, args.root, args.json);
      break;
    case 'audit-coupling':
      code = runAuditCoupling(cfg, args.root, args.annotate, args.json);
      break;
    default:
      fail(`unknown mode: ${args.mode}`);
  }
  process.exit(code);
}

main();
