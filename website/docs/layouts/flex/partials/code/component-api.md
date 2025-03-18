## Component API

### Layout::Flex

<Doc::ComponentApi as |C|>
  <C.Property @name="tag" @type="string" @default="div">
    HTML tag to be used to render the flexbox element.
  </C.Property>
  <C.Property @name="direction" @type="enum" @values={{array "row" "column"}} @default="row">
    The value of the CSS `flex-direction` property, which sets how the flex items (children) are placed in the flex container, defining the [main axis](https://developer.mozilla.org/en-US/docs/Glossary/Main_Axis) and the direction (for a technical explanation: [see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)).
    <br/><br/>
    <em>Notice: we don't expose the "reverse" directions because they come with intrinsic accessibility limitations that we prefer our consumers to avoid.</em>
  </C.Property>
  <C.Property @name="justify" @type="enum" @values={{array "start" "center" "end" "space-between" "space-around" "space-evenly"}}>
    The value of the CSS `justify-content` property, which defines how the space is distributed between and around content items along the [main axis](https://developer.mozilla.org/en-US/docs/Glossary/Main_Axis) of the flex container (for a technical explanation: [see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)).
    <br/><br/>
    <em>Notice: we expose only a subset of the values allowed for this property, covering only the most common use cases.</em>
    <br/><br/>
    <em>Tip: when the `@direction` is `row` this argument controls the horizontal alignment; when it's `column` it controls the vertical alignment.</em>
  </C.Property>
  <C.Property @name="align" @type="enum" @values={{array "start" "center" "end" "stretch"}}>
    The value of the CSS `align-items` property, which controls the alignment of the flex items on the [cross axis](https://developer.mozilla.org/en-US/docs/Glossary/Cross_Axis) (for a technical explanation: [see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)).
    <br/><br/>
    <em>Notice: we expose only a subset of the values allowed for this property, covering only the most common use cases.</em>
    <br/><br/>
    <em>Tip: when the `@direction` is `row` this argument controls the vertical alignment; when it's `column` it controls the horizontal alignment.</em>
  </C.Property>
  <C.Property @name="wrap" @type="boolean" @default="false">
    If a `@wrap` parameter is provided, the flex items can wrap onto multiple lines when there is not enough space in the container to fit them all in a single line.
  </C.Property>
  <C.Property @name="gap" @type="enum|[enum,enum]" @values={{array "4" "8" "12" "16" "24" "32" "48"}}>
    Use the `@gap` argument to control the spacing between flex items. To differentiate the vertical and horizontal spacing between items when they wrap on multiple rows, provide an array of two values , where the first value refers to the vertical gap between "rows" of items (`row-gap` in CSS), the second one to the horizontal spacing between "columns" of items (`column-gap` in CSS).
  </C.Property>
  <C.Property @name="isInline" @type="boolean" @default="false">
    If an `@isInline` parameter is provided, then the element will be displayed as `inline-flex` (useful to achieve specific layouts). Otherwise, it will have a `flex` layout.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [LF].Item

The `Layout::Flex::Item` component, yielded as contextual component, to be used as child of the `flexbox` element to control its `basis/grow/shrink` values (and other properties).

<Doc::ComponentApi as |C|>
  <C.Property @name="tag" @type="string" @default="div">
    HTML tag to be used to render the flex item element.
  </C.Property>
  <C.Property @name="basis" @type="string|0">
    The value (size) of the CSS `flex-basis` property, which sets the initial main size the flex item (for a technical explanation: [see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis)).
    <br/><br/>
    <em>Notice: when the value is set to `0` a CSS class is used to apply the `flex-basis` property; in all the other cases an inline `style` declaration is used, to accomodate for all the possible values that this CSS property can have.</em>
  </C.Property>
  <C.Property @name="grow" @type="boolean|number|string">
    The value (size or keyword) of the CSS `flex-grow` property, which sets the flex grow factor of the flex item (for a technical explanation:  [see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)).
    <br/><br/>
    <em>Notice: when the value is set to `true/false` or `0/1` a CSS class is used to apply the `flex-grow` property; in all the other cases an inline `style` declaration is used, to accomodate for all the possible values that this CSS property can have.</em>
  </C.Property>
  <C.Property @name="shrink" @type="boolean|number|string">
    The value (size or keyword) of the CSS `flex-shrink` property, which sets sets the flex shrink factor of the flex item (for a technical explanation: [see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)).
    <br/><br/>
    <em>Notice: when the value is set to `true/false` or `0/1` a CSS class is used to apply the `flex-shrink` property; in all the other cases an inline `style` declaration is used, to accomodate for all the possible values that this CSS property can have.</em>
  </C.Property>
  <C.Property @name="enableCollapseBelowContentSize" @type="boolean">
    When this special argument is set to `true` it applies a `min-width: 0` to the element, allowing the flex item to shrink below its content's intrinsic minimum width (e.g. used with elliptized text)
    <br/><br/>
    <em>Notice: this may have accessibility implications, be considerate in how this special argument is used and how this impacts the content of the flex item element.</em>
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
