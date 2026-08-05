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
node copilot-plans/full-tokens-replacement/tooling/diff-tokens.mjs
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
  - `prefix-plus-renaming__other` — structural renames with no systematic rule (review each).
  - `removed` — no successor found (`after: null`); decide manually or flag with a TODO.
  - `added` — brand-new post tokens (`before: null`); informational, not applied by Phase B.
- `token-diff.md` — detailed human report (per-category and per-signal
  breakdowns, confidence, review buckets).

### The generated map is the source of truth

`token-map.generated.json` is consumed directly by Phase B — there is **no
separate confirmation step**. Phase A (re)writes it on every run (safe to
overwrite), and `token-diff.md` is the detailed audit companion. If a run ever
surfaces something questionable (e.g. in the **`prefix-plus-renaming__other`** or
**`removed`** buckets), edit the generated JSON in place before running Phase B.

## Phase B — apply the map

```bash
node copilot-plans/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config copilot-plans/full-tokens-replacement/tooling/config/migrate.hds.config.json
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
node copilot-plans/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config copilot-plans/full-tokens-replacement/tooling/config/migrate.hds.config.json \
  --root /tmp/hds-main
# inspect reports, then:
git worktree remove /tmp/hds-main --force
```
