## Component API

The SuperSelect component consists of two main components with very similar APIs to the Ember [PowerSelect](https://ember-power-select.com/) add-on.

While the Ember [PowerSelect documentation](https://ember-power-select.com/docs) has the full list of supported options, we've included a few of the most common options for your convenience.

Note: The `renderInPlace` property is set to `true` in `SuperSelect` components to fix a `PowerSelect` accessibility issue. (The opener element or “trigger” should be next to dropdown content it hides & reveals.) It cannot be overridden.

### SuperSelect::Single

<Doc::ComponentApi as |C|>
  <C.Property @name="searchEnabled" @type="boolean" @default="false">
    Enables a search input field to filter options.
  </C.Property>
  <C.Property @name="searchPlaceholder" @type="string" @default="Search">
    Displays placeholder text in the search input when `@searchEnabled` is set to `true`.
  </C.Property>
  <C.Property @name="groupComponent" @type="component">
    Used to create groups of options similarly to the `optgroup` element used within HTML `select` elements. It is set to use the HDS `super-select::option-group` internal component and can’t be overridden.
    <br><br>
    Depends upon the structure of `options` data provided to the SuperSelect component.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SuperSelect::Multiple

<Doc::ComponentApi as |C|>
  <C.Property @name="renderInPlace" @type="boolean">
    Determines whether the dropdown options are rendered in place within the DOM vs. being attached to the root of the HTML `<body>` and positioned with JavaScript.
    <br><br>
    Set as `true` in `SuperSelect` components to fix a `PowerSelect` accessibility issue. (The opener element or “trigger” should be next to dropdown content it hides & reveals.)
  </C.Property>
  <C.Property @name="searchPlaceholder" @type="string" @default="Search">
    Displays placeholder text in the search input when `@search` is enabled.
  </C.Property>
  <C.Property @name="groupComponent" @type="component">
    Used to create groups of options similarly to the `optgroup` element used within HTML `select` elements. It is set to use the HDS `super-select::option-group` internal component and can’t be overridden.
    <br><br>
    Depends upon the structure of `options` data provided to the SuperSelect component.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

