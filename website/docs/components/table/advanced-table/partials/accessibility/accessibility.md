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

When a user tabs into the Advanced Table, the first cell is focused. Arrow keys move between cells.

<Doc::Badge @type="neutral">Tab</Doc::Badge>

![Keyboard focus on the sortable 'Artist' column header with sorting controls active.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-tab.png =402x*)

<Doc::Badge @type="neutral">Arrow key Down</Doc::Badge>

![Keyboard focus on 'The Beatles' row using the arrow key.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-arrow-key-down.png =402x*)

**Home (fn + left)**
Move focus to the first cell in the row.

**End (fn + right)**
Move focus to the last cell in the row.

**Page Up (fn + up)**
Move focus to the first cell in the column.

**Page Down (fn + down)**
Move focus to the last cell in the column.

**Horizontal Scrolling**
If the table extends beyond the screen, arrow keys allow movement to access hidden columns.

### Action Mode

Press Enter in Navigation Mode to enter Action Mode and interact with elements inside a cell.

<Doc::Badge @type="neutral">Enter</Doc::Badge>

![Keyboard focus on 'The Beatles' link inside the table.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-link.png =402x*)

**Enter**
- If the cell contains one interactive element, focus moves to that element instead of activating it.
- If multiple interactive elements exist, focus moves to the first one. Use Tab to navigate between them.

<Doc::Badge @type="neutral">Enter</Doc::Badge>

![Keyboard focus on the sortable 'Artist' column header with sorting controls active.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-sort.png =402x*)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

![Tooltip appears on focus for the info icon in the 'Artist' column header.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-tooltip.png =402x*)

**Escape**
Returns to navigation mode.

<Doc::Badge @type="neutral">Escape</Doc::Badge>

![Keyboard focus on 'The Beatles' row using the arrow key.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-arrow-key-down.png =402x*)

### Row selection

You should clearly communicate to the user how many rows are selected and how many rows there are total outside of the Advanced Table. For additional considerations, read the [Multi-select usability and accessibility considerations](/components/table/advanced-table?tab=code#usability-and-accessibility-considerations).

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.3" "2.4.7" "4.1.2" }} />

---

<Doc::A11ySupport />
