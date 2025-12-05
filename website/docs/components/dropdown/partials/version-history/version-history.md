## 5.1.0

Updated component signature for `ListItemCheckbox` and `ListItemRadio` to have an optional `@id` argument.


Optimized CSS used to apply dark theme styles within `AppHeader` and `SideNav`


## 5.0.0

Removed the deprecated `@text` argument from the `HdsDropdownListItemInteractive` component.

To migrate, run the codemod `v4/dropdown-list-item-interactive` (see [readme file](https://github.com/hashicorp/design-system/tree/main/packages/codemods/transforms/v4/dropdown-list-item-interactive))


Added assertion to the `ToggleIcon` to provide improved developer guidance for the `hasChevron` attribute


## 4.23.0

Updated the type of the `close` callback to allow an optional event to be passed and to make it always returned.


Removed CSS declaration for pseudo element in disabled state


## 4.19.0

Updated Radio and Checkbox list items font weight to match other list items.

## 4.16.0

Implemented `aria-controls` in `Dropdown::Toggle::Button` for a11y improvements with toggled content from `PopoverPrimitive`

Fixed `z-index` bug which caused the focus ring of the toggle icon to not be visible when the component was nested in a container.

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
