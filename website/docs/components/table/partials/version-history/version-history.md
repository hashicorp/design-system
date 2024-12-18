## 4.15.0

`Table` - Exposed the index of the `@each` loop over the `@model` as `rowIndex`

## 4.11.0

### Updated

`Hds::Table`

- Added `@selectableColumnKey` argument which enables sorting by row selection state and specifies the corresponding selection state key.

`Hds::Table::Tr`

- Added `@selectableColumnKey` argument which enables sorting by row selection state and specifies the corresponding selection state key.
- Added `@sortBySelectedOrder` argument which determines the state of the sort button in the selected item column.
- Added `@onClickSortBySelected` argument which is the callback for the sort button in the selected item column.

`Hds::Table::ThSelectable`

- Added `@onClickSortBySelected` argument which is the callback for the sort button in the selected item column.
- Added `@sortBySelectedOrder` argument which determines the state of the sort button in the selected item column.

## 4.10.0

Converted component and sub-components to TypeScript.
