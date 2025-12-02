The Filter Bar is used to display and apply filters to a data set. It is most often used in conjunction with the [Advanced Table](/components/table/advanced-table), but is flexible enough to support different renderings of data sets such as in a list or grid of cards.

The Filter Bar comes paired with a complex dropdown menu that supports 

## Usage

### When to use

- When displaying relevant filters and filters that have been applied to a data set.
- For common filter methods like multi-selection, single selection, numbers, dates, and times.

### When not to use

- for complex query builder features.

## Overlap with the Filter pattern guidance <!--Consider a different headline -->

The Filter Bar component is a successor to the [Filter pattern](/patterns/filter-patterns) documentation and supports the vast majority of filtering experiences within HashiCorp applications. New experiences should use the Filter Bar by default instead of the adhering to the pattern guidance, while already delivered features should consider migrating to the Filter Bar component.

!!! Callout

While the Filter Bar underwent rigorous research and testing, this component is relatively complex compared other Components in the the HDS library. If specific funcionality or filtering methods don't meet your needs, please [contact the Design Systems Team](/about/support) so we can provide support.
!!!

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

## Search

## Bulk actions

## Generic content

## Applied filters

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

