## Usage

### When to use

- When comparing, sorting, and filtering multi-dimensional data and objects.
- For data that only requires simple sorting or pagination, and does not require features like nested rows, advanced keyboard navigation, or sticky headers.

### When not to use

- As a layout mechanism. Instead, use [Flex](/layouts/flex) or [Grid](/layouts/grid) layout helpers.
- When data would best be displayed in a scrollable format, with more levels of hierarchy, or when keyboard navigation is needed to achieve usability. Instead, use the [Advanced Table] (components/table/advanced-table)

## Columns

### Sorting

- Sorting is not relevant for all content. Consider when to apply sorting thoughtfully.
- A Table may only be sorted by a single value at a time.

![Header column sorting](/assets/components/table/table-sorting.png)

### Tooltips

Labels within the Table column header should be clear, concise, and straightforward. When additional context is necessary, a [Tooltip](/components/tooltip) can be used in conjunction with the label but should be used sparingly and as a last resort.

Some common examples where it may be useful to provide additional context in a tooltip include:

- When the label contains a product or HashiCorp-specific term.
- When the label refers to a setting that can be changed elsewhere in the application.

![Tooltips in a Header Column](/assets/components/table/table-tooltip-example.png)

!!! Dont

We recommend against using a tooltip in all or most column labels in a table as this can add unnecessary visual clutter and increase the cognitive load on the user.

![Tooltips in every column in a table](/assets/components/table/table-tooltip-dont.png)
!!!

### Width

Columns use as much room as they need to use to fit their content unless a specific column width has been declared.

### Placement

!!! Info

**Differences between Figma and code**

The column placement property is only relevant in Figma and doesn’t exist as a property in code.
!!!

The column placement property applies visual styling based on where the column is located relative to other columns in the Table.

![Table column placement example](/assets/components/table/table-col-placement.png)

### Alignment

The alignment of text and content within a Table impacts the readability and scannability speed for the content. The proper alignment method depends on the content within the cell, and relative position within the advanced table.

!!! Do

Use consistent alignment between the header label and the cell content within a column.

![Table column placement example](/assets/components/table/table-alignment-do.png)
!!!

!!! Dont

Avoid misaligned header labels and content.

![Table column placement example](/assets/components/table/table-alignment-dont.png)
!!!

#### Left alignment

Align content to the left of the cell by default. This lends itself to the default left-to-right reading order of most content types.

Use left alignment for:

- String and text-based content (unique identifiers or IDs, names and naming conventions, etc).
- Numerical values that do not contain decimals or floating point numbers.
- Numerical values that contain periods or other delimiter characters (IP addresses).
- Nested components that display a string or text value, e.g., a [Badge](/components/badge).

![Left alignment of content within a table](/assets/components/table/start-alignment-example.png)

#### Right alignment

Right alignment can be used when expressing numerical values with decimals as this aligns the decimal places vertically.

Common examples of right alignment include:

- Financial information, currency amounts, or other numbers with decimal values.
- In a column that highlights a "more options" function.
- As a means to visually "bookend" the row with content that is of a similar length, e.g., timestamps, TTL (time-to-live) values, dates.

![Right alignment of content within a table](/assets/components/table/end-alignment-example.png)

![Right alignment example within a table with a date and more options](/assets/components/table/end-alignment-example-02.png)

!!! Dont

Don’t right align content that is variable in length. This can make the content more difficult to read by forcing an unnatural [reading pattern](/patterns/button-organization?tab=research#layout-and-reading-patterns).

![Right alignment with content that is variable in length](/assets/components/table/end-alignment-variable-length.png)

!!!

#### Other alignment methods

We don’t recommend center or justified alignment of content within a cell or table. These alignment methods can result in the content being difficult to read, especially if it is variable in length.

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

Ensure that content within striped rows continue to maintain adequate color contrast with the striped background.
!!!

While striping is not required, we recommend it for the added usability benefits.

- Striping makes data within the Table easier to read by increasing differentiation between rows.
- Striping increases scannability, especially for large datasets that result in many rows.
- Striping increases legibility when the type of data is similar between columns; e.g., columns that catalog mostly text or numerical data benefit from more differentiation between rows.

![Table striping examples](/assets/components/table/table-striping.png)


### Placement

!!! Info

**Differences between Figma and code**

The row placement property is only relevant in Figma and doesn’t exist as a property in code.
!!!

Row placement determines the visual styling based on where the row is placed relative to other rows within the Table. Only cells with a column placement that is either `start` or `end` utilize the row placement property; column position `middle` does not utilize this property.

![Table row placement example](/assets/components/table/table-row-placement.png)

## Headers

- Labels in headers should be clear, concise, and straightforward.
- The label should clearly indicate what type of content is contained within the cell (e.g. Created date, Email, Project name).
- Labels should use sentence-case capitalization, not all-caps.

## Cells

In order for the user to be able to sort and read the table easily, each cell in a table should contain one piece of data. Having more than one piece of information inside a cell makes it harder for users to navigate the relationships between headers and content. 

### Density

- Use `medium` density by default for balanced readability and display.
- If content is largely string/text-based, `short` allows for more content to be displayed within the page.
- While denser content allows for more rows to be displayed within a single page, it also makes comprehension and scanning more difficult.
- If content is complex or a smaller data set (e.g., a Table of basic user data), `tall` cell density allows for more breathing room surrounding the content.

![Table cell density](/assets/components/table/table-density.png)

## Horizontal scrolling
Use horizontal scrolling when columns in a Table need to expand beyond the standard Table container. We recommend only implementing horizontal scrolling when data becomes difficult to read in a single view. Use the [Advanced Table](components/table/advanced-table), when keyboard navigation and sticky columns ease the reading experience for large data-sets.

For more information on the types of approaches used to implement horizontal scrolling, refer to the [code tab](/components/table/table?tab=code#scrollable-table)

## Multi-select

Multi-select allows users to select multiple rows to perform bulk actions, such as deleting or exporting data. 

A multi-select consists of: 

1. A select all in a table is used in the table's header row. This acts as the parent checkbox, allowing the selection or deselection of all child rows in a single table simultaneously.

![Example of multi-select in a table header](/assets/components/table/multi-select-header.png)

2. Row level select is used in each table row allowing for the selection of an individual row.

![Example of multi-select within table cells](/assets/components/table/multi-select-cells.png)

For more details around using a multi-select Table, recommended patterns, and intended interactions visit the [Multi-select patterns](/patterns/table-multi-select) documentation.

### Intended interaction

!!! Callout

This example covers basic multi-select table interactions. We're working to include more complex patterns for handling actions when multiple rows are selected and how this impacts filtering and pagination within a data set. For questions or concerns, please reach out to [#team-design-systems](https://hashicorp.enterprise.slack.com/archives/C7KTUHNUS)
!!!

- When individual rows are selected, the parent checkbox in the Table header changes to display an indeterminate state. 
- When no or some rows (but not all) are selected in a single Table, clicking the parent checkbox in the Table header will change to display as checked and all rows on that page will be selected.
- When all rows are selected in a single Table, the parent checkbox in the header appears as checked. Clicking the parent checkbox will deselect all rows on that page.
- An additional action outside of the Table is needed in order to select all rows across a paginated Table.

<video width="100%" controls loop>
  <source
    src="/assets/components/table/multi-selection-interaction-01.mp4"
    type="video/mp4"
  />
</video>