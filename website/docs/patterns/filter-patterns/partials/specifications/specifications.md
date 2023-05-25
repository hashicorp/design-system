!!! Info

Helios does not currently publish any components that account for layout of the structural filter elements, these are currently the responsibility of the consumer. Instead, use these guidelines in a manner that best supports your application structure.

!!!

## Pattern layout

Adhering to the spacing, layout, and specifications outlined for the individual structural elements of a filter pattern makes assembling them together into a pattern relatively simple.

**Ex 1.0: Pattern anatomy with a filter bar**

![Pattern anatomy with filter bar](/assets/patterns/filter-patterns/pattern-anatomy-specific-filter-bar.png)

**Ex 1.1: Pattern anatomy with a filter sidebar**

![Pattern anatomy with a sidebar](/assets/patterns/filter-patterns/pattern-anatomy-specific-sidebar.png)

| Element | Usage |
|---------|-------|
| Filters | Dictates what parameters are available to filter upon and the values that correspond with them. Can either be positioned in a horizontal filter bar or a vertical filter sidebar. |
| Applied filters | Displays the filters that are applied to the dataset and accounts for the bulk clearing of filters. |
| Data set | Expresses the objects, items, or records of a data set. A [Table](/components/table) is a common method to represent a data set, but many other formats exist that are dependent on the type of information contained within the data set. |
| Pagination | Divides the data set into more easily digestible "pages" that the user can navigate through. |

### Spacing

Use a `16px` vertical gap between each of the structural elements within a filter pattern.

**Ex 2.0: Filter pattern spacing using a filter bar**

![Pattern spacing with a filter bar](/assets/patterns/filter-patterns/pattern-anatomy-filter-bar-spacing.png)

**Ex 2.1: Filter pattern spacing using a sidebar**

![Pattern spacing with a sidebar](/assets/patterns/filter-patterns/pattern-anatomy-sidebar-spacing.png)

If the filters are positioned in an in-line sidebar use a `24px` between the sidebar and the dataset.

**Ex 2.2: Filter pattern spacing using an in-line sidebar**

![Pattern spacing with an inline sidebar](/assets/patterns/filter-patterns/pattern-anatomy-inline-sidebar-spacing.png)

## Filter bar

Filters positioned in a filter bar orientation consist of one or [Dropdowns](/components/dropdown), [Buttons](/components/button), and [Inputs](/components/form/text-input) wrapped in a [Segmented Group](/components/segmented-group). Depending on the complexity of the data set, a filter bar can consist of a single dropdown in simple use-cases, or multiple Segmented Groups in complex scenarios.

![Simple filter bar anatomy](/assets/patterns/filter-patterns/filter-bar-anatomy-01.png)

| Element | Usage |
|---------|-------|
| Filter bar container | A container that spans the width of the dataset and wraps the functional filter elements (Segmented Group, Dropdowns, etc) |
| [Segmented Group](/components/segmented-group) | Wraps the Segmented Dropdown, Button, and Input to enforce a connected visual experience and group similar or related filters. |
| Segmented Input | Allows for searching and filtering within data set on string and text values |
| Segmented Button | Allows functions to be performed on the data set, e.g., refreshing the dataset. |
| Segmented Dropdown | Displays the filter parameter on the toggle button and numerous filterable values in a dropdown list. |
| [List](/components/dropdown#list) | Coupled with the [Dropdown](/components/dropdown), the List displays filterable values that correspond with the parameter in the Dropdown Toggle |

### Spacing

In the case of multiple Segmented Groups within a filter bar, use a `16px` gap between each group.

![Multiple groups in a filter bar](/assets/patterns/filter-patterns/filter-bar-anatomy-02.png)

Sometimes a set of global filter functions is necessary to refresh the data set or surface an action to reveal additional overflow filters in a Flyout. In this case the global functions should be aligned to the end of the container with space between the primary filters and the global functions.

![Functions within a filter bar](/assets/patterns/filter-patterns/filter-bar-anatomy-03.png)

## Filter sidebar

With more real estate in a filter sidebar, the list that was responsible for displaying the filter values in the filter bar can be expanded to display all applicable values at once in a group.

![Sidebar anatomy](/assets/patterns/filter-patterns/sidebar-anatomy.png =350x*)

| Element | Usage |
|---------|-------|
| Sidebar container | Wraps the filters or multiple groups in a vertical orientation. |
| Divider | (Optional, but recommended) Increases visual differentiation between each group. |
| [Checkbox Group](/components/form/checkbox) | Displays the values in a checkbox group, supporting the selection of multiple items. |
| [Radio Group](/components/form/radio) | Displays the values in a radio group, supporting the selection of a single value. |

### Spacing

Spacing within a filter sidebar extends the guidelines for spacing within a [form pattern](/patterns/form-patterns).

- If a divider separates the groups use a `24px` vertical gap on the top and bottom of the divider.
- If no divider is used, groups should receive a `32px` gap between them.

**Ex 3.0: Spacing in a sidebar that uses dividers**

![Sidebar spacing](/assets/patterns/filter-patterns/sidebar-spacing-divider.png =350x*)

**Ex 3.1: Spacing in a sidebar that doesn't use dividers**

![Sidebar spacing without a divider](/assets/patterns/filter-patterns/sidebar-spacing-no-divider.png =350x*)

### Overflow filters

If it's necessary for filters to overflow into a [Flyout](/components/flyout), use the same organizational method and spacing guidelines as the filter sidebar.

![Filters within a Flyout](/assets/patterns/filter-patterns/flyout-filter-spacing.png =450x*)

## Applied filters

![Applied filters anatomy](/assets/patterns/filter-patterns/applied-filters-anatomy.png)

| Element | Usage |
|---------|-------|
| Applied Filter Container | Wraps the label and applied filters to enforce consistent spacing |
| Label | Labels the applied filters and communicates whether filters have been applied or not. |
| Filters | A list of dismissible [Tags](/components/tag) that communicate what filters have been applied to the dataset. |
| Bulk clear | Clear all applied filters with a single bulk action. Uses a small [Tertiary button](/components/button) with an icon. |

### Spacing

- In the applied filters container use a `16px` gap between elements.
- Adhere to the spacing guidelines for the [Tag](/components/tag#spacing) between multiple filters.

![Applied filters spacing](/assets/patterns/filter-patterns/applied-filters-spacing.png)

### Empty state

If no filters are applied, indicate this to the user by changing the text in the label and optionally providing details on filtering via a [Tooltip](/components/tooltip).

![Applied filters empty state](/assets/patterns/filter-patterns/applied-filters-empty-state.png)

### Layout

Depending on the available space, the size of the viewport, and the number filters that have been applied, the list of applied filters may overflow to multiple lines. In this circumstance it's recommend to stack the label, filter list, and bulk clear action in a column orientation.

![Applied filters multi-line](/assets/patterns/filter-patterns/applied-filters-overflow-layout.png)

Use a `12px` gap between each row in this orientation.

![Applied filters multi-line spacing](/assets/patterns/filter-patterns/applied-filters-overflow-layout-spacing.png)

## Pagination

Refer to the [Pagination](/components/pagination?tab=specifications) guidelines for more information on how to use Pagination in relation to a data set.