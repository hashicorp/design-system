## Usage

### When to use

- To display and organize tabular data.
- When comparing, sorting, and filtering multi-dimensional data and objects.

### When not to use

- As a layout mechanism.
- As a replacement for a spreadsheet or similar application.

### Column placement

<Hds::Table>
    <:head as |H|>
        <H.Tr>
            <H.Th>Start</H.Th>
            <H.Th>Middle</H.Th>
            <H.Th>End</H.Th>
        </H.Tr>
    </:head>
</Hds::Table>

Column placement determines the visual styling based on where the column is placed relatively to other columns in a table header.

!!! Info

The column placement property is only relevant within Figma design tooling and doesn't exist as a property within the production code component.

!!!

### Alignment

<Hds::Table>
    <:head as |H|>
        <H.Tr>
            <H.Th>Start</H.Th>
            <H.Th>End</H.Th>
        </H.Tr>
    </:head>
</Hds::Table>

#### Alignment Best practices

- Alignment of the header column should remain consistent within the cell (see best practices for alignment within the cell).
- Columns in the end position frequently use end-alignment when displaying non-string/text content.

### Sorting

![Header column sorting](/assets/components/table/table-header_column-sorting.png)

#### Sorting Best practices

- Sorting is not relevant for all content, therefore the default sort variant of the header column is none.
    - Whether a column is sortable is left up to the consumer building the table and should be addressed on a case-by-case basis.
- Columns that do contain a sortable data type are interactive and therefore have corresponding hover, active, and focus states.
- A table may only be sorted by a single value at a time.

### Header column pattern

Intentionally not defined as a component with HDS Figma tooling, the header column component is intended to be assembled into a larger table header pattern consisting of multiple columns.

<Hds::Table>
    <:head as |H|>
        <H.Tr>
            <H.Th>Full name</H.Th>
            <H.Th>Projects</H.Th>
            <H.Th>Email address</H.Th>
            <H.Th>Status</H.Th>
            <H.Th>Created by</H.Th>
            <H.Th>Options</H.Th>
        </H.Tr>
    </:head>
</Hds::Table>

### Column width

Within Figma, column width is determined manually by resizing the header column and cells. As a best practice, column width should be adjusted to fit the longest data type within the cell.

## Content

### Label

- Labels should be clear, concise, and straightforward.
- The label should infer clearly what type (string, number, status, etc) of content is contained within the cell.
- Labels should use sentence-case capitalization, not all-caps.
