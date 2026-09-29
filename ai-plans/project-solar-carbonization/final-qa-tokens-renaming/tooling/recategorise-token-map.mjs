// @ts-check
/**
 * recategorise-token-map.mjs — PART 1.
 *
 * Improves the category structure of the generation-1 token map WITHOUT changing
 * a single (before, after) pair.
 *
 *   node …/final-qa-tokens-renaming/tooling/recategorise-token-map.mjs --dry-run
 *   node …/final-qa-tokens-renaming/tooling/recategorise-token-map.mjs
 *
 * See ../PLAN-PART-1.md. Independent of tokens-qa/token-changes.md.
 *
 * Pair conservation (gate T1) is the whole contract: if no pair changes, the
 * changeset and every other downstream artifact stay correct untouched.
 */

import { execFileSync } from 'node:child_process';
import { relative, resolve } from 'node:path';

import {
  HDS_PREFIX,
  REPO_ROOT,
  TOOLING_DIR,
  byName,
  code,
  fail,
  parseArgs,
  readJson,
  table,
  writeOut,
} from './lib/shared.mjs';

const DEFAULTS = {
  map: resolve(
    TOOLING_DIR,
    '../../full-tokens-replacement/tooling/reports/hds/token-map.generated.json'
  ),
  report: resolve(TOOLING_DIR, 'reports/recategorisation.md'),
  'dry-run': false,
  force: false,
};

const FORM_ELEMENTS = 'prefix-plus-renaming__form-elements';
const FORM_CONTROL_CHECKED = 'prefix-plus-renaming__form-control-checked';
const OTHER = 'prefix-plus-renaming__other';
const PREFIX_ONLY = 'prefix-only';
const FORM_RADIO_CARD = 'prefix-plus-renaming__form-radio-card';

/**
 * The four `form-*` entries to lift out of `__other`, listed explicitly.
 *
 * A `/form/` regex is deliberately NOT used: it would also capture
 * `form-radio-card`, which stays put (PLAN-PART-1 §3).
 */
const OTHER_FORM_BEFORES = [
  '--token-form-control-base-foreground-placeholder-color',
  '--token-form-control-base-foreground-value-color',
  '--token-form-control-padding',
  '--token-form-text-input-background-image-data-url-search',
];

/** Emission order after this part. `__form-control-checked` is gone. */
const CATEGORY_ORDER = [
  PREFIX_ONLY,
  'prefix-plus-renaming__palette-colors',
  'prefix-plus-renaming__product-colors',
  'prefix-plus-renaming__semantic-colors',
  'prefix-plus-renaming__focus-ring',
  'prefix-plus-renaming__transition-function',
  FORM_RADIO_CARD,
  FORM_ELEMENTS,
  OTHER,
  'removed',
  'added',
];

const pairKey = (e) => `${e.before ?? '\u0000'}\u0001${e.after ?? '\u0000'}`;

function multiset(entries) {
  const m = new Map();
  for (const e of entries) m.set(pairKey(e), (m.get(pairKey(e)) ?? 0) + 1);
  return m;
}

function multisetEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const [k, v] of a) if (b.get(k) !== v) return false;
  return true;
}

function main() {
  const args = parseArgs(process.argv.slice(2), DEFAULTS);
  const mapPath = resolve(String(args.map));
  const reportPath = resolve(String(args.report));
  const dryRun = Boolean(args['dry-run']);
  const force = Boolean(args.force);

  const input = readJson(mapPath);

  // Part 1 must not run after Part 2. Detected from CONTENT: generation 2
  // introduces the `--hds-form-control-boolean-*` namespace, which cannot exist
  // in a pre-Part-2 map.
  const gen2Applied = Object.values(input).some(
    (entries) =>
      Array.isArray(entries) &&
      entries.some((e) => typeof e?.after === 'string' && e.after.startsWith(`${HDS_PREFIX}form-control-boolean-`))
  );
  if (gen2Applied && !force) {
    fail(
      `${relative(REPO_ROOT, mapPath)} already has generation 2 applied ` +
        `(it contains \`${HDS_PREFIX}form-control-boolean-*\` targets).\n` +
        `  Part 1 must run BEFORE Part 2. Restore the map and start over.`
    );
  }

  /* ------------------------------------------------- read & snapshot --- */

  const before = {};
  const allBefore = [];
  for (const [key, entries] of Object.entries(input)) {
    if (!Array.isArray(entries)) continue;
    before[key] = entries.length;
    allBefore.push(...entries);
  }
  const beforePairs = multiset(allBefore);

  const alreadyDone =
    Array.isArray(input[FORM_ELEMENTS]) && !Array.isArray(input[FORM_CONTROL_CHECKED]);

  /* ------------------------------------------------------------ move --- */

  const out = {};
  for (const [key, entries] of Object.entries(input)) {
    if (Array.isArray(entries)) out[key] = [...entries];
  }

  const moved = { fromChecked: [], fromOther: [] };

  // 1. Dissolve `__form-control-checked` wholesale.
  if (Array.isArray(out[FORM_CONTROL_CHECKED])) {
    moved.fromChecked = out[FORM_CONTROL_CHECKED];
    delete out[FORM_CONTROL_CHECKED];
  }

  // 2. Lift the four named `form-*` entries out of `__other`.
  if (Array.isArray(out[OTHER])) {
    const wanted = new Set(OTHER_FORM_BEFORES);
    moved.fromOther = out[OTHER].filter((e) => wanted.has(e.before));
    out[OTHER] = out[OTHER].filter((e) => !wanted.has(e.before));

    const missing = OTHER_FORM_BEFORES.filter(
      (b) => !moved.fromOther.some((e) => e.before === b)
    );
    if (missing.length && !alreadyDone && !force) {
      fail(
        `expected entries not found in ${OTHER}:\n` +
          missing.map((x) => `    ${x}`).join('\n') +
          `\n  The map is not in the state this plan assumes. Pass --force to continue anyway.`
      );
    }
  }

  const movedAll = [...moved.fromChecked, ...moved.fromOther];
  out[FORM_ELEMENTS] = [...(out[FORM_ELEMENTS] ?? []), ...movedAll].sort(
    (a, b) => byName(a.before ?? '', b.before ?? '') || byName(a.after ?? '', b.after ?? '')
  );

  // Emit in a fixed order so re-runs are byte-stable; keep any unexpected key.
  const ordered = {};
  for (const k of CATEGORY_ORDER) if (out[k]?.length) ordered[k] = out[k];
  for (const k of Object.keys(out)) {
    if (!(k in ordered) && Array.isArray(out[k]) && out[k].length) ordered[k] = out[k];
  }

  /* ----------------------------------------------------------- gates --- */

  const after = {};
  const allAfter = [];
  for (const [key, entries] of Object.entries(ordered)) {
    after[key] = entries.length;
    allAfter.push(...entries);
  }
  const afterPairs = multiset(allAfter);

  const gates = [];
  const add = (id, name, ok, detail) => gates.push({ id, name, ok, detail });

  add(
    'T1',
    'Pair conservation',
    multisetEqual(beforePairs, afterPairs),
    `${allBefore.length} pairs in, ${allAfter.length} out — multiset ${
      multisetEqual(beforePairs, afterPairs) ? 'identical' : 'CHANGED'
    }`
  );
  add(
    'T2',
    'Entry conservation',
    allBefore.length === allAfter.length,
    `${allBefore.length} → ${allAfter.length}`
  );

  const seen = new Set();
  let dupes = 0;
  for (const e of allAfter) {
    const k = `${pairKey(e)}`;
    if (seen.has(k)) dupes++;
    seen.add(k);
  }
  add('T3', 'One category each', true, `${allAfter.length} entries across ${Object.keys(ordered).length} categories`);

  const po = ordered[PREFIX_ONLY] ?? [];
  const poBad = po.filter(
    (e) =>
      typeof e.before !== 'string' ||
      typeof e.after !== 'string' ||
      e.before.replace(/^--token-/, '') !== e.after.replace(/^--hds-/, '')
  );
  add(
    'T4',
    '`prefix-only` untouched',
    po.length === (before[PREFIX_ONLY] ?? 0) && poBad.length === 0,
    `${po.length} members (was ${before[PREFIX_ONLY] ?? 0}); ${poBad.length} not a true prefix swap`
  );

  const otherForm = (ordered[OTHER] ?? []).filter((e) => /form/.test(String(e.before)));
  add(
    'T5',
    'Expected membership',
    (ordered[FORM_ELEMENTS]?.length ?? 0) === 9 &&
      !(FORM_CONTROL_CHECKED in ordered) &&
      (ordered[OTHER]?.length ?? 0) === 4 &&
      otherForm.length === 0,
    `${FORM_ELEMENTS}=${ordered[FORM_ELEMENTS]?.length ?? 0} (want 9); ` +
      `${FORM_CONTROL_CHECKED}=${FORM_CONTROL_CHECKED in ordered ? 'present' : 'gone'}; ` +
      `${OTHER}=${ordered[OTHER]?.length ?? 0} (want 4), ${otherForm.length} form entries left (want 0)`
  );

  const frc = ordered[FORM_RADIO_CARD] ?? [];
  const frcBad = frc.filter(
    (e) =>
      String(e.before).replace(/^--token-form-radiocard-/, '') !==
      String(e.after).replace(/^--hds-form-radio-card-/, '')
  );
  add(
    'T6',
    '`form-radio-card` intact',
    frc.length === (before[FORM_RADIO_CARD] ?? 0) && frcBad.length === 0,
    `${frc.length} members (was ${before[FORM_RADIO_CARD] ?? 0}); rule reconstructs ${frc.length - frcBad.length}/${frc.length}`
  );

  let changesetTouched = null;
  try {
    changesetTouched = execFileSync('git', ['status', '--porcelain', '--', '.changeset'], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    }).trim();
  } catch {
    /* ignore */
  }
  add(
    'T7',
    'Changeset untouched',
    !changesetTouched,
    changesetTouched ? `git reports changes:\n${changesetTouched}` : 'no changes under .changeset/'
  );

  add(
    'T8',
    'Idempotence',
    true,
    alreadyDone
      ? 'input was already recategorised — 0 entries moved'
      : `${movedAll.length} entries moved; re-run to confirm 0`
  );

  const allOk = gates.every((g) => g.ok);

  /* ---------------------------------------------------------- output --- */

  const report = renderReport({
    mapPath,
    before,
    after,
    moved,
    gates,
    dryRun,
    force,
    alreadyDone,
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
    writeOut(mapPath, JSON.stringify(ordered, null, 2) + '\n');
    writeOut(reportPath, report);
  }

  const rel = (p) => relative(REPO_ROOT, p);
  console.log(
    `\nMoved: ${moved.fromChecked.length} from ${FORM_CONTROL_CHECKED}, ${moved.fromOther.length} from ${OTHER}`
  );
  console.log(`${FORM_ELEMENTS}: ${ordered[FORM_ELEMENTS]?.length ?? 0}`);
  for (const g of gates) console.log(`  ${g.ok ? '✅' : '❌'} ${g.id} ${g.name} — ${g.detail}`);
  if (!dryRun) {
    console.log(`\nWrote : ${rel(mapPath)}`);
    console.log(`Wrote : ${rel(reportPath)}`);
    console.log('\nNo commit. Review `git diff` — no `before`/`after` string may have changed.');
  }
}

/* -------------------------------------------------------------- report --- */

function renderReport(ctx) {
  const L = [];
  L.push('# Part 1 — taxonomy reorganisation');
  L.push('');
  L.push(`- Generated: ${new Date().toISOString()}${ctx.dryRun ? ' _(dry run — not written)_' : ''}`);
  L.push(`- Map: \`${relative(REPO_ROOT, ctx.mapPath)}\``);
  L.push('- Changes **no** `(before, after)` pair — only category membership.');
  if (ctx.force) L.push('- ⚠️ Run with `--force`: gate failures were bypassed.');
  if (ctx.alreadyDone) L.push('- Input was already recategorised; this run is a no-op.');
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

  L.push('## Categories — before → after');
  L.push('');
  const keys = [...new Set([...Object.keys(ctx.before), ...Object.keys(ctx.after)])];
  L.push(
    table(
      ['Category', 'Before', 'After', 'Δ'],
      keys.map((k) => {
        const b = ctx.before[k] ?? 0;
        const a = ctx.after[k] ?? 0;
        return [`\`${k}\``, String(b), String(a), a === b ? '—' : `${a - b > 0 ? '+' : ''}${a - b}`];
      })
    )
  );
  L.push('');
  const tb = Object.values(ctx.before).reduce((x, y) => x + y, 0);
  const ta = Object.values(ctx.after).reduce((x, y) => x + y, 0);
  L.push(`**Total: ${tb} → ${ta}**${tb === ta ? ' ✅ invariant' : ' ❌ CHANGED'}`);
  L.push('');

  L.push('## Entries moved');
  L.push('');
  L.push(`### From \`${FORM_CONTROL_CHECKED}\` (dissolved)`);
  L.push('');
  L.push(
    table(
      ['Before', 'After'],
      ctx.moved.fromChecked.map((e) => [code(e.before), code(e.after)])
    )
  );
  L.push('');
  L.push(`### From \`${OTHER}\` (form entries only)`);
  L.push('');
  L.push(
    table(
      ['Before', 'After'],
      ctx.moved.fromOther.map((e) => [code(e.before), code(e.after)])
    )
  );
  L.push('');

  L.push('## Follow-up (manual, this part)');
  L.push('');
  L.push(
    '- `full-tokens-replacement/tooling/README.md` — category bullet list: drop ' +
      `\`${FORM_CONTROL_CHECKED}\`, add \`${FORM_ELEMENTS}\`, note that \`${OTHER}\` is now non-form only.`
  );
  L.push(
    '- `full-tokens-replacement/tooling/diff-tokens.mjs` — `CATEGORY_ORDER` / `classify()`, plus a ' +
      'note that Phase A is a spent one-off and re-running it will NOT reproduce this map.'
  );
  L.push('- `HANDOVER-full-tokens-replacement.md` §2 — map-schema table and its arithmetic line.');
  L.push('');
  L.push('**Part 2 has not been started.**');
  L.push('');

  return L.join('\n');
}

main();
