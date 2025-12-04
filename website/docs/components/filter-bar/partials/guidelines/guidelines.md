The Filter Bar is used to apply and display filters to a data set. It is most often used in conjunction with the [Advanced Table](/components/table/advanced-table), but is flexible enough to support different data sets and rendering methods such as in a list or grid of cards.

The Filter Bar comes paired with a complex dropdown menu that displays the available parameters to filter upon (parameter is often the equivalent of a column in a table), the available values within each parameter, the ability to enter numerical/date/time values, ranges of values, and actions to apply and clear filters from the data set.

!!! Callout

While the Filter Bar underwent rigorous research and testing, this component is relatively complex compared other Components in the the HDS library. If specific functionality or filtering methods don't meet your needs, please [contact the Design Systems Team](/about/support) so we can provide support.
!!!

## Usage

### When to use

- When displaying relevant filters and filters that have been applied to a data set.
- For common filter methods like multi-selection, single selection, numbers, dates, and times.

### When not to use

- For complex query builder features.

## Overlap with the Filter pattern guidance <!--Consider a different headline -->

The Filter Bar component is a successor to the [Filter patterns](/patterns/filter-patterns) documentation and directly supports the vast majority of filtering experiences within HashiCorp applications out of the box. New experiences should use the Filter Bar by default instead of the adhering to the pattern guidance, while already delivered features should consider migrating to the Filter Bar component.

## Type

While we recommend that the Filter Bar be paired with the [Advanced Table](/components/table/advanced-table) in most circumstances, the component is agnostic and can be paired with different ways of rendering a data set. To support this visually, the component features two types; `attached` and `standalone`.

<!-- JT: Consider including additional context for where to use each on in this section, or make it more concise -->

### Attached

Use the `attached` variant with the [Advanced Table](/components/table/advanced-table) and standard [Table](/components/table/table).

![Example of an attached Filter Bar paired with a data set rendered in an Advanced Table](/assets/components/filter-bar/filter-bar-type-attached.png)

### Standalone

Use the `standalone` variant when a data set is rendered in formats other than a table, e.g., a list or array of cards.

![Example of a standalone Filter Bar paired with a data set rendered in cards](/assets/components/filter-bar/filter-bar-type-standalone.png)

## Expand & collapse

The Filter Bar supports expanding and collapsing the applied filters section. This can simplify the UI around the data set allowing more focus on the data or contet, especially when many filters are applied.

![An example of the collapsed state of the Filter Bar](/assets/components/filter-bar/filter-bar-collapsed.png)

When no filters are applied, the Filter Bar is collapsed by default and displays an empty state message when expanded.

![An example of the expanded Filter Bar with no filters applied and an empty state](/assets/components/filter-bar/filter-bar-expanded-empty-state.png)

When one or more filters are applied the Filter Bar is expanded by default.

![An example of the expanded Filter Bar with several filters applied](/assets/components/filter-bar/filter-bar-expanded-with-filters.png)

## Search

## Bulk actions

The Filter Bar supports bulk actions corresponding with our recommendations for [multi-select](/patterns/table-multi-select) within a table. This can be used to perform bulk actions such as edit, delete, and different types of selection across the data set.

![Example of bulk actions](/assets/components/filter-bar/filter-bar-bulk-actions.png)

## Generic content

If custom functionality is needed for manipulating the view or contents of the data set, a generic block is grouped with the bulk actions in the Filter Bar. We aren't prescriptive about what can be passed to this generic block, but it should generally be limited to additional actions (as [Buttons](/components/button)) and [Dropdowns](/components/dropdown) with multiple grouped actions.

![Example of generic content](/assets/components/filter-bar/filter-bar-generic-content.png)

## Applied filters

Applied filters are represented within a [Tag](/components/tag) displaying the filter parameter (the category or column the filter corresponds to) and the filter value (corresponding with the specific cell content).

![](/assets/components/filter-bar/filter-bar-tag-example.png)

<!-- Include information about how/if this can be customized -->

## Filter dropdown

### Methods

#### Multi-selection

#### Single-selection

#### Numbers

#### Dates & times

#### Method options

#### Filter ranges

#### Search across filter values

## Applying Filters

## Clearing filters

## Empty state

