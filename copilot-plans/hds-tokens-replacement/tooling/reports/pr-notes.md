# PR notes — `--token-*` → `--hds-*` prefix swap

> Fill this in before opening the PR.

## Summary

Mechanical, collision-free swap of the CSS custom property prefix `--token-` →
`--hds-` at every consumption site, aligning usages with the `--hds-*` token names
already emitted by `@hashicorp/design-system-tokens`. No token values, names, or
logic changed — only the leading `--token-` segment.

## Scope

- Roots: `packages/components/src`, `showcase/app`, `showcase/tests`, `website/app`,
  `website/docs`
- Extensions: `scss`, `css`, `gts`, `hbs`, `ts`, `js`
- Exclusions: `dist/**`, compiled `showcase/public/assets/**`, `*.map`, `*.md`,
  `node_modules`

## Before / after counts

| Metric | Before | After |
|---|---|---|
| `--token-*` occurrences in source | 1646 | 0 |
| source files changed by swap | — | 114 |

## Validation

- `--check` = 0 residuals: `[x]`
- Build/lint pass: `[x]` (tokens + components build; components/showcase/website
  lint after `lint:fix`)
- Tests run by user, reported passing: `[x]` (showcase + website)

## Indirect coupling

- 5 candidates across 3 files annotated with `🚧 TODO [HDS-TOKEN-RENAMING]` for manual
  review (see `indirect-coupling.md`). These are follow-ups, not part of the
  mechanical swap.

## Notes

- No changeset / consumer migration guide required for this step (technically
  non-breaking; token names preserved).
- 3 generated `.css` assets under `showcase/public/assets/**` changed via the tokens
  `postbuild` step (regenerated output, not hand edits).
- Suggested title: `chore: swap --token-* CSS custom property usages to --hds-*`
