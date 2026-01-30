## How to use this component

The Filter Bar component is used to apply and display filters to a data set. The component does not handle any filtering of the data itself, but provides a way for a user to apply filters, and a means for displaying any filters that have been applied.

To use this component, set the filter options available for a data set using the `FiltersDropdown` and `FilterGroup` contextual components. When filters are applied, the `@onFilter` callback provides a data object of the applied filters. To show which filters have been applied, pass a data object of the same structure to the `@filters` argument.

The Filter Bar is also available as a contextual component of the [Advanced Table](/components/table/advanced-table?tab=code#filtering).

[[code-snippets/filter-bar-basic]]

### Filters Dropdown

All filtering options are available via a dropdown in the Filter Bar. Inside the dropdown, each filter group is represented with its own tab. When a tab is selected, the filtering options available are visible and users can add filters for that group. By clicking the "Apply filters" or "Clear all filters" buttons in the dropdown footer, the user can apply the selected filters, or clear all that have been previously set.

Filtering options are passed to the Filter Bar through the `FiltersDropdown` and `FilterGroup` contextual components. In the `FilterGroup`, the `@key`, `@text`, and `@type` arguments are required.

- The `@key` argument sets the key for that filter group in the data object of the `onFilter` callback.
- The `@text` argument sets the text for tab label.
- The `@type` argument specifies the type of filtering available for the group.

View more details on [available filter types](#filter-types) below.

[[code-snippets/filter-bar-filters-dropdown]]

### Applying filters

A user can apply, update, or clear filters within the dropdown. The `@onFilter` callback is used to listen for and respond to changes to the filters.

The callback provides a data object of applied filters which come from a user's filter selections. This object can be used to run any filtering operations on a data set, and then be passed back into the `@filters` argument of the Filter Bar to show the applied filters.

Based on the applied filters passed to the `@filters` argument, dismissible [Tags](/components/tab) will be shown for each applied filter. When a Tag is dismissed, the `@onFilter` callback will be triggered, and that filter will be removed from the object.

[[code-snippets/filter-bar-basic]]

#### Live filtering

By default, the `@onFilter` callback is not triggered when a filter is added in the dropdown. Instead, the callback is triggered when the user confirms their filters with the "Apply filters" button, or clears them with the "Clear all filters" button.

If the `@isLiveFilter` argument is set to `true`, the `@onFilter` callback will be triggered as soon as a user adds a filter in the dropdown. If it is a selection-based filter, like a checkbox or radio button, the filtering would occur on selection. If it is an input-based filter, like a date or number, the filter would be applied when both inputs are correctly filled out.

[[code-snippets/filter-bar-live]]

### Filter types

The Filter Bar includes distinct filter groups to accommodate various data types.

#### Single-select and Multi-select

The `single-select` and `multi-select` filter types are used for filtering a list of items by one or multiple values. The options available for selection can be set using the `Radio` and `Checkbox` contextual components inside the `FilterGroup`.

If the `@searchEnabled` argument in the `FilterGroup` is set to `true`, the list of options can be searched through using a provided search input.

The dismissible filter tag will display the `label` for a given filter, and if the `label` is not provided it will display the `value`.

[[code-snippets/filter-bar-type-selection]]

[[code-snippets/filter-bar-type-selection-data execute=false]]

#### Numerical

The `numerical` filter type is used for any data which is numerical in nature. It provides options for all comparison operators including a `between` selector.

[[code-snippets/filter-bar-type-numerical]]

[[code-snippets/filter-bar-type-numerical-data execute=false]]

#### Date & time

There are filter types available for various date and time data through the `date`, `time`, and `datetime` filter types. All three types also support the `between` selector.

Dates and times are formatted in the applied filter tags using the [ember-intl](getting-started/for-engineers#internationalization) service.

[[code-snippets/filter-bar-type-date]]

[[code-snippets/filter-bar-type-date-data execute=false]]

#### Custom filtering

!!! Warning

**Consumer responsibility**

The accessibility compliance of any content used for a custom filter is the responsibility of the consumer. If a custom filter requires multiple form elements, it is recommended to use a `<fieldset>` element to group them.
!!!

For filtering support outside of the filter types supported above, an option for more customized filtering is available through the `generic` filter type, and the Generic contextual component inside the `FilterGroup`. The Generic contextual component provides an `updateFilter` argument function that can be used to trigger updates to the filter inside the dropdown.

The dismissible filter tag can be customized by setting `dismissTagText` on the filter. If this is not provided, the dismissible filter tag's text will function similarly to the `single-select` and `multi-select` filter types, where the `value` or `label` is displayed.

[[code-snippets/filter-bar-type-generic]]

[[code-snippets/filter-bar-type-generic-data execute=false]]

### Search

The Filter Bar provides a search input, which can be used for searching across multiple areas of a data set. If the `@hasSearch` argument is set to `true`, a search input will be shown next to the dropdown.

When the search input's `input` event is triggered, a filter of type `search` will be included in the data object in the `@onFilter` callback.

[[code-snippets/filter-bar-search]]

[[code-snippets/filter-bar-search-data execute=false]]

The search input's placeholder text is "Search" by default, but can be customized with the `@searchPlaceholder` argument.

[[code-snippets/filter-bar-search-placeholder]]

### Bulk actions

The Filter Bar provides an ActionsDropdown contextual component that can be used for bulk actions to perform on a data set, or for other purposes. All contextual components from the [Dropdown](/components/dropdown) are yielded to the consumer except for the ToggleButton.

[[code-snippets/filter-bar-actions-dropdown]]

The text of the ActionsDropdown defaults to "Actions", but can be customized with the `@toggleButtonText` argument. An icon can also be added with the `@toggleButtonIcon` argument.

[[code-snippets/filter-bar-actions-dropdown-custom]]

### Generic content

For more customization of the functionality in the Filter Bar, an ActionsGeneric contextual component is provided that can be used to pass in any other content.

[[code-snippets/filter-bar-generic-content]]

