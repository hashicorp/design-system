## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Best practices

### Interactive rows

The table row element cannot receive interactions, meaning actions cannot be attached directly to a table row. If you need an interactive element, place it within a table cell element in that row (i.e., `<div role="gridcell"><a href="somelink.html">Some link</a></div>`).

### Focus in Advanced Tables

Unlike the Table component, each cell receives focus in the Advanced Table to support users navigating through the table efficiently with a keyboard. For any other interactions, you must use interactive elements (buttons, links, etc.) within the cells. 

## Keyboard Navigation

The Advanced Table supports two keyboard interaction modes: Navigation Mode and Action Mode. These modes allow users to move through table data and interact with elements using only a keyboard.

### Navigation Mode

When a user moves focus into the Advanced Table (Tab key), the first cell is focused, enabling Navigation Mode. In this mode, users can move freely between cells using arrow keys:

- Home (fn + left) – Move focus to the first cell in the row.
- End (fn + right) – Move focus to the last cell in the row.
- Page Up (fn + up) – Move focus to the first cell in the column.
- Page Down (fn + down) – Move focus to the last cell in the column.
- Arrow Keys – Navigate between adjacent cells.
- Horizontal Scrolling – Arrow keys allow movement to access hidden columns when the table extends beyond the screen width.

### Action Mode

Pressing Enter while in Navigation Mode switches the user to Action Mode, allowing interaction with elements inside a cell:

- If a cell contains one interactive element, pressing Enter will focus on that element instead of activating it immediately.
- If a cell contains multiple interactive elements, the first element will be focused, and the user can Tab between them.
- Pressing Escape exits Action Mode and returns the user to Navigation Mode.

<video width="100%" controls loop>
  <source
    src="/assets/components/table/advanced-table/advanced-table-keyboard-navigation.mov"
    type="video/mp4"
  />
</video>

### Row selection

You should clearly communicate to the user how many rows are selected and how many rows there are total outside of the Advanced Table. For additional considerations, read the [Multi-select usability and accessibility considerations](/components/table/advanced-table?tab=code#usability-and-accessibility-considerations).

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.3" "2.4.7" "4.1.2" }} />

---

<Doc::A11ySupport />
