## Component API

SuperSelect consists of two variant components.

See the Ember [PowerSelect documentation](https://ember-power-select.com/docs) for the full list of supported options.

### SuperSelect::Single

<Doc::ComponentApi as |C|>
  <C.Property @name="renderInPlace" @type="boolean" @default="true">
    Determines whether the dropdown options are rendered in place within the DOM vs. being attached to the root of the HTML `<body>` and positioned with JavaScript.
    <br><br>
    Defined as `true` by default in `SuperSelect` components to fix a `PowerSelect` accessibility issue. (The opener element or “trigger” should be next to dropdown content it hides & reveals.)
  </C.Property>
  <C.Property @name="searchPlaceholder" @type="string" @default="Search">
    Displays placeholder text in the search input when `@search` is enabled.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SuperSelect::Multiple

<Doc::ComponentApi as |C|>
  <C.Property @name="renderInPlace" @type="boolean" @default="true">
    Determines whether the dropdown options are rendered in place within the DOM vs. being attached to the root of the HTML `<body>` and positioned with JavaScript.
    <br><br>
    Defined as `true` by default in `SuperSelect` components to fix a `PowerSelect` accessibility issue. (The opener element or “trigger” should be next to dropdown content it hides & reveals.)
  </C.Property>
  <C.Property @name="searchPlaceholder" @type="string" @default="Search">
    Displays placeholder text in the search input when `@search` is enabled.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

