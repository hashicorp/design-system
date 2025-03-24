## Component API

### Layout::Grid

<Doc::ComponentApi as |C|>
  <C.Property @name="tag" @type="HTMLElementTagName" @default="div">
    A valid HTML tag name to be used to render the grid element.
  </C.Property>
  <C.Property @name="columnMinWidth" @type="string" @default="0px">
    Set any valid CSS dimension as a minimum width for the grid columns. If the total width of columns in a row exceeds 100% of the parent, columns will begin to wrap to the next row as necessary to fit. The column gap size is subtracted from this minimum width.
    <br><br>
    <em>Note: With the default min-width of 0px, the columns will never wrap.</em>
  </C.Property>
  <C.Property @name="align" @type="enum" @values={{array "start" "center" "end" "stretch"}}>
    The value of the CSS `align-items` property, which controls the alignment of the grid items on the block axis within their grid areas (for a technical explanation: [see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)).
    <br/><br/>
    <em>Note: we only expose a subset of the values allowed for this property, which cover the most common use cases.</em>
  </C.Property>
  <C.Property @name="gap" @type="enum" @values={{array "4" "8" "12" "16" "32" "48"}}>
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
  <C.Property @name="colspan" @type="number">
    The number of columns an item should span.
  </C.Property>
  <C.Property @name="rowspan" @type="number">
    The number of rows an item should span.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
