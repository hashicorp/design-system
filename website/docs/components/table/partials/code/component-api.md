The `Table` component itself is where most of options will be applied. Use of the component API (below) will automatically render sortable columns if desired.

Additionally, there are child components that can also be used to provide custom options.

*   The `Hds::Table::Tr` component is a template-only component. It supports `...attributes` but is not eligible to receive interactions. It can contain `Hds::Table::Th` or `Hds::Table::Td` components.
*   The `Hds::Table::Th` component is a template-only component. It supports `...attributes` but is not eligible to receive interactions itself, although it can contain interactive elements. However, it is not likely that you will need to add interactive elements to this component as the sorting is already otherwise provided for.
*   The `Hds::Table::Td` component is a template-only component. It supports `...attributes` but is not eligible to receive interactions itself; however it can contain interactive elements.

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
    If defined, sets the column header content and indicates that the table should be sorted. For more information about how this array is shaped, look at the code examples in the "How to Use" section.
  </C.Property>
  <C.Property @name="sortingKeys" @type="array">
    If defined, indicates which columns should be sortable (if only `columns` is defined, all columns will be sortable). For more information about how this array is shaped, look at the code examples in the "How to Use" section.
  </C.Property>
  <C.Property @name="sortBy" @type="string">
    If defined, indicates which column should be pre-sorted when the table is rendered. For more information about how this value, look at the code examples in the "How to Use" section.
  </C.Property>
  <C.Property @name="sortOrder" @type="string" @value="asc, desc" @default="asc">
    Use in conjunction with `sortBy`. If defined, indicates which direction the column should be pre-sorted in. All columns are unsorted by default.
  </C.Property>
  <C.Property @name="isStriped" @type="boolean">
    If set to `false`, zebra striping on the table will not be applied.
  </C.Property>
  <C.Property @name="density" @type="enum" @value="short, medium, tall" @default="medium">
    If set, determines the density, or height, of the row.
  </C.Property>
  <C.Property @name="valign" @type="enum" @value="top, middle, bottom, baseline, sub, text-top" @default="top">
    If set, determines the vertical alignment of table's cell (td) content. While the acceptable values contain all of the values that the CSS property accepts, the default (top) and middle are the values most likely to be used.
  </C.Property>
  <C.Property @name="caption" @type="string">
    Adds a (non-visible) caption for users with assistive technology. If set on a sortable table, the provided table caption is paired with the automatically generated sorted message text.
  </C.Property>
  <C.Property @name="...attributes">
    Supported for the `Hds::Table` component.
  </C.Property>
</Doc::ComponentApi>