## Component API

The Table component itself is where most of the options will be applied. However, the child components can also be used if a custom implementation is needed.

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
  <C.Property @name="columns" @type="array" @valueNoteList={{array (hash code="key" required="true" text="the data record’s key") (hash code="label" required="true" text="can be a string or intl object.") (hash code="isSortable" text="should exist and be set to true if you want the column to be sortable") (hash code="align" text="add this option if you need to set the text-alignment for columns that contain numbers (typically currency)") (hash code="width" text="add this option if you need to define a custom width; any valid CSS unit is acceptable (consumers are responsible for the accessibility of this option).") }}>
  Use a `hash` within the array to define each column:
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
  <C.Property @name="isFixed" @type="boolean" @values={{array "false" "true" }} @default="false">
    If set to `true`, the `table-display`(CSS) property will be set to `fixed`, which will automatically distribute columns equally based on the total width of the table.
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
    Automatically applied to sortable table headers, `onSort` is the callback function that is invoked when one of the sortable table headers is clicked (or has a keyboard interaction performed). The function receives the values of `sortBy` and `sortOrder` as arguments.
  </C.Property>
</Doc::ComponentApi>

### Table::Tr

The `Hds::Table::Tr` component is a template-only component.

It supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering) but is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it).

It can contain `Hds::Table::Th` or `Hds::Table::Td` components.

<!-- <Doc::ComponentApi as |C|>
</Doc::ComponentApi> -->

### Table::Th

The `Hds::Table::Th` supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering). While it can **contain** interactive elements, it cannot have actions attached to it.

<!-- <Doc::ComponentApi as |C|>
</Doc::ComponentApi> -->

### Table::ThSort

The `Hds::Table::ThSort` supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering). While it can **contain** interactive elements, it cannot have actions attached to it.

This is the component that supports the column sorting.

<!-- <Doc::ComponentApi as |C|>
</Doc::ComponentApi> -->

### Table::Td

The `Hds::Table::Td` component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering). While it can **contain** interactive elements (e.g., `<td><a href="user-info.html">User info</a></td>`) but is not eligible to receive interactions itself (e.g., it cannot have an `onClick` or other actions attached directly to it).

<!-- <Doc::ComponentApi as |C|>
</Doc::ComponentApi> -->