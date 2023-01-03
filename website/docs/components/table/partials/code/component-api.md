## Component API

The `Table` component itself is where most of options will be applied. However, the child components can also be used if a custom implementation is desired.

- The `Hds::Table::Tr` component is a template-only component. It supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering) but is not eligible to receive interactions (e.g., it cannot have an `onClick` event handler attached directly to it). It can contain `Hds::Table::Th` or `Hds::Table::Td` components.
- The `Hds::Table::Th` component is a template-only component. It supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering) but is not eligible to receive interactions itself, although it can _contain_ interactive elements. However, it is not likely that you will need to add interactive elements to this component as the sorting is already otherwise provided for.
- The `Hds::Table::Td` component is a template-only component. It supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering) but is not eligible to receive interactions itself (e.g., it cannot have an `onClick` event handler attached directly to it); however, it can _contain_ interactive elements (e.g., `<td><a href="user-info.html">User info</a></td>`)

<Doc::ComponentApi as |C|>
  <C.Property @name="<:head>" @type="named block">
    This is a named block where the content for the table head (`<thead>`) is rendered.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    This is a named block where the content for the table body (`<tbody>`) is rendered.
  </C.Property>
  <C.Property @name="model" @type="array">
    If defined, sets the data source that gets yielded by the `:body` named block.
  </C.Property>
  <C.Property @name="columns" @type="array">
    Use an `array` hash to define your table columns. While `key` and `label` are required, other options include `isSortable`, `align` (for text-alignment), and `width`.
  </C.Property>
  <C.Property @name="sortBy" @type="string">
    If defined, indicates which column should be pre-sorted when the table is rendered.
  </C.Property>
  <C.Property @name="sortOrder" @type="string" @values={{array "asc" "desc" }} @default="asc">
    Use in conjunction with `sortBy`. If defined, indicates which direction the column should be pre-sorted in. If not defined, `asc` is applied by default.
  </C.Property>
  <C.Property @name="isStriped" @type="boolean" @default="false">
    Define on the table invocation. If set to `true`, row striping ("zebra striping") will be applied to the table.
  </C.Property>
  <C.Property @name="isFixed" @type="boolean" @default="false">
    If set to `true`, the `table-display`(CSS) property will be set to `fixed`, which will automatically distribute columns equally based on the total width of the table.
  </C.Property>
  <C.Property @name="density" @type="enum" @values={{array "short" "medium" "tall" }} @default="medium">
    If set, determines the density, or height, of the table’s rows.
  </C.Property>
  <C.Property @name="valign" @type="enum" @values={{array "top" "middle" }} @default="top">
    If set, determines the vertical alignment for all cell (`td`) content in a table. Does not apply to table headers (`th`).
  </C.Property>
  <C.Property @name="caption" @type="string">
    Adds a (non-visible) caption for users with assistive technology. If set on a sortable table, the provided table caption is paired with the automatically generated sorted message text.
  </C.Property>
  <C.Property @name="...attributes">
    Supported for the `Hds::Table` component.
  </C.Property>
</Doc::ComponentApi>
