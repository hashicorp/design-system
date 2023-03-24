## Component API

The Dropdown component is composed of different child components each with their own APIs:

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
  <C.Property @name="listPosition" @type="string" @values={{array "bottom-left" "bottom-right" "top-left" "top-right" }} @default="bottom-right"/>
  <C.Property @name="width" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    By default, the Dropdown List has a `min-width` of `200px` and a `max-width` of `400px`, so it adapts to the content size. If a `@width` parameter is provided then the list will have a fixed width.
  </C.Property>
  <C.Property @name="height" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    If a `@height` parameter is provided then the list will have a fixed height.
  </C.Property>
  <C.Property @name="close" @type="function">
    Function to programmatically close the dropdown.
    <br/><br/>
    If this function is invoked using an `\{{on "click"}}` modifier applied to the `ListItem::Interactive` element, there is a quirky behavior of the Ember `<LinkTo>` component which requires a workaround to have the events executed in the right order (this happens only if it has a `@route` argument). Read more about the issue and a possible solution [in this GitHub comment](https://github.com/hashicorp/design-system/pull/399#issuecomment-1171186772).
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Callback function invoked when the dropdown is closed, if provided.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Toggle::Button

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    Text of the ToggleButton. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "primary" "secondary" }} @default="primary"/>
  <C.Property @name="size" @type="enum" @values={{array "medium" "small" }} @default="medium"/>
  <C.Property @name="icon" @type="string">
    Acceptable value: any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="count" @type="string">
    Displays an optional count indicator using the [Badge Count](/components/badge-count) component.
  </C.Property>
  <C.Property @name="badge" @type="string">
    Displays an optional badge indicator using the [Badge](/components/badge) component.
  </C.Property>
  <C.Property @name="badgeIcon" @type="string">
    Appends an icon to the optional badge indicator. Acceptable value: any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Toggle::Icon

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    Value of `aria-label` for the ToggleIcon. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="hasChevron" @type="boolean" @values={{array "false" "true" }} @default="true">
    Per design, `false` is only currently allowed when the "more-horizontal" icon is used; it is set to `true` by default.
  </C.Property>
  <C.Property @name="imageSrc" @type="string"/>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Interactive

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    Text to be used in the item. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "action" "critical" }} @default="action">
    Acceptable values: “action” or “critical”.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="isLoading" @type="boolean" @values={{array "false" "true" }} @default="false">
    Controls if the item is in “loading” state. When in this state, the item is not actually interactive, but you can pass the other expected arguments for the item (they’re simply ignored).
  </C.Property>
  <C.Property @name="href">
    URL passed to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    Indicates whether or not the `<a>` link is external, in which case `target="_blank"` and `rel="noopener noreferrer"` attributes are added automatically.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters passed as arguments to the `<LinkTo/LinkToExternal>` component.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    Controls if the “LinkTo” is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
    <br/><br/>
    In this component, the `...attributes` are not supported on the root element (an `<li>` element) but on the underlying element/component (`<button>`, `<a>`, `<LinkTo>` or `<LinkToExternal>` depending on the `@route/@href` arguments).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Title

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    Text to be used for the title. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Description

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required="true" @type="string">
    Text to be used for the description. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Separator

<Doc::ComponentApi as |C|>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ListItem::CopyItem

<Doc::ComponentApi as |C|>
  <C.Property @name="copyItemTitle" @type="string"/>
  <C.Property @name="text" @required="true" @type="string">
    Text to be copied. If no text value is defined, an error will be thrown.
  </C.Property>
</Doc::ComponentApi>

### ListItem::Checkmark

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Content to be used in the item.
  </C.Property>
  <C.Property @name="selected" @type="boolean" @values={{array "false" "true" }} @default="false">
    Displays a checkmark symbol indicating the current selection.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="count" @type="string">
    Displays an optional count indicator.
  </C.Property>
  <C.Property @name="href">
    URL passed to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    Indicates whether or not the `<a>` link is external, in which case `target="_blank"` and `rel="noopener noreferrer"` attributes are added automatically.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters passed as arguments to the `<LinkTo/LinkToExternal>` component.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    Controls if the “LinkTo” is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
    <br/><br/>
    In this component, the `...attributes` are not supported on the root element (an `<li>` element) but on the underlying element/component (`<button>`, `<a>`, `<LinkTo>` or `<LinkToExternal>` depending on the `@route/@href` arguments).
  </C.Property>
</Doc::ComponentApi>

### ListItem::Checkbox

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Content to be used in the item as label for the input control.
  </C.Property>
  <C.Property @name="value" @type="string">
    Input control’s `value` attribute.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="count" @type="string">
    Displays an optional count indicator.
  </C.Property>
  <C.Property @name="id" @type="string">
    Input control’s `id` attribute.
    <br/><br/>
    By default, the `id` is automatically generated by the component. Use this argument to pass a custom `id`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
    <br/><br/>
    The attributes will be applied to the `<input>` element. This means you can use all the standard HTML attributes of the `<input>` element and all the usual Ember techniques for event handling, validation, etc.
    <br/><br/>
    Examples of HTML attributes: `id`, `name`, `value`, `placeholder`, `disabled`, `readonly`, `required`. See [the whole list of HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes). Examples of Ember modifiers: `\{{on "input" [do something]}}`, `\{{on "change" [do something]}}`, `\{{on "blur" [do something]}}`.
  </C.Property>
</Doc::ComponentApi>

### ListItem::Radio

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Content to be used in the item as label for the input control.
  </C.Property>
  <C.Property @name="value" @type="string">
    Input control’s `value` attribute.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Acceptable value: any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="count" @type="string">
    Displays an optional count indicator.
  </C.Property>
  <C.Property @name="id" @type="string">
    Input control’s `id` attribute.
    <br/><br/>
    By default, the `id` is automatically generated by the component. Use this argument to pass a custom `id`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
    <br/><br/>
    The attributes will be applied to the `<input>` element. This means you can use all the standard HTML attributes of the `<input>` element and all the usual Ember techniques for event handling, validation, etc.
    <br/><br/>
    Examples of HTML attributes: `id`, `name`, `value`, `placeholder`, `disabled`, `readonly`, `required`. See [the whole list of HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes). Examples of Ember modifiers: `\{{on "input" [do something]}}`, `\{{on "change" [do something]}}`, `\{{on "blur" [do something]}}`.
  </C.Property>
</Doc::ComponentApi>

### ListItem::Generic

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements nested in this child component are yielded inside the ListItem. When using the “generic” ListItem, the product team is responsible for implementing the layout and accessibility.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>