# PR Notes - One-Off --hds-* Prefix Migration

## Suggested PR title
chore(components/showcase/website): one-off rename --hds-* vars to --hds-var-*

## Summary
- One-off mechanical rename in this monorepo only.
- Prefix changed: --hds- -> --hds-var-.
- No semantic code changes intended.

## Scope
- Files touched (high-level):
	- components source styles: `packages/components/src/styles/components/**`
	- components source component files: `packages/components/src/components/hds/**`
	- showcase app styles/templates: `showcase/app/**`
	- showcase integration tests: `showcase/tests/integration/components/hds/**`
	- website docs snippets/templates/styles: `website/docs/**`, `website/app/styles/**`
- Excluded generated outputs:
	- `packages/components/dist/**`
	- `showcase/dist/**`
	- `website/dist/**`
	- `showcase/public/assets/styles/**` (restored; not part of final diff)

## Before/after counts
- --hds- before: 341
- --hds- after: 0
- --hds-var- before: 0
- --hds-var- after: 341

## Validation
- --token-* unchanged: Yes
- Bridge alignment check: PASS
- Build/lint/tests summary:
	- `packages/components`: PASS (`pnpm build && pnpm lint`)
	- `showcase`: PASS (`pnpm lint`)
	- `website`: PASS (`pnpm lint`)
	- `showcase`/`website` tests were intentionally skipped per user instruction.

## Notes for reviewers
- Any intentional exceptions:
	- None in scoped source files.
- Follow-up items (if any):
	- Re-run `pnpm test` in `showcase` and `website` if strict Definition of Done compliance is required before merge.
