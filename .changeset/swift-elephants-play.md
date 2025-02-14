---
"@hashicorp/design-system-components": minor
---

`AdvancedTable`: added an expand all button to `AdvancedTable`s with nested rows. Changed the structure of the component so now nested rows are always in the DOM, even when they are not visible.

To add the expand all button, add `isExpandable: true` to the desired column in the `@columns` argument.
