# Audit — baseline before the `--token-*` → `--hds-*` swap

> Fill this in during the preflight step (plan §2). Re-run measurements per repo.

## Repo / branch

- Repo: `<repo name>`
- Branch: `<dedicated branch>`
- Date: `<yyyy-mm-dd>`

## Token build confirmation (plan §2.1)

- Tokens package version / build emitting `--hds-*`: `<version or "local workspace build">`
- Confirmed no `--token-*` names remain in token output: `[ ] yes`

## Baseline `--token-*` counts (plan §2.2)

Command: `node …/replace-token-prefix.mjs --check --json`

| Metric | Value |
|---|---|
| files scanned | `<n>` |
| residual files | `<n>` |
| residual occurrences (baseline) | `<n>` |

### By root / extension (optional)

| Root | Occurrences |
|---|---|
| `<root>` | `<n>` |

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Latest pilot measurement (from `--check`): **1,646** occurrences across **112**
files (3,098 files scanned) with the pilot config
(`roots`: `packages/components/src`, `showcase/app`, `showcase/tests`,
`website/app`, `website/docs`).
<!-- END REPO-SPECIFIC (hds-pilot) -->
