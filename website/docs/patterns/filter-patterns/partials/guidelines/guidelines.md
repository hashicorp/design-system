## Structure

A filtering pattern consists of a number of elements and Helios components that work together functionally and enforce a consistent layout. These elements are variable depending on the content the data set contains and the context within the application, and can be combined in different ways to achieve an experience that benefits the end-user.

### Data set

A data set is a broad term for an array items, objects, or related information presented as separate but related records. A data set is commonly represented via a [Table](/components/table) but may be expressed in other formats depending on the type of information.

**Dataset represented by a table**

![Tabular data set](/assets/patterns/filter-patterns/example-data-set-tabular-data.png)

**Dataset represented by grid**

![Non-tabular data set](/assets/patterns/filter-patterns/example-data-set-non-tabular-data.png)

### Filter positioning

Filters are responsible for the functional aspect of limiting a data set and for displaying the [parameters](/patterns/filter-patterns?tab=core%20concepts#parameter) which a user can filter upon. They often consists of numerous parameters that mirror the columns of a table or metadata contained within the data set.

Filter positioning is largely dependent on the complexity of the data set and the scope for which the filters are being applied (are the filters applied at the page-level, or only to the data set they are paired with).

#### Filter bar

Organizing filters in a  **filter bar** is a common positioning method and consists of one or more dropdowns, buttons, or input components that are used to select values from a set of parameters. A [Segmented Group](/components/segmented-group) can be used within a filter bar to group similar parameters and support complex filtering.

![Filter bar example](/assets/patterns/filter-patterns/filter-bar-segmented-group.png)

**Ex 1.0: Horizontal filter bar**

![Horizontal orientation of the filter bar](/assets/patterns/filter-patterns/layout-filter-bar.png)

#### Sidebar

If space permits, filters can be positioned vertically in a **sidebar**, either at the page level, or in-line with the data set.

- **Page-level sidebar:** can be used for more complex data sets and if filtering contents of the entire page is required.
- **In-line sidebars:** can be used when the number of filterable parameters is minimal and if space permits.

**Ex 1.1 Page-level filter sidebar**

![Vertical orientation of the filter bar](/assets/patterns/filter-patterns/layout-sidebar-left-page-level.png)

**Ex 1.2 In-line filter sidebar**

![Vertical orientation of the filter bar on the left](/assets/patterns/filter-patterns/layout-sidebar-left-inline.png)

![Vertical orientation of the filter bar on the right](/assets/patterns/filter-patterns/layout-sidebar-right-inline.png)

### Applied filters

The **applied filters** displays which filter values have been applied (if any) and provides a user with a method to clear or reset all filters at once. In most circumstances the filters that have been applied should be represented using a [Tag](/components/tag) component which allows for the individual dismissal of a filter value.

![Applied filters](/assets/patterns/filter-patterns/applied-filters.png)

#### Positioning

Applied filters should be positioned as close as possible relative to the data set to help the user understand what has been filtered upon. In practice this is most often directly above the data set.

**Ex 2.0: Between the filter bar and the data set**

![Applied filters with filter bar positioning](/assets/patterns/filter-patterns/applied-filters-positioning-filter-bar.png)

**Ex 2.1: Above the data set with filters positioned in a sidebar**

![Applied filters with filter sidebar](/assets/patterns/filter-patterns/applied-filters-positioning-sidebar.png)

If the filters are positioned in a page-level sidebar the layout can be simplified by excluding the applied filters and including an action to clear all of the filters within the sidebar itself.

With this method, the filter values being applied to the dataset are already displayed and implied in the sidebar.

**Ex 2.2: Excludes the applied filters when positioned in a sidebar**

![Applied filters with clear all in the sidebar](/assets/patterns/filter-patterns/applied-filters-positioning-sidebar-clear-all.png)

### Pagination

Use pagination to break down the filtered data set into pages. For more details refer to the [Pagination](/components/pagination) guidelines.

## Overflow

Depending on the complexity of the data set or filterable parameters, it may be necessary to account for overflow of elements within the filter bar or in the applied tags.

### Filter bar overflow

If the number of filterable parameters exceeds the available space, consider prioritizing the most commonly used filters in the filter bar and moving less important or more complex filters to a [Flyout](/components/flyout) or [Modal](/components/modal). Either one of these interaction patterns can be triggered by an action within the filter bar.

**Ex 3.0: Hiding additional filters behind an action; in this scenario a tertiary button**

![More filters trigger](/assets/patterns/filter-patterns/overflow-filter-bar.png)

**Ex 3.1: Triggering a Flyout with additional filter parameters**

![Flyout triggered by more filters](/assets/patterns/filter-patterns/overflow-filter-bar-flyout.png)

**Ex 3.1: Triggering a Modal with additional filter parameters**

![Modal triggered by more filters](/assets/patterns/filter-patterns/overflow-filter-bar-modal.png)

!!! Dont

Don't stack multiple filter bars on top of a data set. This can result in unnecessary complexity in the UI.

![Multiple filter bar rows](/assets/patterns/filter-patterns/overflow-filter-bar-multiple-rows.png)

!!!

### Filter sidebar overflow

Similar to the guidelines for overflow within a filter bar, an action to view more filters within a [Flyout](/components/flyout) or [Modal](/components/modal) can also be used.

**Ex 3.2: Hiding additional filters behind an action in a sidebar orientation**

![More filters trigger in a sidebar](/assets/patterns/filter-patterns/overflow-sidebar-more-filters.png)

!!! Info

Consider each one of these scenarios carefully as moving additional filters to an interstitial component like a Modal or Flyout adds extra steps in the filtering process that might not be necessary. 

!!!

### Applied filters overflow

If the number of filterable parameters is large, there's a likelihood that the number of applied filters may also extend to multiple lines. In this scenario the same methods apply as the filter bar and sidebar.

Depending on the context of the filtering pattern, it may be helpful to display the applied filters to the user at all times. This can assist in easy dismissal of specific filters and help the user better parse how a data set is being filtered.

**Ex 3.4: Extreme example of many applied filters**

![Many filters applied](/assets/patterns/filter-patterns/overflow-applied-filters.png)

**Ex 3.5: Applied filters within a Flyout**

![Applied filters within a Flyout](/assets/patterns/filter-patterns/overflow-applied-filters-flyout.png)

**Ex 3.6: Applied filters within a Modal**

![Applied filters within a Modal](/assets/patterns/filter-patterns/overflow-applied-filters-modal.png)


