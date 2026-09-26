---
"@hashicorp/design-system-components": patch
---

<!-- START components/table/table -->
`Table` - Fixed an error thrown when using `@model` and `@columns` without providing a `@sortBy` argument. The component was producing a sort key of `"undefined:asc"`, which caused errors on strict model types.
<!-- END -->

<!-- START components/table/advanced-table -->
`AdvancedTable` - Fixed an error thrown when using `@model` and `@columns` without providing a `@sortBy` argument. The component was producing a sort key of `"undefined:asc"`, which caused errors on strict model types.
<!-- END -->

