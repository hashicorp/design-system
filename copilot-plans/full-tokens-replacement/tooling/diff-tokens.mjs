#!/usr/bin/env node
// @ts-check
/*
 * diff-tokens.mjs — Phase A: token-map generator (HDS carbonization migration)
 *
 * One-off, dependency-free tool for THIS monorepo. It diffs the pre- vs
 * post-carbonization token NAME sets and proposes an old→new token map for
 * human review.
 *
 *   Pre  = `main`         → all `--token-*`  (read via `git show`)
 *   Post = working tree   → all `--hds-*`
 *
 * Because carbonization applies a universal `--token-` → `--hds-` prefix swap,
 * no name is literally unchanged; every pre token is a rename whose `after` we
 * infer by combining, in priority order:
 *
 *   S0  Mechanical prefix swap  `--token-X` → `--hds-X`   (verbatim hit in post)
 *   S1  Changeset rename tables (composed on top of S0, chained across steps)
 *   S2  Source-JSON provenance + structure (same file, equal segment multiset)
 *   S3  Fuzzy name similarity   (fallback, review-only)
 *
 * This script takes NO config and NO CLI arguments — all inputs are the fixed
 * HDS paths declared as constants below.
 *
 * Outputs (to ./reports/hds/):
 *   - token-map.generated.json   flat map keyed by mutually-exclusive category
 *                                (prefix-only, prefix-plus-renaming__*, removed,
 *                                added); each child is a { before, after } pair
 *   - token-diff.md              detailed human report (by category + signals)
 *
 * Usage:
 *   node copilot-plans/full-tokens-replacement/tooling/diff-tokens.mjs
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, relative, extname } from 'node:path';

/* --------------------------------------------------------------- config --- */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../..');

const PRE_REF = 'main';
const PRE_PREFIX = '--token-';
const POST_PREFIX = '--hds-';

const TOKENS_CSS_PATH = 'packages/tokens/dist/products/css/tokens.css';
const CHANGESETS_DIR = '.changeset';
const SOURCE_JSON_DIR = 'packages/tokens/src';
const SOURCE_JSON_EXCLUDE = 'packages/tokens/src/carbon-extracted';

const REPORT_DIR = join(SCRIPT_DIR, 'reports', 'hds');

/* ----------------------------------------------------------------- util --- */

function fail(msg) {
  process.stderr.write(`error: ${msg}\n`);
  process.exit(3);
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Run git in the repo root and return stdout as a string. */
function git(args) {
  try {
    return execFileSync('git', args, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      maxBuffer: 128 * 1024 * 1024,
    });
  } catch (e) {
    fail(`git ${args.join(' ')} failed: ${e.message}`);
    return ''; // unreachable
  }
}

/** `git show <ref>:<path>` — file contents at a ref. */
function gitShow(ref, path) {
  return git(['show', `${ref}:${path}`]);
}

/** Ensure a token identifier carries the leading `--`. */
function normalizeToken(raw) {
  let t = raw.trim().replace(/`/g, '');
  if (!t.startsWith('--')) t = `--${t.replace(/^-+/, '')}`;
  return t.toLowerCase();
}

/* ------------------------------------------------------- tokens.css names --- */

/** Extract the set of custom-property names (matching prefix) from CSS text. */
function extractCssTokenNames(css, prefix) {
  const re = new RegExp(`(${escapeRegExp(prefix)}[a-zA-Z0-9-]+)\\s*:`, 'g');
  const set = new Set();
  let m;
  while ((m = re.exec(css)) !== null) set.add(m[1].toLowerCase());
  return set;
}

/* ------------------------------------------------------------ changesets --- */

/**
 * Parse `.changeset/*.md` for documented rename pairs, in both notations:
 *   - table rows:  | `--hds-a` | `--hds-b` |
 *   - arrow lists: `--hds-a` → `--hds-b`   (also bare `hds-a` → `hds-b`)
 * Header rows (Before/After) and prose placeholders are skipped naturally
 * because they don't contain two token-like cells.
 */
function parseChangesets() {
  const dir = join(REPO_ROOT, CHANGESETS_DIR);
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md');
  } catch {
    return [];
  }
  const pairs = [];
  const tokenCell = String.raw`\`?(--?(?:hds|token)-[a-z0-9-]+)\`?`;
  const rowRe = new RegExp(`\\|\\s*${tokenCell}\\s*\\|\\s*${tokenCell}\\s*\\|`, 'gi');
  const arrowRe = new RegExp(`${tokenCell}\\s*(?:→|->)\\s*${tokenCell}`, 'gi');
  for (const f of files.sort()) {
    const text = readFileSync(join(dir, f), 'utf8');
    let m;
    rowRe.lastIndex = 0;
    while ((m = rowRe.exec(text)) !== null) {
      pairs.push({ before: normalizeToken(m[1]), after: normalizeToken(m[2]), source: f });
    }
    arrowRe.lastIndex = 0;
    while ((m = arrowRe.exec(text)) !== null) {
      pairs.push({ before: normalizeToken(m[1]), after: normalizeToken(m[2]), source: f });
    }
  }
  return pairs;
}

/**
 * Build a rename graph from changeset pairs and expose a chain resolver.
 * Detects conflicts (one `before` mapped to multiple distinct `after`s).
 */
function buildRenameGraph(pairs) {
  const edges = new Map(); // before -> Set<after>
  for (const { before, after } of pairs) {
    if (before === after) continue;
    if (!edges.has(before)) edges.set(before, new Set());
    edges.get(before).add(after);
  }
  const conflicts = [];
  const next = new Map(); // before -> after (single)
  for (const [before, afters] of edges) {
    if (afters.size > 1) {
      conflicts.push({ before, afters: [...afters] });
    }
    next.set(before, [...afters][0]);
  }

  /** Follow the chain from `start` to its endpoint (cycle-safe). */
  function resolve(start) {
    let cur = start;
    const seen = new Set([cur]);
    const path = [cur];
    while (next.has(cur)) {
      const nxt = next.get(cur);
      if (seen.has(nxt)) break;
      seen.add(nxt);
      cur = nxt;
      path.push(cur);
    }
    return { endpoint: cur, path };
  }

  return { resolve, conflicts, size: edges.size };
}

/* --------------------------------------------------------- source JSON S2 --- */

/**
 * Derive CSS token names from a DTCG source object.
 * A node with `$value`/`$type` is a leaf; its token name is
 * `prefix + <non-$ key path>.join('-')`. Returns Map<name, segments[]>.
 */
function deriveNames(obj, prefix) {
  const out = new Map();
  function walk(node, path) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    if ('$value' in node || '$type' in node) {
      if (path.length) out.set((prefix + path.join('-')).toLowerCase(), path.map((s) => s.toLowerCase()));
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      walk(v, [...path, k]);
    }
  }
  walk(obj, []);
  return out;
}

/** List `packages/tokens/src/**` JSON files present at a git ref. */
function listSourceJsonAtRef(ref) {
  const out = git(['ls-tree', '-r', '--name-only', ref, '--', SOURCE_JSON_DIR]);
  return out
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.endsWith('.json') && !l.startsWith(SOURCE_JSON_EXCLUDE + '/'));
}

/** Walk the working tree for `packages/tokens/src/**` JSON files. */
function listSourceJsonWorkingTree() {
  const base = join(REPO_ROOT, SOURCE_JSON_DIR);
  const excludeAbs = join(REPO_ROOT, SOURCE_JSON_EXCLUDE);
  const results = [];
  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const abs = join(dir, e.name);
      if (abs === excludeAbs) continue;
      if (e.isDirectory()) walk(abs);
      else if (e.isFile() && extname(e.name) === '.json') {
        results.push(relative(REPO_ROOT, abs).split('\\').join('/'));
      }
    }
  }
  walk(base);
  return results.sort();
}

/**
 * Build token→file provenance for a ref.
 * Returns { tokenFile: Map<name, file>, fileTokens: Map<file, Map<name, segs>> }.
 */
function buildProvenance(files, readFile, prefix) {
  const tokenFile = new Map();
  const fileTokens = new Map();
  for (const file of files) {
    let obj;
    try {
      obj = JSON.parse(readFile(file));
    } catch {
      continue; // skip non-DTCG / unparsable
    }
    const names = deriveNames(obj, prefix);
    fileTokens.set(file, names);
    for (const name of names.keys()) tokenFile.set(name, file);
  }
  return { tokenFile, fileTokens };
}

/* ------------------------------------------------------------- fuzzy S3 --- */

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    let cur = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[n];
}

function segments(name, prefix) {
  return name.slice(prefix.length).split('-').filter(Boolean);
}

/** Similarity in [0,1]: blend of segment Jaccard and normalized Levenshtein. */
function similarity(aSegs, bSegs) {
  const aSet = new Set(aSegs);
  const bSet = new Set(bSegs);
  let inter = 0;
  for (const s of aSet) if (bSet.has(s)) inter++;
  const union = new Set([...aSet, ...bSet]).size;
  const jaccard = union ? inter / union : 0;
  const aStr = aSegs.join('-');
  const bStr = bSegs.join('-');
  const lev = 1 - levenshtein(aStr, bStr) / Math.max(aStr.length, bStr.length, 1);
  return 0.6 * jaccard + 0.4 * lev;
}

/* --------------------------------------------------------- classification --- */

/**
 * Mutually-exclusive top-level categories, in the order they are emitted.
 * `prefix-plus-renaming__*` uses BEM-style block__element naming: the shared
 * block is `prefix-plus-renaming`, the element is the detected rename pattern.
 */
const CATEGORY_ORDER = [
  'prefix-only',
  'prefix-plus-renaming__palette-colors',
  'prefix-plus-renaming__product-colors',
  'prefix-plus-renaming__semantic-colors',
  'prefix-plus-renaming__focus-ring',
  'prefix-plus-renaming__transition-function',
  'prefix-plus-renaming__other',
  'removed',
  'added',
];

/** Expected semantic-colors post name: `color-{a}-{rest}` → `{a}-color-{rest}`. */
function colorReorderExpected(preBare) {
  const tail = preBare.slice('color-'.length).split('-').filter(Boolean);
  if (tail.length < 2) return null;
  return `${tail[0]}-color-${tail.slice(1).join('-')}`;
}

/** Expected focus-ring post name: `focus-ring-{variant}-box-shadow` → `focus-ring-box-shadow-{variant}`. */
function focusRingReorderExpected(preBare) {
  const m = /^focus-ring-(.+)-box-shadow$/.exec(preBare);
  if (!m) return null;
  return `focus-ring-box-shadow-${m[1]}`;
}

/** Expected transition-function post name: `{rest}-transition-function` → `{rest}-transition-timing-function`. */
function transitionFunctionExpected(preBare) {
  const suffix = '-transition-function';
  if (!preBare.endsWith(suffix)) return null;
  return `${preBare.slice(0, -suffix.length)}-transition-timing-function`;
}

/**
 * Classify a resolved before→after pair into one mutually-exclusive category.
 * Classification is DESCRIPTIVE: the actual pair must fit the rule, otherwise it
 * falls through to `prefix-plus-renaming__other` (which doubles as the
 * review-by-hand bucket for fuzzy / one-off renames).
 */
function classify(before, after) {
  if (after === null) return 'removed';
  const preBare = before.slice(PRE_PREFIX.length);
  const postBare = after.slice(POST_PREFIX.length);
  if (preBare === postBare) return 'prefix-only';
  if (preBare.startsWith('color-palette-') && postBare.startsWith('core-color-')) {
    return 'prefix-plus-renaming__palette-colors';
  }
  if (preBare.startsWith('color-') && postBare.startsWith('product-')) {
    return 'prefix-plus-renaming__product-colors';
  }
  if (preBare.startsWith('color-') && postBare === colorReorderExpected(preBare)) {
    return 'prefix-plus-renaming__semantic-colors';
  }
  if (postBare === focusRingReorderExpected(preBare)) {
    return 'prefix-plus-renaming__focus-ring';
  }
  if (postBare === transitionFunctionExpected(preBare)) {
    return 'prefix-plus-renaming__transition-function';
  }
  return 'prefix-plus-renaming__other';
}

/* ------------------------------------------------------------- main --- */

function main() {
  // 1. Extract pre/post token-name sets.
  const preCss = gitShow(PRE_REF, TOKENS_CSS_PATH);
  const postCss = readFileSync(join(REPO_ROOT, TOKENS_CSS_PATH), 'utf8');
  const preNames = extractCssTokenNames(preCss, PRE_PREFIX);
  const postNames = extractCssTokenNames(postCss, POST_PREFIX);

  // 2. Changeset rename graph (S1).
  const changesetPairs = parseChangesets();
  const graph = buildRenameGraph(changesetPairs);

  // 3. Source-JSON provenance (S2), pre from `main`, post from working tree.
  const preFiles = listSourceJsonAtRef(PRE_REF);
  const postFiles = listSourceJsonWorkingTree();
  const preProv = buildProvenance(preFiles, (f) => gitShow(PRE_REF, f), PRE_PREFIX);
  const postProv = buildProvenance(
    postFiles,
    (f) => readFileSync(join(REPO_ROOT, f), 'utf8'),
    POST_PREFIX,
  );

  // Post token segment multiset index, keyed by file, for S2 structural match.
  const usedAfter = new Set();

  const resolutions = [];

  for (const preName of [...preNames].sort()) {
    const bare = preName.slice(PRE_PREFIX.length); // strip --token-
    const s0 = POST_PREFIX + bare; // --hds-<bare>
    let after = null;
    let confidence = 'low';
    const signals = [];

    // S0 — mechanical prefix swap, verbatim hit.
    if (postNames.has(s0)) {
      after = s0;
      confidence = 'high';
      signals.push('S0');
    } else {
      // S1 — changeset chain composed on top of S0.
      const { endpoint } = graph.resolve(s0);
      if (endpoint !== s0 && postNames.has(endpoint)) {
        after = endpoint;
        confidence = 'high';
        signals.push('S0', 'S1');
      }
    }

    // S2 — source-JSON provenance + structure (same file, equal segment multiset).
    if (!after) {
      const preFile = preProv.tokenFile.get(preName);
      if (preFile) {
        const postTokensInFile = postProv.fileTokens.get(preFile);
        if (postTokensInFile) {
          const preSegs = [...bare.split('-')].filter(Boolean).sort().join('|');
          const candidates = [];
          for (const [postName] of postTokensInFile) {
            if (usedAfter.has(postName)) continue;
            const postSegs = segments(postName, POST_PREFIX).sort().join('|');
            if (postSegs === preSegs) candidates.push(postName);
          }
          if (candidates.length === 1) {
            after = candidates[0];
            confidence = 'high';
            signals.push('S2');
          }
        }
      }
    }

    // S3 — fuzzy fallback, scoped by file provenance where possible.
    if (!after) {
      const preFile = preProv.tokenFile.get(preName);
      const preSegs = bare.split('-').filter(Boolean);
      let pool = [];
      if (preFile && postProv.fileTokens.has(preFile)) {
        pool = [...postProv.fileTokens.get(preFile).keys()].filter((n) => !usedAfter.has(n));
      }
      if (pool.length === 0) {
        pool = [...postNames].filter((n) => !usedAfter.has(n));
      }
      let best = null;
      let bestScore = 0;
      for (const cand of pool) {
        const score = similarity(preSegs, segments(cand, POST_PREFIX));
        if (score > bestScore) {
          bestScore = score;
          best = cand;
        }
      }
      if (best && bestScore >= 0.6) {
        after = best;
        confidence = 'low';
        signals.push('S3');
      }
    }

    if (after) usedAfter.add(after);
    resolutions.push({ before: preName, after, confidence, signals });
  }

  const added = [...postNames].sort();

  writeReports({
    preNames,
    postNames,
    resolutions,
    added,
    changesetPairs,
    graph,
  });
}

/* ------------------------------------------------------------- reports --- */

function writeReports({ preNames, postNames, resolutions, added, changesetPairs, graph }) {
  mkdirSync(REPORT_DIR, { recursive: true });

  // Categorize every resolved pre token, plus brand-new post tokens.
  const targeted = new Set(resolutions.map((r) => r.after).filter(Boolean));
  const brandNew = added.filter((n) => !targeted.has(n));

  const categories = Object.fromEntries(CATEGORY_ORDER.map((k) => [k, []]));
  for (const r of resolutions) {
    categories[classify(r.before, r.after)].push({ before: r.before, after: r.after });
  }
  for (const n of brandNew) categories['added'].push({ before: null, after: n });

  // Flat, human-scannable map: mutually-exclusive top keys; every child is a
  // uniform { before, after } pair (added → before:null, removed → after:null).
  writeFileSync(
    join(REPORT_DIR, 'token-map.generated.json'),
    JSON.stringify(categories, null, 2) + '\n',
  );

  // Detailed human report.
  const signalsOf = new Map(resolutions.map((r) => [r.before, r.signals]));
  const s0 = resolutions.filter((r) => r.signals.includes('S0') && !r.signals.includes('S1'));
  const s1 = resolutions.filter((r) => r.signals.includes('S1'));
  const s2 = resolutions.filter((r) => r.signals.includes('S2'));
  const s3 = resolutions.filter((r) => r.signals.includes('S3'));
  const unresolved = resolutions.filter((r) => r.after === null);
  const highCount = resolutions.filter((r) => r.confidence === 'high').length;
  const lowCount = resolutions.filter((r) => r.confidence === 'low' && r.after).length;

  const L = [];
  L.push('# Token Diff — Phase A (carbonization mapping proposal)');
  L.push('');
  L.push(`- Generated: ${new Date().toISOString()}`);
  L.push(`- Pre ref: \`${PRE_REF}\` (prefix \`${PRE_PREFIX}\`) — ${preNames.size} tokens`);
  L.push(`- Post: working tree (prefix \`${POST_PREFIX}\`) — ${postNames.size} tokens`);
  L.push('');
  L.push('## Summary — by category');
  L.push('');
  L.push('| Category | Count |');
  L.push('| --- | ---: |');
  for (const k of CATEGORY_ORDER) L.push(`| \`${k}\` | ${categories[k].length} |`);
  L.push('');
  L.push('## Summary — by signal / confidence');
  L.push('');
  L.push('| Metric | Count |');
  L.push('| --- | ---: |');
  L.push(`| Resolved (high confidence) | ${highCount} |`);
  L.push(`| Resolved (low / fuzzy — review) | ${lowCount} |`);
  L.push(`| Unresolved (removed / after: null) | ${unresolved.length} |`);
  L.push(`| S0 prefix-swap only | ${s0.length} |`);
  L.push(`| S1 changeset-resolved | ${s1.length} |`);
  L.push(`| S2 structural (source JSON) | ${s2.length} |`);
  L.push(`| S3 fuzzy | ${s3.length} |`);
  L.push(`| Changeset pairs parsed | ${changesetPairs.length} |`);
  L.push(`| Changeset conflicts | ${graph.conflicts.length} |`);
  L.push('');

  const rowTable = (rows) => {
    const out = ['| Before (`--token-*`) | After (`--hds-*`) | Signals |', '| --- | --- | --- |'];
    for (const { before, after } of rows) {
      const sig = before ? (signalsOf.get(before) || []).join(', ') : 'new';
      out.push(
        `| ${before ? `\`${before}\`` : '—'} | ${after ? `\`${after}\`` : '—'} | ${sig || '—'} |`,
      );
    }
    return out;
  };

  const descriptions = {
    'prefix-only':
      'Only the namespace prefix changed (`--token-` → `--hds-`); structure identical.',
    'prefix-plus-renaming__palette-colors':
      'Rule: `color-palette-{hue}-{step}` → `core-color-{hue}-{step}`.',
    'prefix-plus-renaming__product-colors':
      'Rule: `color-{product}-…` → `product-{product}-…-color`.',
    'prefix-plus-renaming__semantic-colors':
      'Rule: `color-{semantic}-{rest}` → `{semantic}-color-{rest}`.',
    'prefix-plus-renaming__focus-ring':
      'Rule: `focus-ring-{variant}-box-shadow` → `focus-ring-box-shadow-{variant}`.',
    'prefix-plus-renaming__transition-function':
      'Rule: `{rest}-transition-function` → `{rest}-transition-timing-function`.',
    'prefix-plus-renaming__other':
      'Structural renames that do not fit a systematic rule — review each.',
    removed:
      'No successor token found (`after: null`) — decide: map manually or flag with a TODO.',
    added:
      'Brand-new post tokens with no pre origin (informational; not applied by Phase B).',
  };

  for (const k of CATEGORY_ORDER) {
    L.push(`## \`${k}\` — ${categories[k].length}`);
    L.push('');
    L.push(descriptions[k]);
    L.push('');
    if (k === 'added') {
      L.push('<details><summary>Show list</summary>');
      L.push('');
      for (const { after } of categories[k]) L.push(`- \`${after}\``);
      L.push('');
      L.push('</details>');
    } else {
      L.push(...rowTable(categories[k]));
    }
    L.push('');
  }

  if (graph.conflicts.length) {
    L.push('## Changeset conflicts');
    L.push('');
    L.push('| Before | Candidate afters |');
    L.push('| --- | --- |');
    for (const c of graph.conflicts) {
      L.push(`| \`${c.before}\` | ${c.afters.map((a) => `\`${a}\``).join(', ')} |`);
    }
    L.push('');
  }

  writeFileSync(join(REPORT_DIR, 'token-diff.md'), L.join('\n') + '\n');

  const catCounts = CATEGORY_ORDER.map((k) => `${k}=${categories[k].length}`).join(' ');
  process.stdout.write(
    `Phase A complete.\n` +
      `  pre=${preNames.size} post=${postNames.size}\n` +
      `  ${catCounts}\n` +
      `  resolved high=${highCount} low=${lowCount} unresolved=${unresolved.length}\n` +
      `  reports: ${relative(REPO_ROOT, join(REPORT_DIR, 'token-map.generated.json'))}\n` +
      `           ${relative(REPO_ROOT, join(REPORT_DIR, 'token-diff.md'))}\n`,
  );
}

main();
