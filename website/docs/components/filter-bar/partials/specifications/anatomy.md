## Anatomy

### Filter Bar

![](/assets/components/filter-bar/filter-bar-anatomy.png)

| Element          | Usage                  |
|------------------|------------------------|
| Collapse/expand | Toggles open and closed the applied filters. |
| Filter toggle button | Toggles open and closed the Filter Dropdown. |
| Search | Optional |
| Generic content | Optional |
| Bulk actions | Optional |
| Applied Filters List | Displays the filters that have been applied to the data set, or an empty state. |
| Applied Filter Tag | Displays the filter as `Paramater: Value` within an HDS [Tag](/components/tag). |
| Clear All Filters | Clears all of the applied filters, sets the Filter Bar and the data set back to their default state. |

### Filter Dropdown

#### Filter value list

![](/assets/components/filter-bar/filter-bar-dropdown-anatomy-01.png)

| Element          | Usage                  |
|------------------|------------------------|
| Parameters list | Displays all of the available filter parameters, generally corresponding with columns in a table. |
| Values list | Displays all of the available values within a parameter. Relevant for multi-selection using Checkboxes and single-selection using Radios. |
| Search across values | Searches across available filter parameter values. |
| Clear selected values action | De-selects all values in the list. |
| Value input | Allows the user to input a custom value to filter upon such as a number, string, date, or time. |
| Apply Filters action | Applies the filters selected in either the values list or the values input. |
| Clear all filters action | Clears the selection of filters across all parameters. |

#### Filter value input

![](/assets/components/filter-bar/filter-bar-dropdown-anatomy-02.png)

| Element          | Usage                  |
|------------------|------------------------|
| Parameters list | Displays all of the available filter parameters, generally corresponding with columns in a table. |
| Value input | Allows the user to input a custom value to filter upon such as a number, string, date, or time. |
| Clear filter fields action | Clears the filter input field. |
| Apply Filters action | Applies the filters selected in either the values list or the values input. |
| Clear all filters action | Clears the selection of filters across all parameters. |

##### Value input operators

![](/assets/components/filter-bar/filter-bar-dropdown-operator-options.png)

| Type | Options |
|------|-----------|
| Numerical | Less than (>), Less than or equal to (≤), Equal to (=), Not equal to (≠), Greater than or equal to (≥), Greater than (>), Between |
| Date and time | Before, Exactly, After, Between |

##### Range inputs

When applying a filter value via an input, if `Between` is selected in the operator list, the input fields will be broken into a `start` value and `end` value.

![Example of numerical ranges](/assets/components/filter-bar/filter-bar-dropdown-range-input.png)