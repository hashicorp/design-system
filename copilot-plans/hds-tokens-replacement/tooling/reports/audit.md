# Audit — baseline before the `--token-*` → `--hds-*` swap

> Fill this in during the preflight step (plan §2). Re-run measurements per repo.

## Repo / branch

- Repo: `hashicorp/design-system` (HDS monorepo pilot)
- Branch: `project-solar/phase-2/02_hds-tokens-replacement`
- Date: `2026-07-02`

## Token build confirmation (plan §2.1)

- Tokens package version / build emitting `--hds-*`: local workspace build
  (`@hashicorp/design-system-tokens@5.0.0`)
- Confirmed no `--token-*` names remain in token output: `[x] yes`
  (`packages/tokens/dist/products/css/tokens.css`: 0 `--token-*`, emits
  `--hds-color-foreground-strong`)

## Baseline `--token-*` counts (plan §2.2)

Command: `node …/replace-token-prefix.mjs --check --json`

| Metric | Value |
|---|---|
| files scanned | 3098 |
| residual files | 112 |
| residual occurrences (baseline) | 1646 |

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
