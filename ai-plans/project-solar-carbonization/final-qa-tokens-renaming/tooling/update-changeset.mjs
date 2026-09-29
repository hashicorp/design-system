// @ts-check
/**
 * update-changeset.mjs — rewrite `.changeset/carbonization-design-tokens.md` so
 * it describes the FINAL token set as a single renaming event.
 *
 *   node ai-plans/project-solar-carbonization/final-qa-tokens-renaming/tooling/update-changeset.mjs --dry-run
 *   node ai-plans/project-solar-carbonization/final-qa-tokens-renaming/tooling/update-changeset.mjs
 *
 * Rows are edited, moved between tables, inserted or deleted — never appended as
 * a second "and then we also renamed…" wave.
 *
 * ⚠️ Parsing hazard: the heading `Renamed tokens:` appears TWICE in the file. The
 * second one introduces a table of `.hds-…` CSS *helper class* names, not custom
 * properties, and must never be fed to the token rewriter. Section anchoring
 * below always uses the FIRST occurrence and stops at `Added tokens:`.
 *
 * See ../PLAN.md §6.
 */

import { readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

import {
  HDS_PREFIX,
  REPO_ROOT,
  TOKEN_PREFIX,
  TOOLING_DIR,
  byName,
  code,
  fail,
  loadRenameMap,
  parseArgs,
  readJson,
  table,
  writeOut,
} from './lib/shared.mjs';

const DEFAULTS = {
  rename: resolve(TOOLING_DIR, 'reports/token-changes.generated.json'),
  map: resolve(
    TOOLING_DIR,
    '../../full-tokens-replacement/tooling/reports/hds/token-map.generated.json'
  ),
  changeset: resolve(TOOLING_DIR, '../../../../.changeset/carbonization-design-tokens.md'),
  report: resolve(TOOLING_DIR, 'reports/changeset-update.md'),
  'dry-run': false,
  force: false,
};

const H_RENAMED = 'Renamed tokens:';
const H_ADDED = 'Added tokens:';
const H_REMOVED = 'Removed tokens:';

/* -------------------------------------------------------------- parsing --- */

const isTableLine = (l) => l.trimStart().startsWith('|');
const isDelimiterRow = (l) =>
  l
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .every((c) => /^\s*:?-{2,}:?\s*$/.test(c));

function cellsOf(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

const unquote = (cell) => cell.replace(/`/g, '').trim();

/**
 * Locate the contiguous table block that follows `headingIdx`, bounded by
 * `limitIdx`. Returns the header/delimiter lines and the data rows.
 */
function findTable(lines, headingIdx, limitIdx, label) {
  let start = -1;
  for (let i = headingIdx + 1; i < limitIdx; i++) {
    if (isTableLine(lines[i])) {
      start = i;
      break;
    }
  }
  if (start === -1) fail(`could not find a table under "${label}"`);
  let end = start;
  while (end + 1 < limitIdx && isTableLine(lines[end + 1])) end++;

  const block = lines.slice(start, end + 1);
  const headerLines = [];
  let r = 0;
  if (block.length && !isDelimiterRow(block[0])) headerLines.push(block[r++]);
  if (block.length > r && isDelimiterRow(block[r])) headerLines.push(block[r++]);
  const rows = block.slice(r);
  return { start, end, headerLines, rows };
}

/* ------------------------------------------------------------------ main --- */

function main() {
  const args = parseArgs(process.argv.slice(2), DEFAULTS);
  const changesetPath = resolve(String(args.changeset));
  const reportPath = resolve(String(args.report));
  const dryRun = Boolean(args['dry-run']);
  const force = Boolean(args.force);

  const { meta, renamed, removed, added } = loadRenameMap(resolve(String(args.rename)), { force });

  // The shipping map is the SOURCE OF TRUTH; this changeset is a human-readable
  // rendering of it. Load it so gate C0 can assert the two agree — that is what
  // makes `update-token-map.mjs` a genuine prerequisite rather than a convention.
  const mapPath = resolve(String(args.map));
  const shippingMap = readJson(mapPath);

  // Derived from CONTENT, not a metadata flag: if the map still carries any
  // generation-2 source name as an `after` value, step B has not run yet.
  const mapAfters = new Set();
  for (const entries of Object.values(shippingMap)) {
    if (!Array.isArray(entries)) continue;
    for (const e of entries) if (typeof e?.after === 'string') mapAfters.add(e.after);
  }
  const notYetApplied = [...renamed.keys(), ...removed].filter((n) => mapAfters.has(n));
  if (notYetApplied.length > 0 && !force) {
    fail(
      `${relative(REPO_ROOT, mapPath)} has not been updated for generation 2 yet — ` +
        `${notYetApplied.length} generation-2 source name(s) still appear as \`after\` values, e.g. ` +
        `${notYetApplied.slice(0, 2).join(', ')}.\n` +
        `  The changeset is a rendering of that map, so run it first:\n` +
        `      node ${relative(REPO_ROOT, resolve(TOOLING_DIR, 'update-token-map.mjs'))}\n` +
        `  Or pass --force to skip this check.`
    );
  }

  let raw;
  try {
    raw = readFileSync(changesetPath, 'utf8');
  } catch (e) {
    fail(`cannot read changeset: ${changesetPath} (${e.message})`);
  }
  const lines = raw.split('\n');

  /* --------------------------------------------------- anchor sections --- */

  const rHeadingIdx = lines.findIndex((l) => l.trim() === H_RENAMED);
  const aHeadingIdx = lines.findIndex((l) => l.trim() === H_ADDED);
  const dHeadingIdx = lines.findIndex((l) => l.trim() === H_REMOVED);
  if (rHeadingIdx === -1) fail(`"${H_RENAMED}" not found in the changeset`);
  if (aHeadingIdx === -1) fail(`"${H_ADDED}" not found in the changeset`);
  if (dHeadingIdx === -1) fail(`"${H_REMOVED}" not found in the changeset`);
  if (!(rHeadingIdx < aHeadingIdx && aHeadingIdx < dHeadingIdx)) {
    fail('changeset sections are not in the expected order (Renamed → Added → Removed)');
  }

  let dLimit = lines.length;
  for (let i = dHeadingIdx + 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      dLimit = i;
      break;
    }
  }

  const R = findTable(lines, rHeadingIdx, aHeadingIdx, H_RENAMED);
  const A = findTable(lines, aHeadingIdx, dHeadingIdx, H_ADDED);
  const D = findTable(lines, dHeadingIdx, dLimit, H_REMOVED);

  /* ------------------------------------------------------ apply deltas --- */

  const stats = {
    rIn: R.rows.length,
    aIn: A.rows.length,
    dIn: D.rows.length,
    rRewritten: 0,
    rPromoted: 0,
    aRewritten: 0,
    aDeleted: 0,
    aInserted: 0,
  };
  const details = { rewrittenR: [], promoted: [], rewrittenA: [], deletedA: [], insertedA: [] };
  const warnings = [];

  // --- Section R: | `--token-X` | `--hds-Y` |
  const historicalBefore = [];
  const newR = []; // [beforeName, afterName]
  for (const line of R.rows) {
    const c = cellsOf(line);
    if (c.length !== 2) {
      warnings.push(`section R: skipped malformed row: ${line.trim()}`);
      continue;
    }
    const before = unquote(c[0]);
    const after = unquote(c[1]);
    historicalBefore.push(before);

    if (renamed.has(after)) {
      const next = renamed.get(after);
      newR.push([before, next]);
      stats.rRewritten++;
      details.rewrittenR.push({ before, from: after, to: next });
    } else if (removed.has(after)) {
      stats.rPromoted++;
      details.promoted.push({ before, lost: after });
      // moved into section D below
    } else {
      newR.push([before, after]);
    }
  }

  // --- Section A: | `--hds-Y` |
  const newA = [];
  for (const line of A.rows) {
    const c = cellsOf(line);
    if (c.length !== 1) {
      warnings.push(`section A: skipped malformed row: ${line.trim()}`);
      continue;
    }
    const name = unquote(c[0]);
    if (renamed.has(name)) {
      const next = renamed.get(name);
      newA.push(next);
      stats.aRewritten++;
      details.rewrittenA.push({ from: name, to: next });
    } else if (removed.has(name)) {
      stats.aDeleted++;
      details.deletedA.push({ name });
    } else {
      newA.push(name);
    }
  }
  for (const name of added) {
    if (newA.includes(name)) {
      warnings.push(`section A: ${name} already present, not inserted twice`);
      continue;
    }
    newA.push(name);
    stats.aInserted++;
    details.insertedA.push({ name });
  }

  // --- Section D: | `--token-X` | — only receives rows promoted out of R.
  const newD = [];
  for (const line of D.rows) {
    const c = cellsOf(line);
    if (c.length !== 1) {
      warnings.push(`section D: skipped malformed row: ${line.trim()}`);
      continue;
    }
    newD.push(unquote(c[0]));
    historicalBefore.push(unquote(c[0]));
  }
  for (const p of details.promoted) newD.push(p.before);

  /* ------------------------------------------------------------- order --- */

  // Emission order follows the SHIPPING MAP: category order, then the map's own
  // within-category order.
  //
  // The changeset has always mirrored the map this way — the committed file
  // matches the map's category order for 411 of its 424 rows, diverging only
  // where Part 1 moved entries. Re-sorting alphabetically instead would reshuffle
  // ~190 rows that have not changed, turning a 52-line diff into a 438-line one
  // and burying the real changes in the artifact humans actually read.
  const mapOrder = new Map();
  {
    let i = 0;
    for (const entries of Object.values(shippingMap)) {
      if (!Array.isArray(entries)) continue;
      for (const e of entries) mapOrder.set(`${e.before}|${e.after}`, i++);
    }
  }
  // Anything absent from the map sorts last by name; gate C0 means this is empty
  // in practice, but it keeps the ordering total rather than partial.
  const orderOf = (key, fallback) =>
    mapOrder.has(key) ? mapOrder.get(key) : Number.MAX_SAFE_INTEGER;

  newR.sort((x, y) => {
    const a = orderOf(`${x[0]}|${x[1]}`);
    const b = orderOf(`${y[0]}|${y[1]}`);
    return a - b || byName(x[0], y[0]);
  });
  newA.sort((x, y) => orderOf(`null|${x}`) - orderOf(`null|${y}`) || byName(x, y));
  newD.sort((x, y) => orderOf(`${x}|null`) - orderOf(`${y}|null`) || byName(x, y));

  /* ------------------------------------------------------------ re-emit --- */

  const rBlock = [...R.headerLines, ...newR.map(([b, a]) => `| \`${b}\` | \`${a}\` |`)];
  const aBlock = [...A.headerLines, ...newA.map((n) => `| \`${n}\` |`)];
  const dBlock = [...D.headerLines, ...newD.map((n) => `| \`${n}\` |`)];

  // Splice from the bottom up so earlier indices stay valid.
  const out = [...lines];
  out.splice(D.start, D.end - D.start + 1, ...dBlock);
  out.splice(A.start, A.end - A.start + 1, ...aBlock);
  out.splice(R.start, R.end - R.start + 1, ...rBlock);
  const result = out.join('\n');

  /* ------------------------------------------------------------- gates --- */

  const gates = [];
  const addGate = (id, name, ok, detail) => gates.push({ id, name, ok, detail });

  // C0 — MAP AGREEMENT. The three tables must reproduce the shipping map exactly.
  // This is the gate that makes the changeset a derived artifact rather than an
  // independently-maintained one that can silently drift.
  //
  // The map is keyed by CATEGORY, not by renamed/added/removed, so the three sets
  // are derived by flattening every category array — the same way
  // `migrate-tokens.mjs` loadMap() does. Reading `map.renamed` directly would
  // silently compare against nothing (categories are `prefix-only`,
  // `prefix-plus-renaming__*`, `removed`, `added`).
  const mapRenamed = [];
  const mapAdded = [];
  const mapRemoved = [];
  for (const entries of Object.values(shippingMap)) {
    if (!Array.isArray(entries)) continue; // skips `meta`
    for (const e of entries) {
      const hasBefore = typeof e?.before === 'string';
      const hasAfter = typeof e?.after === 'string';
      if (hasBefore && hasAfter) mapRenamed.push(`${e.before}|${e.after}`);
      else if (!hasBefore && hasAfter) mapAdded.push(e.after);
      else if (hasBefore && !hasAfter) mapRemoved.push(e.before);
    }
  }
  const mapR = mapRenamed.sort(byName);
  const mapA = mapAdded.sort(byName);
  const mapD = mapRemoved.sort(byName);
  const gotR = newR.map(([b, a]) => `${b}|${a}`).sort(byName);
  const gotA = [...newA].sort(byName);
  const gotD = [...newD].sort(byName);

  const diffOf = (got, want) => {
    const w = new Set(want);
    const g = new Set(got);
    return {
      onlyChangeset: got.filter((x) => !w.has(x)),
      onlyMap: want.filter((x) => !g.has(x)),
    };
  };
  const dR = diffOf(gotR, mapR);
  const dA = diffOf(gotA, mapA);
  const dD = diffOf(gotD, mapD);
  const agreementProblems = [
    ...dR.onlyChangeset.map((x) => `R only in changeset: ${x}`),
    ...dR.onlyMap.map((x) => `R only in map: ${x}`),
    ...dA.onlyChangeset.map((x) => `A only in changeset: ${x}`),
    ...dA.onlyMap.map((x) => `A only in map: ${x}`),
    ...dD.onlyChangeset.map((x) => `D only in changeset: ${x}`),
    ...dD.onlyMap.map((x) => `D only in map: ${x}`),
  ];
  addGate(
    'C0',
    'Agrees with shipping map',
    agreementProblems.length === 0,
    agreementProblems.length === 0
      ? `R ${gotR.length}/${mapR.length}, A ${gotA.length}/${mapA.length}, D ${gotD.length}/${mapD.length} — exact match`
      : `${agreementProblems.length} discrepancies: ${agreementProblems.slice(0, 5).join('; ')}`
  );

  // C1 — historical `--token-*` column frozen: R ∪ D must be conserved exactly.
  const histAfter = [...newR.map((x) => x[0]), ...newD].sort(byName);
  const histBefore = [...historicalBefore].sort(byName);
  const histEqual =
    histAfter.length === histBefore.length && histAfter.every((v, i) => v === histBefore[i]);
  addGate(
    'C1',
    'Historical column frozen',
    histEqual,
    `${histBefore.length} \`${TOKEN_PREFIX}*\` names before, ${histAfter.length} after` +
      (histEqual ? ' — identical multiset' : ' — A NAME WAS LOST OR INVENTED')
  );

  // C2 — no leftovers: no renamed/removed name may survive anywhere in the file,
  // except inside the CSS-helper-class section (which uses `.hds-…`, not `--hds-…`).
  const leftovers = [];
  for (const name of [...renamed.keys(), ...removed]) {
    const re = new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-zA-Z0-9-])`, 'g');
    const hits = [...result.matchAll(re)];
    if (hits.length) {
      const lineNos = hits.map((h) => result.slice(0, h.index).split('\n').length);
      leftovers.push(`${name} (lines ${lineNos.join(', ')})`);
    }
  }
  addGate('C2', 'No leftovers', leftovers.length === 0, leftovers.join('; ') || 'none');

  // C3 — tables disjoint: no name in both A and the "after" column of R.
  const rAfter = new Set(newR.map((x) => x[1]));
  const dupAcross = newA.filter((n) => rAfter.has(n)).sort(byName);
  addGate(
    'C3',
    'A / R-after disjoint',
    dupAcross.length === 0,
    dupAcross.length ? dupAcross.map(code).join(', ') : 'none'
  );

  // C4 — no duplicate rows within A or D. (R legitimately allows duplicate
  // `after` values: two `--token-*` names can collapse onto one `--hds-*` name.)
  const dupA = newA.filter((n, i) => newA.indexOf(n) !== i);
  const dupD = newD.filter((n, i) => newD.indexOf(n) !== i);
  addGate(
    'C4',
    'No duplicate rows',
    dupA.length === 0 && dupD.length === 0,
    [...dupA.map((n) => `A: ${n}`), ...dupD.map((n) => `D: ${n}`)].join('; ') || 'none'
  );

  // C5 — prefixes are what we expect.
  const badPrefix = [];
  for (const [b, a] of newR) {
    if (!b.startsWith(TOKEN_PREFIX)) badPrefix.push(`R before: ${b}`);
    if (!a.startsWith(HDS_PREFIX)) badPrefix.push(`R after: ${a}`);
  }
  for (const n of newA) if (!n.startsWith(HDS_PREFIX)) badPrefix.push(`A: ${n}`);
  for (const n of newD) if (!n.startsWith(TOKEN_PREFIX)) badPrefix.push(`D: ${n}`);
  addGate('C5', 'Prefixes correct', badPrefix.length === 0, badPrefix.join('; ') || 'none');

  // C6 — structure intact: frontmatter, separators and the CSS-helper section.
  const structureOk =
    result.startsWith('---\n') &&
    result.split('\n').filter((l) => l.trim() === H_RENAMED).length === 2 &&
    result.includes('CSS Class / Before');
  addGate(
    'C6',
    'Structure intact',
    structureOk,
    structureOk
      ? 'frontmatter, both `Renamed tokens:` headings and the CSS-helper table are present'
      : 'frontmatter or the CSS-helper-class section was damaged'
  );

  // C7 — the CSS-helper-class section is untouched.
  const helperIdx = raw.lastIndexOf('| CSS Class / Before');
  const helperIdxNew = result.lastIndexOf('| CSS Class / Before');
  const helperOk =
    helperIdx !== -1 && helperIdxNew !== -1 && raw.slice(helperIdx) === result.slice(helperIdxNew);
  addGate(
    'C7',
    'CSS-helper section untouched',
    helperOk,
    helperOk ? 'byte-identical' : 'THE HELPER-CLASS TABLE WAS MODIFIED — investigate'
  );

  // C8 — focus-ring advisory: helper classes are generated from
  // `--hds-focus-ring-box-shadow-*`, so a rename there changes class names too.
  const focusTouched = [...renamed.keys(), ...removed].filter((n) =>
    n.startsWith(`${HDS_PREFIX}focus-ring-box-shadow`)
  );
  addGate(
    'C8',
    'Focus-ring helpers unaffected',
    focusTouched.length === 0,
    focusTouched.length
      ? `${focusTouched.join(', ')} — the generated \`.hds-focus-ring-box-shadow-*\` class names change too; update the helper table by hand`
      : 'no `--hds-focus-ring-box-shadow-*` token was renamed or removed'
  );

  // C9 — row order mirrors the shipping map. Locks in the ordering decision so a
  // future change cannot silently reshuffle the file and bury real edits in
  // hundreds of lines of moved rows.
  const orderOk = (rows, keyFn) => {
    let prev = -1;
    for (const r of rows) {
      const cur = orderOf(keyFn(r));
      if (cur < prev) return false;
      prev = cur;
    }
    return true;
  };
  const rOrdered = orderOk(newR, (x) => `${x[0]}|${x[1]}`);
  const aOrdered = orderOk(newA, (x) => `null|${x}`);
  const dOrdered = orderOk(newD, (x) => `${x}|null`);
  addGate(
    'C9',
    'Row order mirrors the map',
    rOrdered && aOrdered && dOrdered,
    rOrdered && aOrdered && dOrdered
      ? 'R, A and D follow the map’s category order'
      : `out of order: ${[!rOrdered && 'R', !aOrdered && 'A', !dOrdered && 'D'].filter(Boolean).join(', ')}`
  );

  const allOk = gates.every((g) => g.ok);

  /* ------------------------------------------------------------ output --- */

  const report = renderReport({
    meta,
    changesetPath,
    stats,
    details,
    gates,
    warnings,
    newCounts: { r: newR.length, a: newA.length, d: newD.length },
    dryRun,
    force,
  });

  if (dryRun) {
    console.log(report);
    console.log('— dry run: nothing written —');
  } else {
    if (!allOk && !force) {
      writeOut(reportPath, report);
      fail(
        `changeset gates failed — ${relative(REPO_ROOT, changesetPath)} was NOT written.\n` +
          `  See ${relative(REPO_ROOT, reportPath)}. Pass --force to write anyway.`
      );
    }
    writeOut(changesetPath, result);
    writeOut(reportPath, report);
  }

  const rel = (p) => relative(REPO_ROOT, p);
  console.log(`\nRenamed table : ${stats.rIn} → ${newR.length}  (${stats.rRewritten} rewritten, ${stats.rPromoted} promoted to Removed)`);
  console.log(`Added table   : ${stats.aIn} → ${newA.length}  (${stats.aRewritten} rewritten, ${stats.aDeleted} deleted, ${stats.aInserted} inserted)`);
  console.log(`Removed table : ${stats.dIn} → ${newD.length}  (+${stats.rPromoted} promoted)`);
  for (const g of gates) console.log(`  ${g.ok ? '✅' : '❌'} ${g.id} ${g.name} — ${g.detail}`);
  if (!dryRun) {
    console.log(`\nWrote : ${rel(changesetPath)}`);
    console.log(`Wrote : ${rel(reportPath)}`);
  }
  console.log(
    '\nReminder: the intro bullet list is PROSE and is never rewritten automatically — ' +
      're-read it against the final map (PLAN §6.3).'
  );
}

/* -------------------------------------------------------------- report --- */

function renderReport(ctx) {
  const L = [];
  L.push('# Changeset update — `carbonization-design-tokens.md`');
  L.push('');
  L.push(`- Generated: ${new Date().toISOString()}${ctx.dryRun ? ' _(dry run — not written)_' : ''}`);
  L.push(`- Changeset: \`${relative(REPO_ROOT, ctx.changesetPath)}\``);
  L.push(
    `- Generation-2 map: \`${ctx.meta.source}\` → sha256 \`${String(ctx.meta.sourceSha256).slice(0, 12)}…\``
  );
  if (ctx.force) L.push('- ⚠️ Run with `--force`: validation was bypassed.');
  L.push('');

  L.push('## ⚠️ Manual follow-up');
  L.push('');
  L.push(
    '1. **Intro bullet list.** The bullets describe the naming conventions and must describe the ' +
      '**final** convention, with no trace of an intermediate state. Amend or delete any bullet ' +
      'that no longer holds — never add a second bullet describing "and then we renamed it again".'
  );
  L.push(
    '2. **Sibling changesets.** Grep `.changeset/*.md` for `--hds-[a-z]` and check any hit against ' +
      'the map. `carbonization-components-css-vars.md` should only contain `--hds-var-*` runtime ' +
      'variables, which are not design tokens.'
  );
  L.push('3. `packages/*/CHANGELOG.md` is released history — never edit.');
  L.push('');

  L.push('## Summary');
  L.push('');
  L.push(
    table(
      ['Table', 'Rows before', 'Rows after', 'Rewritten', 'Deleted / promoted', 'Inserted'],
      [
        [
          'Renamed (R)',
          String(ctx.stats.rIn),
          String(ctx.newCounts.r),
          String(ctx.stats.rRewritten),
          `${ctx.stats.rPromoted} promoted to Removed`,
          '0',
        ],
        [
          'Added (A)',
          String(ctx.stats.aIn),
          String(ctx.newCounts.a),
          String(ctx.stats.aRewritten),
          String(ctx.stats.aDeleted),
          String(ctx.stats.aInserted),
        ],
        [
          'Removed (D)',
          String(ctx.stats.dIn),
          String(ctx.newCounts.d),
          '0',
          '—',
          String(ctx.stats.rPromoted),
        ],
      ]
    )
  );
  L.push('');

  L.push('## Verification gates');
  L.push('');
  L.push(
    table(
      ['Gate', 'Result', 'Detail'],
      ctx.gates.map((g) => [`${g.id} ${g.name}`, g.ok ? '✅ pass' : '❌ fail', g.detail])
    )
  );
  L.push('');

  if (ctx.warnings.length) {
    L.push('## Warnings');
    L.push('');
    for (const w of ctx.warnings) L.push(`- ${w}`);
    L.push('');
  }

  L.push('## Row-level changes');
  L.push('');
  L.push('### Renamed table — target rewritten');
  L.push('');
  L.push(
    table(
      ['Historical token', 'Was', 'Now'],
      ctx.details.rewrittenR.map((c) => [code(c.before), code(c.from), code(c.to)])
    )
  );
  L.push('');
  L.push('### Renamed table → Removed table — successor deleted');
  L.push('');
  L.push(
    table(
      ['Historical token', 'Lost successor'],
      ctx.details.promoted.map((c) => [code(c.before), code(c.lost)])
    )
  );
  L.push('');
  L.push('### Added table — rewritten');
  L.push('');
  L.push(
    table(['Was', 'Now'], ctx.details.rewrittenA.map((c) => [code(c.from), code(c.to)]))
  );
  L.push('');
  L.push('### Added table — deleted');
  L.push('');
  L.push(table(['Token'], ctx.details.deletedA.map((c) => [code(c.name)])));
  L.push('');
  L.push('### Added table — inserted');
  L.push('');
  L.push(table(['Token'], ctx.details.insertedA.map((c) => [code(c.name)])));
  L.push('');

  return L.join('\n');
}

main();
