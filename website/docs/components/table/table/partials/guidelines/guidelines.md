## Usage

### When to use

- To display and organize tabular data.
- When comparing, sorting, and filtering multi-dimensional data.

### When not to use

- As a layout mechanism.
- As a replacement for a spreadsheet.

## Columns

### Header labels

Header labels should:

- Be clear and concise. 
- Imply the content type within the column cells, e.g., string, number, status, etc.
- Use sentence-case.

### Tooltips within headers

If header labels require more context, use a [Tooltip](/components/tooltip). Use them sparingly.

It may be useful to include additional context in a tooltip when:

- The label contains a product or HashiCorp-specific term.
- The label refers to a setting that can be changed elsewhere in the application.

![Tooltips in a Header Column](/assets/components/table/table-tooltip-example.png)

!!! Dont

Avoid including a tooltip for all or most header labels. This can add visual clutter and increase cognitive load.

![Tooltips in every column in a table](/assets/components/table/table-tooltip-dont.png)
!!!

### Column sorting

- Sorting is not necessary for all content types. Use it thoughtfully.
- Tables may only be sorted by a single column at a time.

![Header column sorting](/assets/components/table/table-sorting.png)

### Column alignment

- Content alignment impacts the readability and speed at which users can effectively parse information. 
- The chosen alignment method will depend on the table's purpose, the cell's content, and its position within the table.
- Use consistent alignment between the header label and the cell content.

!!! Do

![Table column placement example](/assets/components/table/table-alignment-do.png)
!!!

!!! Dont

![Table column placement example](/assets/components/table/table-alignment-dont.png)
!!!

#### Start alignment

Align content to the start by default. This ensures readability across different content types and content of varying lengths.

Use `start` alignment for:

- Text-based content, e.g., unique identifiers, names, etc.
- Numerical values that don't contain decimals or floating point numbers.
- Numerical values that contain periods or other delimiter characters, e.g., IP addresses.
- Nested components that display a text value, e.g., a [Badge](/components/badge).

![Start alignment of content within a table](/assets/components/table/start-alignment-example.png)

#### End alignment

When expressing numerical values with decimals, align content to the end. This aligns the decimal places vertically.

Use `end` alignment for:

- Financial information and currency.
- Fractional and floating point values.

![End alignment of content within a table](/assets/components/table/end-alignment-example.png)

Use `end` alignment in the last column of a table to:

- Include an overflow action, e.g., a "more options" button.
- Visually flank a row with content of a similar length, e.g., timestamps, TTL (time-to-live) values, dates.

![End alignment example within a table with a date and more options](/assets/components/table/end-alignment-example-02.png)

!!! Dont

Don’t align content that's variable in length to the end. This makes the content difficult to read by forcing an unnatural [reading pattern](/patterns/button-organization?tab=research#layout-and-reading-patterns).

![End alignment with content that is variable in length](/assets/components/table/end-alignment-variable-length.png)

!!!

#### Other alignment methods

We don’t recommend center or justified alignment. These alignment methods can make the content difficult to read, especially for variable lengths.

!!! Dont

Don’t center header labels or cell content within a table.

![Example of centered content within a table](/assets/components/table/center-justified-alignment.png)
!!!

### Column placement

Column placement determines the styling based on where the column is placed in the Table. _Column placement is a Figma-only property._

![Table column placement example](/assets/components/table/table-col-placement.png)

## Rows

### Striped tables

!!! Info

Striped rows use a subtle background color to differentiate from non-striped rows. Ensure that content within striped rows meets color contrast requirements.
!!!

We recommend using striping for its added usability benefits.

- Striping increases the ability to scan, especially for large datasets with many rows.
- Striping increases legibility when the data type is similar between columns, e.g., columns that contain mostly text or numerical data.

![Table striping examples](/assets/components/table/table-striping.png)

Striping should start in the second row so there's a differentiation between the table header and the first row.

![Table striping pattern example](/assets/components/table/table-striping-pattern.png)

### Row placement

Row placement determines the styling based on where the row is placed in the Table. _Row placement is a Figma-only property._

![Table row placement example](/assets/components/table/table-row-placement.png)

## Cell density

- Use `medium` cell density by default.
- Consider using `tall` cell density for smaller _or_ more complex data sets. This density provides more breathing room around the content.
- Consider using `short` cell density for primarily text-based content. This density allows more content to be displayed, but it can also make comprehension and scanning difficult.

![Table cell density](/assets/components/table/table-density.png)

## Multi-select

Multi-selection within a table allows users to select multiple rows at once.

For multi-selection to work, it must consists of: 

1. A parent checkbox in the table header. This allows the simultaneous selection or deselection of all child rows.

![Example of multi-select in a table header](/assets/components/table/multi-select-header.png)

2. A checkbox in each row allowing for the selection or deselection of an individual row.

![Example of multi-select within table cells](/assets/components/table/multi-select-cells.png)

### Multi-select states

!!! Info

Only rows on the visible page can be selected. An additional action is required outside of the table to select **all** rows within the table. The [multi-select pattern](https://helios.hashicorp.design/patterns/table-multi-select) documentation provides additional guidance about using multi-selection for performing bulk operations.
!!!

- When individual rows are selected, the checkbox in the Table header displays an indeterminate state. 
- When an indeterminate checkbox is clicked in the Table header, all rows within that page are selected. 
- When a selected checkbox is clicked in the Table header, all rows within that page are deselected.

<video width="100%" controls loop>
  <source
    src="/assets/components/table/multi-selection-interaction-01.mp4"
    type="video/mp4"
  />
</video>
