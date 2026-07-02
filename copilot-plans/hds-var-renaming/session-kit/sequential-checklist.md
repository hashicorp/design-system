# Sequential Execution Checklist

## Phase 0 - Setup

1. Ensure working tree is clean enough for migration work.
2. Create/switch to dedicated branch for this migration.
3. Confirm scope/excludes from generated-plan.md.

## Phase 1 - Preflight Audit

1. Count matches for --hds- in scoped source files.
2. Count matches for --hds-var- in scoped source files.
3. Check for collision risk and document it.
4. Save results in tooling/reports/audit-one-off.md.

## Phase 2 - Stylesheet Pass

1. Apply mechanical prefix rename in scoped .scss/.css source files.
2. Re-scan stylesheet scope for residual --hds-.
3. Fix missed stylesheet sites (if any).

## Phase 3 - Scripts/Templates Pass

1. Apply mechanical prefix rename in scoped .gts/.hbs/.ts/.js source files.
2. Cover style object keys, type keys, style helper args, tests, snippets.
3. Re-scan script/template scope for residual --hds-.
4. Fix missed script/template sites (if any).

## Phase 4 - Global Residual Sweep

1. Run global scoped residual search for --hds-.
2. Classify each remaining hit:
- missed edit (fix)
- generated/out-of-scope (exclude)
- intentional exception (document)

## Phase 5 - Validation

1. Verify --token-* unchanged.
2. Verify JS-to-CSS bridge name alignment for assignment/consumption sites.
3. Run build/lint/tests for affected workspaces.
4. Record results in tooling/reports/verification-one-off.md.

## Phase 6 - PR Readiness

1. Capture before/after counts and notable paths changed.
2. Summarize checks and outcomes.
3. Populate tooling/reports/pr-notes-one-off.md.
4. Confirm Definition of Done from generated-plan.md.
