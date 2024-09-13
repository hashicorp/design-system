---
"@hashicorp/design-system-components": minor
---

`Hds::Table`
- Added `@selectableColumnKey` argument which enables sorting by row selection state and specifies the corresponding selection state key.

`Hds::Table::Tr`
- Added `@selectableColumnKey` argument which enables sorting by row selection state and specifies the corresponding selection state key.
- Added `@sortBySelectedOrder` (`undefined` | `asc` | `desc`) argument which determines the state of the sort button in the selected item column.
- Added `@onClickSortBySelected` argument which is the callback for the sort button in the selected item column.

`Hds::Table::ThSelectable`
- Added `@onClickSortBySelected` argument which is the callback for the sort button in the selected item column.
- Added `@sortOrder` (`undefined` | `asc` | `desc`) argument which determines the state of the sort button in the selected item column.