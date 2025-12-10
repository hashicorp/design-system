The Filter Bar is used to apply and display filters to a data set. It is most often used in conjunction with the [Advanced Table](/components/table/advanced-table), but is flexible enough to support different data sets and rendering methods such as in a list or grid of cards.

The Filter Bar comes paired with a complex dropdown menu that displays available filter parameters (a parameter is often the equivalent of a column in a table), values within each parameter, support for numerical/date/time values, ranges of values, and actions to apply and clear filters from the data set.

!!! Callout

While the Filter Bar underwent rigorous research and testing, this component is relatively complex. If specific functionality or the filtering methods don't meet your needs, please [contact the Design Systems Team](/about/support) so we can provide support.
!!!

## Usage

### When to use

- When displaying relevant filters and filters that have been applied to a data set.
- For common filter methods like multi-selection, single selection, numbers, dates, and times.
- As a direct replacement for the HDS [Filter patterns](/patterns/filter-patterns) guidance.

### When not to use

- For complex query builder features.

## Overlap with the Filter pattern guidance <!--Consider a different headline -->

The Filter Bar component is a successor to the [Filter patterns](/patterns/filter-patterns) guidance and supports the vast majority of filtering experiences within HashiCorp applications out of the box. New experiences should use the Filter Bar by default instead of the adhering to the pattern guidance, while already delivered features should consider migrating to the Filter Bar component.

## Type

The Filter Bar supports two visual presentations, `attached` and `standalone`, to be used in different contexts and with different types of data sets.

### Attached

Use the `attached` variant with the [Advanced Table](/components/table/advanced-table) and standard [Table](/components/table/table).

![Example of an attached Filter Bar paired with a data set rendered in an Advanced Table](/assets/components/filter-bar/filter-bar-type-attached.png)

### Standalone

Use the `standalone` variant when a data set is rendered in formats other than a table, e.g., a list or array of cards.

![Example of a standalone Filter Bar paired with a data set rendered in cards](/assets/components/filter-bar/filter-bar-type-standalone.png)

## Expand & collapse

The Filter Bar supports expanding and collapsing the applied filters section to help simplify the UI around the data set and bring focus to the data or content. This is especially helpful when many filters are applied or the data set is very complex.

![An example of the collapsed state of the Filter Bar](/assets/components/filter-bar/filter-bar-collapsed.png)

When no filters are applied, the Filter Bar is collapsed by default and displays an empty state message when expanded.

![An example of the expanded Filter Bar with no filters applied and an empty state](/assets/components/filter-bar/filter-bar-expanded-empty-state.png)

When one or more filters are applied the Filter Bar is expanded by default.

![An example of the expanded Filter Bar with several filters applied](/assets/components/filter-bar/filter-bar-expanded-with-filters.png)

## Search

Use the search input in the Filter Bar to apply a broad text/string-based filter across the entire data set.

![An example of the term "errored" searched for across the entire data set](/assets/components/filter-bar/filter-bar-search-filled.png)

## Bulk actions

The Filter Bar supports bulk actions corresponding with our recommendations for [multi-select](/patterns/table-multi-select) within a table, and can be used to perform actions across multiple results such as edit, delete, and different selection methods across the data set.

![Example of bulk actions](/assets/components/filter-bar/filter-bar-bulk-actions.png)

## Generic content

If custom functionality is needed for manipulating the view or contents of the data set, a generic block is grouped with the bulk actions in the Filter Bar. We aren't prescriptive about what can be passed to this generic block, but it should generally be limited to additional actions (as [Buttons](/components/button)) and [Dropdowns](/components/dropdown) with multiple grouped actions.

![Example of generic content](/assets/components/filter-bar/filter-bar-generic-content.png)

## Applied filters

Applied filters are represented by a [Tag](/components/tag) displaying the filter parameter (the category or column the filter corresponds to) and the filter value (corresponding with the specific cell content).

![](/assets/components/filter-bar/filter-bar-tag-example.png)

The text rendered within the Tag uses a standardized format depending on the type of filter and the method:

- Single and multiple selection filters group the parameter and value using a colon; e.g., "Region: AWS (us-east)".
- Numerical filters group the parameter and value with an operator symbol; e.g., "Modules > 50".
- Date and time filters group the parameter and value with natural language; e.g., "Creation time before 12:00 PM".

![](/assets/components/filter-bar/filter-bar-tag-filter-methods.png)

For a full list of supported operators visit the [specifications](/components/filter-bar?tab=specifications#value-input-operators) page.

### Custom applied filter text

If necessary, the default formatting within the Tag can be overidden with custom text. This can be useful if the label of the parameter is an irregular plural, if the parameter reads more naturally with certain punctuation or grammar, or for product-specific reasons.

<!-- @dylan could you help me out a bit with this? -->

<!-- Should something be included about truncation? -->

## Filter dropdown

The Filter Dropdown is responsible for the selection and application of filters and is broken two "panels":

- The left panel displays the list of parameters (categories) that can be filtered upon.
- The right panel conditionally displays either a list of options, or a grouping of input fields when filtering by a numerical, date, or time value.

![](/assets/components/filter-bar/filter-bar-dropdown-open.png)

Which filtering method to use depends on the data type and context. In the Figma component, select the `type` from the nested FilterValue component. In Ember, pass the filter type and method to in the configuration.

### Multi-selection

Multi-selection supports the selection of multiple values in a list of options and is the most common method of filtering. It is suited for categorical data like statuses and IDs, but can also be used more generally to filter by a handful of similar values.

![](/assets/components/filter-bar/filter-bar-dropdown-multi-selection.png)

### Single-selection

Single selection supports a _mutually exclusive_ selection using radio buttons; e.g., the selection of a value where more than one selection will logically result in an empty state, therefore, only value can be selected.

![](/assets/components/filter-bar/filter-bar-dropdown-single-selection.png)

### Numbers, dates, and times

Filtering by numerical values, dates, and times is handled through the combination of an operator (greater than, less than, before, etc.) and an input field or grouping of input fields. This filtering method is best suited for range-based filtering; e.g., filtering by results relationally compared to the value or range of values.

![](/assets/components/filter-bar/filter-bar-dropdown-numerical-filter.png)

![](/assets/components/filter-bar/filter-bar-dropdown-date-filter.png)

![](/assets/components/filter-bar/filter-bar-dropdown-time-filter.png)

For a full list of supported operators visit the [specifications](/components/filter-bar?tab=specifications#value-input-operators) page.

### Search across filter values

Use the integrated search (`hasSearch`) in the values panel to allow users to search by string across all values within a selected parameter. This can be useful if there are many filter values or if a unique naming convention is used to artificially group results together.

![](/assets/components/filter-bar/filter-bar-dropdown-search-values.png)

## Applying Filters

Depending on how the data set is fetched and updated, the Filter Bar supports different methods of applying filters:

- **Per-filter:** selected filters are applied when the user confirms their selection with the "Apply filters" submit button. This is the most common method and generally requires a database or API call to update the data set with the corresponding filter parameters.
- **Live filtering:** filters are applied immediately upon selection. This method generally requires updating the data set on the client.

<!-- @dylan I think I have a reasonable outline for this section, but could you double check it? -->

## Clearing filters

Filters can be cleared either in bulk or individually from the Filter Bar or Dropdown.

### Filter Bar

Clear all filters with the Button in the Filter Bar.

![](/assets/components/filter-bar/filter-bar-clear-all-filters.png)

Clear filters individually via the dismiss button of the Tag.

![](/assets/components/filter-bar/filter-bar-clear-individual-filter.png)

### Filter Dropdown

Clear all filters via the Button in the footer of the Dropdown.

![](/assets/components/filter-bar/filter-bar-dropdown-clear-all-filters.png)

Deselect all filter values within a parameter with the "Clear selection" Button, then confirm the changes with the "Apply filters" Button in the footer.

![](/assets/components/filter-bar/filter-bar-dropdown-clear-selection-filter.png)

Clear filter input fields with the "Clear filter" Button, then apply the changes with the "Apply filters" Button in the footer.

![](/assets/components/filter-bar/filter-bar-dropdown-clear-filter-input.png)

## Empty state

An empty state occurs if the filters applied don't match any results in the data set. This is supported out of the box in the [Advanced Table](/components/table/advanced-table/) and will display an informative message about the empty state and prompt users to either adjust the applied filters or clear all of them.

![](/assets/components/filter-bar/filter-bar-empty-state.png)

If the data set is being rendered in a list or method outside of what is directly supported by HDS, use the [Application State](/components/application-state) to communicate the empty state result from the applied filters.

