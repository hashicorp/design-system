## Usage

### When to use

- To display and organize tabular data.
- When comparing, sorting, and filtering multi-dimensional data and objects.

### When not to use

- As a layout mechanism.
- As a replacement for a spreadsheet or similar application.

## Columns

### Sorting

![Header column sorting](/assets/components/table/table-sorting.png)

- Sorting is not relevant for all content, so consider when to apply sorting thoughtfully.
- Columns that do contain a sortable data type are interactive and therefore have corresponding hover, active, and focus states.
- A Table may only be sorted by a single value at a time.

### Width

Column width is determined by manually resizing the header column and cells within Figma. As a best practice, column width should be adjusted to fit the longest data type within the cell.

### Placement

!!! Info

The column placement property is only relevant within Figma and doesn’t exist as a property in code.
!!!

Column placement determines the visual styling based on where the column is placed relative to other columns in the Table.

![Table column placement example](/assets/components/table/table-col-placement.png)

### Alignment

The alignment of text and content within a table impacts the readability and speed at which users can effectively parse the information. The chosen alignment method depends on the content within the cell, purpose of the table, and relative position within the table.

!!! Info

While we don’t currently support internationalization in Helios, this documentation intentionally references alignment values in internationalized terms to make them more broadly applicable and future-proof.
!!!

#### Consistent alignment

Use consistent alignment between the header label and the cell content.

!!! Do

![Table column placement example](/assets/components/table/table-alignment-do.png)
!!!

!!! Dont

![Table column placement example](/assets/components/table/table-alignment-dont.png)
!!!

#### Start alignment

Align content to the start of the cell by default. This ensures readability across different content types, consistency in content of varying lengths, and alignment between the column header label and the content within the cell.

Use start alignment for:

- String and text-based content (unique identifiers or IDs, names and naming conventions, etc).
- Numerical values that do not contain decimals or floating point numbers.
- Numerical values that contain periods or other delimiter characters (IP addresses).
- Nested components that display a string or text value, e.g., a [Badge](/components/badge).

![Start alignment of content within a table](/assets/components/table/start-alignment-example.png)

#### End alignment

End alignment can be used when expressing numerical values with decimals as this aligns the decimal places vertically.

Common examples of end alignment include:

- Financial information and currency amounts.
- Fractional and floating point values represented with decimals.

![End alignment of content within a table](/assets/components/table/end-alignment-example.png)

End alignment can also be used in the last column of a table to:

- Highlight a "more options" function pertaining to the content within a row.
- As a means to visually "bookend" the row with content that is of a similar length, e.g., timestamps, TTL (time-to-live) values, dates.

![End alignment example within a table with a date and more options](/assets/components/table/end-alignment-example-02.png)

!!! Dont

Don’t end align content that is variable in length. This can make the content more difficult to read by forcing an unnatural [reading pattern](patterns/button-organization?tab=research#layout-and-reading-patterns).

![End alignment with content that is variable in length](/assets/components/table/end-alignment-variable-length.png)

!!!

#### Other alignment methods

We don’t recommend center or justified alignment of content within a cell or table. These alignment methods can result in the content being difficult to read, especially if it is variable in length.

!!! Dont

Don’t center header labels or cell content within a table.

![Example of centered content within a table](/assets/components/table/center-justified-alignment.png)
!!!

## Rows

### Striping

![Table striping examples](/assets/components/table/table-striping.png)

While striping is not required, we recommend it for the added usability benefits.

When using striping in a Table, start with the second row to allow the Table Header to be further differentiated from the the row directly beneath it.

#### Benefits of striping

!!! Info

Striped rows use a subtle background color to differentiate from non-striped rows. Ensure that nested components within striped rows continue to meet contrast accessibility criteria.
!!!

- Striping makes data within the Table easier to read by increasing differentiation between rows.
- Striping increases ability to scan, especially for large datasets that result in many rows.
- Striping increases legibility when the type of data is similar between columns; e.g., columns that catalog mostly text or numerical data benefit from more differentiation between rows.

### Placement

!!! Info

The row placement property is only relevant within Figma and doesn’t exist as a property within the code.
!!!

Row placement determines the visual styling based on where the row is placed relative to other rows within the Table. Only cells with a column placement that is either `start` or `end` utilize the row placement property; column position `middle` does not utilize this property.

![Table row placement example](/assets/components/table/table-row-placement.png)

## Headers

- Headers should be clear, concise, and straightforward.
- The headers should infer clearly what type (string, number, status, etc) of content is contained within the cell.
- Headers should use sentence-case capitalization, not all-caps.

## Cells

### Density

![Table cell density](/assets/components/table/table-density.png)

- We recommend using `medium` cell density by default.
- If content is complex or a smaller data set (e.g., a Table of basic user data), `tall` cell density allows for more breathing room surrounding the content.
- If content is largely string/text-based, `short` allows for more content to be displayed within the page.
- While denser content allows for more rows to be displayed within a single page, it also makes comprehension and scanning more difficult.