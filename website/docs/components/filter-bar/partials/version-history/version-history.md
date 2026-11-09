## 7.1.0

Added new `@hasLiveSearch` argument and set search input autocomplete to off.


Added translations to the applied search filter label and type-specific `aria-label`s for value, start, and end inputs in `Date`. Localized translations for the date and numerical filters in the applied filter list. Corrected translation keys in `AppliedFilters` and `Numerical`.

## 7.0.0

Changed the component CSS custom property prefix from `--filter-bar` to `--hds-var-filter-bar`.

- `--filter-bar-filters-dropdown-height` → `--hds-var-filter-bar-filters-dropdown-height`

Updated toggle `@color` from `secondary` to `secondary-muted` in `ActionsDropdown` and `FiltersDropdown` and applied filters button


## 6.5.0

Added support for `ActionsGeneric` wrapping to new line


## 6.4.0

Added a `searchAriaLabel` feature to expose the value of the search input aria-label, allowing the value to be customized


## 6.1.0

Added support for an array of values for the `generic` filter type data


Added `@onClear` argument to `FilterGroup` contextual component


Added `@onFocusOut` argument to the `FiltersDropdown` to help manage focus for dynamic dropdown content and prevent the dropdown from closing when content changes


Converted component to gts format.


## 6.0.0

Added `FilterBar` component and related sub-components


