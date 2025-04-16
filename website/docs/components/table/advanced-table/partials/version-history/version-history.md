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

