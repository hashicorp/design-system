// @ts-check
/**
 * build-token-changes.mjs — turn the human-authored markdown into the machine-readable
 * generation-2 rename map, and validate it against the token source.
 *
 *   node ai-plans/project-solar-carbonization/final-qa-tokens-renaming/tooling/build-token-changes.mjs
 *
 * Source of truth : ai-plans/project-solar-carbonization/tokens-qa/token-changes.md
 * Output          : tooling/reports/token-changes.generated.json  (+ build-token-changes.md)
 *
 * This is the ONLY script tied to the markdown. Everything downstream reads the
 * generated JSON. See ../PLAN.md §3.
 */

import { readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

import {
  HDS_PREFIX,
  REPO_ROOT,
  TOOLING_DIR,
  byName,
  canonicalTokens,
  code,
  fail,
  gitRef,
  gitSubject,
  parseArgs,
  readJson,
  sha256,
  table,
  writeOut,
} from './lib/shared.mjs';

const DEFAULTS = {
  source: resolve(TOOLING_DIR, '../../tokens-qa/token-changes.md'),
  out: resolve(TOOLING_DIR, 'reports/token-changes.generated.json'),
  report: resolve(TOOLING_DIR, 'reports/build-token-changes.md'),
  gen1map: resolve(
    TOOLING_DIR,
    '../../full-tokens-replacement/tooling/reports/hds/token-map.generated.json'
  ),
  ref: null, // null = working tree
  'dry-run': false,
};

/* --------------------------------------------------------------- parsing --- */

const NAME_SHAPE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/** Strip backticks/whitespace and normalise to a bare (prefix-less) name. */
function bare(cell) {
  let s = cell.trim().replace(/`/g, '').trim();
  if (s.startsWith(HDS_PREFIX)) s = s.slice(HDS_PREFIX.length);
  return s;
}

const isDelimiterCell = (c) => /^:?-{2,}:?$/.test(c.trim());
const isHeaderCell = (c) => /^(token\s*\/\s*)?(before|after|token|old|new)$/i.test(c.trim());

/**
 * Split the document into `## `-delimited sections, keyed by a normalised
 * heading. Headings are matched semantically so the colleagues can retitle the
 * sections without breaking the parser.
 */
function splitSections(md) {
  const sections = new Map();
  const parts = md.split(/^##[^#\n]*$/m);
  const headings = [...md.matchAll(/^##([^#\n]*)$/gm)].map((m) => m[1].trim());
  headings.forEach((h, i) => sections.set(h, parts[i + 1] ?? ''));
  return sections;
}

function findSection(sections, patterns) {
  for (const [heading, body] of sections) {
    const h = heading.toLowerCase();
    if (patterns.some((p) => h.includes(p))) return { heading, body };
  }
  return null;
}

/** Parse a two-column markdown table into `[before, after]` bare-name pairs. */
function parseTable(body, warnings, heading) {
  const rows = [];
  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim();
    if (!line.startsWith('|')) continue;
    const cells = line.replace(/^\|/, '').replace(/\|$/, '').split('|');
    if (cells.every(isDelimiterCell)) continue;
    if (cells.every(isHeaderCell)) continue;
    if (cells.length !== 2) {
      warnings.push(`"${heading}": skipped malformed row with ${cells.length} cells: ${line}`);
      continue;
    }
    const before = bare(cells[0]);
    const after = bare(cells[1]);
    if (!before && !after) continue;
    rows.push({ before, after, line });
  }
  return rows;
}

/** Parse a bullet list into bare names. */
function parseList(body) {
  return [...body.matchAll(/^\s*[-*]\s+(.+?)\s*$/gm)].map((m) => ({
    name: bare(m[1]),
    line: m[0].trim(),
  }));
}

/* ------------------------------------------------------------------ main --- */

function main() {
  const args = parseArgs(process.argv.slice(2), DEFAULTS);
  const sourcePath = resolve(String(args.source));
  const outPath = resolve(String(args.out));
  const reportPath = resolve(String(args.report));
  const dryRun = Boolean(args['dry-run']);
  const ref = args.ref ? String(args.ref) : null;

  let md;
  try {
    md = readFileSync(sourcePath, 'utf8');
  } catch (e) {
    fail(`cannot read source markdown: ${sourcePath} (${e.message})`);
  }

  const warnings = [];
  const sections = splitSections(md);

  const renamedSec = findSection(sections, ['chang', 'renam']);
  const addedSec = findSection(sections, ['new', 'add']);
  const removedSec = findSection(sections, ['remov', 'delet']);

  if (!renamedSec) fail('no "Changed / Renamed tokens" section found in the markdown');
  if (!addedSec) warnings.push('no "New / Added tokens" section found — assuming none');
  if (!removedSec) warnings.push('no "Removed tokens" section found — assuming none');

  const renamedRows = parseTable(renamedSec.body, warnings, renamedSec.heading);
  const addedRows = addedSec ? parseList(addedSec.body) : [];
  const removedRows = removedSec ? parseList(removedSec.body) : [];

  /* ------------------------------------------------------------- gates --- */

  const gates = [];
  const problems = []; // rows that make the map unusable
  const addGate = (id, name, ok, detail) => gates.push({ id, name, ok, detail });

  // V1 — name shape.
  const shapeErrors = [];
  const checkShape = (n, where) => {
    if (!NAME_SHAPE.test(n)) shapeErrors.push(`${where}: \`${n}\``);
  };
  for (const r of renamedRows) {
    checkShape(r.before, 'renamed.before');
    checkShape(r.after, 'renamed.after');
  }
  for (const r of addedRows) checkShape(r.name, 'added');
  for (const r of removedRows) checkShape(r.name, 'removed');
  addGate(
    'V1',
    'Name shape',
    shapeErrors.length === 0,
    shapeErrors.length ? shapeErrors.join('; ') : 'all names are lowercase kebab-case'
  );
  problems.push(...shapeErrors.map((e) => `Malformed name — ${e}`));

  // V2 — duplicates.
  const dupes = [];
  const findDupes = (list, label) => {
    const seen = new Set();
    for (const n of list) {
      if (seen.has(n)) dupes.push(`${label}: \`${n}\``);
      seen.add(n);
    }
  };
  findDupes(renamedRows.map((r) => r.before), 'duplicate renamed.before');
  findDupes(renamedRows.map((r) => r.after), 'duplicate renamed.after');
  findDupes(addedRows.map((r) => r.name), 'duplicate added');
  findDupes(removedRows.map((r) => r.name), 'duplicate removed');
  addGate('V2', 'No duplicates', dupes.length === 0, dupes.join('; ') || 'none');
  problems.push(...dupes);

  // V3 — no self-maps.
  const selfMaps = renamedRows.filter((r) => r.before === r.after).map((r) => `\`${r.before}\``);
  addGate('V3', 'No self-maps', selfMaps.length === 0, selfMaps.join(', ') || 'none');
  problems.push(...selfMaps.map((s) => `Self-map — ${s}`));

  // V4 — no rename chains (A→B and B→C). The single-pass rewriter assumes this.
  const beforeSet = new Set(renamedRows.map((r) => r.before));
  const chains = renamedRows
    .filter((r) => beforeSet.has(r.after))
    .map((r) => `\`${r.before}\` → \`${r.after}\` (which is itself renamed)`);
  addGate('V4', 'No rename chains', chains.length === 0, chains.join('; ') || 'none');
  problems.push(...chains.map((c) => `Rename chain — ${c}`));

  // V5 — sections must not overlap.
  const addedSet = new Set(addedRows.map((r) => r.name));
  const removedSet = new Set(removedRows.map((r) => r.name));
  const overlaps = [];
  for (const n of addedSet) if (removedSet.has(n)) overlaps.push(`\`${n}\` is both added and removed`);
  for (const r of renamedRows) {
    if (removedSet.has(r.after)) overlaps.push(`\`${r.after}\` is a rename target AND removed`);
    if (addedSet.has(r.after)) overlaps.push(`\`${r.after}\` is a rename target AND listed as added`);
    if (addedSet.has(r.before)) overlaps.push(`\`${r.before}\` is renamed away AND listed as added`);
  }
  addGate('V5', 'Sections disjoint', overlaps.length === 0, overlaps.join('; ') || 'none');
  problems.push(...overlaps);

  // V6/V7 — reconcile against the canonical inventory derived from packages/tokens/src.
  const { names: canonical, warnings: canonWarnings } = canonicalTokens(ref);
  warnings.push(...canonWarnings);
  const has = (bareName) => canonical.has(HDS_PREFIX + bareName);

  const ghostBefore = [];
  for (const r of renamedRows) {
    if (has(r.before)) ghostBefore.push(`\`${HDS_PREFIX}${r.before}\` (renamed away, but still exists)`);
  }
  for (const r of removedRows) {
    if (has(r.name)) ghostBefore.push(`\`${HDS_PREFIX}${r.name}\` (removed, but still exists)`);
  }
  addGate(
    'V6',
    'Old names are gone',
    ghostBefore.length === 0,
    ghostBefore.join('; ') || 'no renamed/removed name survives in packages/tokens/src'
  );
  problems.push(...ghostBefore.map((g) => `Stale source token — ${g}`));

  const missingAfter = [];
  for (const r of renamedRows) {
    if (!has(r.after)) {
      missingAfter.push({
        kind: 'renamed',
        detail: `\`${r.before}\` → \`${r.after}\``,
        name: `${HDS_PREFIX}${r.after}`,
      });
    }
  }
  for (const r of addedRows) {
    if (!has(r.name)) {
      missingAfter.push({ kind: 'added', detail: `\`${r.name}\``, name: `${HDS_PREFIX}${r.name}` });
    }
  }
  addGate(
    'V7',
    'New names exist',
    missingAfter.length === 0,
    missingAfter.length
      ? missingAfter.map((m) => `${m.kind}: ${m.detail}`).join('; ')
      : 'every rename target and added token exists in packages/tokens/src'
  );

  const validated = gates.every((g) => g.ok) && missingAfter.length === 0;

  // V8 — completeness (ADVISORY). Reconstruct the pre-generation-2 inventory and
  // compare it with the generation-1 map's target set. A mismatch means either the
  // markdown is incomplete or the generation-1 map is stale — both worth knowing,
  // neither is a reason to refuse to emit the map.
  let completeness = { ok: null, detail: 'skipped — generation-1 map not readable' };
  try {
    const gen1 = readJson(resolve(String(args.gen1map)));
    const gen1After = new Set();
    for (const entries of Object.values(gen1)) {
      if (!Array.isArray(entries)) continue;
      for (const e of entries) if (typeof e?.after === 'string') gen1After.add(e.after);
    }
    const implied = new Set(canonical.keys());
    for (const r of addedRows) implied.delete(HDS_PREFIX + r.name);
    for (const r of renamedRows) {
      implied.delete(HDS_PREFIX + r.after);
      implied.add(HDS_PREFIX + r.before);
    }
    for (const r of removedRows) implied.add(HDS_PREFIX + r.name);
    const onlyImplied = [...implied].filter((n) => !gen1After.has(n)).sort(byName);
    const onlyGen1 = [...gen1After].filter((n) => !implied.has(n)).sort(byName);
    completeness = {
      ok: onlyImplied.length === 0 && onlyGen1.length === 0,
      impliedCount: implied.size,
      gen1Count: gen1After.size,
      onlyImplied,
      onlyGen1,
      detail:
        onlyImplied.length === 0 && onlyGen1.length === 0
          ? `implied pre-gen-2 inventory (${implied.size}) matches the generation-1 map exactly`
          : `implied ${implied.size} vs generation-1 map ${gen1After.size} — ` +
            `${onlyImplied.length} only in implied, ${onlyGen1.length} only in the map`,
    };
  } catch {
    /* advisory only */
  }

  /* ------------------------------------------------------------ output --- */

  const afterRef = gitRef('HEAD');
  const outJson = {
    meta: {
      generatedAt: new Date().toISOString(),
      generatedBy: 'final-qa-tokens-renaming/tooling/build-token-changes.mjs',
      source: relative(REPO_ROOT, sourcePath),
      sourceSha256: sha256(md),
      afterRef: ref ?? afterRef,
      afterRefIsWorkingTree: ref === null,
      canonicalCount: canonical.size,
      counts: {
        renamed: renamedRows.length,
        removed: removedRows.length,
        added: addedRows.length,
      },
      validated,
      warnings,
    },
    renamed: renamedRows
      .map((r) => ({ before: HDS_PREFIX + r.before, after: HDS_PREFIX + r.after }))
      .sort((a, b) => byName(a.before, b.before)),
    removed: removedRows
      .map((r) => ({ before: HDS_PREFIX + r.name, after: null }))
      .sort((a, b) => byName(a.before, b.before)),
    added: addedRows
      .map((r) => ({ before: null, after: HDS_PREFIX + r.name }))
      .sort((a, b) => byName(a.after, b.after)),
  };

  const report = renderReport({
    outJson,
    sourcePath,
    gates,
    missingAfter,
    completeness,
    warnings,
    validated,
    dryRun,
  });

  if (dryRun) {
    console.log(report);
    console.log('— dry run: nothing written —');
  } else {
    writeOut(outPath, JSON.stringify(outJson, null, 2) + '\n');
    writeOut(reportPath, report);
  }

  /* ---------------------------------------------------------- summary --- */

  const rel = (p) => relative(REPO_ROOT, p);
  console.log(`\nSource      : ${rel(sourcePath)}`);
  console.log(`Canonical   : ${canonical.size} tokens in packages/tokens/src (${ref ?? 'working tree'})`);
  console.log(
    `Parsed      : ${renamedRows.length} renamed, ${addedRows.length} added, ${removedRows.length} removed`
  );
  for (const g of gates) console.log(`  ${g.ok ? '✅' : '❌'} ${g.id} ${g.name}`);
  console.log(
    `  ${completeness.ok === null ? '➖' : completeness.ok ? '✅' : '⚠️ '} V8 Completeness (advisory) — ${completeness.detail}`
  );
  if (!dryRun) {
    console.log(`\nWrote       : ${rel(outPath)}`);
    console.log(`Wrote       : ${rel(reportPath)}`);
  }
  console.log(
    validated
      ? '\n✅ meta.validated = true — downstream scripts may run.'
      : '\n⚠️  meta.validated = false — downstream scripts will refuse to run without --force.\n' +
          `   Fix the flagged rows in ${rel(sourcePath)}, then re-run this script.`
  );
}

/* -------------------------------------------------------------- report --- */

function renderReport({
  outJson,
  sourcePath,
  gates,
  missingAfter,
  completeness,
  warnings,
  validated,
  dryRun,
}) {
  const m = outJson.meta;
  const L = [];
  L.push('# Generation-2 token rename map');
  L.push('');
  L.push(`- Generated: ${m.generatedAt}${dryRun ? ' _(dry run — not written)_' : ''}`);
  L.push(`- Source: \`${m.source}\` (sha256 \`${m.sourceSha256.slice(0, 12)}…\`)`);
  L.push(
    `- After ref: \`${m.afterRef ?? 'unknown'}\`${m.afterRefIsWorkingTree ? ' _(working tree)_' : ''}` +
      (gitSubject(m.afterRef) ? ` — ${gitSubject(m.afterRef)}` : '')
  );
  L.push(`- Canonical tokens in \`packages/tokens/src\`: **${m.canonicalCount}**`);
  L.push(`- \`meta.validated\`: **${validated}**`);
  L.push('');

  if (!validated) {
    L.push('## ⚠️ ACTION REQUIRED — the map did not validate');
    L.push('');
    L.push(
      'The map was still written (with `meta.validated: false`) so the rest of the pipeline can be ' +
        'rehearsed, but `update-token-map.mjs`, `update-changeset.mjs` and the consumer migration will ' +
        '**refuse to run without `--force`**. Fix the rows below in the source markdown and re-run.'
    );
    L.push('');
    if (missingAfter.length) {
      L.push('### Rename targets / added tokens that do not exist in `packages/tokens/src`');
      L.push('');
      L.push(
        table(
          ['Section', 'Row', 'Expected CSS name'],
          missingAfter.map((x) => [x.kind, x.detail, code(x.name)])
        )
      );
      L.push(
        'Either the token has not been created yet, or the row is a typo, or the change was in ' +
          'fact a deletion rather than a rename (in which case move it to the **Removed tokens** list).'
      );
      L.push('');
    }
    const otherFailures = gates.filter((g) => !g.ok);
    if (otherFailures.length) {
      L.push('### Other failing gates');
      L.push('');
      L.push(table(['Gate', 'Detail'], otherFailures.map((g) => [`${g.id} ${g.name}`, g.detail])));
      L.push('');
    }
  }

  L.push('## Summary');
  L.push('');
  L.push(
    table(
      ['Metric', 'Count'],
      [
        ['Renamed', String(m.counts.renamed)],
        ['Added', String(m.counts.added)],
        ['Removed', String(m.counts.removed)],
        ['Canonical tokens (after)', String(m.canonicalCount)],
      ]
    )
  );
  L.push('');

  L.push('## Verification gates');
  L.push('');
  const gateRows = gates.map((g) => [`${g.id} ${g.name}`, g.ok ? '✅ pass' : '❌ fail', g.detail]);
  gateRows.push([
    'V8 Completeness (advisory)',
    completeness.ok === null ? '➖ skipped' : completeness.ok ? '✅ pass' : '⚠️ mismatch',
    completeness.detail,
  ]);
  L.push(table(['Gate', 'Result', 'Detail'], gateRows));
  L.push('');

  if (completeness.ok === false) {
    L.push('### V8 detail');
    L.push('');
    L.push(
      'The *implied* pre-generation-2 inventory is reconstructed by undoing this map against the ' +
        'canonical set. It should equal the set of `after` names in the committed generation-1 map. ' +
        'A mismatch means the markdown is missing rows, **or** the generation-1 map is stale.'
    );
    L.push('');
    if (completeness.onlyImplied.length) {
      L.push('**Only in the implied pre-gen-2 inventory** (missing from the generation-1 map):');
      L.push('');
      for (const n of completeness.onlyImplied.slice(0, 50)) L.push(`- ${code(n)}`);
      if (completeness.onlyImplied.length > 50)
        L.push(`- …and ${completeness.onlyImplied.length - 50} more`);
      L.push('');
    }
    if (completeness.onlyGen1.length) {
      L.push('**Only in the generation-1 map** (unaccounted for by the markdown):');
      L.push('');
      for (const n of completeness.onlyGen1.slice(0, 50)) L.push(`- ${code(n)}`);
      if (completeness.onlyGen1.length > 50)
        L.push(`- …and ${completeness.onlyGen1.length - 50} more`);
      L.push('');
    }
  }

  if (warnings.length) {
    L.push('## Warnings');
    L.push('');
    for (const w of warnings) L.push(`- ${w}`);
    L.push('');
  }

  L.push('## Renamed tokens');
  L.push('');
  L.push(table(['Before', 'After'], outJson.renamed.map((e) => [code(e.before), code(e.after)])));
  L.push('');
  L.push('## Added tokens');
  L.push('');
  L.push(table(['Token'], outJson.added.map((e) => [code(e.after)])));
  L.push('');
  L.push('## Removed tokens');
  L.push('');
  L.push(table(['Token'], outJson.removed.map((e) => [code(e.before)])));
  L.push('');

  return L.join('\n');
}

main();
