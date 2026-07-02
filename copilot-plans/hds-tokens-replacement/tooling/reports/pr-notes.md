# PR notes — `--token-*` → `--hds-*` prefix swap

> Fill this in before opening the PR.

## Summary

Mechanical, collision-free swap of the CSS custom property prefix `--token-` →
`--hds-` at every consumption site, aligning usages with the `--hds-*` token names
already emitted by `@hashicorp/design-system-tokens`. No token values, names, or
logic changed — only the leading `--token-` segment.

## Scope

- Roots: `<from config>`
- Extensions: `<from config>`
- Exclusions: `dist/**`, compiled `public/assets/**`, `*.map`, `*.md`, `node_modules`

## Before / after counts

| Metric | Before | After |
|---|---|---|
| `--token-*` occurrences in source | `<baseline>` | `0` |

## Validation

- `--check` = 0 residuals: `[ ]`
- Build/lint pass: `[ ]`
- Tests run by user, reported passing: `[ ]`

## Indirect coupling

- `<n>` candidates annotated with `🚧 TODO [HDS-TOKEN-RENAMING]` for manual review
  (see `indirect-coupling.md`). These are follow-ups, not part of the mechanical
  swap.

## Notes

- No changeset / consumer migration guide required for this step (technically
  non-breaking; token names preserved).
- Suggested title: `chore: swap --token-* CSS custom property usages to --hds-*`
