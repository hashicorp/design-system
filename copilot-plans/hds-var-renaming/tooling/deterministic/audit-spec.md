# Audit Spec (One-Off Monorepo Session)

## Purpose

Provide pre/post migration checks for this repository only.

## Pre-migration checks

1. Baseline count of `--hds-` in scoped source files.
2. Baseline count of `--hds-var-` in scoped source files.
3. Collision review for existing `--hds-var-*` names.
4. Confirm excludes for generated outputs.

## Post-migration checks

1. Recount `--hds-` and confirm expected near-zero (or documented exceptions).
2. Recount `--hds-var-` and confirm expected increase.
3. Confirm `--token-*` counts unchanged.
4. Confirm no edits in excluded generated paths.

## Output artifact

Store text report in:
- `copilot-plans/hds-var-renaming/tooling/reports/audit-one-off.md`
