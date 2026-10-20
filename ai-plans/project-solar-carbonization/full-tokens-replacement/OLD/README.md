# `OLD/` — archive (do not use for migrations)

> [!WARNING]
> Nothing in this folder should be used to migrate a codebase. Use [`../README.md`](../README.md) and
> the canonical [`../tooling/token-map.json`](../tooling/token-map.json).
>
> In particular, `tooling/reports/hds/token-map.generated.json` here is the map **as shipped with
> tokens 6.0.0**, which contains **7 known errors** (see [`REPORT-missed-tokens-mapping.md` §7](./REPORT-missed-tokens-mapping.md#7-resolution-applied-2026-10-19)).

## What this folder is

This folder holds the history of how the `--token-*` → `--hds-*` token map was produced. It was
archived on 2026-10-19, when the folder was reorganised so that its top level contains only what's
needed to run a migration on another codebase.

## Why it's "old"

- **The map generator was a one-off.** `tooling/diff-tokens.mjs` ("Phase A") inferred the map by
  diffing pre- and post-carbonization token names. That job is finished. Afterwards the map was
  curated by hand (final-QA renames, category reorganisation), so re-running the generator would
  overwrite it with worse data.
- **The map it produced had errors.** In 2026-10 an investigation found 7 wrong or missing rows. They
  were caused by fuzzy-match guesses being fed back as "high confidence" through the release changeset,
  and by a missing duplicate-target check.
  - The corrected map lives one level up, in `tooling/token-map.json`.
  - The pre-correction file is kept here unchanged, under its original name, for traceability.
- **The HDS-monorepo test harness is no longer relevant.** The HDS codebase itself is fully migrated,
  so the HDS-specific config and reports are kept only as evidence of how the tooling was validated.

## Contents

| Path | What it is |
|---|---|
| [`REPORT-missed-tokens-mapping.md`](./REPORT-missed-tokens-mapping.md) | Investigation (2026-10-15) of the wrong/missed mappings: timeline across PRs #4006, #4035, #4036, #4145, root cause, method, evidence, and §7 Resolution: the corrected rows (as shipped vs corrected), validation of the corrected map, where the fixes were applied |
| [`HANDOVER-full-tokens-replacement.md`](./HANDOVER-full-tokens-replacement.md) | Session handover for the original tooling work (last updated 2026-09-15) |
| [`generated-plan.md`](./generated-plan.md) | The original AI-generated plan for the two-phase tooling |
| [`tooling/README.md`](./tooling/README.md) | The original tooling README (Phase A + Phase B, category definitions) |
| [`tooling/migrate-tokens.mjs`](./tooling/migrate-tokens.mjs) | Phase B — migration script, original version (exact copy). **Use `../tooling/migrate-tokens.mjs` instead.** |
| [`tooling/diff-tokens.mjs`](./tooling/diff-tokens.mjs) | Phase A — map generator. **Retired, do not re-run.** |
| [`tooling/config/migrate.hds.config.json`](./tooling/config/migrate.hds.config.json) | Phase B config for the HDS-monorepo test harness |
| [`tooling/reports/hds/token-map.generated.json`](./tooling/reports/hds/token-map.generated.json) | The map **as shipped with 6.0.0** (pre-correction, 7 known errors) |
| [`tooling/reports/hds/token-diff.md`](./tooling/reports/hds/token-diff.md) | Phase A report from its last run (2026-09-15), with per-signal breakdown |
| [`tooling/reports/hds/token-migration.md`](./tooling/reports/hds/token-migration.md) / [`.json`](./tooling/reports/hds/token-migration.json) | Phase B report from the HDS test-harness run |

`tooling/migrate-tokens.mjs` is an exact copy of Phase B as it was before the reorganisation. It's kept
for reference only. The maintained version is [`../tooling/migrate-tokens.mjs`](../tooling/migrate-tokens.mjs). Its
replacement logic is identical; only the header comment, default `mapPath`/`reportDir` and report
labels differ.
