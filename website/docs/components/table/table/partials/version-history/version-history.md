## 4.22.0

Updated `@isSelected` argument type from `false` to `boolean`

Translated template strings

## 4.17.1

Removed unused `updateAriaLabel` function and event listener

## 4.16.0

Updated the visual design of `Table` cells by adding borders, making them more distinguishable when spanning rows or columns.

Fixed the `aria-labels` for select row and select all checkboxes so they do not change based on the state of the checkbox.

## 4.15.0

Exposed the index of the `@each` loop over the `@model` as `rowIndex`

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
