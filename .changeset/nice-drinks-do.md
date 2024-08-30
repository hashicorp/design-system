---
"@hashicorp/design-system-codemods": minor
"@hashicorp/design-system-components": minor
---

`Dropdown::ListItem::Interactive`
- Adds a yielded block.
- Yields the `Hds::Badge` component.
- Deprecates the `@text` argument.

New codemod: `v4/dropdown-list-item-interactive`
- Converts `Dropdown::ListItem::Interactive` `@text` arguments to content within a yielded block.

