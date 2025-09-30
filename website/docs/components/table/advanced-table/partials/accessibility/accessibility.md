## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Best practices

### Interactive rows

The table row element cannot receive interactions, meaning actions cannot be attached directly to a table row. If you need an interactive element, place it within a table cell element in that row (i.e., `<div role="gridcell"><a href="somelink.html">Some link</a></div>`).

### Focus in Advanced Tables

Unlike the Table component, Advanced Table supports keyboard navigation with focus states for each cell. For any other interactions, you must use interactive elements (buttons, links, etc.) within the cells. 

## Keyboard Navigation

The Advanced Table supports two keyboard interaction modes: Navigation Mode and Action Mode. These modes allow users to move through table data and interact with elements using a keyboard.

### Navigation Mode

<Doc::Badge @type="neutral">Tab</Doc::Badge>

When a user tabs into the Advanced Table, the first cell is focused.

![Keyboard focus on the sortable 'Artist' column header with sorting controls active.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-tab.png)
<Doc::BadgeGroup>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-left" @title="Left arrow" />
  </Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-right" @title="Right arrow" />
  </Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-up" @title="Up arrow" />
  </Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-down" @title="Down arrow" />
  </Doc::Badge>
</Doc::BadgeGroup>

Arrow keys move focus to cells in the direction of the input. If the table extends beyond the screen, arrow keys allow movement to access hidden columns.

![Keyboard focus on 'The Beatles' row using the arrow key.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-arrow-key-down.png)
<Doc::BadgeGroup>
  <Doc::Badge @type="neutral">Fn</Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-left" @title="Left arrow" />
  </Doc::Badge>
</Doc::BadgeGroup>

Move focus to the first cell in the row.

![Keyboard focus on 'The Beatles' row using the arrow key.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-fn-left.png)
<Doc::BadgeGroup>
  <Doc::Badge @type="neutral">Fn</Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-right" @title="Right arrow" />
  </Doc::Badge>
</Doc::BadgeGroup>

Move focus to the last cell in the row.

![Keyboard focus on 'The Beatles' row using the arrow key.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-fn-right.png)

<Doc::BadgeGroup>
  <Doc::Badge @type="neutral">Fn</Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-up" @title="Up arrow" />
  </Doc::Badge>
</Doc::BadgeGroup>

Move focus to the first cell in the column.

![Keyboard focus on 'The Beatles' row using the arrow key.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-fn-up.png)

<Doc::BadgeGroup>
  <Doc::Badge @type="neutral">Fn</Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-down" @title="Down arrow" />
  </Doc::Badge>
</Doc::BadgeGroup>

Move focus to the last cell in the column.

![Keyboard focus on 'The Beatles' row using the arrow key.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-fn-down.png)

### Action Mode

<Doc::Badge @type="neutral">Enter</Doc::Badge>

Press Enter in Navigation Mode to enable Action Mode and interact with elements inside a cell. Focus will move to the first actionable element.

![Keyboard focus on the sortable 'Artist' column header with sorting controls active.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-sort.png)

<Doc::Badge @type="neutral">Enter</Doc::Badge>

Press Enter again to trigger the action.

![Keyboard focus on 'The Beatles' link inside the table.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-link.png)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Use Tab to navigate between actions within the cell.

![Tooltip appears on focus for the info icon in the 'Artist' column header.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-tooltip.png)

<Doc::Badge @type="neutral">Escape</Doc::Badge>

Returns to navigation mode.

![Keyboard focus on 'The Beatles' row using the arrow key.](/assets/components/table/advanced-table/advanced-table-keyboard-navigation-tab.png)

### Resizing columns

<Doc::Badge @type="neutral">Tab</Doc::Badge>

While in Action Mode, Tab to the context menu.

![Keyboard focus on the context menu within the column header.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-resize.png)

<Doc::Badge @type="neutral">Enter</Doc::Badge>

Press Enter to open the context menu.

![The open context menu with two options; resize column, and reset column width.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-resize-context-menu.png)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

With the context menu open, press Tab to select the `Resize column` option.

![Keyboard focus on the resize column option in the context menu.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-resize-column.png)

<Doc::BadgeGroup>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-left" @title="Left arrow" />
  </Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-right" @title="Right` arrow" />
  </Doc::Badge>
</Doc::BadgeGroup>

Focus will be moved to the resize border. Use the right and left arrow keys to increase or decrease the width of the column in `10px` increments.

![Keyboard focus on the resize border for the column.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-resize-border.png)

### Reordering columns

<Doc::Badge @type="neutral">Tab</Doc::Badge>

While in Action Mode, Tab to the context menu.

![Keyboard focus on the context menu within the column header.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-resize.png)

<Doc::Badge @type="neutral">Enter</Doc::Badge>

Press Enter to open the context menu.

![The open context menu with the move column option.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-resize-context-menu.png)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

With the context menu open, press Tab to select the `Move column` option.

![Keyboard focus on the move column option in the context menu.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-resize-column.png)

<Doc::BadgeGroup>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-left" @title="Left arrow" />
  </Doc::Badge>
  <Doc::Badge @type="neutral">
    <Hds::Icon @name="arrow-right" @title="Right` arrow" />
  </Doc::Badge>
</Doc::BadgeGroup>

Focus will be moved to the reorder handle. Use the right and left arrow keys to move the column to the next or previous position.

![Keyboard focus on the reorder handle for the column.](/assets/components/table/advanced-table/advanced-table-keyboard-action-mode-resize-border.png)


### Row selection

You should clearly communicate to the user how many rows are selected and how many rows there are total outside of the Advanced Table. For additional considerations, read the [Multi-select usability and accessibility considerations](/components/table/advanced-table?tab=code#usability-and-accessibility-considerations).

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.3" "2.4.7" "4.1.2" }} />

---

<Doc::A11ySupport />
