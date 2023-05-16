## Structure

A filtering pattern consists of a number of elements and Helios components that work together functionally and enforce a consistent layout. These elements are variable depending on the content the data set contains and the context within the application, and can be combined in different ways to achieve an experience that beneifts the end-user.

For more specifications on the details of these elements, refer to the [specifications](/patterns/filter-patterns?tab=specifications).

### Data set

A data set is a broad term for an array items, objects, or related information presented as separate but related records. A data set is commonly represented via a [Table](/components/table) but may be expressed in other formats depending on the type of information.

**Dataset represented by a table**

![Tabular data set](/assets/patterns/filter-patterns/example-data-set-tabular-data.png)

**Dataset represented by grid**

![Non-tabular data set](/assets/patterns/filter-patterns/example-data-set-non-tabular-data.png)

### Filter positioning

Filters are responsible for the functional aspect of limiting a data set and for displaying the [identifiers](/patterns/filter-patterns?tab=core%20concepts#identifier) which a user can filter upon. They often consists of numerous identifiers that mirror the columns of a table or metadata contained within the data set.

Filter positioning is largely dependent on the complexity of the data set and the scope for which the filters are being applied (are the filters applied at the page-level, or only to the data set they are paired with).

#### Filter bar

Organizing filters in a  **filter bar** is a common positioning method and consists of one or more dropdowns, buttons, or input components that are used to select a value from a set of identifiers. A [Segmented Group](/components/segmented-group) can be used within a filter bar to group similar identifiers and support complex filtering.

![Filter bar example](/assets/patterns/filter-patterns/filter-bar-segmented-group.png)

**Ex 1.0: Horizontal filter bar**

![Horizontal orientation of the filter bar](/assets/patterns/filter-patterns/layout-filter-bar.png)

#### Sidebar

If space permits, filters can be oriented vertically in a **sidebar**, either at the page level, or in-line with the data set. 

- **Page-level sidebar:** can be used for more complex data sets and if filtering contents of the entire page is required.
- **In-line sidebars:** can be used when the number of filterable parameters is minimal and if space permits.

**Ex 1.1: Page-level filter sidebar**

![Vertical orientation of the filter bar](/assets/patterns/filter-patterns/layout-sidebar-left-page-level.png)

**Ex 1.2: In-line filter sidebar**

![Vertical orientation of the filter bar on the left](/assets/patterns/filter-patterns/layout-sidebar-left-inline.png)

![Vertical orientation of the filter bar on the right](/assets/patterns/filter-patterns/layout-sidebar-right-inline.png)

### Applied filters

The **applied filters** displays which filter values have been applied (if any) and provides a user with a method to clear or reset all filters at once. In most circumstances the filters that have been applied should be represented using a [Tag](/components/tag) component which allows for the individual dismissal of a filter value.

![Applied filters](/assets/patterns/filter-patterns/applied-filters.png)

#### Positioning

Applied filters should be positioned as close as possible relative to the data set to help the user maintain the context of what has been filtered upon. In practice this is most often directly above the data set.

**Ex: 2.0: Between the filter bar and the data set**

![Applied filters with filter bar positioning](/assets/patterns/filter-patterns/applied-filters-positioning-filter-bar.png)

**Ex: 2.1: Above the data set with filters oriented in a sidebar**

![Applied filters with filter sidebar](/assets/patterns/filter-patterns/applied-filters-positioning-sidebar.png)

If the filters are oriented in a page-level sidebar the layout can be simplified by excluding the applied filters and including an action to clear all of the filters within the sidebar itself.

**Ex: 2.2: Excludes the applied filters when oriented in a sidebar**

![Applied filters with clear all in the sidebar](/assets/patterns/filter-patterns/applied-filters-positioning-sidebar-clear-all.png)

### Pagination

Use pagination to break down the filtered data set into pages. For more details refer to the [Pagination](/components/pagination) guidelines.

## Overflow

Depending on the complexity of the data set or filterable parameters, it may be necessary to account for overflow of elements within the filter bar or in the applied tags.

### Filter bar overflow



### Applied filters overflow

## Annotating filter values
