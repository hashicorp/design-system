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
</Doc::ComponentApi>

### SideNav::Header

<Doc::ComponentApi as |C|>
  <C.Property @name="<:logo>" @type="named block">
    This is a named block where the main product logo linked to your app’s home page will be rendered. The `SideNav::HomeLink` component should be added here.
  </C.Property>
  <C.Property @name="<:actions>" @type="named block">
    This is a named block where the header “action” components will be rendered. Typically `Hds::Dropdown` components and/or `SideNav::IconButton` components will be added here. Special SideNav coordinated styling can be applied to dropdowns by adding the “hds-side-nav__dropdown” class name.
  </C.Property>
</Doc::ComponentApi>

### SideNav::HomeLink

!!! Info

The `SideNav::HomeLink` component uses the generic `Hds::Interactive` component. For more details about how this utility component works please refer to [its documentation page](/utilities/interactive).

!!!

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted. Typically you would add the icon name for your product.
  </C.Property>
  <C.Property @name="text" @type="string" @required="true">
    The value of the aria-label. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="color" @type="string" @required="string">
    Used to specify an optional custom color provided as a [color token](/foundations/colors). If unspecified, it will use the SideNav’s default white text color.
  </C.Property>
</Doc::ComponentApi>

### SideNav::IconButton

!!! Info

The `SideNav::IconButton` component uses the generic `Hds::Interactive` component. For more details about how this utility component works please refer to [its documentation page](/utilities/interactive).

!!!

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required="true">
    The value of the aria-label. If no text value is defined an error will be thrown.
  </C.Property>
</Doc::ComponentApi>

<!-- ### SideNav::List

<Doc::ComponentApi as |C|>
  <C.Property @name="ARG-NAME" @type="DATA-TYPE">
    DESCRIPTION
  </C.Property>
</Doc::ComponentApi> -->

<!-- ### SideNav::List::Title

<Doc::ComponentApi as |C|>
  <C.Property @name="ARG-NAME" @type="DATA-TYPE">
    DESCRIPTION
  </C.Property>
</Doc::ComponentApi> -->

### SideNav::List::Link

!!! Info

The `SideNav::List::Link` component uses the generic `Hds::Interactive` component. For more details about how this utility component works please refer to [its documentation page](/utilities/interactive).

!!!

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @type="string">
    The text content for the `SideNav::List::Link` component.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted.
  </C.Property>
  <C.Property @name="badge" @type="string">
    Displays an optional `Badge`. Accepts the text value that should go in [Badge](/components/badge).
  </C.Property>
  <C.Property @name="count" @type="string">
    Displays an optional `count` indicator. Accepts the text value that should go in [Badge Count](/components/badge-count).
  </C.Property>
  <C.Property @name="hasSubItems" @type="boolean" @values={{array "false" "true" }} @default="false">
    Indicates the existence of sub-item links. If set to “true”, displays a right aligned “chevron-right” icon.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    Inherited from the `Hds::Interactive` component. If set to “true”, displays a right aligned “external-link” icon.
  </C.Property>
</Doc::ComponentApi>

### SideNav::List::BackLink

!!! Info

The `SideNav::List::BackLink` component uses the generic `Hds::Interactive` component. For more details about how this utility component works please refer to [its documentation page](/utilities/interactive).

!!!

<Doc::ComponentApi as |C|>
<C.Property @name="text" @type="string">
    The text content for the `SideNav::List::BackLink` component.
  </C.Property>
</Doc::ComponentApi>

<!-- ### SideNav::List::Item

<Doc::ComponentApi as |C|>
  <C.Property @name="ARG-NAME" @type="DATA-TYPE">
    DESCRIPTION
  </C.Property>
</Doc::ComponentApi> -->
