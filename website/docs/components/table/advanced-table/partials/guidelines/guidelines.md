## Usage

### When to use

- For large data sets with many properties that benefit from being viewed in a scrollable container.
- When an expandable table is needed for hierarchical data.
- When users would benefit from more efficient keyboard navigation, such as when there are many rows or columns.
- When users would benefit from customizing the view of the data set (column width, order, etc).

### When not to use

- If your dataset requires only basic interactions, such as simple sorting or pagination, and does not require features like nested rows, advanced keyboard navigation, or sticky headers, the standard [Table](/components/table/table) is a more suitable choice.
- When visual representations like charts or graphs better convey the data.
- As a layout mechanism for structuring content that isn’t tabular data.
- To replicate spreadsheet-like functionality with extensive in-cell editing or calculations.

## Columns

### Sorting

- Sorting is not relevant for all content, so thoughtfully consider when to apply sorting.
- An Advanced Table allows end-users to sort by one column at a time. While multiple columns may offer sorting options, users can only apply sorting to one column at any given moment.

![A group of 4 Advanced Table header cells, with each variant of sort button: no sort button, the default unsorted, sorted ascending, and sorted descending.](/assets/components/table/advanced-table/table-sorting.png)

### Tooltips

Labels within the Advanced Table column should be clear, concise, and straightforward. In the case that more context or details are necessary, a [Tooltip](/components/tooltip) can be used in conjunction with the label but should be used sparingly and as a last resort.

![](/assets/components/table/advanced-table/table-tooltip-example.png)

Some examples where it may be useful to include additional context in a tooltip include:

- When the label contains a product or HashiCorp-specific term.
- When the label refers to a setting that can be changed elsewhere in the application.

### Width

Column width is determined by manually resizing the header column and cells within Figma. As a best practice, column width should be adjusted to fit the longest data type within the cell.

### Placement

!!! Info

**Differences between Figma and code**

The column placement property is only relevant within Figma and doesn’t exist as a property in code.
!!!

Column placement determines the visual styling based on where the column is placed relative to other columns in the Advanced Table.

![For header columns, start placement adds a border radius to the top left corner and a border on the left and right, middle placement has squared corners and a border on the right, end placement has a border radius on the top right corner and a border on the right. For cells, start placement has a border on the left and right, middle and end placement have a border on the right.](/assets/components/table/advanced-table/table-col-placement.png)

### Alignment

The alignment of text and content within an Advanced Table impacts the readability and speed at which users can effectively parse the information. The proper alignment method depends on the content within the cell, and relative position within the advanced table.

!!! Do

Use consistent alignment between the header label and the cell content.

![An Advanced Table with two columns, the first column is left aligned and the second is right aligned.](/assets/components/table/advanced-table/table-alignment-do.png)

!!!

!!! Dont

Avoid misaligned header labels and content.

![An Advanced Table with two columns, the header of the first column is left aligned and the cell below is right aligned. The header of the second column is right aligned and the cell below is left aligned.](/assets/components/table/advanced-table/table-alignment-dont.png)

!!!

#### Left alignment

Align content to the left of the cell by default. This ensures readability across different content types, consistency in content of varying lengths, and alignment between the column header label and the content within the cell.

Use left alignment for:

- String and text-based content (unique identifiers or IDs, names and naming conventions, etc).
- Numerical values that do not contain decimals or floating point numbers.
- Numerical values that contain periods or other delimiter characters (IP addresses).
- Nested components that display a string or text value, e.g., a [Badge](/components/badge).

![](/assets/components/table/advanced-table/start-alignment-example.png)

#### Right alignment

Right alignment can be used when expressing numerical values with decimals as this aligns the decimal places vertically.

Common examples of right alignment include:

- Financial information and currency amounts.
- Fractional and floating point values represented with decimals.

![](/assets/components/table/advanced-table/end-alignment-example.png)

Right alignment can also be used in the last column of an advanced table to:

- Highlight a "more options" function.
- As a means to visually "bookend" the row with content that is of a similar length, e.g., timestamps, TTL (time-to-live) values, dates.

![](/assets/components/table/advanced-table/end-alignment-example-02.png)

!!! Dont

Don’t right align content that is variable in length. This can make the content more difficult to read by forcing an unnatural [reading pattern](/patterns/button-organization?tab=research#layout-and-reading-patterns).

![Column with badges that have different length labels end aligned. The badge labels are "Successful", "Needs confirmation", and "Error".](/assets/components/table/advanced-table/end-alignment-variable-length.png)

!!!

#### Other alignment methods

We don’t recommend center or justified alignment of content within Advanced Table cells. These alignment methods can result in the content being difficult to read, especially if it is variable in length.

!!! Dont

Don’t center header labels or cell content within a table.

![](/assets/components/table/advanced-table/center-justified-alignment.png)

!!!

### Reorderable columns

If `hasReorderableColumns` is set to true on the Ember component, users can reorder columns either by clicking and dragging on the column reorder handle with a mouse, or by moving focus to the handle with a keyboard and using the right and left arrow keys. These properties are not available within the Figma component, but we've provided [examples](jory-update-link) that you can copy and paste into your design files.

When enabled, actions related to altering the column order are rendered in a context menu in the table header. These are not customizable and include:

- Move column: moves focus to the reordering handle
- Move column to start/end: moves the column to the first or last position in the table unless the column is already in this position.

![An example of the open context menu in the Advanced Table displaying an action that alter the visual order of the column](/assets/components/table/advanced-table/advanced-table-reorder-context-menu.png)

![An example of the focused drag target in the table header](/assets/components/table/advanced-table/advanced-table-focus-drag-target.png)

![An example of a column being dragged with the mouse to a new position in the Advanced Table](/assets/components/table/advanced-table/advanced-table-drag-column.png)

### Resizable columns

If `hasResizableColumns` is set to true on the Ember component, users can customize the width of each column in the Advanced Table. These properties are not available within the Figma component, but we've provided [examples](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=81060-291665&t=UHpPyO7erZKLy4SD-1) that you can copy and paste into your design files.

When enabled, actions related to each function are rendered in a context menu in the table header. These functions are not customizable.

![An example of the open context menu in the Advanced Table displaying an action to reset the width of the column](/assets/components/table/advanced-table/advanced-table-context-menu.png)

## Column and row span

- Supports combining multiple columns or rows into a single cell.
- Apply column and row spans carefully to maintain alignment, accessibility, and smooth table interactions.
- Multi-span cells should use the same alignment for readability.

![](/assets/components/table/advanced-table/colspan-table-example.png)

## Rows

### Headers

- Labels in headers should be clear, concise, and straightforward.
- The label should clearly indicate what type of content is contained within the cell (string, number, status, etc).
- Labels should use sentence-case capitalization, not all-caps.

### Expandable rows

Expandable rows let users show or hide more content without navigating away from the table. The expanded content should align with the header labels, even if the parent row includes minimal data.

![Advanced Table expandable rows. The parent rows display a summary of a Hashicorp product and the total price, the children rows show a breakdown of each billing item from that product and their individual cost.](/assets/components/table/advanced-table/expandable-rows.png)

!!! Dont

Avoid using expandable rows when data is not structured in parent-child relationships.

![Advanced Table where the parent row has cells for name and email, but children rows have cells containing order date and total.](/assets/components/table/advanced-table/advanced-table-dont-parent-nested.png)

!!!

!!! Dont

Avoid using different density settings for parent and child rows.

![Advanced Table with default height parent rows and short density nested rows.](/assets/components/table/advanced-table/advanced-table-density-mix.png)

!!!

### Expand/Collapse All Button

The Expand/Collapse All button allows users to expand or collapse all rows, including nested rows. It provides quick access to more content but may impact readability when content is long or detailed.

#### Interactions

##### Default state

The Advanced Table supports any combination of expanded or collapsed rows on load. The button reflects the initial state.

![Expand all button with an expand icon.](/assets/components/table/advanced-table/expandable-rows-expand-all.png)
<Doc::ImageCaption @text="The “Expand All” button displays if any rows are currently collapsed" />

![Expand all button with a collapse icon.](/assets/components/table/advanced-table/expandable-rows-collapse-all.png)
<Doc::ImageCaption @text="“Collapse All” button displays if all rows are expanded." />

##### Collapsed state

![](/assets/components/table/advanced-table/expandable-rows-expand-state.png)
<Doc::ImageCaption @text="Clicking “Expand All” expands all rows, including nested rows."/>

##### Expanded state

![](/assets/components/table/advanced-table/expandable-rows-collapse-state.png)
<Doc::ImageCaption @text="Once all rows are expanded, the “Collapse All” button is displayed."/>

##### Mixed state

![](/assets/components/table/advanced-table/expandable-rows-mixed-state.png)
<Doc::ImageCaption @text="If some rows are expanded and others are collapsed, the “Expand All” button will persist until all rows are expanded."/>

### Striping

!!! Warning

**Accessibility alert**

Ensure that content within striped rows continue to maintain adequate color contrast with the striped background.
!!!

Striping enhances readability by alternating row colors, making it easier to scan tabular data.

- Non-Nested Advanced Tables: Striping starts with the second row, distinguishing it from the header.
- Nested Advanced Tables: Child rows are automatically striped, while parent rows remain unstriped to visually reinforce hierarchy. This behavior cannot be disabled.

![Advanced Tables with row striping have rows that alternate between white and light grey background color.](/assets/components/table/advanced-table/advanced-table-striping.png)

### Placement

!!! Info

**Differences between Figma and code**

The row placement property is only relevant within Figma and doesn’t exist as a property within the code.
!!!

Row placement determines the visual styling based on where the row is placed relative to other rows within the Advanced Table. Only cells with a column placement that is either start or end use the row placement property; column position middle does not use this property.

![The cell with column placement end and row placement end has a border radius set on the bottom right corner.](/assets/components/table/advanced-table/table-row-placement.png)

## Cells

### Density

- Use medium density by default for balanced readability and display.
- Choose short density for text-heavy tables to fit more rows on a page.
- Dense content can make tables harder to read and scan, so use it thoughtfully.

## Horizontal scrolling

Use horizontal scrolling when the number of columns expands beyond the viewport or container.

![](/assets/components/table/advanced-table/horizontal-scrolling.png)

## Sticky headers and columns

The Advanced Table supports setting the header and the first column as sticky or “pinned.” This can help users navigate large data sets while persisting important identifying values, such as names and IDs.

There are a few things to consider when implementing a sticky header or column:

- Instances of the Advanced Table with nested rows, expandable rows, and `colSpan` or `rowSpan` do not support a sticky column because what classifies as the first column is variable depending on these properties.
- Setting the first column as sticky in a table with multi-selection will couple the multi-select column and the first column of data together.

If `hasStickyFirstColumn` is set to true or false in the Ember component, a control will be exposed in the context menu allowing users to "Pin" and "Unpin" the first column in the Advanced Table.

![An Advanced Table with the context menu open and a single "Pin column" option](/assets/components/table/advanced-table/advanced-table-pin-column.png)

![An Advanced Table with a pinned column with the context menu open and a single "Unpin column" option](/assets/components/table/advanced-table/advanced-table-unpin-column.png)

!!! Info

We currently only support the first column as sticky. If you have needs beyond this, please [contact the Design Systems Team](/about/support) or [submit a request](https://go.hashi.co/hds-support).
!!!

## Multi-Select

!!! Info

**Nested rows limitations**

Multi-select and sorting are not supported for nested rows at this time.
!!!

Multi-select allows users to select multiple rows to perform bulk actions, such as deleting or exporting data. The Advanced Table maintains selection states across pagination and filtering, ensuring consistency when interacting with large datasets. For more details, check out the [Multi-Select Table Pattern.](https://helios.hashicorp.design/patterns/table-multi-select)

A multi-select pattern consists of:

1. A select all in the table's header row. This acts as the parent checkbox, allowing the simultaneous selection or deselection of all child rows in a single table.

![](/assets/components/table/advanced-table/table-multi-select-header.png)

2. Row level select allowing for the selection of an individual row.

![](/assets/components/table/advanced-table/table-multi-select-cells.png)
