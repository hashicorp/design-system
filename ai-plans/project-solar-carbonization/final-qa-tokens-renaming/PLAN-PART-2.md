# PART 2 — Apply the generation-2 (final-QA) token renaming

> **Status:** ✅ **READY TO EXECUTE — all preconditions met, no blockers.**
> Rehearsed end to end: 8/8 gates on the shipping map, 8/8 on the changeset, exact closure
> (1046 = 1046) and exact map/changeset agreement.
> **Read [`PLAN.md`](./PLAN.md) §1 first** — especially §1.1 (the ①②③ naming).
> **Part 1:** [`PLAN-PART-1.md`](./PLAN-PART-1.md) — ✅ **done and committed** (`5e3803a907`).

**Goal:** fold the final-QA renaming into the unshipped carbonization renaming, so the repository
describes **one** renaming event. The shipping map's `after` column moves from ② to ③, the changeset
is re-rendered from it, and in-repo consumers are migrated.

Every figure in this plan was **recomputed against the committed post-Part-1 map**, not carried over
from the pre-Part-1 draft.

---

## 1. Preconditions — all met ✅

| # | Condition | State | Evidence |
| --- | --- | --- | --- |
| 1 | Branch rebased onto the parent | ✅ | rebased 2026-09-29 |
| 2 | **Part 1 complete** | ✅ | map has `…__form-elements` = 9, `…__form-control-checked` absent, `…__other` = 4 |
| 3 | **`token-changes.md` is final** | ✅ | `meta.validated: true`; V1–V8 all pass |
| 4 | Changeset typo fixed | ✅ | `3e6e5c095f` — cherry-picked; 0 malformed rows remain |

> The `---hds-app-side-nav-toggle-button-top` row (three dashes) did **not** arrive via the rebase as
> expected and was cherry-picked separately. It was the last blocker; gates **C0** and **C5** now pass.

## 1.2 Starting state (verified, committed)

| Category | Entries |
| --- | ---: |
| `prefix-only` | 228 |
| `prefix-plus-renaming__palette-colors` | 42 |
| `prefix-plus-renaming__product-colors` | 86 |
| `prefix-plus-renaming__semantic-colors` | 46 |
| `prefix-plus-renaming__focus-ring` | 2 |
| `prefix-plus-renaming__transition-function` | 2 |
| `prefix-plus-renaming__form-radio-card` | 5 |
| `prefix-plus-renaming__form-elements` | **9** |
| `prefix-plus-renaming__other` | **4** |
| `removed` | 18 |
| `added` | 626 |
| **Total** | **1068** |

**The map must stay a pure data file — no `meta` block.** Part 2 must not add one. Provenance
belongs in git history, and every count is derivable from the data. A metadata flag is also worse
than useless for sequencing: it goes stale the moment anyone hand-edits the file.

All three sequencing guards are therefore derived from **content**:

| Guard | Content signal |
| --- | --- |
| Part 1 must not run after Part 2 | the map contains `--hds-form-control-boolean-*` targets |
| Part 2 must not run twice | no generation-2 source name still appears as an `after` value |
| Changeset must not run before Part 2 | generation-2 source names *do* still appear as `after` values |

---

## 2. Step A — build the generation-2 map (`build-token-changes.mjs`)

Parses [`../tokens-qa/token-changes.md`](../tokens-qa/token-changes.md) into
`tooling/reports/token-changes.generated.json` — the ② → ③ map, and **the only script tied to the
markdown**. Everything downstream reads the JSON.

```jsonc
{
  "meta": { "source": "…/token-changes.md", "sourceSha256": "…",
            "canonicalCount": 1045, "validated": true,
            "counts": { "renamed": 34, "removed": 5, "added": 6 } },
  "renamed": [{ "before": "--hds-form-control-base-border-color-default",
                "after":  "--hds-form-control-border-color-default" }],
  "removed": [{ "before": "--hds-form-toggle-border-radius", "after": null }],
  "added":   [{ "before": null, "after": "--hds-form-label-inline-typography-line-height" }]
}
```

### 2.1 Validation gates

| Gate | Rule |
| --- | --- |
| **V1** | Every name is lowercase kebab-case |
| **V2** | No duplicate `before`, `after`, added or removed name |
| **V3** | No self-map (`before === after`) |
| **V4** | No rename chains (`A→B` and `B→C`) |
| **V5** | The three sections are disjoint |
| **V6** | Every `renamed.before` and removed name is **absent** from `canonical` |
| **V7** | Every `renamed.after` and added name is **present** in `canonical` |
| **V8** | *Advisory.* Undoing the map against `canonical` reproduces the generation-1 target set — i.e. the markdown is **complete** |

`meta.validated = V1 ∧ … ∧ V7`. On failure the map is still written with `validated: false`, the
offending rows listed in the report, and **every downstream script refuses to run without `--force`**.

`canonical` = the token inventory derived from `packages/tokens/src` by the rule in `PLAN.md` §2
(`--hds-` + JSON path of each non-`private` `$value` leaf). No build required; `dist/` is never read.

**The canonical set must be derived from the *working tree*, not from a committed ref.** The scripts
default to the working tree and record `meta.afterRefIsWorkingTree: true` to make that explicit. The
two coincide only when the tree is clean, so before executing:

1. Confirm `git status` is clean for `packages/tokens/src`, otherwise the map is validated against
   uncommitted token edits.
2. Check `meta.afterRef` in the generated map against `git rev-parse HEAD`.

> `canonical` is **not** a fixed number. It tracks whatever `packages/tokens/src` currently holds and
> moves whenever the parent branch adds or removes a token. Treat every count in this plan as
> illustrative and re-derive from the run.

---

## 2.5 Code state

Both scripts have been **rewritten and rehearsed** (2026-09-29). No production file was written —
the rehearsal ran against temporary copies.

| Script | State | Notes |
| --- | --- | --- |
| `build-token-changes.mjs` | ✅ ready | parses the markdown only |
| `update-token-map.mjs` | ✅ **rewritten** | preserves categories; moves the 17 entries of §3.2; gates H1–H8 |
| `update-changeset.mjs` | ✅ **fixed** | gate C0 now flattens every category array instead of reading `map.renamed/.added/.removed`, which no longer exist as top-level keys |
| `migrate-tokens.mjs` | ✅ ready, unmodified | reads `Object.values()`, so categories are invisible to it |
| `recategorise-token-map.mjs` | ✅ done (Part 1) | must **not** be re-run |

> The `update-changeset.mjs` bug was not cosmetic. `shippingMap.renamed` was `undefined`, so
> `?? []` made gate C0 compare the changeset against an **empty set** — it would have reported every
> one of the 420 renames as a discrepancy. It now reports exact agreement: R 420/420, A 630/630, D 22/22.

### 2.5.1 Design rule: derive, don't hardcode — and why it paid off

While the two disputed rows were unresolved, I projected both outcomes and predicted that resolving
them *as deletions* would give `__form-elements` = 20 and `removed` = 24.

**That prediction was wrong.** The colleagues changed more than those two rows:

| Change | Effect |
| --- | --- |
| `form-control-base-surface-color-hover` and `form-control-foreground-color-checked` | moved Changed → **Removed** (deletions, as one option predicted) |
| `form-indicator-optional-typography-font-size` and `…-line-height` | moved **Removed → Changed** — now renames to `form-indicator-typography-*` |
| `form-indicator-typography-font-size` | left **New**, since it is now a rename *target*, not a new token |

Net: renamed stayed 34 (−2 +2), added 6 → **5**, removed stayed 5 (−2 +2). The real outcome is
`__form-elements` = **22** and `removed` = **22** — neither of the two projections.

This is exactly why the scripts derive every per-category count and assert only what no edit can
change:

- **442** entries with a non-null `before` (H2) — the `--token-*` column is history
- **1068** input entries (H3)
- the category key set (H8)

Gate **H7** checks per-category arithmetic (`in − moved-out + moved-in + appended − dropped = out`)
rather than comparing against a table of expected totals. Had it been written the other way, it would
have failed spuriously the moment this update landed.

## 3. Step B — update the shipping map (`update-token-map.mjs`)

Rewrites the `after` column to hold **final** names, **preserving the category structure**.

### 3.1 The four cases

| Case | Generation-1 entry | Generation 2 says | Result | Count |
| --- | --- | --- | --- | ---: |
| **Retargeted** | `--token-X` → `--hds-Y` | `Y` renamed | `after` → new name | 35 |
| **Orphaned** | `--token-X` → `--hds-Y` | `Y` removed | `after` → `null`; entry moves to `removed` | 4 |
| **Dropped** | `null` → `--hds-Y` | `Y` removed | entry deleted entirely | 1 |
| **Appended** | — | new token | `{ before: null, after: N }` → `added` | 6 |

**Orphaned** is why this cannot be a find-and-replace: a consumer still on
`--token-form-toggle-border-radius` has *nowhere to go*, and that must surface in the changeset's
*Removed* table. **Dropped** covers a token generation 1 added and generation 2 deleted before
anything shipped — it never existed publicly, so it must leave no trace.

> The `--token-*` column is **history** and is never edited. Gate **H2** enforces this.

### 3.1.1 Where the affected entries live today

Recomputed against the committed post-Part-1 map **and the final `token-changes.md`**:

| Category | Entries | Retargeted | Orphaned |
| --- | ---: | ---: | ---: |
| `prefix-only` | 228 | **14** | **2** |
| `prefix-plus-renaming__form-radio-card` | 5 | 0 | **1** |
| `prefix-plus-renaming__form-elements` | 9 | **6** | **1** |
| `added` | 626 | **15** | 0 *(+1 dropped)* |

Every other category is untouched by generation 2.

The **6 retargeted inside `__form-elements`** are entries Part 1 moved there. Their `after` changes but
their **category does not** — they are still form renames with no single rule. Only their names are
rewritten. A 7th is orphaned and leaves for `removed`.

### 3.2 Re-categorisation

A category must describe the entry's **① → ③ pair**, judged directly — not inherited from ① → ②, not
composed from the two steps.

Exactly **18 entries change category**:

| Moves | From | To | Count |
| --- | --- | --- | ---: |
| retargeted `form-*` | `prefix-only` | `__form-elements` | **14** |
| orphaned | `prefix-only` | `removed` | **2** |
| orphaned | `__form-radio-card` | `removed` | **1** |
| orphaned | `__form-elements` | `removed` | **1** |

The other 22 affected entries (6 retargeted in `__form-elements`, 15 in `added`, 1 dropped) stay
where they are.

The 14 **must** leave `prefix-only` — verified for all 14, their ① → ③ pair is no longer a pure prefix
swap. Leaving them would poison the mechanical guarantee the other 212 entries rely on:

```
--token-form-control-disabled-border-color
  →  --hds-form-control-disabled-border-color     ← what prefix-only implies; DOES NOT EXIST
  →  --hds-form-control-border-color-disabled     ← actual
```

The 15 retargeted entries inside `added` keep their category — `before: null`, so `added` is still
correct.

### 3.3 `__form-elements` has no single rule

Segment-level analysis of the final 22 members gives **7 distinct signatures**:

| Signature | Count | Example |
| --- | ---: | --- |
| reordered only | 7 | `form-control-disabled-border-color` → `form-control-border-color-disabled` |
| `+boolean` | 5 | `form-control-checked-border-color-default` → `form-control-boolean-border-color-checked-default` |
| `−base` | 4 | `form-control-base-border-color-default` → `form-control-border-color-default` |
| `−default` | 1 | `form-control-invalid-border-color-default` → `form-control-border-color-invalid` |
| `+unchecked −base` | 1 | `form-toggle-base-surface-color-default` → `form-toggle-surface-color-unchecked-default` |
| `+default −base,placeholder` | 1 | merge |
| `+default −base,value` | 1 | merge |

So its documentation must **describe** what happened — state moved to suffix, `base` dropped,
`boolean` sub-namespace introduced, two foreground tokens merged — rather than state a single
`{pattern} → {pattern}` rule. Do not attempt a `classify()` predicate for it.

> The last two rows are a **merge** onto one final name; a consumer cannot do a mechanical 1:1 swap.
> There are 4 such merges in the whole map (2 form, 2 `app-side-nav`) — a cross-cutting footnote, not
> a category.

### 3.4 Target shape

**Verified by a dry run against the final `token-changes.md`** — all 8 gates pass.

| Category | After Part 1 | After Part 2 |
| --- | ---: | ---: |
| `prefix-only` | 228 | **212** |
| `prefix-plus-renaming__palette-colors` | 42 | 42 |
| `prefix-plus-renaming__product-colors` | 86 | 86 |
| `prefix-plus-renaming__semantic-colors` | 46 | 46 |
| `prefix-plus-renaming__focus-ring` | 2 | 2 |
| `prefix-plus-renaming__transition-function` | 2 | 2 |
| `prefix-plus-renaming__form-radio-card` | 5 | **4** |
| `prefix-plus-renaming__form-elements` | 9 | **22** |
| `prefix-plus-renaming__other` | 4 | 4 |
| `removed` | 18 | **22** |
| `added` | 626 | **630** |
| **Total** | **1068** | **1072** |

Entries with a non-null `before` stay at **442**. Closure is exact: **1046 = 1046**.

### 3.5 Gates

| # | Gate | Rule |
| --- | --- | --- |
| **H1** | **Closure** | distinct non-null `after` values **===** `canonical` |
| **H2** | Pre-token conservation | entries with a non-null `before` === **442**, unchanged |
| **H3** | Entry accounting | `1068 − dropped + appended === total` |
| **H4** | `prefix-only` still exact | every member is a true prefix swap of its final name |
| **H5** | No duplicate entries | catches an accidental double-run |
| **H6** | Added / renamed disjoint | no name claimed by both |
| **H7** | Per-category arithmetic | `in − moved-out + moved-in + appended − dropped = out` for every category. **Not** a comparison against §3.4's numbers — those shift with the disputed rows (§2.5.1) |
| **H8** | No category invented or lost | the key set is unchanged; `migrate-tokens.mjs` silently ignores a malformed category, so nothing else will catch this. Also reports any category that has emptied |

**Not idempotent.** A second pass would append the generation-2 `added` names again — and no gate
except H5 would notice, since H1 compares sets and H3 stays self-consistent. The script refuses to run
against an already-updated map, detected from content (§1.2). To re-run:

```bash
git checkout -- ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/reports/hds/token-map.generated.json
```

---

## 4. Step C — rewrite the changeset (`update-changeset.mjs`)

**The changeset is a rendering of the shipping map, not an independent artifact.** Step B must run
first; the script refuses to start otherwise, and gate **C0** asserts the tables reproduce the map
exactly.

### 4.1 Deltas

| Table | Condition | Action |
| --- | --- | --- |
| **R** Renamed | target renamed | rewrite the **second** cell |
| **R** | target removed | **delete the row**, insert its `--token-*` name into **D** |
| **A** Added | entry renamed | rewrite it |
| **A** | entry removed | **delete the row** |
| **A** | — | insert every generation-2 added token |
| **D** Removed | — | only ever *receives* rows promoted from R |

The first cell of an R row is a historical `--token-*` name and **must never change**. Each table is
re-sorted ascending by its first cell.

### 4.2 Row order — mirror the map, do NOT sort alphabetically

**Emit each table in the shipping map's order**: category order, then the map's own within-category
order. Gate **C9** enforces it.

The committed changeset already follows this convention — its rows match the map's category order for
411 of 424 entries, diverging only where Part 1 moved things. Sorting alphabetically instead reshuffles
rows that have not changed:

| Ordering | Total diff | Real changes | Re-ordering noise |
| --- | ---: | ---: | ---: |
| **Map order** | **92 lines** | 84 | **4** |
| Alphabetical | 464 lines | 84 | 190 |

Identical content either way — but this is the artifact humans read in a release PR, and burying 84
real changes in 190 moved lines makes it effectively unreviewable.

> **Known consequence:** because row order follows the map, a *recategorisation* shifts rows even
> though no pair changed. Part 1 did exactly that — the two entries it moved out of `__other` show up
> here as moved rows. That is expected, and the reason the two artifacts are checked by content
> (gate **C0**) rather than by line position.

> **Also expected:** the *Added* table normalises to strict alphabetical order, because the map's
> `added` array is sorted by name. The committed file is alphabetical for 624 of its 626 rows — two
> `--hds-app-footer-foreground-color-*` entries were hand-ordered semantically (base before action
> states). Those two move into alphabetical position. Content is unchanged; do not treat it as a bug.

### 4.3 Parsing hazard

`Renamed tokens:` appears **twice**. The second introduces a table of `.hds-…` CSS **helper class**
names, not custom properties. Anchor section R on the *first* occurrence, bound it by `Added tokens:`,
and assert the helper section is byte-identical afterwards (**C7**).

Duplicate `after` values in table R are **legitimate** — two `--token-*` names can collapse onto one
`--hds-*` name — and are preserved.

### 4.4 Gates

| # | Gate | Rule |
| --- | --- | --- |
| **C0** | **Agrees with the shipping map** | the R/A/D tables reproduce it exactly |
| **C1** | Historical column frozen | multiset of R-first-column ∪ D unchanged |
| **C2** | No leftovers | no renamed/removed name survives anywhere in the file |
| **C3** | A / R-after disjoint | |
| **C4** | No duplicate rows in A or D | |
| **C5** | Prefixes correct | R-before and D are `--token-*`; R-after and A are `--hds-*` |
| **C6** | Structure intact | frontmatter, both headings, helper table present |
| **C7** | CSS-helper section byte-identical | |
| **C8** | *Advisory.* No `--hds-focus-ring-box-shadow-*` token touched | those generate helper class names |
| **C9** | **Row order mirrors the map** (§4.2) | prevents a silent alphabetical reshuffle |
| **C10** | **No sibling changeset references a generation-2 source name** (§4.6) | manual — nothing else catches this |

### 4.5 Intro bullets — manual

The bullet list is **prose and is never rewritten automatically.** Re-read every bullet against the
final map; amend or delete any that no longer holds. **Never** add a second bullet saying "and then we
renamed it again" — the file must read as a single renaming event.

> **DECIDED (2026-09-29): `__form-elements` gets NO bullet of its own.** The changeset keeps its
> renamed / added / removed lists **generic** — categories are an internal grouping in
> `token-map.generated.json` and are not surfaced to consumers.
>
> This means the changeset's bullet list and the map's category set are **deliberately allowed to
> diverge**: `__form-control-checked` disappeared in Part 1 and `__form-elements` appeared, while the
> bullets stay as they are. That is fine — the bullets describe the *naming conventions* a consumer
> needs to understand, not the tooling's bookkeeping. Do not "reconcile" them.
>
> The existing bullets are still checked for accuracy: any bullet that describes a convention
> generation 2 changed must be amended. That is a separate question from adding a new one.

### 4.6 Sibling changesets — verification gate

`carbonization-design-tokens.md` is not the only changeset that can reference a token. **Every other
`.changeset/*.md` must be proven clean**, not assumed clean. This is a gate, not a nicety: a stale
token name in a sibling changeset ships straight into the release notes and nothing else catches it.

**C10 — no sibling changeset references a generation-2 source name.**

```bash
node -e '
const fs=require("fs");
const g=require("./ai-plans/project-solar-carbonization/final-qa-tokens-renaming/tooling/reports/token-changes.generated.json");
const stale=[...g.renamed.map(e=>e.before), ...g.removed.map(e=>e.before)];
const files=fs.readdirSync(".changeset").filter(f=>f.endsWith(".md") && f!=="carbonization-design-tokens.md");
let bad=0;
for (const f of files) {
  const t=fs.readFileSync(".changeset/"+f,"utf8");
  const hits=stale.filter(n=>new RegExp(n+"(?![a-zA-Z0-9-])").test(t));
  if (hits.length) { bad++; console.log("FAIL", f, hits.join(", ")); }
}
console.log(bad ? "C10 FAILED" : "C10 ok - "+files.length+" siblings clean");'
```

Any hit must be rewritten through the map (renamed) or flagged for a decision (removed) before the
changeset ships.

#### Two namespaces that look like tokens but are not

The grep must be for `--hds-` (with the leading dashes). Matching bare `hds-` produces false
positives, because two unrelated namespaces share the prefix:

| Looks like | Actually is | Example | Affected by a token rename? |
| --- | --- | --- | --- |
| `hds-form-control-border` | **Sass mixin** | `carbonization-components-misc.md` | **No** |
| `hds-typography-body-200`, `hds-table__td` | **CSS class** | same file | **No** |
| `--hds-var-filter-bar-…` | **runtime CSS variable** | `carbonization-components-css-vars.md` | **No** — generation 2 touches no `--hds-var-*` |

A mixin or class is not renamed when a token is. What *can* break is a mixin's **implementation**, and
that is covered by the consumer migration (§5) — `packages/components/src/styles/mixins/**` is inside
the scanned roots.

> Verified 2026-09-29: 5 siblings, 0 hits. `misc.md` contains no `--hds-*` custom property at all;
> `css-vars.md` contains only `--hds-var-*`. The `hds-form-control-border` and
> `hds-form-control-invalid-outline` mixins still exist and already reference post-generation-2 token
> names.

---

## 5. Step D — migrate in-repo consumers

**No new script.** [`migrate-tokens.mjs`](../full-tokens-replacement/tooling/migrate-tokens.mjs) is
reused **unmodified**, driven by `tooling/config/migrate.hds-gen2.{dry,apply}.config.json`.

It already handles the hard parts: it matches the maximal `(--hds-)[a-zA-Z0-9-]+` run and looks the
whole name up in the map (so a shorter name can never truncate a longer one), consults a
comment-stripped mirror, flags `#{…}` / `${…}` interpolation, and is position-preserving.

Config differences from generation 1: `prefix` is **`--hds-`** (consumers were already migrated off
`--token-*` by [#4045](https://github.com/hashicorp/design-system/pull/4045),
[#4046](https://github.com/hashicorp/design-system/pull/4046),
[#4048](https://github.com/hashicorp/design-system/pull/4048),
[#4076](https://github.com/hashicorp/design-system/pull/4076)); `md` included for `website/docs`;
`version-history/**` and `CHANGELOG.md` excluded.

### 5.1 Usages of removed tokens

`migrate-tokens.mjs` inserts a `🚧 TODO` marker at usages of a token whose `after` is `null`.

> **DECIDED (2026-09-29): keep the marker behaviour as-is.** `migrate-tokens.mjs` is **not**
> modified — it stays the shared, reusable Phase B tool.

The marker is nonetheless the wrong outcome *for this monorepo* — a usage of a deleted token here is
a defect needing a real decision, not a comment. (The mechanism exists for *downstream* repos the HDS
team does not own.) The safeguard is procedural rather than coded:

1. Run the **dry** config first.
2. If it reports **any** removed-token usage, stop and fix those by hand.
3. Only run the apply config once that count is **0**.

Following that, the marker never fires and the behaviour is moot. It currently reports **0** such
usages, so this costs nothing today — but the dry run must not be skipped, because that check is the
only thing standing between a deleted-token usage and a `🚧 TODO` comment landing in
`packages/components/src`.

### 5.2 Audit

```bash
node ai-plans/project-solar-carbonization/hds-tokens-verify/tooling/verify-tokens.mjs --json
```

An independent implementation, so a meaningful check. It resolves the official set from the
**installed** `@hashicorp/design-system-tokens/dist/…/tokens.css`; if `dist` is stale it reports false
positives for every *new* token name. Ask the maintainer to run `pnpm build` in `packages/tokens`
first, or pass `--tokens-css`. **Do not "fix" source to satisfy a stale token list.** Target:
`Distinct invalid tokens: 0`.

---

## 6. Not automated

- `full-tokens-replacement/tooling/reports/hds/token-migration.{md,json}` go stale. Regenerating
  Phase B needs a `main` worktree:

  ```bash
  git worktree add /tmp/hds-main main
  node ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/migrate-tokens.mjs \
    --config ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/config/migrate.hds.config.json \
    --root /tmp/hds-main
  git worktree remove /tmp/hds-main --force
  ```

  Expect the TODO count to rise by the number of `main`-era usages of tokens whose `after` became
  `null`. Confirm `Stale tokens remaining (verify) = 0`.

### 6.1 Documentation — exactly what needs editing

Verified by doing it. Two of the five files listed need **no change at all**:

| File | Change | Why |
| --- | --- | --- |
| `HANDOVER-full-tokens-replacement.md` | **§2 schema table** → post-Part-2 counts; re-check the `442` arithmetic line; add a dated Part 2 entry | it is the live current-state table |
| `tooling/reports/hds/token-diff.md` | header → mark **pairs** stale too, not just categories | Part 1's header says its pairs are still valid; Part 2 makes that false |
| `generated-plan.md` | extend the Part 1 "historical document" banner | narrative, deliberately not rewritten |
| `tooling/README.md` | **none** | its category list carries no counts |
| `tooling/diff-tokens.mjs` | **none** | `CATEGORY_ORDER` and the "spent one-off" notes were already fixed in Part 1 |

`hds-tokens-verify/**` also needs nothing: its `official=1046` figure is still correct, and generation
2 touches no `--hds-var-*` runtime variable, so the allowlist is unaffected. (Verify rather than
assume — one query each.)

**Distinguish live tables from historical narrative.** Update anything that states *current* shape;
annotate anything that records *what was done at the time*. Sections describing the original Phase A
inference keep their original counts and get a "describes the 2026-09-15 run, not current state"
note. **Do not rewrite history** — the "single change in time" requirement applies to the *token
data*, not the engineering log.

---

## 7. Execution

The scripts are rewritten and rehearsed (§2.5); all preconditions are met (§1).

> ### ⚠️ Run everything from the REPOSITORY ROOT
>
> `migrate-tokens.mjs` resolves its `roots` relative to `--root`, **which defaults to the current
> working directory**. Running it from `tooling/` makes every root (`packages/components/src`,
> `showcase/app`, …) resolve to a path that does not exist.
>
> It then reports **`files scanned=0 … 0 replacements, 0 stale remaining` and exits 0** — a silent
> false negative that is indistinguishable from a clean pass. The correct invocation scans **3698**
> files.
>
> Never `cd` into `tooling/` before invoking it. Either run from the repo root (below) or pass
> `--root` explicitly.
>
> **Sanity check after every migrate run: `files scanned` must be in the thousands.** If it is 0,
> the run told you nothing.

```bash
# From the repository root — NOT from tooling/
cd "$(git rev-parse --show-toplevel)"
P=ai-plans/project-solar-carbonization

node $P/final-qa-tokens-renaming/tooling/build-token-changes.mjs   # STOP if meta.validated is false
node $P/final-qa-tokens-renaming/tooling/update-token-map.mjs --dry-run \
  && node $P/final-qa-tokens-renaming/tooling/update-token-map.mjs
node $P/final-qa-tokens-renaming/tooling/update-changeset.mjs --dry-run \
  && node $P/final-qa-tokens-renaming/tooling/update-changeset.mjs

node $P/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config $P/final-qa-tokens-renaming/tooling/config/migrate.hds-gen2.dry.config.json
#   CHECK: files scanned ≈ 3698, and removed-token usages (TODO markers) == 0. Then:
node $P/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config $P/final-qa-tokens-renaming/tooling/config/migrate.hds-gen2.apply.config.json

node $P/hds-tokens-verify/tooling/verify-tokens.mjs --json
```

Take a baseline first, so category preservation can be checked independently of the scripts' own
gates — the technique that proved Part 1 correct:

```bash
node -e 'const m=require("./ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/reports/hds/token-map.generated.json");
  console.log(Object.keys(m).filter(k=>Array.isArray(m[k])).join("\n"))' > /tmp/cats_before.txt
```

**No commit by the tooling.** Changes are left in the working tree.

---

## 8. Known state (re-verified 2026-09-29, all green)

- **Part 1 committed** (`5e3803a907`, report `e39ddfc266`). Starting map as in §1.2.
- **`token-changes.md` is final and validated** — V1–V8 all pass, `meta.validated: true`.
  It parses to **34 renamed, 5 added, 5 removed**.
- **Changeset typo fixed** (`3e6e5c095f`, cherry-picked). Zero malformed rows remain.
- **No blockers.** Full rehearsal below is green end to end.
- **0** consumer usages of the removed tokens, and **0** stale occurrences of any `before` name in
  `packages/components/src`, `showcase/**`, `website/**`. Step D is a **verification no-op** —
  expected, not a miss.
- `showcase/dist/**` and `packages/tokens/dist/**` still hold old names. Build output; regenerated by
  `pnpm build`.

### 8.1 Rehearsal results (nothing written to production files)

| Step | Result |
| --- | --- |
| `build-token-changes.mjs` | ✅ **8/8** — `validated: true` |
| `update-token-map.mjs` | ✅ **8/8** — 212 / 4 / 22 / 22 / 630, total **1072**, closure exact 1046 = 1046 |
| `update-changeset.mjs` | ✅ **8/8** — C0 exact: R 420/420, A 630/630, D 22/22 |

Changeset table transitions: Renamed **424 → 420**, Added **626 → 630**, Removed **18 → 22**.

### 8.2 Decisions taken (2026-09-29)

| # | Decision | Outcome | Where |
| --- | --- | --- | --- |
| 1 | Does `__form-elements` get its own changeset intro bullet? | **No.** The changeset keeps its renamed / added / removed lists generic; categories stay internal to the map and are not surfaced to consumers. | §4.4 |
| 2 | Keep the `🚧 TODO` marker for removed-token usages? | **Yes, for now.** `migrate-tokens.mjs` is unmodified; the dry-run-first rule is the safeguard. | §5.1 |

**Nothing is open. Part 2 is ready to execute.**

---

## 9. Hard rules

1. **No linters, formatters or test suites.** Out of scope; the maintainer's responsibility.
2. **No build regeneration.** `packages/tokens/dist/**`, `showcase/public/assets/**` and
   `packages/mcp/docs-catalog.json` are *verified* and a mismatch is *reported*, never fixed here.
3. **No commits.** Leave changes in the working tree.
4. **Never edit `packages/tokens/src/**`** — owned by the colleagues; read only.
5. **Never edit historical records:** `packages/*/CHANGELOG.md`, `website/docs/**/version-history/**`.
6. All reports go under `tooling/reports/`.
