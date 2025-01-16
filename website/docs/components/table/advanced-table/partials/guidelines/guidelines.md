## Usage

### When to use

- When large datasets need to be viewed in a scrollable container instead of with pagination.
- When displaying hierarchical data that allows users to expand rows to reveal related data without leaving the table.
- When advanced keyboard navigation is required, such as moving between cells, focusing and interacting with expandable rows, and managing nested structures.
- When implementing complex interactions like multi-select, nested rows, or expendable content, which are not supported in the standard Table.

### When not to use

- If sorting and pagination are sufficient for your dataset, use the standard Table instead.
- When displaying static or minimal data that doesn’t require advanced interactivity.
- When a visual representation like charts or graphs better conveys the data.
- As a layout mechanism for structuring content that isn’t tabular data.
- When replicating spreadsheet-like functionality with extensive in-cell editing or calculations.

## Columns

### Sorting

![Header column sorting](/assets/components/table/advanced-table/table-sorting.png)

- Sorting is not relevant for all content, so consider when to apply sorting thoughtfully.
- Columns with sorting enabled are interactive and include hover, active, and focus states.
- An Advanced Table may only be sorted by a single column at a time.


### Tooltips

Labels within the Advanced Table column should be clear, concise, and straightforward. In the case that more context or details are necessary, a [Tooltip](/components/tooltip) can be used in conjunction with the label but should be used sparingly and as a last resort.

![Tooltips in a Header Column](/assets/components/table/advanced-table/table-tooltip-example.png)

Some examples where it may be useful to include additional context in a tooltip include:
- When the label contains a product or HashiCorp-specific term.
- When the label refers to a setting that can be changed elsewhere in the application.


## Width 

Column width is determined by manually resizing the header column and cells within Figma. As a best practice, column width should be adjusted to fit the longest data type within the cell.

## Placement

!!! Info

The column placement property is only relevant within Figma and doesn’t exist as a property in code.
!!!

Column placement determines the visual styling based on where the column is placed relative to other columns in the Advanced Table.

![Advanced Table column placement example](/assets/components/table/advanced-table/table-col-placement.png)

## Alignment

The alignment of text and content within an Advanced Table impacts the readability and speed at which users can effectively parse the information. The chosen alignment method depends on the content within the cell, and relative position within the advanced table.

!!! Info 
Helios uses left and right for alignment to match the Ember component API. This documentation follows that convention for consistency across design and development.
!!!

!!! Do

![Advanced Table column placement example](/assets/components/table/advanced-table/table-alignment-do.png)
!!!

!!! Dont

![Advanced Table column placement example](/assets/components/table/advanced-table/table-alignment-dont.png)
!!!

### Start alignment

Align content to the start of the cell by default. This ensures readability across different content types, consistency in content of varying lengths, and alignment between the column header label and the content within the cell.
- Use start alignment for:
String and text-based content (unique identifiers or IDs, names and naming conventions, etc).
- Numerical values that do not contain decimals or floating point numbers.
- Numerical values that contain periods or other delimiter characters (IP addresses).
Nested components that display a string or text value, e.g., a [Badge](/components/badge).

![Start alignment of content within an Advanced Table](/assets/components/table/advanced-table/start-alignment-example.png)

### End alignment 

End alignment can be used when expressing numerical values with decimals as this aligns the decimal places vertically.
Common examples of end alignment include:
- Financial information and currency amounts.
- Fractional and floating point values represented with decimals.

![End alignment of content within a table](/assets/components/table/advanced-table/end-alignment-example.png)

End alignment can also be used in the last column of an advanced table to:
- Highlight a "more options" function pertaining to the content within a row.
- As a means to visually "bookend" the row with content that is of a similar length, e.g., timestamps, TTL (time-to-live) values, dates.

![End alignment example within a table with a date and more options](/assets/components/table/advanced-table/end-alignment-example-02.png)

!!! Dont

Don’t end align content that is variable in length. This can make the content more difficult to read by forcing an unnatural [reading pattern](/patterns/button-organization?tab=research#layout-and-reading-patterns).

![End alignment with content that is variable in length](/assets/components/table/advanced-table/end-alignment-variable-length.png)
!!!

### Other alignment methods

We don’t recommend center or justified alignment of content within a cell or advanced table. These alignment methods can result in the content being difficult to read, especially if it is variable in length.

!!! Dont

Don’t center header labels or cell content within a table.

![Example of centered content within an Advanced Table](/assets/components/table/center-justified-alignment.png)
!!!

## Expandable rows

### Striping 

![Table striping examples](/assets/components/table/advanced-table/advanced-table-striping.png)

Striping enhances readability by alternating row colors, making it easier to scan tabular data.
- Non-Nested Advanced Tables: Striping starts with the second row, distinguishing it from the header.
- Nested Advanced Tables:Child rows are automatically striped, while parent rows remain unstriped to visually reinforce hierarchy. This behavior cannot be disabled.

Striping improves clarity for numerical or text-heavy data and ensures hierarchical relationships are visually distinct. For non-nested Advanced Tables, striping is optional and must be enabled with an argument. Always verify adequate color contrast when using striping.

!!! Info

Ensure that nested components within striped rows continue to maintain adequate color contrast with the striped background.
!!!

### Expandable rows

Expandable rows allow users to expand or collapse additional content within the table structure.

![Advanced Table expandable rows examples](/assets/components/table/advanced-table/expandable-rows.png) 

### When to use

- When organizing hierarchical data into parent-child relationships, allowing users to expand or collapse details as needed.

!!! Dont

Avoid when data does not require structured parent-child relationships.

![Advanced Table column placement example](/assets/components/table/advanced-table/advanced-table-dont-parent-nested.png)
!!!

## Interaction

- Expanding a parent row reveals its child rows, maintaining indentation for clear relationships.
- Users can navigate between cells using arrow keys. To expand or collapse a row, they must first focus on the expand button using the arrow keys, then press Enter to activate it.
- When scrolling down, the header row remains visible, allowing users to reference column labels while interacting with nested rows.
- Expanding a row moves focus to the first child row, while collapsing returns focus to the parent row.

### Considerations for nested rows

- Use the same density setting for parent and child rows to keep layouts consistent.
- Check that striping and background shading maintain proper contrast.

### Placement

!!! Info

The row placement property is only relevant within Figma and doesn’t exist as a property within the code.
!!!

Row placement determines the visual styling based on where the row is placed relative to other rows within the Advanced Table. Only cells with a column placement that is either start or end utilize the row placement property; column position middle does not utilize this property.

![Table row placement example](/assets/components/table/advanced-table/table-row-placement.png)

## Headers

- Labels in headers should be clear, concise, and straightforward.
- The label should infer clearly what type of content is contained within the cell (string, number, status, etc).
- Labels should use sentence-case capitalization, not all-caps.

When sticky headers are enabled, the label in each column remains visible as the user scrolls. This can be useful for large data sets where the user might need to constantly reference the label.

![Advanced Table sticky header example](/assets/components/table/advanced-table/advanced-table-sticky-header.png)  

## Cells

### Density

![Table cell density](/assets/components/table/advanced-table/table-density.png)

- We recommend using medium cell density by default.
- If content is largely string/text-based, short allows for more content to be displayed within the page.
- While denser content allows for more rows to be displayed within a single page, it also makes comprehension and scanning more difficult.

### Column/Row Span

- Supports merging multiple columns or rows.
- Use column and row spans carefully to avoid misalignment or breaking table interactions.
- Multi-span cells should use the same alignment for readability.

![Table cell density](/assets/components/table/advanced-table/colspan-table-example.png)

### Horizontal scrolling

- Needed when there are many columns of equal priority.
- Place the Advanced Table in a scrollable container for smooth side-scrolling.

![Advanced Table horizontal scrolling](/assets/components/table/advanced-table/horizontal-scrolling.png)

## Keyboard navigation

There are two modes when using a keyboard to interact with the Advanced Table: navigation and action.

### Navigation mode

When the user moves focus into the Advanced Table (tab key), the first cell will be focused, putting them into navigation mode and allowing the user to navigate freely with their arrow keys. Other keys within navigation mode include: 

- Home (fn + left): Move focus to the row's first cell.
- End (fn + right): Move focus to the row's last cell.
- PageUp (fn + up): Moves focus to the first cell in the column.
- PageDown (fn + down): Moves focus to the last cell in the column.
- Horizontal Scrolling: Arrow keys allow horizontal movement to access hidden columns if the Table extends beyond the screen width.

### Action mode

When the user is in navigation mode, pressing enter will activate action mode, where:

- If a cell contains a single interactive element, pressing Enter will focus on that element instead of executing it immediately.
- If there is more than one interactive element within the cell, the first element will be focused, allowing the user to tab between them.
- Pressing escape will take the user out of action mode and back into navigation mode.

### Multi-Select

Multi-select allows users to select multiple rows to perform bulk actions, such as deleting or exporting data. The Advanced Table maintains selection states across pagination and filtering, ensuring consistency when interacting with large datasets. However, multi-select and sorting are not supported for nested rows at this time. For more details, check out the [Multi-Select Table Pattern.](https://helios.hashicorp.design/patterns/table-multi-select)

A multi-select pattern consists of:

1. A select all in the table's header row. This acts as the parent checkbox, allowing the selection or deselection of all child rows in a single table simultaneously.

![Example of multi-select in a table header](/assets/components/table/advanced-table/table-multi-select-header.png)

2. Row level select allowing for the selection of an individual row.

![Example of multi-select within table cells](/assets/components/table/advanced-table/table-multi-select-cells.png)