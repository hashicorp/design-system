## Component API

The Table component itself is where most of the options will be applied. However, the APIs for the child components are also documented here, in case a custom implementation is desired.

### Table

<Doc::ComponentApi as |C|>
  <C.Property @name="<:head>" @type="named block">
    This is a named block where the content for the table head (`<thead>`) is rendered. Note: most consumers are unlikely to need to use this named block directly.<br />
    It yields these internal properties:
    <Doc::ComponentApi as |C|>
      <C.Property @name="H.setSortBy" @type="yielded function">
      The function used internally by the table to set the `sortBy` and `sortOrder` tracked values.
      </C.Property>
      <C.Property @name="H.sortBy" @type="yielded value">
        The value of the internal `sortBy` tracked variable.
      </C.Property>
      <C.Property @name="H.sortOrder" @type="yielded value">
        The value of the internal `sortOrder` tracked variable.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    This is a named block where the content for the table body (`<tbody>`) is rendered.<br />
    It yields these internal properties:
    <Doc::ComponentApi as |C|>
      <C.Property @name="B.sortBy" @type="yielded value">
        The value of the internal `sortBy` tracked variable.
      </C.Property>
      <C.Property @name="B.sortOrder" @type="yielded value">
        The value of the internal `sortOrder` tracked variable.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="model" @type="array">
    The data model to be used by the table.
  </C.Property>
  <C.Property @name="columns" @type="array">
    Array `hash` that defines each column with key-value properties that describe each column. Options:
    <Doc::ComponentApi as |C|>
      <C.Property @name="label" @type="string" @required="true">
      The column’s label.
      </C.Property>
      <C.Property @name="key" @type="string">
      The column’s key (one of the keys in the model's records); required if the column is sortable.
      </C.Property>
      <C.Property @name="isSortable" @type="boolean" @default="false">
        If set to `true`, indicates that a column should be sortable.
      </C.Property>
      <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
        Determines the horizontal content alignment (sometimes referred to as text alignment) for the column header.
      </C.Property>
      <C.Property @name="width" @type="string" @valueNote="Any valid CSS">
        If set, determines the column’s width.
      </C.Property>
      <C.Property @name="isVisuallyHidden" @type="boolean" @default="false">
        If set to `true`, it visually hides the column’s text content (it will still be available to screen readers for accessibility). <em>Only available for non-sortable columns.</em>
      </C.Property>
      <C.Property @name="sortingFunction" @type="function">
        Callback function to provide support for custom sorting logic. It should implement a typical bubble-sorting algorithm using two elements and comparing them. For more details, see the example of custom sorting in the How To Use section.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="sortBy" @type="string">
    If defined, the value should be set to the key of the column that should be pre-sorted.
  </C.Property>
  <C.Property @name="sortOrder" @type="string" @values={{array "asc" "desc" }} @default="asc">
    Use in conjunction with `sortBy`. If defined, indicates which direction the column should be pre-sorted in. If not defined, `asc` is applied by default.
  </C.Property>
  <C.Property @name="isStriped" @type="boolean" @default="false">
    Define on the table invocation. If set to `true`, even-numbered rows will have a different background color from odd-numbered rows.
  </C.Property>
  <C.Property @name="isFixedLayout" @type="boolean" @default="false">
    If set to `true`, the `table-display`(CSS) property will be set to `fixed`. See [MDN reference on table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) for more details.
  </C.Property>
  <C.Property @name="density" @type="enum" @values={{array "short" "medium" "tall" }} @default="medium">
    If set, determines the density (height) of the table body’s rows.
  </C.Property>
  <C.Property @name="valign" @type="enum" @values={{array "top" "middle" }} @default="top">
    Determines the vertical alignment for content in a table. Does not apply to table headers (`th`). See [MDN reference on vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) for more details.
  </C.Property>
  <C.Property @name="caption" @type="string">
    Adds a (non-visible) caption for users with assistive technology. If set on a sortable table, the provided table caption is paired with the automatically generated sorted message text.
  </C.Property>
  <C.Property @name="identityKey" @type="'none'|string" @default="@identity">
    Option to [specify a custom key](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/each?anchor=each#:~:text=%3C/ul%3E-,Specifying%20Keys,-In%20order%20to) to the `each` iterator. If `identityKey="none"`, this is interpreted as an `undefined` value for the `@identity` key option.
  </C.Property>
  <C.Property @name="sortedMessageText" @type="string" @default="Sorted by (label), (asc/desc)ending">
    Customizable text added to `caption` element when a sort is performed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="onSort" @type="function">
    Callback function that is invoked when one of the sortable table headers is clicked (or has a keyboard interaction performed). The function receives the values of `sortBy` and `sortOrder` as arguments.
  </C.Property>
</Doc::ComponentApi>

### Table::Tr

Note: This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `Th`, `Td` elements.

This component can contain `Hds::Table::Th`, `Hds::Table::ThSort`, or `Hds::Table::Td` components.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside the `<tr>` element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Table::Th

Note: This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `Th` element.

If the `Th` component is passed as the first cell of a table body row, `scope="row"` is automatically applied for accessibility purposes.

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
  <C.Property @name="isVisuallyHidden" @type="boolean" @default="false">
    If set to `true`, it visually hides the column’s text content (it will still be available to screen readers for accessibility).
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside the `<th>` element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Table::ThSort

This is the component that supports column sorting; use instead of `Hds::Table::Th` if creating a custom table implementation.

<Doc::ComponentApi as |C|>
  <C.Property @name="sortOrder" @type="string" @values={{array "asc" "desc" }}>
    If defined, indicates which direction the column should be sorted. Controls the sort icon indicator and the `aria-sort` value.
  </C.Property>
  <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
    Determines the horizontal content alignment (sometimes referred to as text alignment) for the column header.
  </C.Property>
  <C.Property @name="width" @type="string" @valueNote="Any valid CSS">
    If set, determines the column’s width.
  </C.Property>
  <C.Property @name="onClick" @type="function">
    Callback function invoked when the sort button is clicked. By default, the sort is set by the column’s key.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside a `<button>` nested in a `<th>` element. For this reason, you should avoid providing interactive elements as children (interactive controls should never be nested for accessibility reasons).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Table::Td

Note: This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `Td` element.

<Doc::ComponentApi as |C|>
  <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
    Determines the horizontal content alignment (sometimes referred to as text alignment) for the cell (make sure it is also set for the column header).
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside the `<td>` element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
