#!/usr/bin/env node
// @ts-check
/*
 * verify-tokens.mjs
 *
 * Reusable, dependency-free auditor for the HDS token naming-convention effort.
 *
 * It scans a target codebase for CSS custom-property token usages that match a
 * given prefix (e.g. `--hds-`) and reports any usage that is NOT part of the
 * union of:
 *   1. the "official" token list, resolved from the installed
 *      `@hashicorp/design-system-tokens` dependency at
 *      `<pkg>/dist/products/css/tokens.css`, and
 *   2. an inline `allowlist` of extra known tokens (same prefix, but not defined
 *      in the tokens package — e.g. internal `--hds-var-*` runtime variables).
 *
 * This file is the REUSABLE CORE — do not edit it per repo. All repo-specific
 * inputs live in an external JSON config (see ./config/hds-pilot.config.json).
 *
 * The token source is resolved from the dependency (codebase-agnostic), so the
 * same script works in any repo that installs `@hashicorp/design-system-tokens`.
 * A `--tokens-css <path>` flag (or `tokensCssOverride` in config) can point at a
 * raw file for repos where the dependency is not installed.
 *
 * Official-token extraction uses PostCSS when it can be resolved, and falls back
 * to a regex scan otherwise (so the tool stays dependency-free by default).
 *
 * Usage:
 *   node verify-tokens.mjs [options]
 *
 * Options:
 *   --config <path>       Config file (default: ./config/hds-pilot.config.json
 *                         resolved relative to this script).
 *   --root <path>         Repo root to scan (default: current working directory).
 *   --tokens-css <path>   Explicit path to the official tokens.css (overrides the
 *                         dependency resolution and `tokensCssOverride`).
 *   --out <dir>           Output directory for report files
 *                         (default: ../reports relative to this script).
 *   --json                Also print the machine-readable summary to stdout.
 *
 * Output:
 *   Always writes two report files to the output directory:
 *     - token-usage-audit.md    (human-readable)
 *     - token-usage-audit.json  (machine-readable)
 *
 * Exit codes:
 *   0  audit completed (whether or not invalid tokens were found)
 *   3  usage / config / resolution / IO error
 *
 * The audit itself never fails the process — it is a report, not a gate.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { dirname, join, resolve, relative, extname } from 'node:path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------------------------ args --- */

function parseArgs(argv) {
  const args = {
    config: null,
    root: process.cwd(),
    tokensCss: null,
    out: null,
    json: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--json':
        args.json = true;
        break;
      case '--config':
        args.config = argv[++i];
        break;
      case '--root':
        args.root = resolve(argv[++i]);
        break;
      case '--tokens-css':
        args.tokensCss = argv[++i];
        break;
      case '--out':
        args.out = argv[++i];
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
  cfg.tokensPackage ??= '@hashicorp/design-system-tokens';
  cfg.tokensCssPath ??= 'dist/products/css/tokens.css';
  cfg.tokensCssOverride ??= null;
  cfg.tokensResolveFrom ??= null;
  cfg.prefix ??= '--hds-';
  cfg.roots ??= ['.'];
  cfg.extensions ??= ['scss', 'css', 'gts', 'hbs', 'ts', 'js'];
  cfg.excludeGlobs ??= [
    '**/dist/**',
    '**/node_modules/**',
    '**/.git/**',
    '**/*.map',
    '**/*.md',
  ];
  cfg.reportSubdir ??= null;
  cfg.allowlist ??= [];
  cfg.ignoreComments ??= false;
  cfg.reportGroups ??= null;
  return { cfg, path };
}

/* ---------------------------------------------------- tokens.css resolve --- */

// Build the ordered list of directories to try as a module-resolution base.
// In a single-package repo the root suffices; in a monorepo the dependency is
// often linked under a consuming package (e.g. packages/components/node_modules),
// so we also try `tokensResolveFrom` and each scanned root.
function resolutionBases(cfg, root) {
  const bases = [root];
  const extra = [];
  if (cfg.tokensResolveFrom) {
    for (const b of [].concat(cfg.tokensResolveFrom)) extra.push(b);
  }
  for (const r of cfg.roots) extra.push(r);
  for (const b of extra) {
    const abs = resolve(root, b);
    if (!bases.includes(abs)) bases.push(abs);
  }
  return bases;
}

// Resolve a package subpath from any of the candidate base directories.
// Returns the resolved absolute path, or null if none resolve.
function resolveFromBases(bases, specifier) {
  for (const base of bases) {
    const require = createRequire(pathToFileURL(join(base, 'index.js')).href);
    try {
      return require.resolve(specifier);
    } catch {
      // try next base
    }
  }
  return null;
}

// Resolve the official tokens.css path in priority order:
//   1. explicit --tokens-css flag
//   2. config.tokensCssOverride
//   3. the installed `<tokensPackage>/<tokensCssPath>` dependency
function resolveTokensCss(cfg, root, flagPath) {
  if (flagPath) {
    const p = resolve(root, flagPath);
    assertReadable(p, 'tokens css (from --tokens-css)');
    return { path: p, source: 'flag' };
  }
  if (cfg.tokensCssOverride) {
    const p = resolve(root, cfg.tokensCssOverride);
    assertReadable(p, 'tokens css (from config.tokensCssOverride)');
    return { path: p, source: 'config-override' };
  }
  // Resolve the dependency's package.json, then join the configured css subpath.
  // Using package.json avoids reliance on an `exports` map (the tokens package
  // does not define one).
  const bases = resolutionBases(cfg, root);
  const pkgJsonPath = resolveFromBases(bases, `${cfg.tokensPackage}/package.json`);
  if (!pkgJsonPath) {
    fail(
      `cannot resolve "${cfg.tokensPackage}" from ${root} (tried ${bases.length} base dir(s)). ` +
        `Install the dependency, set config.tokensResolveFrom, or pass --tokens-css / set config.tokensCssOverride.`,
    );
  }
  const p = join(dirname(pkgJsonPath), cfg.tokensCssPath);
  assertReadable(p, `tokens css (from ${cfg.tokensPackage}/${cfg.tokensCssPath})`);
  return { path: p, source: 'dependency' };
}

function assertReadable(p, label) {
  try {
    statSync(p);
  } catch {
    fail(`cannot read ${label}: ${p}`);
  }
}

/* --------------------------------------------------- official token list --- */

// Collect official custom-property names (matching prefix) from tokens.css.
// Tries PostCSS first; falls back to a regex scan if PostCSS is unavailable.
async function loadOfficialTokens(cssPath, prefix, bases) {
  const css = readFileSync(cssPath, 'utf8');
  const tokens = new Set();

  const postcss = await tryLoadPostcss(bases);
  if (postcss) {
    try {
      const rootNode = postcss.parse(css, { from: cssPath });
      rootNode.walkDecls((decl) => {
        if (decl.prop && decl.prop.startsWith(prefix)) tokens.add(decl.prop);
      });
      return { tokens, mode: 'postcss' };
    } catch {
      // fall through to regex mode on any parse failure
    }
  }

  // Regex fallback: match `--custom-prop:` declaration heads.
  const escaped = escapeRegExp(prefix);
  const re = new RegExp(`(${escaped}[a-zA-Z0-9-]+)\\s*:`, 'g');
  let m;
  while ((m = re.exec(css)) !== null) tokens.add(m[1]);
  return { tokens, mode: 'regex' };
}

// Try to import PostCSS from the candidate base dirs first, then from this
// tool's own module context. Returns the module or null if it cannot be found.
async function tryLoadPostcss(bases) {
  const resolvedPaths = [
    resolveFromBases(bases, 'postcss'),
    (() => {
      try {
        return createRequire(import.meta.url).resolve('postcss');
      } catch {
        return null;
      }
    })(),
  ].filter(Boolean);
  for (const resolved of resolvedPaths) {
    try {
      const mod = await import(pathToFileURL(resolved).href);
      return mod.default ?? mod;
    } catch {
      // try next candidate
    }
  }
  return null;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ------------------------------------------------------------ glob match --- */

// Minimal glob → RegExp supporting **, *, ? on POSIX-style paths.
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
  files.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
  return files;
}

/* --------------------------------------------------------- target scan --- */

// Extract every token-like identifier (prefix + name) from a file, with line
// and column positions. Names use the CSS custom-property character set.
// A usage immediately followed by an interpolation marker (`#{` for Sass or
// `${` for JS template literals) is a dynamic name whose concrete expansion
// cannot be known statically; it is flagged as `interpolated` so the caller can
// exclude it from invalid results.
// Replace every non-newline character in a matched span with a space. This
// neutralizes comment content while preserving line and column positions so
// reported locations stay accurate.
function blankSpan(match) {
  return match.replace(/[^\n]/g, ' ');
}

// Blank out comment spans so tokens that appear only inside comments are not
// counted as usages. This is intentionally conservative and language-agnostic:
//   - `/* ... */` block comments (css, scss, js, ts, gts)
//   - `{{! ... }}` / `{{!-- ... --}}` Handlebars comments (hbs, gts)
//   - `// ...` line comments (scss, js, ts, gts), but NOT when preceded by `:`
//     so URLs like `https://` are left intact.
// Positions are preserved so line/column data remains correct.
function stripComments(src, ext) {
  const blockLangs = new Set(['css', 'scss', 'js', 'ts', 'gts', 'mjs', 'cjs']);
  const hbsLangs = new Set(['hbs', 'gts']);
  const lineLangs = new Set(['scss', 'js', 'ts', 'gts', 'mjs', 'cjs']);
  let out = src;
  if (blockLangs.has(ext)) {
    out = out.replace(/\/\*[\s\S]*?\*\//g, blankSpan);
  }
  if (hbsLangs.has(ext)) {
    out = out.replace(/\{\{!--[\s\S]*?--\}\}/g, blankSpan);
    out = out.replace(/\{\{![\s\S]*?\}\}/g, blankSpan);
  }
  if (lineLangs.has(ext)) {
    out = out.replace(/(^|[^:])\/\/[^\n]*/gm, (m, pre) => pre + blankSpan(m.slice(pre.length)));
  }
  return out;
}

// Count raw prefixed-token matches (including interpolated ones). Used only to
// derive how many usages were dropped by comment stripping.
function countMatches(src, prefix) {
  const re = new RegExp(`${escapeRegExp(prefix)}[a-zA-Z0-9-]+`, 'g');
  const m = src.match(re);
  return m ? m.length : 0;
}

function extractUsages(src, prefix) {
  const escaped = escapeRegExp(prefix);
  const re = new RegExp(`${escaped}[a-zA-Z0-9-]+`, 'g');
  const usages = [];
  const lines = src.split('\n');
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(line)) !== null) {
      const after = line.slice(m.index + m[0].length, m.index + m[0].length + 2);
      const interpolated = after === '#{' || after === '${';
      usages.push({
        token: m[0],
        line: li + 1,
        column: m.index + 1,
        interpolated,
      });
    }
  }
  return usages;
}

function scanTargets(cfg, root, validSet) {
  const files = collectFiles(cfg, root);
  const invalidByToken = new Map(); // token -> [{ file, line, column }]
  let totalUsages = 0;
  let interpolatedUsages = 0;
  let commentedUsages = 0;
  const ignoreComments = cfg.ignoreComments !== false;

  for (const { abs, rel } of files) {
    const raw = readFileSync(abs, 'utf8');
    const ext = extname(abs).slice(1).toLowerCase();
    const src = ignoreComments ? stripComments(raw, ext) : raw;
    if (ignoreComments) {
      commentedUsages += countMatches(raw, cfg.prefix) - countMatches(src, cfg.prefix);
    }
    const usages = extractUsages(src, cfg.prefix);
    for (const u of usages) {
      totalUsages++;
      if (u.interpolated) {
        interpolatedUsages++;
        continue;
      }
      if (validSet.has(u.token)) continue;
      if (!invalidByToken.has(u.token)) invalidByToken.set(u.token, []);
      invalidByToken.get(u.token).push({ file: rel, line: u.line, column: u.column });
    }
  }

  return {
    filesScanned: files.length,
    totalUsages,
    interpolatedUsages,
    commentedUsages,
    invalidByToken,
  };
}

/* --------------------------------------------------------------- output --- */

function buildReportData({
  cfg,
  tokensCssRel,
  tokenSourceKind,
  parseMode,
  officialCount,
  allowlistCount,
  scan,
}) {
  const invalidTokens = [...scan.invalidByToken.entries()]
    .map(([token, locations]) => ({
      token,
      occurrences: locations.length,
      locations,
    }))
    .sort((a, b) =>
      a.token < b.token ? -1 : a.token > b.token ? 1 : 0,
    );

  const totalInvalidOccurrences = invalidTokens.reduce(
    (sum, t) => sum + t.occurrences,
    0,
  );

  return {
    generatedAt: new Date().toISOString(),
    prefix: cfg.prefix,
    tokenSource: {
      path: tokensCssRel,
      kind: tokenSourceKind,
      parseMode,
    },
    roots: cfg.roots,
    extensions: cfg.extensions,
    ignoreComments: cfg.ignoreComments !== false,
    reportGroups: cfg.reportGroups,
    summary: {
      officialTokens: officialCount,
      allowlistTokens: allowlistCount,
      validTokens: officialCount + allowlistCount,
      filesScanned: scan.filesScanned,
      totalTokenUsages: scan.totalUsages,
      interpolatedUsages: scan.interpolatedUsages,
      commentedUsages: scan.commentedUsages,
      distinctInvalidTokens: invalidTokens.length,
      totalInvalidOccurrences,
    },
    invalidTokens,
  };
}

function renderMarkdown(data) {
  const s = data.summary;
  const lines = [];
  lines.push('# Token Usage Audit');
  lines.push('');
  lines.push(`- Generated: ${data.generatedAt}`);
  lines.push(`- Prefix audited: \`${data.prefix}\``);
  lines.push(
    `- Token source: \`${data.tokenSource.path}\` (${data.tokenSource.kind}, parsed via ${data.tokenSource.parseMode})`,
  );
  lines.push(`- Roots scanned: ${data.roots.map((r) => `\`${r}\``).join(', ')}`);
  lines.push(
    `- Extensions: ${data.extensions.map((e) => `\`${e}\``).join(', ')}`,
  );
  lines.push(`- Comments ignored: ${data.ignoreComments ? 'yes' : 'no'}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Count |');
  lines.push('| --- | ---: |');
  lines.push(`| Official tokens | ${s.officialTokens} |`);
  lines.push(`| Allowlist tokens | ${s.allowlistTokens} |`);
  lines.push(`| Valid tokens (union) | ${s.validTokens} |`);
  lines.push(`| Files scanned | ${s.filesScanned} |`);
  lines.push(`| Total token usages | ${s.totalTokenUsages} |`);
  lines.push(`| Interpolated usages (skipped) | ${s.interpolatedUsages} |`);
  if (data.ignoreComments) {
    lines.push(`| Commented usages (skipped) | ${s.commentedUsages} |`);
  }
  lines.push(`| Distinct invalid tokens | ${s.distinctInvalidTokens} |`);
  lines.push(`| Total invalid occurrences | ${s.totalInvalidOccurrences} |`);
  lines.push('');
  lines.push('## Invalid tokens');
  lines.push('');
  if (data.invalidTokens.length === 0) {
    lines.push('No invalid token usages found. ✅');
    lines.push('');
  } else if (data.reportGroups && data.reportGroups.length > 0) {
    const assigned = new Set();
    for (const group of data.reportGroups) {
      const rows = [];
      for (const t of data.invalidTokens) {
        const locs = t.locations.filter(
          (l) => l.file === group || l.file.startsWith(group + '/'),
        );
        if (locs.length === 0) continue;
        rows.push({ token: t.token, locations: locs });
        for (const l of locs) assigned.add(`${t.token}|${l.file}|${l.line}`);
      }
      if (rows.length === 0) continue;
      const occ = rows.reduce((sum, r) => sum + r.locations.length, 0);
      lines.push(`### \`${group}\``);
      lines.push('');
      lines.push(`${rows.length} invalid token(s), ${occ} occurrence(s).`);
      lines.push('');
      lines.push(...renderTokenTable(rows));
      lines.push('');
    }
    const ungrouped = [];
    for (const t of data.invalidTokens) {
      const locs = t.locations.filter(
        (l) => !assigned.has(`${t.token}|${l.file}|${l.line}`),
      );
      if (locs.length > 0) ungrouped.push({ token: t.token, locations: locs });
    }
    if (ungrouped.length > 0) {
      const occ = ungrouped.reduce((sum, r) => sum + r.locations.length, 0);
      lines.push('### Ungrouped');
      lines.push('');
      lines.push(`${ungrouped.length} invalid token(s), ${occ} occurrence(s).`);
      lines.push('');
      lines.push(...renderTokenTable(ungrouped));
      lines.push('');
    }
  } else {
    lines.push(...renderTokenTable(data.invalidTokens));
    lines.push('');
  }
  return lines.join('\n');
}

// Render a Markdown table listing every invalid token and all of its
// occurrence locations (no sampling).
function renderTokenTable(rows) {
  const out = [];
  out.push('| Token | Occurrences | Locations |');
  out.push('| --- | ---: | --- |');
  for (const t of rows) {
    const locs = t.locations.map((l) => `${l.file}:${l.line}`).join('<br>');
    out.push(`| \`${t.token}\` | ${t.locations.length} | ${locs} |`);
  }
  return out;
}

function writeReports(outDir, data, jsonToStdout) {
  try {
    mkdirSync(outDir, { recursive: true });
  } catch (e) {
    fail(`cannot create output directory: ${outDir} (${e.message})`);
  }
  const mdPath = join(outDir, 'token-usage-audit.md');
  const jsonPath = join(outDir, 'token-usage-audit.json');
  try {
    writeFileSync(mdPath, renderMarkdown(data) + '\n');
    writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n');
  } catch (e) {
    fail(`cannot write report files to ${outDir} (${e.message})`);
  }
  if (jsonToStdout) {
    process.stdout.write(JSON.stringify(data, null, 2) + '\n');
  } else {
    const s = data.summary;
    process.stdout.write(
      `token audit: ${s.distinctInvalidTokens} invalid token(s), ` +
        `${s.totalInvalidOccurrences} occurrence(s) across ${s.filesScanned} file(s).\n` +
        `  official=${s.officialTokens} allowlist=${s.allowlistTokens} ` +
        `(source: ${data.tokenSource.parseMode})\n` +
        `  reports: ${mdPath}\n           ${jsonPath}\n`,
    );
  }
}

/* ----------------------------------------------------------------- main --- */

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { cfg } = loadConfig(args.config);

  const { path: tokensCssPath, source: tokenSourceKind } = resolveTokensCss(
    cfg,
    args.root,
    args.tokensCss,
  );

  const bases = resolutionBases(cfg, args.root);
  const { tokens: officialTokens, mode: parseMode } = await loadOfficialTokens(
    tokensCssPath,
    cfg.prefix,
    bases,
  );

  const allowlist = new Set(cfg.allowlist);
  const validSet = new Set([...officialTokens, ...allowlist]);

  const scan = scanTargets(cfg, args.root, validSet);

  const tokensCssRel = relative(args.root, tokensCssPath).split('\\').join('/');
  const data = buildReportData({
    cfg,
    tokensCssRel,
    tokenSourceKind,
    parseMode,
    officialCount: officialTokens.size,
    allowlistCount: allowlist.size,
    scan,
  });

  const outDir = args.out
    ? resolve(args.root, args.out)
    : join(SCRIPT_DIR, 'reports', ...(cfg.reportSubdir ? [cfg.reportSubdir] : []));
  writeReports(outDir, data, args.json);

  process.exit(0);
}

main().catch((e) => fail(e && e.stack ? e.stack : String(e)));
