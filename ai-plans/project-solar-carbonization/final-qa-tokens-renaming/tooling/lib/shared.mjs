// @ts-check
/**
 * Shared helpers for the generation-2 ("final QA") token-renaming tooling.
 *
 * Dependency-free: Node built-ins only. See ../../PLAN.md for the rationale.
 */

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const HDS_PREFIX = '--hds-';
export const TOKEN_PREFIX = '--token-';

const LIB_DIR = dirname(fileURLToPath(import.meta.url));

/** Absolute path of the monorepo root (…/tooling/lib → up 5). */
export const REPO_ROOT = resolve(LIB_DIR, '../../../../..');

/** Absolute path of `final-qa-tokens-renaming/tooling`. */
export const TOOLING_DIR = resolve(LIB_DIR, '..');

/* ------------------------------------------------------------------ cli --- */

export function fail(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

/**
 * Minimal `--flag value` / `--boolean` parser.
 *
 * @param {string[]} argv
 * @param {Record<string, string|boolean|null>} defaults
 */
export function parseArgs(argv, defaults) {
  const args = { ...defaults };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) fail(`unexpected argument: ${a}`);
    const key = a.slice(2);
    if (!(key in args)) fail(`unknown argument: ${a}`);
    if (typeof args[key] === 'boolean') args[key] = true;
    else args[key] = argv[++i];
  }
  return args;
}

/* ----------------------------------------------------------------- misc --- */

export function sha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

export function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    fail(`cannot read/parse JSON: ${path} (${e.message})`);
  }
}

/** Write a file, creating its parent directory if needed. */
export function writeOut(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}

export function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Byte-wise ascending sort, so re-runs are byte-identical. */
export function byName(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** `git rev-parse` helper that degrades gracefully outside a repo. */
export function gitRef(ref = 'HEAD') {
  try {
    return execFileSync('git', ['rev-parse', ref], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    }).trim();
  } catch {
    return null;
  }
}

export function gitSubject(ref) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%s', ref], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    }).trim();
  } catch {
    return null;
  }
}

/* ------------------------------------------------------ canonical tokens --- */

const TOKENS_SRC = 'packages/tokens/src';

/**
 * Walk a parsed design-token JSON document and collect leaf CSS names.
 *
 * The rule (verified 1:1 against `packages/tokens/dist/products/css/tokens.css`):
 * a leaf is any object carrying a `$value` key; its CSS custom-property name is
 * `--hds-` + its JSON path joined with `-`; leaves flagged `private` are not
 * emitted to the products CSS and are therefore skipped.
 *
 * `$value` nodes are terminal — never recurse into them.
 */
function collectLeaves(node, path, file, out) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
    const nextPath = [...path, key];
    if ('$value' in value) {
      if (value.private === true || value.private === 'true') continue;
      out.set(HDS_PREFIX + nextPath.join('-'), file);
    } else {
      collectLeaves(value, nextPath, file, out);
    }
  }
}

function listWorktreeJson(dirAbs, out = []) {
  for (const entry of readdirSync(dirAbs, { withFileTypes: true })) {
    const abs = join(dirAbs, entry.name);
    if (entry.isDirectory()) listWorktreeJson(abs, out);
    else if (entry.isFile() && entry.name.endsWith('.json')) out.push(abs);
  }
  return out;
}

/**
 * Derive the canonical token inventory from `packages/tokens/src`.
 *
 * No build required — `dist/` is never read.
 *
 * @param {string|null} ref - a git ref, or `null`/`'WORKTREE'` for the working tree.
 * @returns {{ names: Map<string,string>, warnings: string[], fileCount: number }}
 *          `names` maps CSS custom-property name → repo-relative source file.
 */
export function canonicalTokens(ref = null) {
  const names = new Map();
  const warnings = [];
  const useWorktree = !ref || ref === 'WORKTREE';
  let files;

  if (useWorktree) {
    files = listWorktreeJson(join(REPO_ROOT, TOKENS_SRC)).map((abs) =>
      relative(REPO_ROOT, abs)
    );
  } else {
    files = execFileSync(
      'git',
      ['ls-tree', '-r', '--name-only', ref, '--', TOKENS_SRC],
      { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
    )
      .split('\n')
      .filter((f) => f.endsWith('.json'));
  }

  for (const file of files) {
    let raw;
    try {
      raw = useWorktree
        ? readFileSync(join(REPO_ROOT, file), 'utf8')
        : execFileSync('git', ['show', `${ref}:${file}`], {
            cwd: REPO_ROOT,
            encoding: 'utf8',
            maxBuffer: 64 * 1024 * 1024,
          });
    } catch (e) {
      warnings.push(`cannot read ${file}: ${e.message}`);
      continue;
    }
    let doc;
    try {
      doc = JSON.parse(raw);
    } catch (e) {
      warnings.push(`cannot parse ${file}: ${e.message}`);
      continue;
    }
    collectLeaves(doc, [], file, names);
  }

  return { names, warnings, fileCount: files.length };
}

/* ----------------------------------------------------------- gen-2 map --- */

/**
 * Load `token-changes.generated.json` and expose it as lookup structures.
 *
 * Refuses to proceed when the map failed validation or when the source markdown
 * has changed since the map was generated, unless `force` is set.
 *
 * @param {string} mapPath
 * @param {{ force?: boolean, sourcePath?: string }} [opts]
 */
export function loadRenameMap(mapPath, opts = {}) {
  const map = readJson(mapPath);
  const meta = map.meta ?? {};

  if (meta.validated === false && !opts.force) {
    fail(
      `${relative(REPO_ROOT, mapPath)} has meta.validated === false.\n` +
        `  Fix the offending rows in ${meta.source ?? 'the source markdown'} and re-run build-token-changes.mjs,\n` +
        `  or pass --force to proceed anyway (the output will be wrong for those rows).`
    );
  }

  const sourcePath = opts.sourcePath ?? resolveSourcePath(meta.source);
  if (sourcePath && meta.sourceSha256) {
    let live;
    try {
      live = sha256(readFileSync(sourcePath, 'utf8'));
    } catch {
      live = null;
    }
    if (live && live !== meta.sourceSha256 && !opts.force) {
      fail(
        `${relative(REPO_ROOT, mapPath)} is STALE — ${relative(REPO_ROOT, sourcePath)} changed since it was generated.\n` +
          `  Re-run build-token-changes.mjs, or pass --force.`
      );
    }
  }

  const renamed = new Map();
  for (const e of map.renamed ?? []) renamed.set(e.before, e.after);
  const removed = new Set((map.removed ?? []).map((e) => e.before));
  const added = (map.added ?? []).map((e) => e.after).sort(byName);

  return { map, meta, renamed, removed, added };
}

function resolveSourcePath(source) {
  if (!source) return null;
  return resolve(REPO_ROOT, source);
}

/* --------------------------------------------------------- md rendering --- */

/** Render a GitHub-flavoured markdown table. */
export function table(headers, rows) {
  if (!rows.length) return '_None._\n';
  const lines = [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${r.join(' | ')} |`),
  ];
  return lines.join('\n') + '\n';
}

export function code(s) {
  return s === null || s === undefined ? '—' : `\`${s}\``;
}
