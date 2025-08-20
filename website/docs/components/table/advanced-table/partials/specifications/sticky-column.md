## Sticky headers and columns

The Advanced Table supports setting the header and the first column as sticky or “pinned.” This can help users navigate large data sets while persisting important identifying values, such as names and IDs.

There are a few things to consider when implementing a sticky header or column:

- Instances of the Advanced Table with nested rows, expandable rows, and `colSpan` or `rowSpan` do not support a sticky column because what classifies as the first column is variable depending on these properties.
- Setting the first column as sticky in a table with multi-selection will couple the multi-select column and the first column of data together.

If `hasStickyFirstColumn` is set to true or false in the Ember component, a control will be exposed in the context menu allowing users to "Pin" and "Unpin" the first column in the Advanced Table.

![An Advanced Table with the context menu open and a single option that states "Pin column"](/assets/components/table/advanced-table/advanced-table-pin-column.png)

![An Advanced Table with a pinned column with the context menu open and a single option that states "Unpin column"](/assets/components/table/advanced-table/advanced-table-unpin-column.png)

!!! Info

We currently only support the first column as sticky. If you have needs beyond this, please [contact](/about/support) the HDS team or [submit a request](https://go.hashi.co/hds-support).
!!!

## Overflow

The Advanced Table can overflow on the X and Y axes (horizontally and vertically). When the number of columns no longer fits within the viewport or container, a subtle shadow indicates where the overflow occurs. When paired with a sticky header or column, the “edge” where the overflow occurs uses the same subtle shadow.

![An Advanced Table showcasing the visual language and subtle shadow that indicates overflow on the horizontal axis](/assets/components/table/advanced-table/advanced-table-horizontal-overflow.png)