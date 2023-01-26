## Usage

### When to use

- To display and organize tabular data.
- When comparing, sorting, and filtering multi-dimensional data and objects.

### When not to use

- As a layout mechanism.
- As a replacement for a spreadsheet or similar application.

## Columns

### Sorting

![Header column sorting](/assets/components/table/table-sorting.png =1000x*)

- Sorting is not relevant for all content, so consider when to apply sorting thoughtfully.
- Columns that do contain a sortable data type are interactive and therefore have corresponding hover, active, and focus states.
- A Table may only be sorted by a single value at a time.

### Width

Column width is determined by manually resizing the header column and cells within Figma. As a best practice, column width should be adjusted to fit the longest data type within the cell.

### Alignment

Use consistent alignment throughout the Table. We recommend using end-alignment in the last column when displaying non-text based content. 

!!! Do

![Table column placement example](/assets/components/table/table-alignment-do.png =500x*)
!!!

!!! Dont

![Table column placement example](/assets/components/table/table-alignment-dont.png =500x*)
!!!

### Placement

!!! Info

The column placement property is only relevant within Figma and doesn’t exist as a property within the code.
!!!

Column placement determines the visual styling based on where the column is placed relative to other columns in the Table.

![Table column placement example](/assets/components/table/table-col-placement.png =750x*)

## Rows

### Striping

![Table striping examples](/assets/components/table/table-striping.png =810x*)

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

![Table row placement example](/assets/components/table/table-row-placement.png =819x*)

## Headers

### Content

- Headers should be clear, concise, and straightforward.
- The headers should infer clearly what type (string, number, status, etc) of content is contained within the cell.
- Headers should use sentence-case capitalization, not all-caps.

## Cells

### Density

![Table cell density](/assets/components/table/table-density.png =798x*)

- We recommend using `medium` cell density by default.
- If content is complex or a smaller data set (e.g., a Table of basic user data), `tall` cell density allows for more breathing room surrounding the content.
- If content is largely string/text-based, `short` allows for more content to be displayed within the page.
- While denser content allows for more rows to be displayed within a single page, it also makes comprehension and scanning more difficult.

### Content

While we are not prescriptive about what goes into a cell, there are some best practices to consider:

- We recommended keeping data within a column to one data type. Using more than one data type makes sorting almost impossible.
- While it‘s possible to change the text style/color within a cell, we recommended only using Helios font styles.

### Icon usage

Icons nested within cells can help differentiate content, see status, and increase the hierarchy of a piece of data or object. Use the outlined icon style by default and if contrast against other icons is important, use the filled style.

Icons should rarely be used without a text label. A label helps reinforce the purpose and communication of the icon and can reduce ambiguity when expressing complex data.

!!! Do

![Example of proper icon usage in tables](/assets/components/table/table-nested-icons-do.png =726x*)
!!!

#### Leading vs. trailing icons

Both leading and trailing icons increase the visual weight of the content within the cell, so use icons intentionally throughout Tables. Take care not to mix and match different icon positions in the same column. 

In general, we recommend using **leading icons** because the text following the icon will remain aligned and thus be easier for the user to scan. 

!!! Do

![Example of proper icon placement in tables](/assets/components/table/table-icons-placement-do.png =784x*)
!!!

!!! Dont

![Example of proper icon placement in tables](/assets/components/table/table-icons-placement-dont.png =380x*)
!!!