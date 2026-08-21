---
"@hashicorp/design-system-components": minor
---

<!-- START components/table/advanced-table -->
`AdvancedTable` - Added new value `secondary-muted` for the `@color` argument in `ThContextMenu`.
- `secondary-muted` is identical to `secondary` for HDS themes, but differs for Carbon themes
<!-- END -->

<!-- START components/button -->
`Button` - Added new value `secondary-muted` for the `@color` argument
<!-- END -->

<!-- START components/code-block -->
`CodeBlock` - Updated footer button `@color` from `secondary` to `secondary-muted`
<!-- END -->

<!-- START components/dropdown -->
`Dropdown` - Added new value `secondary-muted` for the `@color` argument in `ToggleButton` and `ToggleIcon`
<!-- END -->

<!-- START components/filter-bar -->
`FilterBar` - Updated toggle `@color` from `secondary` to `secondary-muted` in `ActionsDropdown` and `FiltersDropdown` and applied filters button
<!-- END -->

<!-- START components/form/super-select -->
`SuperSelect` - Updated `AfterOptions` show and clear button `@color` from `secondary` to `secondary-muted`
<!-- END -->

<!-- START components/code-editor -->
`CodeEditor` - Removed dark theme modifiers and replaced them with theme agnostic versions
- Removed the `hdsDarkHighlightStyle` style modifier and replaced it with a theme-agnostic `hdsHighlightStyle` modifier
- Removed the `hdsDark` style modifier and replaced it with a theme-agnostic `hdsTheme` modifier
<!-- END -->

<!-- START components/form/primitives -->
Added the `hds-form-control-border` and `hds-form-control-invalid-outline` sass mixins
<!-- END -->

<!-- START components/form/radio-card -->
`RadioCard` - Updated `RadioCardDescription` element from `HdsTextBody` to a `HTMLSpanElement`
<!-- END -->

<!-- START components/form/radio-card -->
`RadioCard` - Updated `RadioCardLabel` element from `HdsTextDisplay` to a `HTMLSpanElement`
<!-- END -->

<!-- START components/table/advanced-table -->
`AdvancedTable` - Removed `hds-typography-body-200` and `hds-font-weight-semibold` classes from `hds-advanced-table__th-content-text` element in `AdvancedTableTh`
<!-- END -->

<!-- START components/table/table -->
`Table` - Removed `hds-typography-body-200` and `hds-font-weight-regular` classes from `hds-table__td` element in `TableTd`
<!-- END -->

<!-- START components/table/table -->
`Table` - Removed `hds-typography-body-200` and `hds-font-weight-semibold` classes from `hds-table__td` element in `TableTh` and `TableTbSort`
<!-- END -->

<!-- START components/tooltip -->
`Tooltip` - Replaced custom arrow with `hds-tooltip-pointer` class with native popover arrow
<!-- END -->

<!-- START utilities/dialog-primitive -->
`DialogPrimitive` - Updated internal text element from `HdsTextBody` to a `HTMLDivElement`
<!-- END -->

Removed the `hds-interactive-dark-theme` mixin

Updated the `hds-focus-ring-basic` sass mixin
Added the `hds-focus-ring-advanced` sass mixin
Removed the `hds-focus-ring-with-pseudo-element` and `hds-focus-ring-with-pseudo-element-focus-always-visible` sass mixins