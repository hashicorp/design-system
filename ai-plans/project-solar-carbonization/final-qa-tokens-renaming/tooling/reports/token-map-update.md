# Shipping map update — generation 2 folded in

- Generated: 2026-09-29T18:29:46.804Z
- Map: `ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/reports/hds/token-map.generated.json`
- Generation-2 map: `ai-plans/project-solar-carbonization/tokens-qa/token-changes.md` → sha256 `c4d94ee1df73…`
- Canonical tokens in `packages/tokens/src`: **1046**

## Verification gates

| Gate | Result | Detail |
| --- | --- | --- |
| H1 Closure | ✅ pass | map targets 1046 vs canonical 1046 — exact match |
| H2 Pre-token conservation | ✅ pass | 442 entries with a non-null `before` (invariant: 442) |
| H3 Entry accounting | ✅ pass | 1068 in (expect 1068) − 1 dropped + 5 appended = 1072; got 1072 |
| H4 `prefix-only` still exact | ✅ pass | all 212 members are true prefix swaps |
| H5 No duplicate entries | ✅ pass | none |
| H6 Added / renamed disjoint | ✅ pass | none |
| H7 Per-category arithmetic | ✅ pass | every category reconciles: in − moved-out + moved-in + appended − dropped = out |
| H8 Category set preserved | ✅ pass | 11 categories, unchanged |


## Categories — before → after

| Category | Before | After | Δ |
| --- | --- | --- | --- |
| `prefix-only` | 228 | 212 | -16 |
| `prefix-plus-renaming__palette-colors` | 42 | 42 | — |
| `prefix-plus-renaming__product-colors` | 86 | 86 | — |
| `prefix-plus-renaming__semantic-colors` | 46 | 46 | — |
| `prefix-plus-renaming__focus-ring` | 2 | 2 | — |
| `prefix-plus-renaming__transition-function` | 2 | 2 | — |
| `prefix-plus-renaming__form-radio-card` | 5 | 4 | -1 |
| `prefix-plus-renaming__form-elements` | 9 | 22 | +13 |
| `prefix-plus-renaming__other` | 4 | 4 | — |
| `removed` | 18 | 22 | +4 |
| `added` | 626 | 630 | +4 |


**Total: 1068 → 1072**

## Category moves

| Route | Count |
| --- | --- |
| prefix-only → prefix-plus-renaming__form-elements | 14 |
| prefix-only → removed | 2 |
| prefix-plus-renaming__form-radio-card → removed | 1 |
| prefix-plus-renaming__form-elements → removed | 1 |


## Changes applied

### Orphaned — successor deleted, `after` became `null`

These are the rows `update-changeset.mjs` moves from the *Renamed* table into the *Removed* table. A consumer on one of these names has **nowhere to go**.

| Historical token | Lost successor | Was in |
| --- | --- | --- |
| `--token-form-control-base-surface-color-hover` | `--hds-form-control-base-surface-color-hover` | `prefix-only` |
| `--token-form-toggle-border-radius` | `--hds-form-toggle-border-radius` | `prefix-only` |
| `--token-form-radiocard-border-radius` | `--hds-form-radio-card-border-radius` | `prefix-plus-renaming__form-radio-card` |
| `--token-form-control-checked-foreground-color` | `--hds-form-control-foreground-color-checked` | `prefix-plus-renaming__form-elements` |


### Dropped — added by generation 1, deleted by generation 2

Never existed publicly, so the entry is removed entirely.

| Token |
| --- |
| `--hds-form-radio-card-control-wrapper-padding` |


### Appended — brand-new generation-2 tokens

| Token |
| --- |
| `--hds-form-label-inline-typography-line-height` |
| `--hds-form-radio-border-color-checked-disabled` |
| `--hds-form-super-select-option-list-after-options-surface-color` |
| `--hds-form-super-select-option-surface-color-checked-hover` |
| `--hds-form-super-select-option-title-foreground-color` |


### Retargeted — the generation-1 target was renamed again

| Historical token | Was (②) | Now (③) | Category |
| --- | --- | --- | --- |
| `--token-form-control-base-border-color-default` | `--hds-form-control-base-border-color-default` | `--hds-form-control-border-color-default` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-base-border-color-hover` | `--hds-form-control-base-border-color-hover` | `--hds-form-control-border-color-hover` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-base-surface-color-default` | `--hds-form-control-base-surface-color-default` | `--hds-form-control-surface-color-default` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-disabled-border-color` | `--hds-form-control-disabled-border-color` | `--hds-form-control-border-color-disabled` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-disabled-foreground-color` | `--hds-form-control-disabled-foreground-color` | `--hds-form-control-foreground-color-disabled` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-disabled-surface-color` | `--hds-form-control-disabled-surface-color` | `--hds-form-control-surface-color-disabled` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-invalid-border-color-default` | `--hds-form-control-invalid-border-color-default` | `--hds-form-control-border-color-invalid` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-invalid-border-color-hover` | `--hds-form-control-invalid-border-color-hover` | `--hds-form-control-border-color-invalid-hover` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-readonly-border-color` | `--hds-form-control-readonly-border-color` | `--hds-form-control-border-color-readonly` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-readonly-foreground-color` | `--hds-form-control-readonly-foreground-color` | `--hds-form-control-foreground-color-readonly` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-readonly-surface-color` | `--hds-form-control-readonly-surface-color` | `--hds-form-control-surface-color-readonly` | `prefix-plus-renaming__form-elements` |
| `--token-form-indicator-optional-typography-font-size` | `--hds-form-indicator-optional-typography-font-size` | `--hds-form-indicator-typography-font-size` | `prefix-plus-renaming__form-elements` |
| `--token-form-indicator-optional-typography-line-height` | `--hds-form-indicator-optional-typography-line-height` | `--hds-form-indicator-typography-line-height` | `prefix-plus-renaming__form-elements` |
| `--token-form-toggle-base-surface-color-default` | `--hds-form-toggle-base-surface-color-default` | `--hds-form-toggle-surface-color-unchecked-default` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-base-foreground-color` | `--hds-form-control-foreground-color-default` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-base-foreground-value-color` | `--hds-form-control-base-foreground-color` | `--hds-form-control-foreground-color-default` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-checked-border-color-default` | `--hds-form-control-border-color-checked-default` | `--hds-form-control-boolean-border-color-checked-default` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-checked-border-color-hover` | `--hds-form-control-border-color-checked-hover` | `--hds-form-control-boolean-border-color-checked-hover` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-checked-surface-color-default` | `--hds-form-control-surface-color-checked-default` | `--hds-form-control-boolean-surface-color-checked-default` | `prefix-plus-renaming__form-elements` |
| `--token-form-control-checked-surface-color-hover` | `--hds-form-control-surface-color-checked-hover` | `--hds-form-control-boolean-surface-color-checked-hover` | `prefix-plus-renaming__form-elements` |
| — | `--hds-form-control-base-placeholder-foreground-color-default` | `--hds-form-control-placeholder-foreground-color-default` | `added` |
| — | `--hds-form-control-base-placeholder-foreground-color-disabled` | `--hds-form-control-placeholder-foreground-color-disabled` | `added` |
| — | `--hds-form-control-border-color-checked-disabled` | `--hds-form-control-boolean-border-color-checked-disabled` | `added` |
| — | `--hds-form-control-border-color-unchecked-default` | `--hds-form-control-boolean-border-color-unchecked-default` | `added` |
| — | `--hds-form-control-border-color-unchecked-disabled` | `--hds-form-control-boolean-border-color-unchecked-disabled` | `added` |
| — | `--hds-form-control-border-color-unchecked-hover` | `--hds-form-control-boolean-border-color-unchecked-hover` | `added` |
| — | `--hds-form-control-surface-color-checked-disabled` | `--hds-form-control-boolean-surface-color-checked-disabled` | `added` |
| — | `--hds-form-control-surface-color-unchecked-default` | `--hds-form-control-boolean-surface-color-unchecked-default` | `added` |
| — | `--hds-form-control-surface-color-unchecked-disabled` | `--hds-form-control-boolean-surface-color-unchecked-disabled` | `added` |
| — | `--hds-form-control-surface-color-unchecked-hover` | `--hds-form-control-boolean-surface-color-unchecked-hover` | `added` |
| — | `--hds-form-toggle-base-surface-color-checked-default` | `--hds-form-toggle-surface-color-checked-default` | `added` |
| — | `--hds-form-toggle-base-surface-color-checked-hover` | `--hds-form-toggle-surface-color-checked-hover` | `added` |
| — | `--hds-form-toggle-base-surface-color-disabled` | `--hds-form-toggle-surface-color-unchecked-disabled` | `added` |
| — | `--hds-form-toggle-handle-surface-color-default` | `--hds-form-toggle-thumb-surface-color-default` | `added` |
| — | `--hds-form-toggle-handle-surface-color-disabled` | `--hds-form-toggle-thumb-surface-color-disabled` | `added` |


## Follow-up (not automated)

- `update-changeset.mjs` — render the changeset from this map (PLAN-PART-2 §4).
- Consumer migration and the usage audit (PLAN-PART-2 §5).
- `token-diff.md` was frozen in Part 1 with a note that only its groupings were stale; its *pairs* are now stale too — update that header (PLAN-PART-2 §6).
- Dated entries in the README / HANDOVER / generated-plan docs (PLAN-PART-2 §6).
