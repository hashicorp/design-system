## Component API

### Layout::Grid

<Doc::ComponentApi as |C|>
  <C.Property @name="tag" @type="HTMLElementTagName" @default="div">
    A valid HTML tag name to be used to render the grid element.
  </C.Property>
  <C.Property @name="columnMinWidth" @type="string">
    Set any valid CSS dimension as a minimum width for the grid columns. If the total width of columns in a row exceeds 100% of the parent, columns will wrap to the next row as necessary to fit.
    <br /><br />
    if there are fewer items than would fit in a row, columns will stretch so that the combined widths add up to 100%. The column gap size is automatically subtracted from this minimum width.
  </C.Property>
  <C.Property @name="columnWidth" @type="string | object">
    The width to use for grid columns. Widths can be any valid CSS dimension although percentage values often work best. If the total width of columns in a row exceeds 100% of the parent, columns will wrap to the next row as necessary to fit.
    <Doc::ComponentApi as |C|>
      **Fixed column widths** (when <code>string</code>)
      <br/>
      Set any valid CSS dimension as a width for the grid columns.
      <br/><br/>
      **Responsive column widths** (when <code>object</code>)
      <br/>
      Pass in an object to define the column widths for responsive views. It is not necessary to pass in values for all breakpoints as passed in values for smaller views will be used for undefined larger views.
      <br />
      The expected shape of the object is:
      <br />
      `{ sm?: string, md?: string, lg?: string, xl?: string, xxl?: string }`
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="align" @type="enum" @values={{array "start" "center" "end" "stretch"}}>
    The value of the CSS `align-items` property, which controls the alignment of the grid items on the block axis within their grid areas (for a technical explanation: [see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)).
    <br /><br />
    <em>Note: we only expose a subset of the values allowed for this property, which cover the most common use cases.</em>
  </C.Property>
  <C.Property @name="gap" @type="enum" @values={{array "0" "4" "8" "12" "16" "32" "48"}} @default="0">
    The gap spacing between rows and columns of the grid. Specify as either a single value or array of two values for setting the row and column spacing separately.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [LG].Item

The `Layout::Grid::Item` component, yielded as contextual component, to be used as child of the `grid` element to control its `colspan/rowspan` values (and other properties).

<Doc::ComponentApi as |C|>
  <C.Property @name="tag" @type="string" @default="div">
    HTML tag to be used to render the grid item element.
  </C.Property>
  <C.Property @name="colspan" @type="number | object">
    The number of columns an item should span.
    <Doc::ComponentApi as |C|>
      **Fixed colspan** (when <code>number</code>)
      <br />
      Set a fixed number for how many columns an item should span.
      <br /><br />
      **Responsive colspan** (when <code>object</code>)
      <br />
      Pass in an object to define how many columns should be spanned in each responsive view. It is not necessary to pass in values for all breakpoints as passed in values for smaller views will be used for undefined larger views. The expected shape of the object is:
      <br />
      `{ sm?: number, md?: number, lg?: number, xl?: number, xxl?: number }`
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="rowspan" @type="number | object">
    The number of rows an item should span.
    <Doc::ComponentApi as |C|>
      **Fixed rowspan** (when <code>number</code>)
      <br />
      Set a fixed number for how many rows the item should span.
      <br /><br />
      **Responsive rowspan** (when <code>object</code>)
      <br />
      Pass in an object to define how many rows should be spanned in each responsive view. It is not necessary to pass in values for all breakpoints as passed in values for smaller views will be used for undefined larger views. The expected shape of the object is:
      <br />
      `{ sm?: number, md?: number, lg?: number, xl?: number, xxl?: number }`
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
