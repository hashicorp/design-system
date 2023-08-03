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

## Alignment

The alignment of text and content within a table impacts the readability and speed at which users can effectively parse the information. The chosen alignment method depends on the content within the cell, purpose of the table, and relative position within the table.

!!! Info

While we don’t currently support internationalization in Helios, this documentation intentionally references alignment values in internationalized terms to make them more broadly applicable and future-proof.
!!!

### Consistent alignment

Use consistent alignment between the header label and the cell content.

!!! Do

![Table column placement example](/assets/components/table/table-alignment-do.png)
!!!

!!! Dont

![Table column placement example](/assets/components/table/table-alignment-dont.png)
!!!

### Start alignment

Align content to the start of the cell by default. This ensures readability across different content types, consistency in content of varying lengths, and alignment between the column header label and the content within the cell.

Use start alignment for:

- String and text-based content (unique identifiers or IDs, names and naming conventions, etc).
- Numerical values that do not contain decimals or floating point numbers.
- Numerical values that contain periods or other delimeter characters (IP addresses).
- Nested components that display a string or text value, e.g., a [Badge](/components/badge).

![Start alignment of content within a table](/assets/components/table/start-alignment-example.png)

### End alignment

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

### Other alignment methods

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

### Content

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

### Icon usage

Icons used within cells can help differentiate content, highlight additional metadata, increase the hierarchy of a value, or otherwise _enhance_ the text or value it is paired with. Use the outlined icon style by default and if contrast against other icons is important, use the filled style.

!!! Dont

Don’t use an icon as the sole communication method within a cell, even if the icon is explicit, e.g., a brand or service icon.

![Icon within a table without a label](/assets/components/table/icon-without-label.png)
!!!

!!! Dont

We don’t recommend using an icon to indicate the status of an object, row, or resource. Instead, consider using a [Badge](components/badge).

![Icons being used for status](/assets/components/table/icon-status.png)
!!!

#### Service icons

Use service icons within a cell to communicate the source or provider of a service.

![Service icon within a table](/assets/components/table/with-service-icon.png)

#### Grouping

Use icons to communicate commonalities between values or that a value is part of a larger object or hierarchical structure.

![Icons used for grouping in a table](/assets/components/table/icon-grouping.png)

#### Product branding

Use icons to communicate that a specific item is a HashiCorp product or resource.

![Icon product branding](/assets/components/table/icon-product-branding.png)

!!! Dont

Don’t use an [Icon Tile](/assets/components/icon-tile) in place of an icon within a table cell.

![Icon Tile within a table cell](/assets/components/table/icon-tile-product-branding.png)
!!!

#### Leading vs. trailing icons

In general, we recommend using **leading icons** because the text following the icon will remain aligned and thus be easier for the user to scan.

Take care not to mix and match different icon positions in the same column.

### Links within cells

!!! Info

This guidance is an extension of the [Inline Link](/components/link/inline) guidelines.
!!!

Within a table, use `secondary` (`Foreground / Strong`) links as the default.

Use `Body / 200 / Link` as the default typographic style within a table. This style increases the prominence a small amount to differentiate it from other string and non-interactive content.

![Link example](/assets/components/table/link-example.png)

#### Multiple links

If a table contains more than one column of links, consider using `Body / 200 / Link` for the most important link; usually the title of the row, ID, or other naming convention. For less important links use `Body / 200 / Regular` with an added underline in Figma.

![Multiple links within a table](/assets/components/table/multiple-links.png)

#### Long-form content

If a cell contains long-form or descriptive content, use the link style that is most appropriate for the hierarchy and frequency of links within the content. If there are a minimal number of links, `primary` styling may be appropriate, but if there are many links `secondary` styling may be more appropriate.

![Links in long-form content](/assets/components/table/longform-content-links.png)

## General content

While we are not prescriptive about what goes into a cell, there are some best practices to consider:

- We recommended keeping data within a column to one data type. Using more than one data type makes sorting difficult.
- While changing the text style/color within a cell is possible, we recommend only using Helios font styles and colors.
