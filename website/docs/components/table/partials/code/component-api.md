## Component API

The Table component itself is where most of the options will be applied. However, the API for the child components are also documented here, in case a custom implementation is desired.

### Table

<Doc::ComponentApi as |C|>
  <C.Property @name="<:head>" @type="named block">
    This is a named block where the content for the table head (`<thead>`) is rendered. It is unlikely that most consumers will need to use this named block directly for most use cases.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    This is a named block where the content for the table body (`<tbody>`) is rendered.
  </C.Property>
  <C.Property @name="model" @type="array">
    Indicates the data model to be used by the table.
  </C.Property>
  <C.Property @name="columns" @type="array">
  Use a `hash` within the array to define each column.
    <Doc::ComponentApi as |D|>
      <D.Property @name="key" @type="string">
      The column’s key; required if the column is sortable.
      </D.Property>
      <D.Property @name="label" @type="string" @required="true">
      The column’s label; supports internationalization.
      </D.Property>
      <D.Property @name="isSortable" @type="boolean" @values={{array "false" "true" }} @default="false">
      If set to `true`, indicates that a column should be sortable.
      </D.Property>
      <D.Property @name="sortingFunction" @type="function">
      Callback function to provide support for a custom callback.
      </D.Property>
      <D.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
        If set, determines the text alignment for the column.
      </D.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="sortBy" @type="string">
    If defined, the value should be set to the key of the column that should be pre-sorted when the table is rendered.
  </C.Property>
  <C.Property @name="sortOrder" @type="string" @values={{array "asc" "desc" }} @default="asc">
    Use in conjunction with `sortBy`. If defined, indicates which direction the column should be pre-sorted in. If not defined, `asc` is applied by default.
  </C.Property>
  <C.Property @name="isStriped" @type="boolean" @values={{array "false" "true" }} @default="false">
    Define on the table invocation. If set to `true`, row striping ("zebra striping") will be applied to the table.
  </C.Property>
  <C.Property @name="isFixedLayout" @type="boolean" @values={{array "false" "true" }} @default="false">
    If set to `true`, the `table-display`(CSS) property will be set to `fixed`, automatically distributing columns based on the total width of the table per the browser algorithm.
  </C.Property>
  <C.Property @name="density" @type="enum" @values={{array "short" "medium" "tall" }} @default="medium">
    If set, determines the density, or height, of the table’s rows.
  </C.Property>
  <C.Property @name="valign" @type="enum" @values={{array "top" "middle" }} @default="top">
    If set, determines the vertical alignment for all cell (`td`) content in a table. Does not apply to table headers (`th`).
  </C.Property>
  <C.Property @name="caption" @type="string">
    Adds a (non-visible) caption for users with assistive technology. If set on a sortable table, the provided table caption is paired with the automatically generated sorted message text. Note: it is best practice to provide a table caption for users with assistive technology.
  </C.Property>
  <C.Property @name="...attributes">
    Supported for the `Hds::Table` component.
  </C.Property>
  <C.Property @name="onSort" @type="function">
    Callback function that is invoked when one of the sortable table headers is clicked (or has a keyboard interaction performed). The function receives the values of `sortBy` and `sortOrder` as arguments.
  </C.Property>
</Doc::ComponentApi>

### Table::Tr

This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `Th`, `ThSort`, or `Td` elements.

It can contain `Hds::Table::Th`, `Hds::Table::ThSort`, or `Hds::Table::Td` components.

<Doc::ComponentApi as |C|>
    <C.Property @name="...attributes">
    This component supports the use of `...attributes`.
  </C.Property>
</Doc::ComponentApi>

### Table::Th

This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `Th` element.

If the `Th` component is passed as the first "cell" of a table body row, it has `scope="row"` automatically applied to it for accessibility purposes.

<Doc::ComponentApi as |C|>
  <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
    If set, determines the text alignment.
  </C.Property>
  <C.Property @name="scope" @type="string" @values={{array "col" "row" }} @default="col">
    If used as the first item in a table body's row, `scope` should be set to `row` for accessibility purposes. Note: you only need to manually set this if you're creating a custom table using the child components, instead of the standard invocation.
  </C.Property>
  <C.Property @name="width" @type="string" @valueNote="Any valid CSS" @default="left">
    If set, determines the column’s width.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports the use of `...attributes`.
  </C.Property>
</Doc::ComponentApi>

### Table::ThSort

This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `ThSort` element.

This is the component that supports the column sorting, and should be used instead of `Hds::Table::Th` if creating a custom implementation.

<Doc::ComponentApi as |C|>
  <C.Property @name="isSorted" @type="boolean">
    Set to true upon sort.
  </C.Property>
  <C.Property @name="sortOrder" @type="string" @values={{array "asc" "desc" }} @default="asc">
    Use in conjunction with `sortBy`. If defined, indicates which direction the column should be pre-sorted in. If not defined, `asc` is applied by default.
  </C.Property>
  <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
    If set, determines the column’s text alignment.
  </C.Property>
  <C.Property @name="width" @type="string" @valueNote="Any valid CSS" @default="left">
    If set, determines the column’s width.
  </C.Property>
  <C.Property @name="onClick" @type="function">
    The action handler; sets the sort to the column key.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports the use of `...attributes`.
  </C.Property>
</Doc::ComponentApi>

### Table::Td

This component is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). Instead, an interactive element should be placed _inside_ of the `Td` element.

<Doc::ComponentApi as |C|>
  <C.Property @name="align" @type="enum" @values={{array "left" "center" "right" }} @default="left">
    If set, determines the text alignment.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports the use of `...attributes`.
  </C.Property>
</Doc::ComponentApi>
