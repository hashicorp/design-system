The Filter Bar is used to apply and display filters to a data set. It is most often used with the [Advanced Table](/components/table/advanced-table?tab=code#filtering), but is flexible enough to support the standard [Table](/components/table/table), lists, or a grid of cards.

!!! Callout

The Filter Bar is a successor to the [Filter pattern](/patterns/filter-patterns) and supports the vast majority of filtering experiences within HashiCorp applications out of the box. New experiences should use the Filter Bar directly, while already delivered features should consider migrating to the component.

If specific functionality or filtering methods don't meet your needs, please [contact the Design Systems Team](/about/support) so we can help.
!!!

## Usage

### When to use

- When displaying filters for a data set.
- As a replacement for the HDS [Filter pattern](/patterns/filter-patterns).

### When not to use

- For complex query builder features.

## Type

!!! Info

**Differences between Figma and code**

The `type` property is only available in Figma. The Ember component can be passed to the [Advanced Table](/components/table/advanced-table?tab=code#filtering) as a contextual component, or used on its own in which case the styling will adjust accordingly.
!!!

The Filter Bar supports two visual presentations, `attached` and `standalone`, to be used in different contexts and with different types of data sets.

### Attached

Use the `attached` variant with the [Advanced Table](/components/table/advanced-table) to clearly associate the Filter Bar with the rendered data set and the table.

![Example of an attached Filter Bar paired with a data set rendered in an Advanced Table](/assets/components/filter-bar/filter-bar-type-attached.png)

### Standalone

Use the `standalone` variant when a data set is rendered in formats other than the Advanced Table, e.g., a standard Table, list, or grid of cards.

![Example of a standalone Filter Bar paired with a data set rendered in cards](/assets/components/filter-bar/filter-bar-type-standalone.png)

## Applying Filters

Filters can be applied on a per-filter basis or via live filtering.

- **Per-filter:** filters are applied when the user confirms their selection with the "Apply filters" button in the dropdown. This is the most common method.
- **Live filtering:** filters are applied immediately upon selection.

## Applied filters

Applied filters are represented by a [Tag](/components/tag) displaying the filter parameter (the category or column the filter corresponds to) and the filter value (corresponding with the specific cell content).

![](/assets/components/filter-bar/filter-bar-tag-example.png)

The text rendered within the Tag uses a standardized format depending on the type of filter and the method:

- Single and multiple selection filters group the parameter and value using a colon; e.g., "Region: AWS (us-east)".
- Numerical filters group the parameter and value with an operator symbol; e.g., "Modules > 50".
- Date and time filters group the parameter and value with natural language; e.g., "Created before 12:00 PM".

![](/assets/components/filter-bar/filter-bar-tag-filter-methods.png)

For a full list of supported operators, visit the [specifications](/components/filter-bar?tab=specifications#value-input-operators) page.

The [Tag](/components/tag?tab=code#truncation) component truncates at roughly 20 characters.

### Expand & collapse

The Applied filters section can be expanded or collapsed to simplify the UI and bring focus to the data. This is especially helpful when many filters are applied or when the data set is complex.

![An example of the collapsed state of the Filter Bar](/assets/components/filter-bar/filter-bar-collapsed.png)

When no filters are applied, the applied filters section is collapsed by default and will display an empty state message when expanded.

![An example of the expanded Filter Bar with no filters applied and an empty state](/assets/components/filter-bar/filter-bar-expanded-empty-state.png)

When one or more filters are applied, the Filter Bar is expanded by default.

![An example of the expanded Filter Bar with several filters applied](/assets/components/filter-bar/filter-bar-expanded-with-filters.png)

### Custom applied filter text

If necessary, the default formatting within the Tag can be overridden with custom text. This can be useful if the label of the parameter is an irregular plural, if the parameter reads more naturally with certain punctuation or grammar, or for product-specific reasons.

## Clearing filters

All filters can be cleared in bulk using the "Clear All" button near the applied filters or in the dropdown footer. 

![](/assets/components/filter-bar/filter-bar-clear-all-filters.png)

![](/assets/components/filter-bar/filter-bar-dropdown-clear-all-filters.png)

Filters can also be cleared individually via the Tag's dismiss button.

![](/assets/components/filter-bar/filter-bar-clear-individual-filter.png)

When multiple filter values are selected for a single parameter or input fields define the filter, the "Clear selection" button in the dropdown deselects all values for that parameter. 

![](/assets/components/filter-bar/filter-bar-dropdown-clear-selection-filter.png)

![](/assets/components/filter-bar/filter-bar-dropdown-clear-filter-input.png)

## Search

Use the search input to apply a broad text filter across the entire data set.

![An example of the term "errored" searched for across the entire data set](/assets/components/filter-bar/filter-bar-search-filled.png)

## Bulk actions

Bulk actions, corresponding to our recommendations for [multi-select](/patterns/table-multi-select), can be used to perform actions across multiple results, such as editing, deleting, and selecting subsets of the data set.

![Example of bulk actions](/assets/components/filter-bar/filter-bar-bulk-actions.png)

## Generic content

Custom functionality can be added to or replace the Bulk action dropdown. We recommend limiting this to actions or information that directly tie back to the data set.

![Example of generic content](/assets/components/filter-bar/filter-bar-generic-content.png)

## Filter dropdown

The Filter Bar includes a complex dropdown menu that displays available filter parameters, the values within each parameter, support for numerical/date/time values, value ranges, and actions to apply and clear filters.

The Filter Dropdown is responsible for the selection and application of filters and is broken into two "panels":

- The left panel displays the list of parameters (categories) that can be filtered upon.
- The right panel displays a list of options or a group of input fields (for numerical, date, or time values).

![](/assets/components/filter-bar/filter-bar-dropdown-open.png)

### Multi-selection

Selecting multiple values from a list of options is one of the most common filtering methods. It's best suited for categorical data like statuses, but can also be used more generally to filter by a handful of text or string values.

![](/assets/components/filter-bar/filter-bar-dropdown-multi-selection.png)

### Single-selection

Selecting one value from a list of options is best suited for filter values that cannot be selected simultaneously, helping prevent an empty state.

![](/assets/components/filter-bar/filter-bar-dropdown-single-selection.png)

### Numbers, dates, times, and datetimes

By combining an operator (greater than, less than, before, etc.) with input fields, filtering by numerical values, dates, times, and datetimes can be handled. This filtering method is best suited for range-based filtering, i.e., filtering based on comparisons of values or ranges of values.

![](/assets/components/filter-bar/filter-bar-dropdown-numerical-filter.png)

![](/assets/components/filter-bar/filter-bar-dropdown-date-filter.png)

![](/assets/components/filter-bar/filter-bar-dropdown-time-filter.png)

![](/assets/components/filter-bar/filter-bar-dropdown-datetime-filter.png)

For a full list of supported operators, visit the [specifications](/components/filter-bar?tab=specifications#value-input-operators) page.

### Custom filtering

While the left panel should always display the list of parameters, the right panel can be customized to meet filtering requirements beyond the out-of-the-box methods.

![](/assets/components/filter-bar/filter-bar-dropdown-custom-filter-example.png)

### Search across filter values

Users can search across all values within a selected parameter. While search is relevant only for single- or multi-selection, it can be especially useful when there are many values or when a unique naming convention is used.

![](/assets/components/filter-bar/filter-bar-dropdown-search-values.png)

