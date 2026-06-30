# AI Verification Instructions (One-Off Monorepo Session)

## Role in this migration

AI is used as a verifier and cleanup assistant for this one-off monorepo migration.

## Responsibilities

1. Review diff for non-mechanical changes and flag them.
2. Run residual search for `--hds-` in scoped source files.
3. Classify residual hits:
- missed rename (fix)
- out-of-scope/generated (ignore)
- intentional exception (document)
4. Confirm `--token-*` namespace was not touched.
5. Confirm tests/docs snippets using renamed vars were updated consistently.

## Output

Append a verification summary to:
- `copilot-plans/hds-var-renaming/tooling/reports/verification-one-off.md`
