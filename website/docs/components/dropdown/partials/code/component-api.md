The `Dropdown` component is composed of different child components, each with their own APIs:

*   the dropdown component (parent to the child components)
*   Toggle components to open/close the dropdown
    
    *   ToggleButton
    *   ToggleIcon
*   And finally, list item components, to build the dropdown's list items
    
    *   Description
    *   Generic
    *   Interactive
    *   Separator
    *   Title

_Notice: to make the invocation more intuitive for developers, all the sub-components are named yields, so the yielded name is a simplified version of the full component name (eg. `Hds::ListItem::Interactive` becomes just `Interactive`). See below how they are invoked as yielded components._

#### Dropdown

Here is the API for the main ("container") component:

<Doc::ComponentApi as |C|>
  <C.Property @name="listPosition" @type="string" @value="left, right" @default="right"/>
  <C.Property @name="width" @type="string" @value="any valid CSS width (px, rem, etc)">
    _Notice: by default the dropdown list has a `min-width` of `200px` and a `max-width` of `400px` applied to it, so it adapts to the content size. If a `@width` parameter is provided then the list will have a fixed width._
  </C.Property>
  <C.Property @name="close" @type="function">
    Function that can be called to programmatically close the dropdown. _Notice: if this function is invoked using an `{{on click}}` modifier applied to the `ListItem::Interactive` element, there is a quirk behaviour of the Ember `<LinkTo>` component that will require some workaround to have the events executed in the right order (this happens only if it has a `@route` argument). [Jamie White](https://github.com/jgwhite) has detailed the issue and a possible solution [in this GitHub comment](https://github.com/hashicorp/design-system/pull/399#issuecomment-1171186772)._
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Callback function invoked when the dropdown is closed (if provided).
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### Toggle::Button

Here is the API for the "button-like" toggle component (yielded in a hash under the key `ToggleButton`):

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The text of the toggle button. _If no text value is defined an error will be thrown._
  </C.Property>
  <C.Property @name="color" @type="enum" @value="primary, secondary" @default="primary"/>
  <C.Property @name="size" @type="enum" @value="medium, small" @default="medium"/>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### Toggle::Icon

Here is the API for the icon-only toggle component (yielded as `ToggleIcon`):

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The value of _aria-label_ for the toggle icon. _If no text value is defined an error will be thrown._
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any Flight icon name.
  </C.Property>
  <C.Property @name="hasChevron" @type="boolean">
    Per design, `false` is only acceptable when the "more-horizontal" icon is used; as such, it is set to `true` by default.
  </C.Property>
  <C.Property @name="imageSrc" @type="string"/>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### ListItem::CopyItem

<Doc::ComponentApi as |C|>
  <C.Property @name="copyItemTitle" @type="string"/>
  <C.Property @name="text" @required="true" @type="string">
    The text to be copied. _If no text value is defined an error will be thrown._
  </C.Property>
</Doc::ComponentApi>

#### ListItem::Description

Here is the API for the "description" list item component (yielded in a hash under the key `Description`):

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The text to be used for the description. _If no text value is defined an error will be thrown._
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### ListItem::Generic

Here is the API for the "generic" list item component (yielded in a hash under the key `Generic`):

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this sub-component are yielded inside the list item. _Notice: when using the "generic" list item the developer is completely responsible for any element yielded, including the accessibility of that element, as well as the layout of the content (we provide only the horizontal padding for consistency with the other items)._
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### ListItem::Interactive

Here is the API for the "interactive" list item component (yielded in a hash under the key `Interactive`):

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The text to be used in the item. _If no text value is defined an error will be thrown._
  </C.Property>
  <C.Property @name="color" @type="enum" @value="action, critical" @default="action">
    Acceptabe values:
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any Flight icon name.
  </C.Property>
  <C.Property @name="isLoading" @type="boolean">
    This controls if the item is in "loading" state. _Notice: when in this state, the item is not actually interactive, but you can pass the other expected arguments for the item (they're simply ignored)._
  </C.Property>
  <C.Property @name="href">
    This is the URL parameter that is passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean">
    This controls if the `<a>` link is external and so for security reasons we need to add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it.
  </C.Property>
  <C.Property @name="route models model query current-when replace">
    These are the parameters that are passed down as arguments to the `<LinkTo/LinkToExternal>` component.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean">
    This controls if the "LinkTo" is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route.
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component. **Important**: in this specific component, the `...attributes` are not spread on the root element of the component (an `<li>` element) but on the underlying element/component (`<button>`, `<a>`, `<LinkTo>` or `<LinkToExternal>` depending on the `@route/@href` arguments).
  </C.Property>
</Doc::ComponentApi>

#### ListItem::Separator

Here is the API for the "separator" list item component (yielded in a hash under the key `Separator`):

<Doc::ComponentApi as |C|>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### ListItem::Title

Here is the API for the "description" list item component (yielded in a hash under the key `Title`):

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    The text to be used for the title. _If no text value is defined an error will be thrown._
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>