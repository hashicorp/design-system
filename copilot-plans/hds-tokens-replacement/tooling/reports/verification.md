# Verification — zero residual `--token-*` after the swap

> Fill this in after the apply pass (plan §7). Success = zero residuals.

## Deterministic gates (plan §7.1)

| Gate | Result |
|---|---|
| `--check` residual occurrences = 0 | `[x]` |
| Shell cross-check residual = 0 (plan §7.3) | `[x]` |
| Diff is pure `--token-`→`--hds-` prefix swap (no value/logic changes) | `[x]` |
| No `--hds-var-*` or Sass `$…` edits leaked in | `[x]` |
| Token build rebuilt; `--hds-*` references resolve | `[x]` (tokens + components build OK) |
| Lint passes (`pnpm lint`) | `[x]` (components/showcase/website; format auto-fixed) |

### `--check` output

```
check: 0 remaining "--token-" occurrences in source scope (scanned 3098). ✅
```

### Shell cross-check output

```
# rg -n --glob '**/*.{scss,css,gts,hbs,ts,js}' --glob '!**/dist/**' --glob '!**/*.map' \
#   --glob '!showcase/public/assets/**' -- '--token-' \
#   packages/components/src showcase/app showcase/tests website/app website/docs
(no output — 0 matches, exit 0)
```

## Change scope

- 114 source files changed by the swap (+1570/−1565; net +5 = coupling markers).
- By extension (vs HEAD, excluding plan files): 89 `.scss`, 15 `.gts`, 4 `.hbs`,
  3 `.ts`, 3 `.js`.
- 3 generated `.css` assets under `showcase/public/assets/**` changed by the
  tokens `postbuild` (not source edits): `design-system-components.css`,
  `design-system-components-common.css`, `design-system-power-select-overrides.css`.
- Formatting: shorter `--hds-` prefix re-wrapped a few lines; `pnpm lint:fix`
  applied in `packages/components` and `website`. Post-fix `--check` still 0.

## Tests (run by the USER, plan §7.2)

- User ran the suite for affected workspaces: `[x] yes`
- Result reported back: all tests passing (showcase + website)

## Idempotency

- Re-run of apply pass = no-op; `--check` = 0; re-run of `--audit-coupling
  --annotate` reports `0 newly annotated`. `[x]`
