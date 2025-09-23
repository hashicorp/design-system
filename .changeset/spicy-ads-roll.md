---
"@hashicorp/design-system-components": major
---

<!-- START components/table/advanced-table -->
`AdvancedTable` - Added support for column reordering.
- Added `@hasReorderableColumns` argument. When set to `true`, enables column reordering.
- Added optional `@columnOrder` argument for setting the initial order of columns by their keys.
- Added optional `@onColumnReorder` argument which accepts a callback function that is called when reordering is completed.
- Added optional `@reorderedMessageText` which overrides the default message text that is rendered in the table caption when a column is reordered.
<!-- END -->
