---
'@hashicorp/design-system-components': minor
---

<!-- START components/table/advanced-table -->

`AdvancedTable` - Fixed typing for sticky first-column cells by exposing `isStickyColumn` in the yielded table-cell API and by passing an explicit `parentId` value when rendering row header cells.

<!-- END -->

<!-- START components/form/indicator -->

`Form::Indicator` - Fixed invocation of `HdsTextBody` to use named arguments, which prevented incorrect argument forwarding.

<!-- END -->

<!-- START components/form/masked-input -->

`Form::MaskedInput` - Fixed element typing to match the underlying control element (`input` or `textarea`) instead of a generic `HTMLElement`.

<!-- END -->

<!-- START components/form/textarea -->

`Form::Textarea` - Fixed element typing to `HTMLTextAreaElement` for stricter and more accurate Glint checks.

<!-- END -->

<!-- START components/table/th-sort -->

`Table::ThSort` - Fixed element typing to `HTMLTableCellElement` to reflect the actual rendered table-cell element.

<!-- END -->
