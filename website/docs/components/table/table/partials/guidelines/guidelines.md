## Usage

### When to use

- When comparing, sorting, and filtering multi-dimensional data and objects.
- For data that only requires simple sorting or pagination, and does not require features like nested rows, advanced keyboard navigation, or sticky headers.

### When not to use

- As a layout mechanism. Instead, use [Flex](/layouts/flex) or [Grid](/layouts/grid) layout helpers.
- When data requires scrolling, more levels of hierarchy, or when keyboard navigation is needed to achieve usability. Instead, use the [Advanced Table](/components/table/advanced-table).

## Columns

### Sorting

While multiple columns may offer sorting, only one column can be sorted at a time. Sorting is not relevant for all content and should be applied thoughtfully.

![Header column sorting](/assets/components/table/table-sorting.png)

### Tooltips

Labels should be concise and straightforward. If more context is necessary, a [Tooltip](/components/tooltip) can be used in conjunction with the label, but should be used sparingly and as a last resort.

Some common examples where it may be useful to provide additional context in a tooltip include:

- When the label contains a product or HashiCorp-specific term.
- When the label refers to a setting that can be changed elsewhere in the application.

![Tooltips in a Header Column](/assets/components/table/table-tooltip-example.png)

!!! Dont

We recommend against using a tooltip in all or most column labels in a table as this can add unnecessary visual clutter and increase the cognitive load on the user.

![Tooltips in every column in a table](/assets/components/table/table-tooltip-dont.png)
!!!

### Width

Columns will fit the longest content in the column unless a specific column width has been declared.

### Placement

!!! Info

**Differences between Figma and code**

The column placement property is only relevant in Figma and doesn’t exist as a property in code.
!!!

Column placement determines the visual styling based on where the column is within the table structure.

![Table column placement example](/assets/components/table/table-col-placement.png)

### Alignment

The content's alignment can impact readability and scannability. The proper alignment method depends on the content type and its relative position in the table.

!!! Do

Use consistent alignment between the header label and the cell content in a column.

![Table column placement example](/assets/components/table/table-alignment-do.png)
!!!

!!! Dont

Avoid misaligned header labels and content.

![Table column placement example](/assets/components/table/table-alignment-dont.png)
!!!

#### Left alignment

By default, align content to the left. This lends itself to the default left-to-right reading order of most content types.

Use left alignment for:

- Strings (unique identifiers or IDs, names and naming conventions, etc).
- Numerical values that do not contain decimals or floating point numbers.
- Numerical values that contain periods or other delimiter characters (IP addresses).
- Nested components that display a string, e.g., a [Badge](/components/badge).

![Left alignment of content within a table](/assets/components/table/start-alignment-example.png)

#### Right alignment

Right alignment can be used when expressing numerical values with decimals as this aligns the decimal places vertically.

Common examples of right alignment include:

- Financial information, currency amounts, or other numbers with decimal values.
- In a column with a "more options" function.
- As a means to visually "bookend" the row with content that is of a similar length, e.g., timestamps, TTL (time-to-live) values, dates.

![Right alignment of content within a table](/assets/components/table/end-alignment-example.png)

![Right alignment example within a table with a date and more options](/assets/components/table/end-alignment-example-02.png)

!!! Dont

Don’t align content of varied lengths to the right. This can make it difficult to read by forcing an unnatural [reading pattern](/patterns/button-organization?tab=research#layout-and-reading-patterns).

![Right alignment with content that is variable in length](/assets/components/table/end-alignment-variable-length.png)

!!!

#### Other alignment methods

We don’t recommend centered or justified content alignment. These can be difficult to read, especially when the content varies in length.

!!! Dont

Don’t center header labels or cell content within a table.

![Example of centered content within a table](/assets/components/table/center-justified-alignment.png)
!!!

## Rows

### Striping

Striping always starts with the second row, distinguishing it from the header.

![Table striping examples](/assets/components/table/table-striping.png)

#### Benefits of striping

!!! Warning

**Accessibility alert**

Ensure that content within striped rows maintains adequate color contrast with the striped background.
!!!

While striping is not required, we recommend it because it enhances readability by alternating row colors, making it easier to scan the data.

![Table striping examples](/assets/components/table/table-striping.png)


### Placement

!!! Info

**Differences between Figma and code**

The row placement property is only relevant in Figma and doesn’t exist as a property in code.
!!!

The `rowPlacement` property determines the border radius of a cell. It is only available on cells where the `colPlacement` property is set to `start` or `end`. 

![Table row placement example](/assets/components/table/table-row-placement.png)

## Headers

- Labels in headers should be concise and straightforward.
- The label should clearly indicate what type of content is contained within the cell, e.g., Created date, Email, Project name.
- Labels should always use sentence-case.

## Cells

For the user to scan, sort, and filter the table easily, each cell should contain a single piece of data. Having more than one piece of data in a cell makes it harder for users to navigate the relationships between headers and cells.

### Density

- By default, use the `medium` density for balance and readability.
- To fit more rows on a page, use the `short` density. Use this only for text-heavy tables, as it can make them harder to scan.
- For a smaller dataset, e.g., basic user data, consider using the `tall` density to provide the content with more breathing room.

![Table cell density](/assets/components/table/table-density.png)

## Horizontal scrolling
Use horizontal scrolling when the number of columns exceeds the viewport or container. Use the [Advanced Table](/components/table/advanced-table) when keyboard navigation and sticky columns ease the reading experience for large datasets.

For more information on the types of approaches used to implement horizontal scrolling, refer to the [code tab](/components/table/table?tab=code#scrollable-table)

## Multi-select

Multi-select allows users to select multiple rows to perform bulk actions, such as deleting or exporting data. Selection states are maintained across pagination and filtering. 

A multi-select consists of: 

A "Select all" checkbox is used in the header row to allow the simultaneous selection or deselection of all child rows.

![Example of multi-select in a table header](/assets/components/table/multi-select-header.png)

Individual checkboxes added to each row allow for the selection of that row.

![Example of multi-select within table cells](/assets/components/table/multi-select-cells.png)

For more details around using a multi-select Table, recommended patterns, and intended interactions visit the [Multi-select patterns](/patterns/table-multi-select) documentation.

### Intended interaction

- When individual rows are selected, the "Select all" checkbox in the header displays an indeterminate state. 
- When no or some rows (but not all) are selected, clicking "Select all" in the header will check the checkbox, and all rows on that page will be selected.
- When all rows are selected, clicking "Select all" in the header will uncheck the checkbox, and all rows on that page will be deselected.
- An additional action outside of the Table is needed in order to select all rows across a paginated Table.

<video width="100%" controls loop>
  <source
    src="/assets/components/table/multi-selection-interaction-01.mp4"
    type="video/mp4"
  />
</video>