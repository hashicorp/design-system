#!/usr/bin/env node
// @ts-check
/*
 * migrate-tokens.mjs — Phase B: token-usage migrator + verification
 *
 * Reusable, dependency-free applier. It takes the token map produced by Phase A
 * (`token-map.generated.json`) and mechanically rewrites every stale
 * pre-carbonization token usage in a target codebase to its new name.
 *
 * This file is the REUSABLE CORE — do not edit it per repo. All repo-specific
 * inputs live in an external JSON config (see ./config/migrate.hds.config.json).
 * Retarget by copying this file unchanged, authoring a new config, and pointing
 * it at the `token-map.generated.json` from Phase A.
 *
 * What it does:
 *   - Loads the map; consumes every category array uniformly. Entries with a
 *     non-null `after` become `before → after` renames; `after: null` entries
 *     (the `removed` category) become drops; entries with `before: null` (the
 *     `added` category) are informational and ignored.
 *   - Replaces `var(--old)` and bare `--old` references with `--new`.
 *     Mechanical, idempotent, position-preserving.
 *   - Skips + flags interpolated dynamic names (`…#{…}` / `…${…}`).
 *   - For `after: null` (removed with no successor), inserts a TODO marker and
 *     reports each occurrence instead of editing.
 *   - `dryRun: true` → report only, write no source files.
 *   - Verification pass: re-scan and confirm zero stale pre-token names remain.
 *
 * Usage:
 *   node migrate-tokens.mjs --config <path>
 *
 * Exit codes:
 *   0  migration completed (report written)
 *   3  usage / config / IO error
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, relative, extname } from 'node:path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

/* ----------------------------------------------------------------- args --- */

function fail(msg) {
  process.stderr.write(`error: ${msg}\n`);
  process.exit(3);
}

function parseArgs(argv) {
  const args = { config: null, root: process.cwd() };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
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
  if (!args.config) fail('missing required --config <path>');
  return args;
}

/* --------------------------------------------------------------- config --- */

function loadConfig(configPath) {
  const path = resolve(configPath);
  let cfg;
  try {
    cfg = JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    fail(`cannot read/parse config: ${path} (${e.message})`);
  }
  cfg.mapPath ??= 'reports/hds/token-map.generated.json';
  cfg.reportDir ??= 'reports/hds';
  cfg.prefix ??= '--token-';
  cfg.sassPrefixes ??= [];
  cfg.roots ??= ['.'];
  cfg.extensions ??= ['scss', 'css', 'gts', 'hbs', 'ts', 'js'];
  cfg.excludeGlobs ??= [
    '**/dist/**',
    '**/node_modules/**',
    '**/.git/**',
    '**/*.map',
    '**/*.md',
  ];
  cfg.todoMarker ??= '🚧 TODO [HDS-TOKEN-CARBONIZATION]';
  cfg.dryRun ??= false;
  return { cfg, dir: dirname(path) };
}

/* ----------------------------------------------------------------- map --- */

function loadMap(mapAbsPath) {
  let map;
  try {
    map = JSON.parse(readFileSync(mapAbsPath, 'utf8'));
  } catch (e) {
    fail(`cannot read/parse token map: ${mapAbsPath} (${e.message})`);
  }
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    fail(`token map must be an object of category arrays: ${mapAbsPath}`);
  }
  const rename = new Map(); // before -> after (non-null)
  const drop = new Set(); // before with after === null
  // Consume every category array uniformly, regardless of key name: entries
  // with a non-null `after` are renames; `after: null` are drops (TODO); entries
  // without a `before` (the `added` category) are informational and skipped.
  for (const entries of Object.values(map)) {
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      if (!entry || typeof entry.before !== 'string') continue;
      if (entry.after === null || entry.after === undefined) drop.add(entry.before);
      else if (typeof entry.after === 'string') rename.set(entry.before, entry.after);
    }
  }
  if (rename.size === 0 && drop.size === 0) {
    fail(`token map has no usable entries: ${mapAbsPath}`);
  }
  return { rename, drop };
}

/* ------------------------------------------------------------ glob/walk --- */

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
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
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
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
    if (st.isDirectory()) for (const f of walk(base, root, isExcluded, extSet)) files.push(f);
  }
  files.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
  return files;
}

/* --------------------------------------------------------- comment strip --- */

function blankSpan(match) {
  return match.replace(/[^\n]/g, ' ');
}

function stripComments(src, ext) {
  const blockLangs = new Set(['css', 'scss', 'js', 'ts', 'gts', 'mjs', 'cjs']);
  const hbsLangs = new Set(['hbs', 'gts']);
  const lineLangs = new Set(['scss', 'js', 'ts', 'gts', 'mjs', 'cjs']);
  let out = src;
  if (blockLangs.has(ext)) out = out.replace(/\/\*[\s\S]*?\*\//g, blankSpan);
  if (hbsLangs.has(ext)) {
    out = out.replace(/\{\{!--[\s\S]*?--\}\}/g, blankSpan);
    out = out.replace(/\{\{![\s\S]*?\}\}/g, blankSpan);
  }
  if (lineLangs.has(ext)) {
    out = out.replace(/(^|[^:])\/\/[^\n]*/gm, (m, pre) => pre + blankSpan(m.slice(pre.length)));
  }
  return out;
}

/* -------------------------------------------------------------- migrate --- */

/**
 * Rewrite a single file's content. Token references are matched against the
 * full set of `prefix + name` identifiers. A match immediately followed by an
 * interpolation marker (`#{` / `${`) is skipped and recorded. Comment regions
 * are consulted (via a stripped mirror) so tokens that appear only inside
 * comments are neither rewritten nor flagged.
 */
function migrateContent(raw, ext, prefixes, rename, drop, todoMarker) {
  const stripped = stripComments(raw, ext);
  const prefixAlt = prefixes.map(escapeRegExp).join('|');
  const re = new RegExp(`(${prefixAlt})[a-zA-Z0-9-]+`, 'g');

  const replacements = []; // { token, after }
  const interpolated = []; // { token, line }
  const todos = []; // { token, line }

  // Work on the raw string but consult `stripped` to know if a match is inside
  // a comment (stripped char is a space where raw had a token char).
  let out = '';
  let last = 0;
  let m;
  re.lastIndex = 0;
  const raws = raw;
  while ((m = re.exec(raws)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    const token = m[0];
    // Inside a comment? stripped mirror will have been blanked.
    const inComment = stripped.slice(start, end) !== token;
    if (inComment) continue;

    const after2 = raws.slice(end, end + 2);
    const isInterp = after2 === '#{' || after2 === '${';
    const line = raws.slice(0, start).split('\n').length;

    if (isInterp) {
      interpolated.push({ token, line });
      continue;
    }
    if (rename.has(token)) {
      out += raws.slice(last, start) + rename.get(token);
      last = end;
      replacements.push({ token, after: rename.get(token), line });
    } else if (drop.has(token)) {
      todos.push({ token, line });
      // No edit here — TODO markers are inserted line-wise below.
    }
  }
  out += raws.slice(last);

  // Insert TODO marker comments (one per affected line, above the line).
  if (todos.length) {
    out = insertTodoMarkers(out, todos, ext, todoMarker);
  }

  return { out, replacements, interpolated, todos };
}

/** Insert a language-appropriate TODO comment above each affected line. */
function insertTodoMarkers(content, todos, ext, marker) {
  const linesWithTodos = new Map(); // lineNo -> Set<token>
  for (const t of todos) {
    if (!linesWithTodos.has(t.line)) linesWithTodos.set(t.line, new Set());
    linesWithTodos.get(t.line).add(t.token);
  }
  const commentFor = (text) => {
    if (ext === 'hbs') return `{{! ${text} }}`;
    return `/* ${text} */`;
  };
  const lines = content.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1;
    if (linesWithTodos.has(lineNo)) {
      // Idempotency: skip if the previous line is already a TODO marker for this
      // effort (re-running must not stack duplicate markers).
      const prev = i > 0 ? lines[i - 1] : '';
      if (!prev.includes(marker)) {
        const tokens = [...linesWithTodos.get(lineNo)].join(', ');
        const indent = (lines[i].match(/^\s*/) || [''])[0];
        out.push(indent + commentFor(`${marker} — no successor for ${tokens}`));
      }
    }
    out.push(lines[i]);
  }
  return out.join('\n');
}

/* --------------------------------------------------------------- report --- */

function renderMarkdown(data) {
  const L = [];
  L.push('# Token Migration — Phase B');
  L.push('');
  L.push(`- Generated: ${data.generatedAt}`);
  L.push(`- Map: \`${data.mapPath}\``);
  L.push(`- Prefix scanned: ${data.prefixes.map((p) => `\`${p}\``).join(', ')}`);
  L.push(`- Roots: ${data.roots.map((r) => `\`${r}\``).join(', ')}`);
  L.push(`- Dry run: ${data.dryRun ? 'yes (no files written)' : 'no'}`);
  L.push('');
  L.push('## Summary');
  L.push('');
  L.push('| Metric | Count |');
  L.push('| --- | ---: |');
  L.push(`| Files scanned | ${data.summary.filesScanned} |`);
  L.push(`| Files changed | ${data.summary.filesChanged} |`);
  L.push(`| Replacements | ${data.summary.replacements} |`);
  L.push(`| TODO markers (no successor) | ${data.summary.todos} |`);
  L.push(`| Interpolated (skipped) | ${data.summary.interpolated} |`);
  L.push(`| Stale tokens remaining (verify) | ${data.summary.staleRemaining} |`);
  L.push('');

  L.push('## Replacements by token');
  L.push('');
  L.push('| Before | After | Count |');
  L.push('| --- | --- | ---: |');
  for (const r of data.replacementsByToken) {
    L.push(`| \`${r.before}\` | \`${r.after}\` | ${r.count} |`);
  }
  L.push('');

  if (data.todos.length) {
    L.push('## TODO — removed tokens with no successor');
    L.push('');
    L.push('| Token | Location |');
    L.push('| --- | --- |');
    for (const t of data.todos) L.push(`| \`${t.token}\` | ${t.file}:${t.line} |`);
    L.push('');
  }

  if (data.interpolated.length) {
    L.push('## Interpolated (manual review)');
    L.push('');
    L.push('| Token | Location |');
    L.push('| --- | --- |');
    for (const t of data.interpolated) L.push(`| \`${t.token}\` | ${t.file}:${t.line} |`);
    L.push('');
  }

  if (data.staleRemaining.length) {
    L.push('## Stale tokens remaining after migration');
    L.push('');
    L.push('| Token | Location |');
    L.push('| --- | --- |');
    for (const t of data.staleRemaining) L.push(`| \`${t.token}\` | ${t.file}:${t.line} |`);
    L.push('');
  }

  return L.join('\n') + '\n';
}

/* ----------------------------------------------------------------- main --- */

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { cfg, dir: configDir } = loadConfig(args.config);
  const root = args.root;

  const mapAbs = resolve(configDir, cfg.mapPath);
  const { rename, drop } = loadMap(mapAbs);

  const prefixes = [cfg.prefix, ...cfg.sassPrefixes].filter(Boolean);
  const files = collectFiles(cfg, root);

  let filesChanged = 0;
  let totalReplacements = 0;
  const replacementCounts = new Map(); // "before>after" -> count
  const allTodos = [];
  const allInterpolated = [];

  for (const { abs, rel } of files) {
    const raw = readFileSync(abs, 'utf8');
    const ext = extname(abs).slice(1).toLowerCase();
    const { out, replacements, interpolated, todos } = migrateContent(
      raw,
      ext,
      prefixes,
      rename,
      drop,
      cfg.todoMarker,
    );
    for (const r of replacements) {
      const key = `${r.token}>${r.after}`;
      replacementCounts.set(key, (replacementCounts.get(key) || 0) + 1);
      totalReplacements++;
    }
    for (const t of todos) allTodos.push({ ...t, file: rel });
    for (const t of interpolated) allInterpolated.push({ ...t, file: rel });

    if (out !== raw) {
      filesChanged++;
      if (!cfg.dryRun) writeFileSync(abs, out);
    }
  }

  // Verification pass: re-scan for any remaining `before` tokens (renamed set).
  const staleRemaining = [];
  const renameKeys = new Set(rename.keys());
  if (!cfg.dryRun) {
    for (const { abs, rel } of files) {
      const raw = readFileSync(abs, 'utf8');
      const ext = extname(abs).slice(1).toLowerCase();
      const stripped = stripComments(raw, ext);
      const prefixAlt = prefixes.map(escapeRegExp).join('|');
      const re = new RegExp(`(${prefixAlt})[a-zA-Z0-9-]+`, 'g');
      let m;
      while ((m = re.exec(stripped)) !== null) {
        if (renameKeys.has(m[0])) {
          const line = stripped.slice(0, m.index).split('\n').length;
          staleRemaining.push({ token: m[0], file: rel, line });
        }
      }
    }
  }

  const replacementsByToken = [...replacementCounts.entries()]
    .map(([key, count]) => {
      const [before, after] = key.split('>');
      return { before, after, count };
    })
    .sort((a, b) => (a.before < b.before ? -1 : 1));

  const data = {
    generatedAt: new Date().toISOString(),
    mapPath: relative(process.cwd(), mapAbs).split('\\').join('/'),
    prefixes,
    roots: cfg.roots,
    dryRun: cfg.dryRun,
    summary: {
      filesScanned: files.length,
      filesChanged,
      replacements: totalReplacements,
      todos: allTodos.length,
      interpolated: allInterpolated.length,
      staleRemaining: staleRemaining.length,
    },
    replacementsByToken,
    todos: allTodos,
    interpolated: allInterpolated,
    staleRemaining,
  };

  const reportDir = resolve(configDir, cfg.reportDir);
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(join(reportDir, 'token-migration.md'), renderMarkdown(data));
  writeFileSync(join(reportDir, 'token-migration.json'), JSON.stringify(data, null, 2) + '\n');

  process.stdout.write(
    `Phase B ${cfg.dryRun ? '(dry run) ' : ''}complete.\n` +
      `  files scanned=${files.length} changed=${filesChanged} replacements=${totalReplacements}\n` +
      `  todos=${allTodos.length} interpolated=${allInterpolated.length} stale-remaining=${staleRemaining.length}\n` +
      `  reports: ${relative(process.cwd(), join(reportDir, 'token-migration.md'))}\n` +
      `           ${relative(process.cwd(), join(reportDir, 'token-migration.json'))}\n`,
  );
}

main();
