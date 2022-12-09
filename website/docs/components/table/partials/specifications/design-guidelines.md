## Header Column

### When to use

- To display and organize tabular data.
- When comparing, sorting, and filtering multi-dimensional data and objects.

### When not to use

- As a layout mechanism.
- As a replacement for a spreadsheet or similar application.

---

### Anatomy

![Table header anatomy](/assets/components/table/table-header_column-anatomy.png)

#### Label

Required

#### Sort direction

Options: none, indeterminate, ascending, descending

---

### Column placement

<section>
    <Hds::Table>
        <:head as |H|>
            <H.Tr>
                <H.Th>Start</H.Th>
                <H.Th>Middle</H.Th>
                <H.Th>End</H.Th>
            </H.Tr>
        </:head>
    </Hds::Table>
</section>

#### Usage

- Column placement determines the visual styling based on where the column is placed relatively to other columns in a table header.

_Banner (informational):_ The column placement property is only relevant within Figma design tooling and doesn't exist as a property within the production code component.

---

### Alignment

<section>
    <Hds::Table>
        <:head as |H|>
            <H.Tr>
                <H.Th>Start</H.Th>
                <H.Th>End</H.Th>
            </H.Tr>
        </:head>
    </Hds::Table>
</section>

#### Best practices

- Alignment of the header column should remain consistent within the cell (see best practices for alignment within the cell).
- Columns in the end position frequently utilize end-alignment when displaying non-string/text content.

---

### Sorting

![Header column sorting](/assets/components/table/table-header_column-sorting.png)

#### Best practices

- Sorting is not relevant for all content, therefore the default sort variant of the header column is none.
  - Whether a column is sortable is left up to the consumer building the table and should be addressed on a case-by-case basis.
- Columns that do not contain a sortable data type are interactive and therefore have corresponding hover, active, and focus states.
- A table may only be sorted by a single value at a time.

---

### State

![Header column state example](/assets/components/table/table-header_column-state.png)

_Banner (informational):_ Only header columns that contain a sortable data type have state variants. Non-sortable header columns are not interactive and therefore do not have interactive states.

---

### Header column pattern

Intentionally not defined as a component with HDS Figma tooling, the header column component is intended to be assembled into a larger table header pattern consisting of multiple columns.

<section>
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
</section>

---

### Column width

Within Figma column width is determined manually by resizing the header column and cells. As a best practice, column width should be adjusted to fit the longest data type within the cell.

---

### Content

#### Label

- Labels should be clear, concise, and straightforward.
- The label should infer clearly what type (string, number, status, etc) of content is contained within the cell.
- Labels should use sentence-case capitalization, not all-caps.

---

### Accessibility

**Can I use tooltips within the Header Column to provide additional information and/or context about a column?**

Since columns within the table header can control sorting within the table, the header column is not eligible to receive additional interactive elements such as tooltip/toggletip or other components that rely on interactivity to display content (nested interactive elements).

If you feel you need to use a tooltip, then there probably isn't enough contextual information about the table or the label within the header isn't clear enough.

![Example of a nested tooltip within a table header](/assets/components/table/table-header_column-nested_tooltip.png)

**How is focus handled within the table header?**

Focus is only relevant for columns that you define as sortable which is not a predefined or default property. While sorting by numerical and string-based values is helpful, sorting doesn't make sense for all data types within a table.

![Example of focus around a table header column](/assets/components/table/table-header_column-focus_example.png)
