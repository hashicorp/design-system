# Fresh-session prompt — execute the `--token-*` → `--hds-*` swap

> Paste this into a clean AI session to run the migration. It assumes a clean
> checkout on a dedicated branch. The full plan is
> `copilot-plans/hds-tokens-replacement/generated-plan.md`.

---

You are executing step 3 of the HDS token naming-convention effort: a purely
mechanical swap of the CSS custom property prefix `--token-` → `--hds-` at every
consumption site in this Ember repo. Read
`copilot-plans/hds-tokens-replacement/generated-plan.md` in full first, then follow
`copilot-plans/hds-tokens-replacement/session-kit/sequential-checklist.md` in order.

Hard rules:

1. **Only** replace the literal prefix `--token-` with `--hds-`. The token name
   after the prefix is unchanged. Never touch `--hds-*`, `--hds-var-*`, or bare
   `token-` in the apply pass.
2. Use the deterministic tool as the primary driver:
   `node copilot-plans/hds-tokens-replacement/tooling/replace-token-prefix.mjs`
   (config: `tooling/config/hds-pilot.config.json`; override with `--config` for
   other repos). Only fall back to editing files yourself if Node cannot run — and
   then apply the identical rule and self-verify.
3. Exclude generated output (`dist/**`, compiled `public/assets/**`, `*.map`) and
   Markdown (`*.md`). These are set in the config.
4. Indirect `token-` name coupling is **annotated, never auto-replaced**
   (`--audit-coupling --annotate`). Insert the exact marker
   `🚧 TODO [HDS-TOKEN-RENAMING]` and report the set.
5. **Do NOT run the test suite** — it is slow and may hang. When tests are needed,
   ask me to run them and report back, then act on the results. Lint may be run
   freely.
6. The run must be idempotent: from a clean checkout it produces a byte-identical
   diff every time.

Deliver at the end:
- `--check` proving **zero** `--token-*` remain in source.
- Updated reports under `copilot-plans/hds-tokens-replacement/tooling/reports/`.
- A short summary of files changed and coupling candidates annotated.

Fold any new edge case or learning back into `generated-plan.md` and the tooling
docs before finishing.
