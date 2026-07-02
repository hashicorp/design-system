# Verification — zero residual `--token-*` after the swap

> Fill this in after the apply pass (plan §7). Success = zero residuals.

## Deterministic gates (plan §7.1)

| Gate | Result |
|---|---|
| `--check` residual occurrences = 0 | `[ ]` |
| Shell cross-check residual = 0 (plan §7.3) | `[ ]` |
| Diff is pure `--token-`→`--hds-` prefix swap (no value/logic changes) | `[ ]` |
| No `--hds-var-*` or Sass `$…` edits leaked in | `[ ]` |
| Token build rebuilt; `--hds-*` references resolve | `[ ]` |
| Lint passes (`pnpm lint`) | `[ ]` |

### `--check` output

```
<paste the final --check summary showing 0 residuals>
```

### Shell cross-check output

```
<paste the rg cross-check output (should be empty)>
```

## Tests (run by the USER, plan §7.2)

- User ran the suite for affected workspaces: `[ ] yes`
- Result reported back: `<pass / fail + notes>`

## Idempotency

- Re-run from clean checkout yields byte-identical diff: `[ ]`
