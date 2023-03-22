## Component API

### SideNav::Wrapper

<Doc::ComponentApi as |C|>
  <C.Property @name="<:header>" @type="named block">
    This is a named block where the content for the “header” area of the SideNav is rendered. The `SideNav::Header` component should be added here.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    This is a named block where the content for the “body” or main content of the SideNav is rendered. The `SideNav::List` component, if used, should be added here.
  </C.Property>
  <C.Property @name="<:footer>" @type="named block">
    This is a named block where the content for the “footer” section of the SideNav is rendered.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Header

<Doc::ComponentApi as |C|>
  <C.Property @name="<:logo>" @type="named block">
    This is a named block where the main product logo linked to your app’s home page will be rendered. The `SideNav::HomeLink` component should be added here.
  </C.Property>
  <C.Property @name="<:actions>" @type="named block">
    This is a named block where the header “action” components will be rendered. Typically `Dropdown` components and/or `SideNav::IconButton` components will be added here. Special SideNav coordinated styling can be applied to dropdowns by adding the `hds-side-nav__dropdown` class name.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::HomeLink

The `SideNav::HomeLink` component uses the generic `Hds::Interactive` component. For more details about this utility component please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted. Typically you would add the icon name for your product.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required="true">
    The value of the aria-label. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="color" @type="string">
    Used to specify an optional custom color provided as any valid CSS color. For more details on acceptable values, see the [FlightIcon color argument](/icons/usage-guidelines?tab=code#fill). If unspecified, it will use the SideNav’s default white text color.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default.
  </C.Property>
  <C.Property @name="route models model query current-when replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::IconButton

The `SideNav::IconButton` component uses the generic `Hds::Interactive` component. For more details about this utility component please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required="true">
    The value of the `aria-label`. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default.
  </C.Property>
  <C.Property @name="route models model query current-when replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::List::Link

The `SideNav::List::Link` component uses the generic `Hds::Interactive` component. For more details about this utility component please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted.
  </C.Property>
  <C.Property @name="text" @type="string">
    The text content for the `SideNav::List::Link` component.
  </C.Property>
  <C.Property @name="badge" @type="string">
    Displays an optional `Badge`. Accepts the text value that should go in [Badge](/components/badge).
  </C.Property>
  <C.Property @name="count" @type="string">
    Displays an optional `BadgeCount` indicator. Accepts the text value that should go in [Badge Count](/components/badge-count).
  </C.Property>
  <C.Property @name="hasSubItems" @type="boolean" @values={{array "false" "true" }} @default="false">
    Indicates the existence of sub-item links. If set to `true`, displays a right aligned `chevron-right` icon.
  </C.Property>
  <C.Property @name="isActive" @values={{array "false" "true" }} @default="false">
    If set to true, adds the class name of “active” to the rendered interactive element. Used to indicate the currently active page Link.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default. If set to “true”, displays a right aligned “external-link” icon.
  </C.Property>
  <C.Property @name="route models model query current-when replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::List::BackLink

The `SideNav::List::BackLink` component uses the generic `Hds::Interactive` component. For more details about this utility component please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @type="string">
    The text content for the `SideNav::List::BackLink` component.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default.
  </C.Property>
  <C.Property @name="route models model query current-when replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
