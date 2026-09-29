// @ts-check
/**
 * update-token-map.mjs — PART 2, step B.
 *
 * Rewrites the shipping map's `after` column from ② (intermediate) to ③ (final),
 * PRESERVING the category structure established in Part 1.
 *
 *   node …/final-qa-tokens-renaming/tooling/update-token-map.mjs --dry-run
 *   node …/final-qa-tokens-renaming/tooling/update-token-map.mjs
 *
 * See ../PLAN-PART-2.md §3.
 *
 * ── Design rule ───────────────────────────────────────────────────────────────
 * DERIVE every count; hardcode nothing that depends on the contents of
 * `token-changes.md`. Two rows there are still disputed (PLAN-PART-2 §8) and
 * their resolution shifts `__form-elements` and `removed` by 2. Only three things
 * are truly invariant and therefore asserted:
 *
 *   • 442  entries with a non-null `before` — the `--token-*` column is history
 *   • 1068 input entries
 *   • the category key set
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { relative, resolve } from 'node:path';

import {
  HDS_PREFIX,
  REPO_ROOT,
  TOKEN_PREFIX,
  TOOLING_DIR,
  byName,
  canonicalTokens,
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
  report: resolve(TOOLING_DIR, 'reports/token-map-update.md'),
  ref: null,
  'dry-run': false,
  force: false,
};

const PREFIX_ONLY = 'prefix-only';
const FORM_ELEMENTS = 'prefix-plus-renaming__form-elements';
const REMOVED = 'removed';
const ADDED = 'added';

/** Invariants that no resolution of the disputed rows can change. */
const EXPECTED_PRE_TOKENS = 442;
const EXPECTED_INPUT_ENTRIES = 1068;

const bare = (name, prefix) => (typeof name === 'string' ? name.replace(prefix, '') : name);

/** True when `before` → `after` is nothing but the prefix swap. */
const isPrefixOnly = (before, after) =>
  typeof before === 'string' &&
  typeof after === 'string' &&
  bare(before, TOKEN_PREFIX) === bare(after, HDS_PREFIX);

function main() {
  const args = parseArgs(process.argv.slice(2), DEFAULTS);
  const mapPath = resolve(String(args.map));
  const reportPath = resolve(String(args.report));
  const dryRun = Boolean(args['dry-run']);
  const force = Boolean(args.force);
  const ref = args.ref ? String(args.ref) : null;

  const { meta, renamed, removed, added } = loadRenameMap(resolve(String(args.rename)), { force });
  const input = readJson(mapPath);

  /* ---------------------------------------------- refuse a double run --- */

  // Derived from CONTENT, not from a metadata flag: if generation 2 has already
  // been applied, none of its `before` names can still appear as an `after` in
  // the map — they were all rewritten. A flag would be stale the moment someone
  // hand-edited the file; the data cannot lie.
  const existingAfters = new Set();
  for (const entries of Object.values(input)) {
    if (!Array.isArray(entries)) continue;
    for (const e of entries) if (typeof e?.after === 'string') existingAfters.add(e.after);
  }
  const stillStale = [...renamed.keys(), ...removed].filter((n) => existingAfters.has(n));

  if (stillStale.length === 0) {
    fail(
      `${relative(REPO_ROOT, mapPath)} appears to have generation 2 already applied:\n` +
        `  none of the ${renamed.size + removed.size} generation-2 source names still appear as an ` +
        `\`after\` value.\n` +
        `  Running again would duplicate the generation-2 \`added\` entries.\n` +
        `  To re-run, restore the original first:\n` +
        `      git checkout -- ${relative(REPO_ROOT, mapPath)}`
    );
  }

  /* ------------------------------------------------- Part 1 must exist --- */

  if (!Array.isArray(input[FORM_ELEMENTS]) && !force) {
    fail(
      `${relative(REPO_ROOT, mapPath)} has no \`${FORM_ELEMENTS}\` category.\n` +
        `  Part 1 (recategorise-token-map.mjs) must run first. See PLAN-PART-1.md.`
    );
  }

  /* --------------------------------------------------------- transform --- */

  const inputCounts = {};
  const out = {};
  let inputTotal = 0;
  for (const [key, entries] of Object.entries(input)) {
    if (!Array.isArray(entries)) continue; // skips `meta`
    inputCounts[key] = entries.length;
    inputTotal += entries.length;
    out[key] = [];
  }

  const changes = { retargeted: [], orphaned: [], dropped: [], appended: [], moved: [] };

  for (const [cat, entries] of Object.entries(input)) {
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      const before = typeof entry.before === 'string' ? entry.before : null;
      const after = typeof entry.after === 'string' ? entry.after : null;

      // (a) generation 2 renamed this target
      if (after !== null && renamed.has(after)) {
        const final = renamed.get(after);

        // Re-categorise on the ① → ③ pair, judged directly.
        // A `prefix-only` entry whose final name differs by more than the prefix
        // is no longer prefix-only and must leave — otherwise the mechanical
        // guarantee the rest of that category relies on is broken.
        let target = cat;
        if (cat === PREFIX_ONLY && !isPrefixOnly(before, final)) {
          target = FORM_ELEMENTS;
          changes.moved.push({ before, from: cat, to: target });
        }
        out[target].push({ before, after: final });
        changes.retargeted.push({ before, from: after, to: final, cat: target });
        continue;
      }

      // (b) generation 2 deleted this target
      if (after !== null && removed.has(after)) {
        if (before === null) {
          // Added by generation 1, deleted by generation 2 — never existed
          // publicly, so it must leave no trace.
          changes.dropped.push({ after, cat });
          continue;
        }
        out[REMOVED].push({ before, after: null });
        changes.orphaned.push({ before, lost: after, from: cat });
        if (cat !== REMOVED) changes.moved.push({ before, from: cat, to: REMOVED });
        continue;
      }

      // (c) untouched
      out[cat].push(entry);
    }
  }

  for (const name of added) {
    out[ADDED].push({ before: null, after: name });
    changes.appended.push({ after: name });
  }

  /* ------------------------------------------------------------- sort --- */

  for (const key of Object.keys(out)) {
    out[key].sort((a, b) => {
      if (a.before === null && b.before === null) return byName(a.after ?? '', b.after ?? '');
      if (a.before === null) return 1;
      if (b.before === null) return -1;
      return byName(a.before, b.before) || byName(a.after ?? '', b.after ?? '');
    });
  }

  // Preserve key order; drop nothing, even if a category empties (report it).
  const ordered = {};
  for (const key of Object.keys(input)) if (Array.isArray(input[key])) ordered[key] = out[key];

  /* ------------------------------------------------------------ gates --- */

  const { names: canonical } = canonicalTokens(ref);
  const gates = [];
  const add = (id, name, ok, detail) => gates.push({ id, name, ok, detail });

  const finalCounts = {};
  let finalTotal = 0;
  const allFinal = [];
  for (const [key, entries] of Object.entries(ordered)) {
    finalCounts[key] = entries.length;
    finalTotal += entries.length;
    allFinal.push(...entries);
  }

  // H1 — closure against the canonical inventory.
  const afterSet = new Set(allFinal.map((e) => e.after).filter((a) => typeof a === 'string'));
  const onlyMap = [...afterSet].filter((n) => !canonical.has(n)).sort(byName);
  const onlyCanonical = [...canonical.keys()].filter((n) => !afterSet.has(n)).sort(byName);
  add(
    'H1',
    'Closure',
    onlyMap.length === 0 && onlyCanonical.length === 0,
    `map targets ${afterSet.size} vs canonical ${canonical.size}` +
      (onlyMap.length || onlyCanonical.length
        ? ` — ${onlyMap.length} only in map, ${onlyCanonical.length} only in packages/tokens/src`
        : ' — exact match')
  );

  // H2 — the `--token-*` column is history. INVARIANT.
  const preTokens = allFinal.filter((e) => typeof e.before === 'string').length;
  add(
    'H2',
    'Pre-token conservation',
    preTokens === EXPECTED_PRE_TOKENS,
    `${preTokens} entries with a non-null \`before\` (invariant: ${EXPECTED_PRE_TOKENS})`
  );

  // H3 — entry accounting. INVARIANT on the input side.
  const expected = inputTotal - changes.dropped.length + changes.appended.length;
  add(
    'H3',
    'Entry accounting',
    finalTotal === expected && inputTotal === EXPECTED_INPUT_ENTRIES,
    `${inputTotal} in (expect ${EXPECTED_INPUT_ENTRIES}) − ${changes.dropped.length} dropped ` +
      `+ ${changes.appended.length} appended = ${expected}; got ${finalTotal}`
  );

  // H4 — `prefix-only` must still mean what it says. This is the gate that
  // protects the one machine-actionable category.
  const poBad = (ordered[PREFIX_ONLY] ?? []).filter((e) => !isPrefixOnly(e.before, e.after));
  add(
    'H4',
    '`prefix-only` still exact',
    poBad.length === 0,
    poBad.length === 0
      ? `all ${ordered[PREFIX_ONLY]?.length ?? 0} members are true prefix swaps`
      : `${poBad.length} member(s) are NOT: ${poBad.slice(0, 3).map((e) => e.before).join(', ')}`
  );

  // H5 — no duplicate entries (catches an accidental double-run).
  const dupes = [];
  for (const [key, entries] of Object.entries(ordered)) {
    const seen = new Set();
    for (const e of entries) {
      const k = `${e.before}|${e.after}`;
      if (seen.has(k)) dupes.push(`${key}: ${k}`);
      seen.add(k);
    }
  }
  add('H5', 'No duplicate entries', dupes.length === 0, dupes.slice(0, 5).join('; ') || 'none');

  // H6 — `added` and the rename categories must not claim the same target.
  const addedTargets = new Set((ordered[ADDED] ?? []).map((e) => e.after));
  const renameTargets = new Set(
    Object.entries(ordered)
      .filter(([k]) => k !== ADDED)
      .flatMap(([, v]) => v.map((e) => e.after).filter((a) => typeof a === 'string'))
  );
  const collisions = [...addedTargets].filter((n) => renameTargets.has(n)).sort(byName);
  add(
    'H6',
    'Added / renamed disjoint',
    collisions.length === 0,
    collisions.length ? collisions.slice(0, 5).map(code).join(', ') : 'none'
  );

  // H7 — internal consistency of the move accounting. Deliberately NOT a check
  // against hardcoded per-category totals: those shift with the disputed rows.
  const movesByRoute = {};
  for (const mv of changes.moved) {
    const k = `${mv.from} → ${mv.to}`;
    movesByRoute[k] = (movesByRoute[k] ?? 0) + 1;
  }
  let arithmeticOk = true;
  const arithmetic = [];
  for (const key of Object.keys(ordered)) {
    const inn = inputCounts[key] ?? 0;
    const outn = finalCounts[key] ?? 0;
    const gained = changes.moved.filter((m) => m.to === key).length;
    const lost = changes.moved.filter((m) => m.from === key).length;
    const appendedHere = key === ADDED ? changes.appended.length : 0;
    const droppedHere = changes.dropped.filter((d) => d.cat === key).length;
    const predicted = inn - lost + gained + appendedHere - droppedHere;
    if (predicted !== outn) {
      arithmeticOk = false;
      arithmetic.push(`${key}: predicted ${predicted}, got ${outn}`);
    }
  }
  add(
    'H7',
    'Per-category arithmetic',
    arithmeticOk,
    arithmeticOk
      ? 'every category reconciles: in − moved-out + moved-in + appended − dropped = out'
      : arithmetic.join('; ')
  );

  // H8 — no category invented or lost. `migrate-tokens.mjs` silently ignores a
  // malformed category, so nothing downstream would ever notice.
  const inKeys = Object.keys(inputCounts).sort();
  const outKeys = Object.keys(finalCounts).sort();
  const sameKeys = inKeys.length === outKeys.length && inKeys.every((k, i) => k === outKeys[i]);
  const emptied = outKeys.filter((k) => finalCounts[k] === 0);
  add(
    'H8',
    'Category set preserved',
    sameKeys,
    sameKeys
      ? `${outKeys.length} categories, unchanged` +
          (emptied.length ? ` — ⚠️ now empty: ${emptied.join(', ')}` : '')
      : `key set CHANGED: ${inKeys.join(',')} → ${outKeys.join(',')}`
  );

  const allOk = gates.every((g) => g.ok);

  /* ----------------------------------------------------------- output --- */

  // No `meta` block: the map stays a pure data file. Provenance lives in git
  // history, and every count here is derivable from the data itself. The
  // sequencing guards are content-based (see above), so nothing needs it.
  const result = ordered;

  const report = renderReport({
    meta,
    mapPath,
    inputCounts,
    finalCounts,
    changes,
    movesByRoute,
    gates,
    onlyMap,
    onlyCanonical,
    canonicalCount: canonical.size,
    inputTotal,
    finalTotal,
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
        `gates failed — ${relative(REPO_ROOT, mapPath)} was NOT written.\n` +
          `  See ${relative(REPO_ROOT, reportPath)}. Pass --force to write anyway.`
      );
    }
    writeOut(mapPath, JSON.stringify(result, null, 2) + '\n');
    writeOut(reportPath, report);
  }

  /* ---------------------------------------------------------- summary --- */

  const rel = (p) => relative(REPO_ROOT, p);
  console.log(
    `\nGeneration-2 map : ${meta.counts.renamed} renamed, ${meta.counts.added} added, ` +
      `${meta.counts.removed} removed${meta.validated === false ? '  ⚠️ NOT VALIDATED' : ''}`
  );
  console.log(
    `Applied          : ${changes.retargeted.length} retargeted, ${changes.orphaned.length} orphaned, ` +
      `${changes.dropped.length} dropped, ${changes.appended.length} appended`
  );
  console.log(`Category moves   : ${changes.moved.length}`);
  for (const [route, n] of Object.entries(movesByRoute)) console.log(`    ${n}  ${route}`);
  console.log('\nCategories:');
  for (const key of Object.keys(finalCounts)) {
    const a = inputCounts[key] ?? 0;
    const b = finalCounts[key];
    console.log(`  ${key.padEnd(44)} ${String(a).padStart(4)} → ${String(b).padStart(4)}${a !== b ? '  *' : ''}`);
  }
  console.log(`  ${'TOTAL'.padEnd(44)} ${String(inputTotal).padStart(4)} → ${String(finalTotal).padStart(4)}`);
  console.log('');
  for (const g of gates) console.log(`  ${g.ok ? '✅' : '❌'} ${g.id} ${g.name} — ${g.detail}`);
  if (!dryRun) {
    console.log(`\nWrote : ${rel(mapPath)}`);
    console.log(`Wrote : ${rel(reportPath)}`);
  }
  if (meta.validated === false) {
    console.log(
      '\n⚠️  The generation-2 map is NOT validated. These results are provisional — ' +
        'resolve the flagged rows and re-run.'
    );
  }
}

/* -------------------------------------------------------------- report --- */

function renderReport(ctx) {
  const L = [];
  L.push('# Shipping map update — generation 2 folded in');
  L.push('');
  L.push(`- Generated: ${new Date().toISOString()}${ctx.dryRun ? ' _(dry run — not written)_' : ''}`);
  L.push(`- Map: \`${relative(REPO_ROOT, ctx.mapPath)}\``);
  L.push(`- Generation-2 map: \`${ctx.meta.source}\` → sha256 \`${String(ctx.meta.sourceSha256).slice(0, 12)}…\``);
  L.push(`- Canonical tokens in \`packages/tokens/src\`: **${ctx.canonicalCount}**`);
  if (ctx.meta.validated === false) {
    L.push('- ⚠️ **The generation-2 map is not validated** — results are provisional.');
  }
  if (ctx.force) L.push('- ⚠️ Run with `--force`: gate failures were bypassed.');
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

  if (ctx.onlyMap.length || ctx.onlyCanonical.length) {
    L.push('### H1 closure — symmetric difference');
    L.push('');
    if (ctx.onlyMap.length) {
      L.push('**In the map but not in `packages/tokens/src`:**');
      L.push('');
      for (const n of ctx.onlyMap.slice(0, 50)) L.push(`- ${code(n)}`);
      if (ctx.onlyMap.length > 50) L.push(`- …and ${ctx.onlyMap.length - 50} more`);
      L.push('');
    }
    if (ctx.onlyCanonical.length) {
      L.push('**In `packages/tokens/src` but absent from the map:**');
      L.push('');
      for (const n of ctx.onlyCanonical.slice(0, 50)) L.push(`- ${code(n)}`);
      if (ctx.onlyCanonical.length > 50) L.push(`- …and ${ctx.onlyCanonical.length - 50} more`);
      L.push('');
    }
  }

  L.push('## Categories — before → after');
  L.push('');
  const keys = [...new Set([...Object.keys(ctx.inputCounts), ...Object.keys(ctx.finalCounts)])];
  L.push(
    table(
      ['Category', 'Before', 'After', 'Δ'],
      keys.map((k) => {
        const a = ctx.inputCounts[k] ?? 0;
        const b = ctx.finalCounts[k] ?? 0;
        return [`\`${k}\``, String(a), String(b), a === b ? '—' : `${b - a > 0 ? '+' : ''}${b - a}`];
      })
    )
  );
  L.push('');
  L.push(`**Total: ${ctx.inputTotal} → ${ctx.finalTotal}**`);
  L.push('');

  L.push('## Category moves');
  L.push('');
  L.push(
    table(
      ['Route', 'Count'],
      Object.entries(ctx.movesByRoute).map(([r, n]) => [r, String(n)])
    )
  );
  L.push('');

  L.push('## Changes applied');
  L.push('');
  L.push('### Orphaned — successor deleted, `after` became `null`');
  L.push('');
  L.push(
    'These are the rows `update-changeset.mjs` moves from the *Renamed* table into the *Removed* ' +
      'table. A consumer on one of these names has **nowhere to go**.'
  );
  L.push('');
  L.push(
    table(
      ['Historical token', 'Lost successor', 'Was in'],
      ctx.changes.orphaned.map((c) => [code(c.before), code(c.lost), `\`${c.from}\``])
    )
  );
  L.push('');
  L.push('### Dropped — added by generation 1, deleted by generation 2');
  L.push('');
  L.push('Never existed publicly, so the entry is removed entirely.');
  L.push('');
  L.push(table(['Token'], ctx.changes.dropped.map((c) => [code(c.after)])));
  L.push('');
  L.push('### Appended — brand-new generation-2 tokens');
  L.push('');
  L.push(table(['Token'], ctx.changes.appended.map((c) => [code(c.after)])));
  L.push('');
  L.push('### Retargeted — the generation-1 target was renamed again');
  L.push('');
  L.push(
    table(
      ['Historical token', 'Was (②)', 'Now (③)', 'Category'],
      ctx.changes.retargeted.map((c) => [
        code(c.before),
        code(c.from),
        code(c.to),
        `\`${c.cat}\``,
      ])
    )
  );
  L.push('');

  L.push('## Follow-up (not automated)');
  L.push('');
  L.push('- `update-changeset.mjs` — render the changeset from this map (PLAN-PART-2 §4).');
  L.push('- Consumer migration and the usage audit (PLAN-PART-2 §5).');
  L.push(
    '- `token-diff.md` was frozen in Part 1 with a note that only its groupings were stale; its ' +
      '*pairs* are now stale too — update that header (PLAN-PART-2 §6).'
  );
  L.push('- Dated entries in the README / HANDOVER / generated-plan docs (PLAN-PART-2 §6).');
  L.push('');

  return L.join('\n');
}

main();
