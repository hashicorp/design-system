## Sticky headers and columns

The Advanced Table supports setting both the header and the first column as sticky or “pinned” to either the top or left of the container respectively. This can aid in navigation and traversal through large data sets while persisting important indentifying values (e.g., names, IDs, etc).

There are a few caveats to consider when implementing either of these features:

- Instances of the Advanced Table with nested rows, expandable rows, and `colSpan` or `rowSpan` do not support a sticky column because what classifies as the first column is variable depending on these properties.
- The first column is inclusive of the multi-selection column, e.g., setting the first column as sticky in a table with multi-selection will couple the multi-select column and the first column of data together.

![An Advanced Table with a sticky column, where the user has scrolled to showcase the overlapping nature of the column.](/assets/components/table/advanced-table/advanced-table-sticky-column.png)

!!! Info

At this time only the first column in an Advanced Table can be set as sticky. If you have needs beyond this please [contact](/about/support) the HDS team or [submit a request](https://go.hashi.co/hds-support).
!!!

## Overflow

The Advanced Table supports overflow on both the X and Y axis (horizontally and vertically). For example, when the cummulative width of the columns in the Advanced Table is greater than the width of the viewport or the container the table is in, a subtle shadow is introduced indicating the direction the overflow occurs. When paired with a sticky header or column, the “edge” at which the overflow occurs visually.

![An Advanced Table showcasing the visual language and subtle shadow that indicates overflow on the horizontal axis](/assets/components/table/advanced-table/advanced-table-horizontal-overflow.png)