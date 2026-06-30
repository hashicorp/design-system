# Runner Spec (One-Off Monorepo Session)

## Purpose

Define the exact execution order for a single migration session in this repository.

## Ordered steps

1. Preflight audit
- run baseline scans
- confirm excludes

2. Pass A (stylesheets)
- apply `--hds-` -> `--hds-var-` in scoped `.scss/.css` source files

3. Pass B (scripts/templates)
- apply same prefix rename in scoped `.gts/.hbs/.ts/.js` source files

4. Residual scan
- locate remaining `--hds-` in scoped source
- fix misses or document intentional exceptions

5. Validation
- run build/lint/tests in affected workspaces

6. PR prep
- summarize counts and validation results
- prepare single migration PR

## Exit criteria

Session is complete when Definition of Done in generated plan is fully met.
