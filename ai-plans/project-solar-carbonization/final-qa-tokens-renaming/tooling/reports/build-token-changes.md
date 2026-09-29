# Generation-2 token rename map

- Generated: 2026-09-29T18:29:46.719Z
- Source: `ai-plans/project-solar-carbonization/tokens-qa/token-changes.md` (sha256 `c4d94ee1df73…`)
- After ref: `ec38d38e10b1be1e11d3e474863c210b329a1fa6` _(working tree)_ — plan update
- Canonical tokens in `packages/tokens/src`: **1046**
- `meta.validated`: **true**

## Summary

| Metric | Count |
| --- | --- |
| Renamed | 34 |
| Added | 5 |
| Removed | 5 |
| Canonical tokens (after) | 1046 |


## Verification gates

| Gate | Result | Detail |
| --- | --- | --- |
| V1 Name shape | ✅ pass | all names are lowercase kebab-case |
| V2 No duplicates | ✅ pass | none |
| V3 No self-maps | ✅ pass | none |
| V4 No rename chains | ✅ pass | none |
| V5 Sections disjoint | ✅ pass | none |
| V6 Old names are gone | ✅ pass | no renamed/removed name survives in packages/tokens/src |
| V7 New names exist | ✅ pass | every rename target and added token exists in packages/tokens/src |
| V8 Completeness (advisory) | ✅ pass | implied pre-gen-2 inventory (1046) matches the generation-1 map exactly |


## Renamed tokens

| Before | After |
| --- | --- |
| `--hds-form-control-base-border-color-default` | `--hds-form-control-border-color-default` |
| `--hds-form-control-base-border-color-hover` | `--hds-form-control-border-color-hover` |
| `--hds-form-control-base-foreground-color` | `--hds-form-control-foreground-color-default` |
| `--hds-form-control-base-placeholder-foreground-color-default` | `--hds-form-control-placeholder-foreground-color-default` |
| `--hds-form-control-base-placeholder-foreground-color-disabled` | `--hds-form-control-placeholder-foreground-color-disabled` |
| `--hds-form-control-base-surface-color-default` | `--hds-form-control-surface-color-default` |
| `--hds-form-control-border-color-checked-default` | `--hds-form-control-boolean-border-color-checked-default` |
| `--hds-form-control-border-color-checked-disabled` | `--hds-form-control-boolean-border-color-checked-disabled` |
| `--hds-form-control-border-color-checked-hover` | `--hds-form-control-boolean-border-color-checked-hover` |
| `--hds-form-control-border-color-unchecked-default` | `--hds-form-control-boolean-border-color-unchecked-default` |
| `--hds-form-control-border-color-unchecked-disabled` | `--hds-form-control-boolean-border-color-unchecked-disabled` |
| `--hds-form-control-border-color-unchecked-hover` | `--hds-form-control-boolean-border-color-unchecked-hover` |
| `--hds-form-control-disabled-border-color` | `--hds-form-control-border-color-disabled` |
| `--hds-form-control-disabled-foreground-color` | `--hds-form-control-foreground-color-disabled` |
| `--hds-form-control-disabled-surface-color` | `--hds-form-control-surface-color-disabled` |
| `--hds-form-control-invalid-border-color-default` | `--hds-form-control-border-color-invalid` |
| `--hds-form-control-invalid-border-color-hover` | `--hds-form-control-border-color-invalid-hover` |
| `--hds-form-control-readonly-border-color` | `--hds-form-control-border-color-readonly` |
| `--hds-form-control-readonly-foreground-color` | `--hds-form-control-foreground-color-readonly` |
| `--hds-form-control-readonly-surface-color` | `--hds-form-control-surface-color-readonly` |
| `--hds-form-control-surface-color-checked-default` | `--hds-form-control-boolean-surface-color-checked-default` |
| `--hds-form-control-surface-color-checked-disabled` | `--hds-form-control-boolean-surface-color-checked-disabled` |
| `--hds-form-control-surface-color-checked-hover` | `--hds-form-control-boolean-surface-color-checked-hover` |
| `--hds-form-control-surface-color-unchecked-default` | `--hds-form-control-boolean-surface-color-unchecked-default` |
| `--hds-form-control-surface-color-unchecked-disabled` | `--hds-form-control-boolean-surface-color-unchecked-disabled` |
| `--hds-form-control-surface-color-unchecked-hover` | `--hds-form-control-boolean-surface-color-unchecked-hover` |
| `--hds-form-indicator-optional-typography-font-size` | `--hds-form-indicator-typography-font-size` |
| `--hds-form-indicator-optional-typography-line-height` | `--hds-form-indicator-typography-line-height` |
| `--hds-form-toggle-base-surface-color-checked-default` | `--hds-form-toggle-surface-color-checked-default` |
| `--hds-form-toggle-base-surface-color-checked-hover` | `--hds-form-toggle-surface-color-checked-hover` |
| `--hds-form-toggle-base-surface-color-default` | `--hds-form-toggle-surface-color-unchecked-default` |
| `--hds-form-toggle-base-surface-color-disabled` | `--hds-form-toggle-surface-color-unchecked-disabled` |
| `--hds-form-toggle-handle-surface-color-default` | `--hds-form-toggle-thumb-surface-color-default` |
| `--hds-form-toggle-handle-surface-color-disabled` | `--hds-form-toggle-thumb-surface-color-disabled` |


## Added tokens

| Token |
| --- |
| `--hds-form-label-inline-typography-line-height` |
| `--hds-form-radio-border-color-checked-disabled` |
| `--hds-form-super-select-option-list-after-options-surface-color` |
| `--hds-form-super-select-option-surface-color-checked-hover` |
| `--hds-form-super-select-option-title-foreground-color` |


## Removed tokens

| Token |
| --- |
| `--hds-form-control-base-surface-color-hover` |
| `--hds-form-control-foreground-color-checked` |
| `--hds-form-radio-card-border-radius` |
| `--hds-form-radio-card-control-wrapper-padding` |
| `--hds-form-toggle-border-radius` |

