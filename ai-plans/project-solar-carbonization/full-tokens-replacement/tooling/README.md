# HDS token "carbonization" migration tooling

Two-phase, dependency-free Node.js tooling to migrate CSS design-token usages
from the **pre-carbonization** token set (`--token-*`, as on `main`) to the
**post-carbonization** set (`--hds-*`). See the full rationale in
[`../generated-plan.md`](../generated-plan.md).

- **Phase A — `diff-tokens.mjs`** — diffs the pre/post token **names** and
  generates the old→new **token map**. One-off for this monorepo;
  no config, no CLI args.
- **Phase B — `migrate-tokens.mjs`** — applies the generated map to a
  target codebase, rewrites stale token usages, flags what has no mapping, and
  verifies zero stale names remain. Reusable and config-driven.

## Requirements

- Node.js (uses only built-ins: `fs`, `path`, `url`, `child_process`).
- Run from the repo root. Phase A shells out to `git` to read `main`.

## Phase A — generate the map

```bash
node ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/diff-tokens.mjs
```

Reads (fixed HDS paths, hardcoded as constants):

| Input | Source |
| --- | --- |
| Pre token set | `git show main:packages/tokens/dist/products/css/tokens.css` |
| Post token set | working-tree `packages/tokens/dist/products/css/tokens.css` |
| Changesets (S1) | `.changeset/*.md` |
| Source JSON (S2) | `packages/tokens/src/**/*.json` (excl. `carbon-extracted/**`), pre via `git show`, post from working tree |

Inference signals, in priority order: **S0** mechanical `--token-`→`--hds-`
prefix swap, **S1** changeset rename chains (composed on top of S0), **S2**
source-JSON provenance + structure (same file, equal segment multiset), **S3**
fuzzy name similarity (review-only).

Writes to `reports/hds/`:

- `token-map.generated.json` — flat map keyed by **mutually-exclusive category**
  (regenerated every run). Each child is a uniform `{ before, after }` pair; the
  category is the parent array's key:
  - `prefix-only` — only the `--token-` → `--hds-` prefix changed.
  - `prefix-plus-renaming__palette-colors` — `color-palette-{hue}-{step}` → `core-color-{hue}-{step}`.
  - `prefix-plus-renaming__product-colors` — `color-{product}-…` → `product-{product}-…-color`.
  - `prefix-plus-renaming__semantic-colors` — `color-{semantic}-{rest}` → `{semantic}-color-{rest}`.
  - `prefix-plus-renaming__focus-ring` — `focus-ring-{variant}-box-shadow` → `focus-ring-box-shadow-{variant}`.
  - `prefix-plus-renaming__transition-function` — `{rest}-transition-function` → `{rest}-transition-timing-function`.
  - `prefix-plus-renaming__form-radio-card` — `form-radiocard-{rest}` → `form-radio-card-{rest}`.
  - `prefix-plus-renaming__form-elements` — form token renames with no single systematic rule.
    Descriptive, not mechanical: members differ by *what* changed (state moved from prefix to
    suffix, a `base` marker dropped, a `boolean` sub-namespace introduced, two tokens merged into
    one). See `final-qa-tokens-renaming/PLAN-PART-1.md`.
  - `prefix-plus-renaming__other` — **non-form** structural renames with no systematic rule
    (review each).
  - `removed` — no successor found (`after: null`); decide manually or flag with a TODO.
  - `added` — brand-new post tokens (`before: null`); informational, not applied by Phase B.
- `token-diff.md` — detailed human report (per-category and per-signal
  breakdowns, confidence, review buckets).

### The generated map is the source of truth

`token-map.generated.json` is consumed directly by Phase B — there is **no
separate confirmation step**. `token-diff.md` is the detailed audit companion. If a
run ever surfaces something questionable (e.g. in the **`prefix-plus-renaming__other`** or
**`removed`** buckets), edit the generated JSON in place before running Phase B.

### ⚠️ Phase A is a spent one-off — do NOT re-run it

> **Re-running `diff-tokens.mjs` will overwrite `token-map.generated.json` and lose work that cannot
> be reconstructed.**

Phase A *inferred* the pre→post mapping from a git diff. That job is finished, and the map has since
been curated by hand:

1. **Categories were reorganised** (`final-qa-tokens-renaming/PLAN-PART-1.md`) —
   `prefix-plus-renaming__form-elements` was introduced and `…__form-control-checked` dissolved.
   Phase A knows nothing about either.
2. Phase A reads the post token set from `packages/tokens/dist/products/css/tokens.css`, which is
   **stale** relative to `packages/tokens/src`.
3. Once the final-QA renaming is folded in (`PLAN-PART-2.md`), `classify()` would re-derive
   categories from the *final* names and get different, wrong answers — entries that are legitimately
   `prefix-only` today fall through to `__other` once their final name differs.

If the map genuinely needs to change, edit it deliberately or use the scripts in
`final-qa-tokens-renaming/tooling/`. Treat this file as the historical record of how the map was
originally produced.

Two properties of the original inference, retained for reference:

- Source tokens marked `"private": "true"` are **not** emitted to
  `dist/products/css/tokens.css` (only to `dist/docs/**`), so they never appear in
  the map — by design; the products CSS is the canonical inventory.
- Newly added tokens only ever grow the `added` category (`before: null`), which
  Phase B ignores, so a refresh that adds tokens cannot change a migration result.

## Phase B — apply the map

```bash
node ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/config/migrate.hds.config.json
```

Consumes every category array of the generated map uniformly (the key names do
not matter). For each entry with a non-null `after` it replaces `var(--old)` and
bare `--old` with `--new` (mechanical, idempotent, position-preserving). Entries
with `after: null` get a `🚧 TODO [HDS-TOKEN-CARBONIZATION]` marker comment at the
usage site. Entries with `before: null` (the `added` category) are ignored.
Interpolated dynamic names (`…#{…}` / `…${…}`) are skipped and flagged.

Set `"dryRun": true` (the default in the HDS config) to report without writing.
Writes `token-migration.md` (human) and `token-migration.json` (machine) to
`reportDir`.

### Config keys (`config/migrate.<repo>.config.json`)

| Key | Purpose | HDS default |
| --- | --- | --- |
| `mapPath` | Generated token map (relative to the config file) | `reports/hds/token-map.generated.json` |
| `reportDir` | Where reports are written | `reports/hds` |
| `prefix` | **Pre** prefix to scan for (what `before` names carry) | `--token-` |
| `sassPrefixes` | Optional secondary prefixes (e.g. `$token-`) | `[]` |
| `roots` | Dirs to scan/rewrite | components/showcase/website roots |
| `extensions` | File extensions | `scss, css, gts, hbs, ts, js` |
| `excludeGlobs` | Globs to skip | `dist/**`, `node_modules/**`, `*.map`, `*.md`, … |
| `todoMarker` | Marker for unmapped removed tokens (`after: null`) | `🚧 TODO [HDS-TOKEN-CARBONIZATION]` |
| `dryRun` | Report only, do not edit files | `true` |

## Test harness (HDS)

Phase B's real targets are downstream Ember consumer apps still on `--token-*`.
Inside this monorepo the working tree is already post-carbonization (consumers
use `--hds-*`), so to validate Phase B against real pre-token usage, point it at
a throwaway worktree of `main`:

```bash
git worktree add /tmp/hds-main main
node ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/config/migrate.hds.config.json \
  --root /tmp/hds-main
# inspect reports, then:
git worktree remove /tmp/hds-main --force
```
