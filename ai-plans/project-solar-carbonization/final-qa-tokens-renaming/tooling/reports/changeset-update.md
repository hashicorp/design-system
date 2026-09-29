# Changeset update — `carbonization-design-tokens.md`

- Generated: 2026-09-29T18:33:13.026Z
- Changeset: `.changeset/carbonization-design-tokens.md`
- Generation-2 map: `ai-plans/project-solar-carbonization/tokens-qa/token-changes.md` → sha256 `c4d94ee1df73…`

## ⚠️ Manual follow-up

1. **Intro bullet list.** The bullets describe the naming conventions and must describe the **final** convention, with no trace of an intermediate state. Amend or delete any bullet that no longer holds — never add a second bullet describing "and then we renamed it again".
2. **Sibling changesets.** Grep `.changeset/*.md` for `--hds-[a-z]` and check any hit against the map. `carbonization-components-css-vars.md` should only contain `--hds-var-*` runtime variables, which are not design tokens.
3. `packages/*/CHANGELOG.md` is released history — never edit.

## Summary

| Table | Rows before | Rows after | Rewritten | Deleted / promoted | Inserted |
| --- | --- | --- | --- | --- | --- |
| Renamed (R) | 424 | 420 | 20 | 4 promoted to Removed | 0 |
| Added (A) | 626 | 630 | 15 | 1 | 5 |
| Removed (D) | 18 | 22 | 0 | — | 4 |


## Verification gates

| Gate | Result | Detail |
| --- | --- | --- |
| C0 Agrees with shipping map | ✅ pass | R 420/420, A 630/630, D 22/22 — exact match |
| C1 Historical column frozen | ✅ pass | 442 `--token-*` names before, 442 after — identical multiset |
| C2 No leftovers | ✅ pass | none |
| C3 A / R-after disjoint | ✅ pass | none |
| C4 No duplicate rows | ✅ pass | none |
| C5 Prefixes correct | ✅ pass | none |
| C6 Structure intact | ✅ pass | frontmatter, both `Renamed tokens:` headings and the CSS-helper table are present |
| C7 CSS-helper section untouched | ✅ pass | byte-identical |
| C8 Focus-ring helpers unaffected | ✅ pass | no `--hds-focus-ring-box-shadow-*` token was renamed or removed |
| C9 Row order mirrors the map | ✅ pass | R, A and D follow the map’s category order |


## Row-level changes

### Renamed table — target rewritten

| Historical token | Was | Now |
| --- | --- | --- |
| `--token-form-control-base-border-color-default` | `--hds-form-control-base-border-color-default` | `--hds-form-control-border-color-default` |
| `--token-form-control-base-border-color-hover` | `--hds-form-control-base-border-color-hover` | `--hds-form-control-border-color-hover` |
| `--token-form-control-base-surface-color-default` | `--hds-form-control-base-surface-color-default` | `--hds-form-control-surface-color-default` |
| `--token-form-control-disabled-border-color` | `--hds-form-control-disabled-border-color` | `--hds-form-control-border-color-disabled` |
| `--token-form-control-disabled-foreground-color` | `--hds-form-control-disabled-foreground-color` | `--hds-form-control-foreground-color-disabled` |
| `--token-form-control-disabled-surface-color` | `--hds-form-control-disabled-surface-color` | `--hds-form-control-surface-color-disabled` |
| `--token-form-control-invalid-border-color-default` | `--hds-form-control-invalid-border-color-default` | `--hds-form-control-border-color-invalid` |
| `--token-form-control-invalid-border-color-hover` | `--hds-form-control-invalid-border-color-hover` | `--hds-form-control-border-color-invalid-hover` |
| `--token-form-control-readonly-border-color` | `--hds-form-control-readonly-border-color` | `--hds-form-control-border-color-readonly` |
| `--token-form-control-readonly-foreground-color` | `--hds-form-control-readonly-foreground-color` | `--hds-form-control-foreground-color-readonly` |
| `--token-form-control-readonly-surface-color` | `--hds-form-control-readonly-surface-color` | `--hds-form-control-surface-color-readonly` |
| `--token-form-indicator-optional-typography-font-size` | `--hds-form-indicator-optional-typography-font-size` | `--hds-form-indicator-typography-font-size` |
| `--token-form-indicator-optional-typography-line-height` | `--hds-form-indicator-optional-typography-line-height` | `--hds-form-indicator-typography-line-height` |
| `--token-form-toggle-base-surface-color-default` | `--hds-form-toggle-base-surface-color-default` | `--hds-form-toggle-surface-color-unchecked-default` |
| `--token-form-control-checked-border-color-default` | `--hds-form-control-border-color-checked-default` | `--hds-form-control-boolean-border-color-checked-default` |
| `--token-form-control-checked-border-color-hover` | `--hds-form-control-border-color-checked-hover` | `--hds-form-control-boolean-border-color-checked-hover` |
| `--token-form-control-checked-surface-color-default` | `--hds-form-control-surface-color-checked-default` | `--hds-form-control-boolean-surface-color-checked-default` |
| `--token-form-control-checked-surface-color-hover` | `--hds-form-control-surface-color-checked-hover` | `--hds-form-control-boolean-surface-color-checked-hover` |
| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-base-foreground-color` | `--hds-form-control-foreground-color-default` |
| `--token-form-control-base-foreground-value-color` | `--hds-form-control-base-foreground-color` | `--hds-form-control-foreground-color-default` |


### Renamed table → Removed table — successor deleted

| Historical token | Lost successor |
| --- | --- |
| `--token-form-control-base-surface-color-hover` | `--hds-form-control-base-surface-color-hover` |
| `--token-form-toggle-border-radius` | `--hds-form-toggle-border-radius` |
| `--token-form-radiocard-border-radius` | `--hds-form-radio-card-border-radius` |
| `--token-form-control-checked-foreground-color` | `--hds-form-control-foreground-color-checked` |


### Added table — rewritten

| Was | Now |
| --- | --- |
| `--hds-form-control-base-placeholder-foreground-color-default` | `--hds-form-control-placeholder-foreground-color-default` |
| `--hds-form-control-base-placeholder-foreground-color-disabled` | `--hds-form-control-placeholder-foreground-color-disabled` |
| `--hds-form-control-border-color-checked-disabled` | `--hds-form-control-boolean-border-color-checked-disabled` |
| `--hds-form-control-border-color-unchecked-default` | `--hds-form-control-boolean-border-color-unchecked-default` |
| `--hds-form-control-border-color-unchecked-disabled` | `--hds-form-control-boolean-border-color-unchecked-disabled` |
| `--hds-form-control-border-color-unchecked-hover` | `--hds-form-control-boolean-border-color-unchecked-hover` |
| `--hds-form-control-surface-color-checked-disabled` | `--hds-form-control-boolean-surface-color-checked-disabled` |
| `--hds-form-control-surface-color-unchecked-default` | `--hds-form-control-boolean-surface-color-unchecked-default` |
| `--hds-form-control-surface-color-unchecked-disabled` | `--hds-form-control-boolean-surface-color-unchecked-disabled` |
| `--hds-form-control-surface-color-unchecked-hover` | `--hds-form-control-boolean-surface-color-unchecked-hover` |
| `--hds-form-toggle-base-surface-color-checked-default` | `--hds-form-toggle-surface-color-checked-default` |
| `--hds-form-toggle-base-surface-color-checked-hover` | `--hds-form-toggle-surface-color-checked-hover` |
| `--hds-form-toggle-base-surface-color-disabled` | `--hds-form-toggle-surface-color-unchecked-disabled` |
| `--hds-form-toggle-handle-surface-color-default` | `--hds-form-toggle-thumb-surface-color-default` |
| `--hds-form-toggle-handle-surface-color-disabled` | `--hds-form-toggle-thumb-surface-color-disabled` |


### Added table — deleted

| Token |
| --- |
| `--hds-form-radio-card-control-wrapper-padding` |


### Added table — inserted

| Token |
| --- |
| `--hds-form-label-inline-typography-line-height` |
| `--hds-form-radio-border-color-checked-disabled` |
| `--hds-form-super-select-option-list-after-options-surface-color` |
| `--hds-form-super-select-option-surface-color-checked-hover` |
| `--hds-form-super-select-option-title-foreground-color` |

