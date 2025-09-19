## Component API

The Advanced Table component itself is where most of the options will be applied. However, the APIs for the child components are also documented here in case a custom implementation is desired.

### AdvancedTable

<Doc::ComponentApi as |C|>
  <C.Property @name="<:body>" @type="named block">
    This is a named block where the content for the Advanced Table body is rendered.
    <Doc::ComponentApi as |C|>
      <C.Property @name="[B].rowIndex" @type="number | string">
        The value of the index associated with the `@each` loop. Returns a number when there are no nested rows. Returns a string in the form `${parentIndex}.${childIndex}` when there are nested rows.
      </C.Property>
      <C.Property @name="[B].sortBy" @type="string">
        The value of the internal `sortBy` tracked variable.
      </C.Property>
      <C.Property @name="[B].sortOrder" @type="string">
        The value of the internal `sortOrder` tracked variable.
      </C.Property>
      <C.Property @name="[B].isExpanded" @type="boolean">
        Returns the value of the internal `isExpanded` tracked variable from the row if it has nested rows; otherwise returns `undefined`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="model" @type="array">
    The data model to be used by the Advanced Table. **This array should be treated as immutable. Any updates must be made by passing a new array.** The model can have any shape, but for nested rows there are two expected keys.
    <Doc::ComponentApi as |C|>
      <C.Property @name="children" @type="array">
        If there are nested rows, the Advanced Table will use the `children` key in the model to render the child content. The key can be changed by setting `childrenKey` argument on the `Hds::AdvancedTable`.
      </C.Property>
      <C.Property @name="isExpanded" @type="boolean">
        If there are nested rows, the default state of the toggle can be set by adding `isExpanded` to the row in the model.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="columns" @type="array">
    Array `hash` that defines each column with key-value properties that describe each column. Options:
    <Doc::ComponentApi as |C|>
      <C.Property @name="label" @type="string" @required={{true}}>
      The column’s label.
      </C.Property>
      <C.Property @name="key" @type="string">
      The column’s key (one of the keys in the model’s records); required if the column is sortable.
      </C.Property>
      <C.Property @name="isSortable" @type="boolean" @default="false">
        If set to `true`, indicates that a column should be sortable.<br><br>
        **Important**: Advanced Table does **not** support setting `isSelectable` to true when there are nested rows.
      </C.Property>
      <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
        Determines the horizontal content alignment (sometimes referred to as text alignment) for the column header.
      </C.Property>
      <C.Property @name="width" @type="string" @valueNote="Any valid CSS">
        If set, determines the column’s width.
      </C.Property>
      <C.Property @name="minWidth" @type="string" @default="150px">
        If set, determines the column’s minimum width when resizing. Accepts any positive CSS pixel value (e.g., 1px).
        <Doc::Banner @type="info">
          Overriding the default `minWidth` requires the `width` property to be set.
        </Doc::Banner>
      </C.Property>
      <C.Property @name="maxWidth" @type="string" @default="800px">
        If set, determines the column’s maximum width when resizing. Accepts any positive CSS pixel value (e.g., 1px).
        <Doc::Banner @type="info">
          Overriding the default `maxWidth` requires the `width` property to be set.
        </Doc::Banner>
      </C.Property>
      <C.Property @name="isVisuallyHidden" @type="boolean" @default="false">
        If set to `true`, it visually hides the column’s text content (it will still be available to screen readers for accessibility). <em>Only available for non-sortable columns.</em>
      </C.Property>
      <C.Property @name="sortingFunction" @type="function">
        Callback function to provide support for custom sorting logic. It should implement a typical bubble-sorting algorithm using two elements and comparing them. For more details, see the example of custom sorting in the [How To Use section](#sortable-advanced-table).
      </C.Property>
      <C.Property @name="tooltip" @type="string">
        Text string which will appear in [`Tooltip`](/components/tooltip). May contain basic HTML tags for formatting text such as `strong` and `em` tags. Not intended for multi-paragraph text or other more complex content. May not contain interactive content such as links or buttons. The `placement` and `offset` are automatically set and can’t be overwritten.
      </C.Property>
      <C.Property @name="isExpandable" @type="boolean">
        If there are nested rows, an expand all button can be added in the header by adding `isExpandable: true` to the desired column.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="columnOrder" @type="array">
    Array of column keys that determines the initial order of table columns. Keys in this array must match `key` values present in objects in the `columns` argument.
  </C.Property>
  <C.Property @name="hasReorderableColumns" @type="boolean" @default="false">
    If set to `true`, allows users to reorder columns either by clicking and dragging on the column reorder handle with a mouse, or by moving focus to the handle with a keyboard and using the right and left arrow keys.
  </C.Property>
  <C.Property @name="reorderedMessageText" @type="string" @default="Moved (label) column to (position)">
    Customizable text added to `caption` element when a column reorder is performed.
  </C.Property>
  <C.Property @name="hasResizableColumns" @type="boolean" @default="false">
    If set to `true`, allows users to resize columns either by clicking and dragging on the column border with a mouse, or by moving focus to the resize border with a keyboard and using the right and left arrow keys.
  </C.Property>
  <C.Property @name="onColumnReorder" @type="function">
    Use in conjunction with `hasReorderableColumns` to pass a callback function to know the updated column order after a reorder event.
    <br /><br />
    When called, this function receives one positional argument:
    <ul>
    <li>an array of reordered column keys (e.g., `['name', 'age', 'height']`).</li>
    </ul>
  </C.Property>
  <C.Property @name="onColumnResize" @type="function">
    Use in conjunction with `hasResizableColumns` to pass a callback function to know the updated width of a resized column.
    <br /><br />
    When called, this function receives two positional arguments:
    <ul>
    <li>the `key` value of the resized column.</li>
    <li>the new width of the resized columns as CSS pixel value (e.g., 1px).</li>
    </ul>
  </C.Property>
  <C.Property @name="sortBy" @type="string">
    If defined, the value should be set to the key of the column that should be pre-sorted.
  </C.Property>
  <C.Property @name="sortOrder" @type="string" @values={{array "asc" "desc" }} @default="asc">
    Use in conjunction with `sortBy`. If defined, indicates which direction the column should be pre-sorted in. If not defined, `asc` is applied by default.
  </C.Property>
  <C.Property @name="isSelectable" @type="boolean" @default="false">
    If set to `true`, creates a “multi-select” table which renders checkboxes in the table header and on the table rows enabling bulk interaction. Use in conjunction with `onSelectionChange` on the `Table` and `selectionKey` on each `Table::Tr`.<br><br>
    **Important**: Advanced Table does **not** support having `isSelectable` true when there are nested rows.
  </C.Property>
  <C.Property @name="onSelectionChange" @type="function">
    Use in conjunction with `isSelectable` to pass a callback function to know the selection state. Must be used in conjunction with setting a `selectionKey` on each `Table::Tr`.
    <br /><br />
    When called, this function receives an object as argument, with different keys corresponding to different information:
    <ul>
    <li>`selectionKey`: the value of the `@selectionKey` argument associated with the row selected/deselected by the user or `all` if the “select all” checkbox has been toggled</li>
    <li>`selectionCheckboxElement`: the checkbox (DOM element) that has been toggled by the user.</li>
    <li>`selectedRowsKeys`: an array containing all the `@selectionKey`s of the selected rows in the table (an empty array is returned if no row is selected).</li>
    <li>`selectableRowsStates`: an array of objects corresponding to all the rows displayed in the table when the user changed a selection; each object contains the `@selectionKey` value for the associated row and its `isSelected` boolean state (if the checkbox is checked or not).<br><br>
    **Important**: the order of the rows in the array doesn’t necessarily follow the order of the rows in the table/DOM.</li>
    </ul>
  </C.Property>
  <C.Property @name="isStriped" @type="boolean" @default="false">
    Determines if even-numbered rows will have a different background color from odd-numbered rows.<br><br>
    **Important**: Advanced Table does **not** support setting `isStriped` to true when there are nested rows.
  </C.Property>
  <C.Property @name="maxHeight" @type="string">
    Sets the maximum height of the Advanced Table. If the `@maxHeight` is set, there will automatically be a sticky header. To turn off the sticky header and still have a max height, set `@hasStickyHeader` to false.
  </C.Property>
  <C.Property @name="hasStickyHeader" @type="boolean">
    Determines if the Advanced Table has a sticky header. If set to `true`, must be used with the `@maxHeight` argument. If `@maxHeight` is set and `@hasStickyHeader` is `false`, there will not be a sticky header.
  </C.Property>
  <C.Property @name="hasStickyFirstColumn" @type="boolean | undefined" @default="undefined">
    Determines if the Advanced Table has a sticky first column. If set to `true` or `false`, a context menu item will be shown allowing the user to change the state of the column's stickiness. If `undefined`, no menu item will be shown.
  </C.Property>
  <C.Property @name="density" @type="enum" @values={{array "short" "medium" "tall" }} @default="medium">
    If set, determines the density (height) of the body’s rows.
  </C.Property>
  <C.Property @name="valign" @type="enum" @values={{array "top" "middle" "baseline" }} @default="top">
    Determines the vertical alignment for content in a table. Does not apply to table headers (`th`). See [MDN reference on vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) for more details.
  </C.Property>
  <C.Property @name="selectableColumnKey" @type="string">
    If set, this key determines which `@model` item property is used to sort items by selection state. If this argument is not provided, the option to sort by selection state will not be available.
  </C.Property>
  <C.Property @name="caption" @type="string">
    Adds a (non-visible) caption for users with assistive technology. If set on a sortable table, the provided caption is paired with the automatically generated sorted message text.
  </C.Property>
  <C.Property @name="identityKey" @type="'@identity'|'none'|string" @default="@identity">
    Option to [specify a custom key](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/each?anchor=each#:~:text=%3C/ul%3E-,Specifying%20Keys,-In%20order%20to) to the `each` iterator. If `identityKey="none"`, this is interpreted as an `undefined` value for the `@identity` key option.
  </C.Property>
  <C.Property @name="sortedMessageText" @type="string" @default="Sorted by (label), (asc/desc)ending">
    Customizable text added to `caption` element when a sort is performed.
  </C.Property>
  <C.Property @name="childrenKey" @type="string" @default="children">
     If set, this key determines which `@model` item property is used to render nested rows. If this argument is not provided, the default will be used.
  </C.Property>
  <C.Property @name="onSort" @type="function">
    Callback function that is invoked when one of the sortable headers is clicked (or has a keyboard interaction performed). The function receives the values of `sortBy` and `sortOrder` as arguments.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AdvancedTable::Tr

!!! Info

Note: This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `AdvancedTable::Th`, `AdvancedTable::Td` components.

!!!

This component can contain `Hds::AdvancedTable::Th` or `Hds::AdvancedTable::Td` components.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<div role="row">` HTML element.
  </C.Property>
  <C.Property @name="isSelected" @type="boolean" @default="false">
    Sets the initial selection state for the row (used in conjunction with setting `isSelectable` on the Advanced Table).
  </C.Property>
  <C.Property @name="selectionKey" @type="string">
    Required value to associate an unique identifier to each table row (used in conjunction with setting `isSelectable` on the Advanced Table and returned in the `onSelectionChange` callback arguments). It’s required if `isSelectable={{true}}`.
  </C.Property>
  <C.Property @name="selectionAriaLabelSuffix" @type="string">
    Descriptive `aria-label` attribute applied to the checkbox used to select the row (used in conjunction with setting `isSelectable` on the `AdvancedTable`). The component automatically prepends “Select/Deselect” to the string, depending on the selection status. It’s required if `isSelectable={{true}}`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AdvancedTable::Th

!!! Info

Note: This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `AdvancedTable::Th` component.

!!!

If the `Th` component is passed as the first cell of a body row, `role="rowheader"` is automatically applied for accessibility purposes.

<Doc::ComponentApi as |C|>
  <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
    Determines the horizontal content alignment (sometimes referred to as text alignment) for the column header.
  </C.Property>
  <C.Property @name="scope" @type="string" @values={{array "col" "row" }} @default="col">
    If used as the first item in a table body’s row, `scope` should be set to `row` for accessibility purposes. Note: you only need to manually set this if you’re creating a custom table using the child components; if you use the standard invocation for the table, this scope is already provided for you.
  </C.Property>
  <C.Property @name="width" @type="string" @valueNote="Any valid CSS">
    If set, determines the column’s width.
  </C.Property>
  <C.Property @name="tooltip" @type="string">
    Text string which will appear in the [`Tooltip`](/components/tooltip). May contain basic HTML tags for formatting text such as `strong` and `em` tags. Not intended for multi-paragraph text or other more complex content. May not contain interactive content such as links or buttons. The `placement` and `offset` are automatically set and can’t be overwritten.
  </C.Property>
  <C.Property @name="colspan" @type="string">
    The number of columns the cell spans. Used to apply the correct grid styles and the aria-rowspan attribute for accessibility.
  </C.Property>
  <C.Property @name="rowspan" @type="string">
    The number of rows the cell spans. Used to apply the correct grid styles and the aria-rowspan attribute for accessibility.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<div role="columnheader">` or `<div role="rowheader">` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AdvancedTable::Td
!!! Info

Note: This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `AdvancedTable::Td` component.

!!!

<Doc::ComponentApi as |C|>
  <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
    Determines the horizontal content alignment (sometimes referred to as text alignment) for the cell (make sure it is also set for the column header).
  </C.Property>
  <C.Property @name="colspan" @type="string">
    The number of columns the cell spans. Used to apply the correct grid styles and the aria-rowspan attribute for accessibility.
  </C.Property>
  <C.Property @name="rowspan" @type="string">
    The number of rows the cell spans. Used to apply the correct grid styles and the aria-rowspan attribute for accessibility.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<div role="gridcell">` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
