## Component API

The SuperSelect component consists of two main components with very similar APIs to the [ember-power-select](https://ember-power-select.com/) addon.

While the [ember-power-select documentation](https://ember-power-select.com/docs) has the full list of supported options, we've included the most common options here for your convenience.

Note: The `renderInPlace` property is set to `true` in `SuperSelect` components to fix a `PowerSelect` accessibility issue. (The opener element or “trigger” should be next to dropdown content it hides & reveals.) It cannot be overridden.

### SuperSelect::Single

<Doc::ComponentApi as |C|>
  <C.Property @name="options">
    An array of objects to be displayed as options in the dropdown.
  </C.Property>
  <C.Property @name="groupComponent" @type="component">
    Used to create groups of options similarly to the `optgroup` element used within native HTML `select` elements. Requires use of the `options` property (see [grouped options example](#grouped-options)).
  </C.Property>
  <C.Property name="placeholder">
    Placeholder text to display when no option is selected.
  </C.Property>
  <C.Property @name="searchEnabled" @type="boolean" @default="false">
    Enables a search input field to filter options.
  </C.Property>
  <C.Property @name="searchPlaceholder" @type="string" @default="Search">
    Displays placeholder text in the search input when `@searchEnabled` is set to `true`.
  </C.Property>
  <C.Property @name="selected">
    The selected option object. Can be used to set a pre-selected option.
  </C.Property>
  <C.Property @name="onChange">
    A closure action that is called when the selected option changes.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SuperSelect::Multiple

<Doc::ComponentApi as |C|>
  <C.Property @name="options">
    An array of objects to be displayed as options in the dropdown.
  </C.Property>
  <C.Property @name="groupComponent" @type="component">
    Used to create groups of options similarly to the `optgroup` element used within native HTML `select` elements. Requires use of the `options` property (see [grouped options example](#grouped-options)).
  </C.Property>
  <C.Property name="placeholder">
    Placeholder text to display when no option is selected.
  </C.Property>
  <C.Property @name="searchEnabled" @type="boolean" @default="false">
    Enables a search input field to filter options.
  </C.Property>
  <C.Property @name="searchPlaceholder" @type="string" @default="Search">
    Displays placeholder text in the search input when `@searchEnabled` is set to `true`.
  </C.Property>
  <C.Property @name="selected">
    The selected option object. Can be used to set a pre-selected option.
  </C.Property>
  <C.Property @name="onChange">
    A closure action that is called when the selected option changes.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

