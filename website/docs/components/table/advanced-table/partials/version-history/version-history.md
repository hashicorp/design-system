## 4.24.0

Added support for column reordering.

- Added `@hasReorderableColumns` argument. When set to `true`, enables column reordering.
- Added optional `@columnOrder` argument for setting the initial order of columns by their keys.
- Added optional `@onColumnReorder` argument which accepts a callback function that is called when reordering is completed.
- Added optional `@reorderedMessageText` which overrides the default message text that is rendered in the table caption when a column is reordered.

## 4.23.0

Added features and fixed issues for column pinning including:

- Added support for pinning first column in context menu
- Translated template strings in context menu
- Fixed style for scroll indicator when first column is sticky and has a px width

Fixed bug with automatic column resizing and scroll-shadow placement.


simplified `AdvancedTable::Tr` type signature so the `@selectionKey` argument is not incorrectly marked as required.


## 4.22.1

Fixed styles for right and center aligned cells.


## 4.22.0

Translated template strings. Removed extraneous screen-reader-only text.


Updated `@isSelected` argument type from `false` to `boolean`


## 4.21.1

Removed `ember-math-helpers` dev dependency

Made the `@hasResizableColumns` argument optional for the `ThSort` component.

## 4.21.0

Added `hasResizableColumns` argument. When `true`, allows the table's columns to be resized with both a click-and-drag and a keyboard interface.

## 4.20.1

Fixed a bug that prevented the `model` from updating when the argument changes

## 4.20.0

Added `@maxHeight` argument, which sets the max height of the Advanced Table and automatically adds a sticky header to it. Also updated the container styles to constrain the Advanced Table width to the parent's width.

## 4.18.2

Improved accessibility by removing usage of `aria-expanded="mixed"` and moving the caption outside of the element with `role="grid"`.

Fixed styling issues with the sticky column and scroll indicators.

## 4.18.1

Added `@hasStickyFirstColumn` argument and shadows to indicate to users that it is possible to scroll.

Added an expand all button to `AdvancedTable`s with nested rows and changed the structure of the component so now nested rows are always in the DOM, even when they are not visible. To add the expand all button, add `isExpandable: true` to the desired column in the `@columns` argument.

Refactored component to use a more declarative style

Always set the select checkbox column width to `min-content` so it does not grow when the `AdvancedTable` is narrower than the container

Updated the icons used in `th-button-expand` component to match designs.

## 4.17.1

Refactored keyboard navigation to a new modifier `hds-advanced-table-cell` for reusability, and disabled default behavior for arrow keys in focused cells.

## 4.16.0

Added `AdvancedTable` component and related sub-components
