## Structure

A filtering pattern consists of a number of Helios components that work together functionally and enforce a consistent layout. These elements are variable depending on the data set's content and the context within the application and can be combined in different ways to achieve an experience that benefits the end user.

### Data set

A data set is a broad term for an array of items, objects, or related information presented as separate but related records. A data set is commonly represented via a [Table](/components/table) but may be expressed in other formats depending on the type of information.

**Data set represented by a table**

![Tabular data set](/assets/patterns/filter-patterns/example-data-set-tabular-data.png =1048x*)

**Data set represented by a grid**

![Non-tabular data set](/assets/patterns/filter-patterns/example-data-set-non-tabular-data.png =878x*)

### Filters

Filters are responsible for the functional aspect of limiting a data set and for displaying the [parameters](/patterns/filter-patterns?tab=core%20concepts#parameter) which a user can filter upon. Filter positioning is largely dependent on the complexity of the data set and the scope to which the filters are being applied. For example, are the filters applied at the page level or only to the data set they are paired with?

Filters often consist of numerous parameters that mirror the columns of a table or parameters contained within the data set. For more details on mirroring filters and parameters within a data set, refer to the filtering [core concepts](/patterns/filter-patterns?tab=core%20concepts#mirror-of-parameters).

#### Filter bar

Organizing filters in a **filter bar** is a common positioning method and consists of one or more dropdowns, buttons, or input components that are used to select values from a set of parameters. A [Segmented Group](/components/segmented-group) can be used within a filter bar to group similar parameters and support complex filtering.

![Filters represented by a filter bar](/assets/patterns/filter-patterns/filter-bar-segmented-group.png =724x*)

**Example of a horizontal filter bar paired with a data set expressed as a table.**

![Horizontal orientation of the filter bar](/assets/patterns/filter-patterns/layout-filter-bar.png =559x*)

Depending on the filter type and how they are related, multiple [Segmented Groups](/components/segmented-group) can be used to group similar filters together. For example; a [Search Input](/components/form/text-input#search) grouped with a [Dropdown](/components/dropdown) to limit the filter parameters that are included in the search.

**Limiting the returned search results to a specific parameter**

![Searching across a specific parameter](/assets/patterns/filter-patterns/filter-bar-similar-filters.png =718x*)

#### Sidebar

If space permits, filters can be positioned vertically in a **sidebar** at the page level or in line with the data set.

##### Page-level sidebar

Page-level sidebars can be used to filter a data set presented in a non-tabular fashion and if filtering the content of the entire page is required. A sidebar should be oriented on the left (start) side of the viewport.

![Vertical orientation of the filter bar](/assets/patterns/filter-patterns/layout-sidebar-left-page-level.png =559x*)

##### In-line sidebar

In-line sidebars can be used when the number of filterable parameters is minimal and if space permits.

![Vertical orientation of the filter bar on the left](/assets/patterns/filter-patterns/layout-sidebar-left-inline.png =559x*)

### Applied filters

Display the **applied filters** and provide the user with a method to clear all filters at once. Applied filters should be represented using a [Tag](/components/tag) component, which allows for the individual dismissal of a filter value.

![Applied filters](/assets/patterns/filter-patterns/applied-filters.png =547x*)

#### Positioning with filter bars

Applied filters should be positioned between the data set and the filter bar with a `16px` gap between elements.

![Applied filters with filter bar positioning](/assets/patterns/filter-patterns/applied-filters-positioning-filter-bar.png =559x*)

If the filters are positioned in a page-level sidebar, the applied filters should be positioned directly above the dataset with a `16px` gap.

![Applied filters with filter sidebar](/assets/patterns/filter-patterns/applied-filters-positioning-sidebar.png =559x*)

### Global filter functions

Depending on the fetching method and complexity of the data set, global filter functions can be used to expose methods that effect the entire data set. Global functions should be differentiated from the primary filters and aligned to the end of the data set. Examples include:

- Manually refreshing the data set.
- Triggering a [Flyout](/components/flyout) with more complex filters.

#### Multiple global filter functions

![Multiple global functions](/assets/patterns/filter-patterns/global-filter-functions.png =874x*)

#### Single global function

![Single function](/assets/patterns/filter-patterns/global-filter-functions-single.png =874x*)

In the case a multiple filter functions, use the [Segmented Group](/components/segmented-group). If only a single function is necessary, use the secondary [Button](/components/button#secondary).

### Pagination

Use pagination to break down the filtered data set into pages. For more details, refer to the [Pagination](/components/pagination) guidelines.

![Pagination example](/assets/patterns/filter-patterns/pagination-layout.png =559x*)

## Filtering methods

Depending on the fetching strategy, size, and rendering method of the data set, how filters are applied and the impact on the user experience varies.

### Live filtering

Live filtering refers to updating the records within a data set immediately after a user makes a selection. This method results in a responsive user experience, but may not be possible with large data sets or complex filtering methods.

<video width="100%" controls loop>
  <source
    src="/assets/patterns/filter-patterns/live-filtering.mp4"
    type="video/mp4"
  />
</video>

### Per-filter

Applying filters one at a time lets the user to "finalize" their decision before applying, avoiding the distraction of the data set constantly updating in the background. This method is useful when the user may want to select multiple values in a single dropdown, but requires an extra step to apply the filters.

<video width="100%" controls loop>
  <source
    src="/assets/patterns/filter-patterns/per-filter.mp4"
    type="video/mp4"
  />
</video>

### Batch filtering

Batch filtering supports the user making multiple selections across different parameters and only updating the results of the data set when the user interacts with a global "apply" function. This method is useful when the data set is very large or when the filter parameters are complex.

<video width="100%" controls loop>
  <source
    src="/assets/patterns/filter-patterns/batch-filtering.mp4"
    type="video/mp4"
  />
</video>

## Displaying selected filters

Communicate that values corresponding with a filter parameter have been applied within the [Dropdown](/components/dropdown) by adding a `BadgeCount` within the filter.

**Communicating that two values within a parameter have been applied in the Dropdown**

![Filter dropdown with count](/assets/patterns/filter-patterns/filter-bar-dropdown-count.png =661x*)

This, when combined with the applied filters provides a detailed snapshot of what specific filter values are applied to the data set and the relevant parameters that they correspond with.

**Communicating that multiple filter parameters have been applied**

![Filter dropdown with multiple counts](/assets/patterns/filter-patterns/filter-bar-dropdown-count-multiple.png =728x*)

## Empty state

Empty state within a filter pattern is expressed in two different ways:

1. Applied filters have resulted in no records being returned in the data set.
2. No filters have been applied resulting in no tags in the applied filters area.

### Within a data set

Depending on the applied filters, there may not be any records returned from a data set that match parameters and values selected. In this case, communicate the empty state to the user and highlight instructions to adjust the filters or provide a method to clear all filters.

Use the Helios [Application State](/components/application-state) component to communicate the lack of results and steps the user can take to remedy the situation.

![Empty state example](/assets/patterns/filter-patterns/filter-patterns-empty-state.png =559x*)

### Within applied filters

If no filters have been applied, use a [Tooltip](/components/tooltip) coupled with the applied filters label to guide the user to the filter functions. Not only does this provide context and direct the user to the filters, but it prevents unnecessary layout shift upon applying filters.

![Empty state in applied filters](/assets/patterns/filter-patterns/applied-filters-empty-state.png =450x*)

### Avoiding an empty state

As filtering is reductive in nature and driven by a user action, it’s not always possible to avoid an empty state.

If technically feasible, use the `count` property within the Dropdown ListItem to call attention to filters that will return zero results.

In this example, "Status > Pending" does not return any results.

![Count property in ListItem](/assets/patterns/filter-patterns/avoid-empty-state-list-item-count.png)

### Reverting filters

If applying filters to a data set yields no results, offer users an option to clear all or specific filters.

This can be done by adding a "Clear all" action to the [Application State](/components/application-state) or by including dismissible [Tags](/components/tag) for each applied filter.

## Overflow

Depending on the complexity of the data set, it may be necessary to account for the overflow of elements within the filters.

### Filter bar overflow

If the number of filterable parameters exceeds the available space, consider prioritizing the most commonly used filters in the filter bar and moving less important or more complex filters to a [Flyout](/components/flyout) that can be triggered via an action in the filter bar.

**Hiding additional filters behind an action**

![More filters trigger](/assets/patterns/filter-patterns/overflow-filter-bar.png =559x*)

**Triggering a Flyout with additional filter parameters**

![Flyout triggered by more filters](/assets/patterns/filter-patterns/overflow-filter-bar-flyout.png =559x*)

!!! Dont

Don't stack multiple filter bars on top of a data set. This can result in unnecessary complexity in the UI.

![Multiple filter bar rows](/assets/patterns/filter-patterns/overflow-filter-bar-multiple-rows.png =559x*)

!!!

### Sidebar overflow

Given that the page-level sidebar occupies the height of the viewport, take filters within a sidebar should not overflow into an interstitial component like a [Flyout](/components/flyout). Instead, utilize the height of the viewport and the consider introducing a scrollable area within the sidebar if many filters are necessary.

![Filter sidebar with scroll](/assets/patterns/filter-patterns/filter-sidebar-scrollbar.png =559x*)
