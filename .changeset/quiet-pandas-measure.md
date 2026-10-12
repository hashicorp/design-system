---
"@hashicorp/design-system-components": patch
---

<!-- START components/advanced-table -->
`AdvancedTable` - Fixed a race condition where the table's internal measurement pass was not tracked by Ember's test waiters, so `settled()` could resolve before the layout reached its steady state.
<!-- END -->
