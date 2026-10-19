# `OLD/` — archive (do not use to audit)

> [!WARNING]
> Nothing in this folder should be used to audit a codebase. Use [`../README.md`](../README.md),
> [`../tooling/verify-tokens.mjs`](../tooling/verify-tokens.mjs) and a copy of
> [`../tooling/verify.TEMPLATE.config.json`](../tooling/verify.TEMPLATE.config.json).

## What this folder is

This folder holds the history of how the token-usage auditor was built and piloted on the HDS
monorepo itself (2026-08/09). It was archived on 2026-10-19, when the folder was reorganised so that
its top level contains only what's needed to audit another codebase.

## Why it's "old"

- **The HDS-monorepo pilot is done.** The HDS codebase is fully migrated, so the pilot config
  (`tooling/config/hds-pilot.config.json`) and its reports are kept only as evidence of how the tool
  was validated.
- **The script has been superseded.** `../tooling/verify-tokens.mjs` is this script plus:
  - a legacy `--token-*` usages check, ported from the Atlas fork used in
    [hashicorp/atlas#32035](https://github.com/hashicorp/atlas/pull/32035);
  - a required `--config`;
  - a default output folder of `audit-reports/`.
- **The old docs don't match the script.** `tooling/README.md` documents `--tokens-cache`,
  `--refresh-cache` and `--skip-clean-report`, which were never implemented.

## Contents

| Path | What it is |
|---|---|
| [`HANDOVER-hds-tokens-verify.md`](./HANDOVER-hds-tokens-verify.md) | Session handover for the original auditor work (last updated 2026-09-15) |
| [`generated-plan.md`](./generated-plan.md) | The original AI-generated plan for the auditor |
| [`tooling/README.md`](./tooling/README.md) | The original tooling README |
| [`tooling/verify-tokens.mjs`](./tooling/verify-tokens.mjs) | Original audit script (exact copy). **Use `../tooling/verify-tokens.mjs` instead.** |
| [`tooling/config/hds-pilot.config.json`](./tooling/config/hds-pilot.config.json) | Config for the HDS-monorepo pilot |
| [`tooling/reports/README.md`](./tooling/reports/README.md) | Notes on the pilot's report layout |
| [`tooling/reports/hds/token-usage-audit.md`](./tooling/reports/hds/token-usage-audit.md) / [`.json`](./tooling/reports/hds/token-usage-audit.json) | Reports from the HDS-monorepo pilot run |
