---
"@hashicorp/design-system-components": patch
---

<!-- START components/table/advanced-table -->
`AdvancedTable` - Fixed issue where keyboard focus was lost in cases where the table re-renders. The current cell now stays focused after sorting, expanding or collapsing rows, and when `@columns` is replaced with new objects that have the same `key`s, instead of jumping back to the first header cell.
<!-- END -->

<!-- START utilities/composite -->
`Composite` - Changed items to update in place when their `disabled` argument re-evaluates, instead of registering again, so the current item is retained. When the current item is removed, the item at the same position becomes the current item (instead of the first item), and receives focus, if focus was inside the composite.
<!-- END -->
