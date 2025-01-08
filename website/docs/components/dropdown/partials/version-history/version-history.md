## 4.15.0

Fixed an issue with the `ToggleIcon` to make the focus ring visible on mouse click

Fixed `ResizeObserver`-related errors in tests

## 4.14.0

Added `@matchToggleWidth` argument

## 4.13.0

Fixed content being preserved in the DOM when closed

Removed the `isOpen` yielded argument

Added `@preserveContentInDom` to optionally control rendering of the content

Fixed dropdown content not being preserved when interacted with

Updated the color of the text and icons in the selected state checkmark list item to match the styling of the ListItems (`Radio` and `Checkbox`)

## 4.12.0

Added the `[D].isOpen` yielded state, now the content of the Dropdown can be conditionally rendered when it is open.

## 4.10.0

The component now yields the `Hds::Badge` component as a contextual component.

Added `@enableCollisionDetection` and `@isOpen` arguments

Replaced the underlying `MenuPrimitive` with [`PopoverPrimitive`](/utilities/popover-primitive)

Deprecated the `@text` argument. Users are instructed to put text in the yielded block instead. You can automate this migration using the codemod `v4/dropdown-list-item-interactive` (see [readme file](https://github.com/hashicorp/design-system/tree/main/packages/codemods/transforms/v4/dropdown-list-item-interactive)).
