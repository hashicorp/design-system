## Anatomy

### Filter Bar

![](/assets/components/filter-bar/filter-bar-anatomy.png)

| Element          | Usage                  |
|------------------|------------------------|
| Collapse/expand | Required; Toggles open and closed the applied filters. |
| Filter toggle button | Required; Toggles open and closed the Filter Dropdown. |
| Search | Optional; Searches based on string matching across the entire data set. |
| Generic content | Optional |
| Bulk actions | Optional; Supports performing bulk actions on the data set. |
| Applied Filters List | Required; Displays the filters that have been applied to the data set, or an empty state. |
| Applied Filter Tag | Required; Displays the filter as `Parameter: Value` within an HDS [Tag](/components/tag). |
| Clear All Filters | Required; Clears all of the applied filters, sets the Filter Bar and the data set back to their default state. |

### Filter Dropdown

The Filter Dropdown anatomy is dependent on the filter method:

- Selection: multi-selection using checkboxes or single selection using radios.
- Input: numerical, date, time, datetime values, or a range between a start and end value.

![](/assets/components/filter-bar/filter-bar-dropdown-anatomy.png)

| Element          | Usage                  |
|------------------|------------------------|
| Parameters list | Required; Displays all of the available filter parameters, generally corresponding with columns in a table. |
| Filter value(s) | Required; Displays available values within a parameter for selection, or allows the input of custom values. |
| Apply Filters action | Required if the filtering method is "per-filter". Applies the filters selected in either the values list or the values input. |
| Clear all filters action | Required; Clears the selection of filters across all parameters. |
| Selected filters count | Displays the number of values selected in a parameter. |

#### Filter value selection

![](/assets/components/filter-bar/filter-bar-dropdown-anatomy-selection.png)
<Doc::ImageCaption @text="This filter value selection anatomy is the same for single selection using radios." />

| Element          | Usage                  |
|------------------|------------------------|
| Search | Optional; Searches across available filter parameter values using string matching. |
| Clear selected values action | Required; De-selects all values in the list. |
| Value input | Required; Supports filtering on numbers, strings, dates, or times. |

#### Filter value input

![](/assets/components/filter-bar/filter-bar-dropdown-anatomy-input.png)

| Element          | Usage                  |
|------------------|------------------------|
| Operator selection | Required; Allows the user to select how the filter is applied. |
| Value input | Required; Allows the user to input a value to filter upon such as a number, string, date, or time. |
| Clear filter | Required; Clears the filter operator and input fields. |

#### Filter value range input

When applying a filter value via an input, if `Between` is selected in the operator list, the input fields will be broken into a `start` value and `end` value.

![](/assets/components/filter-bar/filter-bar-dropdown-anatomy-input-range.png)

| Element          | Usage                  |
|------------------|------------------------|
| Operator selection | Required; Allows the user to select how the filter is applied. |
| Value range input | Required; Allows the user to input a start and end value to filter upon. |
| Clear filter fields action | Required; Clears the filter input field. |

#### Custom filtering

The Filter Dropdown supports custom filtering by passing elements to a generic yielded block.

![](/assets/components/filter-bar/filter-bar-dropdown-custom-filter.png)

##### Value input operators

Available operators are dependent on the type of data being filtered upon, but are generally either numerical, or date/time based.

![](/assets/components/filter-bar/filter-bar-dropdown-operator-options.png)

| Type | Options |
|------|-----------|
| Numerical | Less than (>), Less than or equal to (≤), Equal to (=), Not equal to (≠), Greater than or equal to (≥), Greater than (>), Between |
| Date and time | Before, Exactly, After, Between |