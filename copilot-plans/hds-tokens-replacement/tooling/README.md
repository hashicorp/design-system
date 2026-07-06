# Tooling — `--token-*` → `--hds-*` transform

Reusable, dependency-free automation for step 3 of the HDS token naming-convention
effort. See [`../generated-plan.md`](../generated-plan.md) for the full plan.

## Files

- `replace-token-prefix.mjs` — the **reusable core**. Never edit per repo.
- `config/hds-pilot.config.json` — **repo-specific** inputs (roots, extensions,
  exclusions). Copy + edit this per repo.
- `reports/` — living records updated on each run (audit, verification,
  indirect-coupling, PR notes).

## Requirements

Node.js (any modern version; uses only built-in modules — no `npm install`).

## Usage

Run from the repo root. Default config path is `./config/hds-pilot.config.json`
relative to the script; pass `--config` to override.

```bash
# 1. Baseline / verification (read-only, writes nothing)
node copilot-plans/hds-tokens-replacement/tooling/replace-token-prefix.mjs --check

# 2. Apply the prefix swap in place
node copilot-plans/hds-tokens-replacement/tooling/replace-token-prefix.mjs

# 3. Verify zero residuals (exit code 1 if any remain)
node copilot-plans/hds-tokens-replacement/tooling/replace-token-prefix.mjs --check

# 4. Indirect coupling sweep (read-only report)
node copilot-plans/hds-tokens-replacement/tooling/replace-token-prefix.mjs --audit-coupling

# 5. Insert TODO markers above coupling candidates (idempotent)
node copilot-plans/hds-tokens-replacement/tooling/replace-token-prefix.mjs --audit-coupling --annotate
```

Add `--json` to any mode for machine-readable output. Add `--root <path>` to point
at a different repo root, or `--config <path>` for a different config file.

## Exit codes

| Code | Meaning |
|---|---|
| 0 | success / nothing left to do |
| 1 | `--check`: residual `--token-*` occurrences remain |
| 2 | `--audit-coupling`: candidates found |
| 3 | usage or config error |

## Retargeting to another Ember repo

1. Copy `replace-token-prefix.mjs` **unchanged**.
2. Create `config/<repo>.config.json` from `hds-pilot.config.json`; edit `roots`,
   `extensions`, `excludeGlobs`, and (if needed) widen `couplingPatterns`.
3. Run with `--config config/<repo>.config.json`.
4. Re-populate the plan's `REPO-SPECIFIC` blocks and the `reports/` files.

## Idempotency

The rule is a literal `--token-` → `--hds-` swap; the replacement contains no
occurrence of the match prefix, so re-running is a no-op and `--check` returns 0.
Marker insertion is likewise idempotent (skips lines already preceded by
`[HDS-TOKEN-RENAMING]`).

## Guardrails

- Only the literal `--token-` head is matched — `--hds-*`, `--hds-var-*`, and bare
  `token-` are never touched by the apply pass.
- Indirect `token-` name coupling is **annotated, never auto-replaced**.
- Never edit generated output (`dist/**`, compiled `public/assets/**`, `*.map`) or
  Markdown (`*.md`). These are excluded by config.
- Do not run the test suite from the agent — ask the user to run it.
