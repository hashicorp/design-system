# HDS design tokens migration — `--token-*` → `--hds-*`

> **START HERE.** This folder contains everything needed to migrate a consumer codebase from
> `@hashicorp/design-system-tokens` **< 6.0.0** (`--token-*` CSS custom properties) to **≥ 6.0.0**
> (`--hds-*`, the "carbonization" release).
>
> | | |
> |---|---|
> | Canonical map | [`tooling/token-map.json`](./tooling/token-map.json) — corrected on 2026-10-19, see [corrections](./OLD/REPORT-missed-tokens-mapping.md#71-corrected-rows) |
> | Migration script | [`tooling/migrate-tokens.mjs`](./tooling/migrate-tokens.mjs) — Node built-ins only, no install |
> | Config template | [`tooling/migrate.TEMPLATE.config.json`](./tooling/migrate.TEMPLATE.config.json) |
> | Reference migration | [hashicorp/atlas#32035](https://github.com/hashicorp/atlas/pull/32035) — done with this map; use as a template (see [below](#reference-migration--use-as-a-template)) |
> | History (do not use to migrate) | [`OLD/`](./OLD/README.md) — how the map was originally produced, the investigation that corrected it, and the list of corrections |

## When to use this

Use it when a codebase upgrades `@hashicorp/design-system-tokens` (directly, or via
`@hashicorp/design-system-components`) across the 6.0.0 major and still references `--token-*`
custom properties in its own CSS/SCSS/templates/JS.

It handles **CSS custom-property names only**. It does not:

- touch HDS component APIs;
- touch Sass `$token-*` variables, unless you add them to `sassPrefixes`;
- touch anything resolved at runtime from strings.

## Reference migration — use as a template

A full migration has already been done on **Atlas** (HCP Terraform frontend):
[hashicorp/atlas#32035](https://github.com/hashicorp/atlas/pull/32035), merged 2026-10-16.

- It used the **corrected** map. Its copy is identical to `token-map.json` minus the `$meta` header.
- It's part 02 of a stacked series. Part 01,
  [hashicorp/atlas#32034](https://github.com/hashicorp/atlas/pull/32034), bumped the HDS dependencies
  to their new majors.

What the PR did, in order. Use it as a checklist for the next codebase:

1. Renamed component-level `--hds-*` runtime variables to `--hds-var-*`. This is a separate rename,
   **not** covered by `token-map.json`.
2. Fixed a few malformed `--token-*` names by hand **before** the batch run, so they'd be matched.
3. Replaced the existing `surface-high-contrast` tokens with the final ones, and fixed a few
   `--hds-code-block-*` variables.
4. Ported this tooling into the repo and adapted the config:
   - migration script + map + config in `frontend/atlas/carbonization/copilot-plans/tokens-full-migration/tooling/`;
   - the token-usage auditor (`../hds-tokens-verify/`) in
     `frontend/atlas/carbonization/copilot-plans/tokens-verify/tooling/`.

   Committing the tooling in the consumer repo lets it be re-run later, e.g. on open PRs after
   rebasing.
5. Ran the migration across the whole codebase (via an AI agent).
6. Replaced the tokens that were `removed` in 6.0.0 with suitable new ones, by hand, and added TODO
   comments where there's no counterpart.
7. Ran the auditor. The only findings left were 8 known usages of non-existent tokens, followed up
   with their owners.
8. After merge: rebased the other in-flight PRs that touch (S)CSS and re-ran migration + audit on them.

The PR description also documents the expected visual impact (tiny spacing / focus-ring
differences) and the testing approach. Reuse it for the next consumer PR.

## How to run a migration

1. **Copy the config template** next to it, e.g. `tooling/migrate.<repo>.config.json`, and edit:
   - `roots`: the target repo's source folders (relative to `--root`);
   - `extensions` / `excludeGlobs`: as needed;
   - leave `dryRun: true`.
2. **Dry run:**

   ```bash
   node ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/migrate-tokens.mjs \
     --config ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/migrate.<repo>.config.json \
     --root /path/to/target-repo
   ```

   Reports go to `tooling/migration-reports/token-migration.{md,json}` unless `reportDir` is
   set in the config.
3. **Review `token-migration.md`:**
   - replacements per token;
   - TODOs: usages of `removed` tokens, which have no successor;
   - interpolated names (`#{…}` / `${…}`), which are skipped and need manual fixes.
4. **Apply:** set `dryRun: false` and re-run. The script rewrites files in place and then re-scans to
   confirm no renamed `--token-*` name is left (`staleRemaining` must be 0).
5. **Resolve the TODO markers** (`🚧 TODO [HDS-TOKEN-CARBONIZATION]`) by hand, then lint, test and
   visually review the target app.
6. *(Optional)* Audit the result with the token-usage auditor,
   [`../hds-tokens-verify/tooling/verify-tokens.mjs`](../hds-tokens-verify/tooling/README.md). It
   flags any `--hds-*` name that doesn't exist in the installed tokens package.

## What the map contains

`tooling/token-map.json` is an object with:

- a `$meta` header (ignored by the script);
- one array per **category**. Every entry is a `{ "before", "after" }` pair.

| Category | Meaning | Used by the script as |
|---|---|---|
| `prefix-only` | Only `--token-` → `--hds-` changed | rename |
| `prefix-plus-renaming__palette-colors` | `color-palette-{hue}-{step}` → `core-color-{hue}-{step}` | rename |
| `prefix-plus-renaming__product-colors` | `color-{product}-…` → `product-{product}-…-color` | rename |
| `prefix-plus-renaming__semantic-colors` | `color-{semantic}-{rest}` → `{semantic}-color-{rest}` | rename |
| `prefix-plus-renaming__focus-ring` | `focus-ring-{variant}-box-shadow` → `focus-ring-box-shadow-{variant}` | rename |
| `prefix-plus-renaming__transition-function` | `…-transition-function` → `…-transition-timing-function` | rename |
| `prefix-plus-renaming__form-radio-card` | `form-radiocard-…` → `form-radio-card-…` | rename |
| `prefix-plus-renaming__form-elements` | Form tokens with no single rule (state moved to suffix, `base` dropped, `boolean` sub-namespace…) | rename |
| `prefix-plus-renaming__other` | Non-form structural renames | rename |
| `removed` | No successor (`after: null`) | TODO marker inserted at each usage |
| `added` | New in ≥ 6.0.0, no predecessor (`before: null`) | ignored (informational) |

Properties of the map (verified 2026-10-19, see [validation](./OLD/REPORT-missed-tokens-mapping.md#72-validation-of-the-corrected-map)):

- every one of the 442 pre-6.0.0 tokens appears exactly once as a `before`;
- every one of the 1046 ≥ 6.0.0 tokens appears exactly once as an `after`;
- no two `before` share the same `after`.

## Known limitations — review these usages by hand

The map is strictly one-to-one. A few old tokens were **split** into several new ones. The map picks
the most common successor, which has the same value in the default theme but may not be the
semantically best choice:

- `--token-form-control-padding` → `--hds-form-control-padding-vertical`. Horizontal padding now has
  its own `--hds-form-control-padding-horizontal`.
- `--token-form-control-base-*`, `--token-form-control-disabled-*` → `--hds-form-control-*`
  (text-input-like controls). Checkbox/radio-like controls now have dedicated
  `--hds-form-control-boolean-*` tokens.
- Tokens in `removed` have context-dependent replacements (e.g. `app-side-nav-color-*`,
  `tooltip-color-*`). Pick per usage.
- Some values changed intentionally in 6.0.0, e.g.:
  - `--hds-form-radio-background-image-size` 12px → 16px;
  - `--hds-app-side-nav-body-list-margin-vertical` 24px → 16px.

## Rules for AI agents (and humans in a hurry)

- Before migrating a new codebase, read [hashicorp/atlas#32035](https://github.com/hashicorp/atlas/pull/32035)
  (description + committed tooling). Follow the same sequence of steps.
- Use **only** `./tooling/token-map.json`. **Never** use any map, script or config under `./OLD/`: it contains a
  pre-correction map with known errors. `OLD/` is read-only history.
- **Never** re-run the old map generator (`OLD/tooling/diff-tokens.mjs`). It would overwrite
  hand-curated data with worse output.
- Do not edit `migrate-tokens.mjs` per target repo. Put repo-specific settings in a config file.
- If the map ever needs changing:
  - edit `token-map.json` deliberately;
  - keep categories sorted;
  - keep `before`/`after` unique;
  - document what changed and why (same format as §7 of `OLD/REPORT-missed-tokens-mapping.md`) and bump `$meta.lastCorrected`.
- The `6.0.0` table in `packages/tokens/CHANGELOG.md` mirrors this map. Keep them in sync. The website
  release notes are generated from the CHANGELOG.

## Folder map

```
full-tokens-replacement/
├── README.md                          ← this file
├── tooling/
│   ├── token-map.json                 ← canonical old → new map
│   ├── migrate-tokens.mjs             ← migration script (reusable core)
│   ├── migrate.TEMPLATE.config.json   ← copy per target repo
│   └── migration-reports/             ← created by runs (default `reportDir`)
└── OLD/                               ← archive: original tooling, plans, reports, investigation,
                                         REPORT-missed-tokens-mapping.md (investigation + corrections)
```
