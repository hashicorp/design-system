## Component API

The `Hds::Dropdown` component is composed of different child components, each with their own APIs:

- The Dropdown component
- Toggle components to open/close the dropdown
    - ToggleButton
    - ToggleIcon
- ListItem components, to build the dropdown’s list items
    - Description
    - Generic
    - Interactive
    - Separator
    - Title

### Dropdown

<Doc::ComponentApi as |C|>
  <C.Property @name="listPosition" @type="string" @values={{array "left" "right" }} @default="right"/>
  <C.Property @name="width" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    _Note: by default the dropdown list has a `min-width` of `200px` and a `max-width` of `400px` applied to it, so it adapts to the content size. If a `@width` parameter is provided then the list will have a fixed width._
  </C.Property>
  <C.Property @name="close" @type="function">
    Function that can be called to programmatically close the dropdown. _Note: if this function is invoked using an `\{{on "click"}}` modifier applied to the `ListItem::Interactive` element, there is a quirky behavior of the Ember `<LinkTo>` component that will require some workaround to have the events executed in the right order (this happens only if it has a `@route` argument). Read more about the issue and a possible solution [in this GitHub comment](https://github.com/hashicorp/design-system/pull/399#issuecomment-1171186772)._
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Callback function invoked when the dropdown is closed (if provided).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Toggle::Button

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The text of the toggle button. _If no text value is defined, an error will be thrown._
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "primary" "secondary" }} @default="primary"/>
  <C.Property @name="size" @type="enum" @values={{array "medium" "small" }} @default="medium"/>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Toggle::Icon

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The value of _aria-label_ for the toggle icon. _If no text value is defined, an error will be thrown._
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any icon name.
  </C.Property>
  <C.Property @name="hasChevron" @type="boolean" @default="true">
    Per design, `false` is only currently allowed when the "more-horizontal" icon is used; it is set to `true` by default.
  </C.Property>
  <C.Property @name="imageSrc" @type="string"/>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ListItem::CopyItem

<Doc::ComponentApi as |C|>
  <C.Property @name="copyItemTitle" @type="string"/>
  <C.Property @name="text" @required="true" @type="string">
    The text to be copied. _If no text value is defined, an error will be thrown._
  </C.Property>
</Doc::ComponentApi>

### ListItem::Description

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The text to be used for the description. _If no text value is defined, an error will be thrown._
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Generic

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this sub-component are yielded inside the list item. _Note: when using the "generic" list item the developer is completely responsible for any element yielded, including the accessibility of that element, as well as the layout of the content (we provide only the horizontal padding for consistency with the other items)._
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Interactive

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The text to be used in the item. _If no text value is defined, an error will be thrown._
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "action" "critical" }} @default="action">
    Acceptable values:
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any icon name.
  </C.Property>
  <C.Property @name="isLoading" @type="boolean">
    This controls if the item is in "loading" state. _Note: when in this state, the item is not actually interactive, but you can pass the other expected arguments for the item (they're simply ignored)._
  </C.Property>
  <C.Property @name="href">
    This is the URL passed to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean">
    This indicates whether or not the `<a>` link is external; in these cases, `target="_blank"` and `rel="noopener noreferrer"` attributes are added automatically.
  </C.Property>
  <C.Property @name="route models model query current-when replace">
    These are the parameters passed as arguments to the `<LinkTo/LinkToExternal>` component.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean">
    This controls if the "LinkTo" is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering). **Important**: in this specific component, the `...attributes` are not spread on the root element of the component (an `<li>` element) but on the underlying element/component (`<button>`, `<a>`, `<LinkTo>` or `<LinkToExternal>` depending on the `@route/@href` arguments).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Separator

<Doc::ComponentApi as |C|>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Title

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The text to be used for the title. _If no text value is defined, an error will be thrown._
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
