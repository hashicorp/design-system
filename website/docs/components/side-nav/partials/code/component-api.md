## Component API

### SideNav

This is the full-fledged component (responsive and animated).

<Doc::ComponentApi as |C|>
  <C.Property @name="<:header>" @type="named block">
    A named block where the content for the “header” area of the SideNav is rendered. The `SideNav::Header` component should be added here. It yields the value of `isMinimized` too.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    A named block where the content for the “body” or main content of the SideNav is rendered. The `SideNav::List` and `SideNav::PortalTarget` components should be added here when used. It yields the value of `isMinimized` too.
  </C.Property>
  <C.Property @name="<:footer>" @type="named block">
    A named block where the content for the “footer” section of the SideNav is rendered. It yields the value of `isMinimized` too.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Base

This is the basic component (layout only).

<Doc::ComponentApi as |C|>
  <C.Property @name="<:root>" @type="named block">
    A named block that can be used to render content that needs to be rendered outside of the "header/body/footer" containers of the SideNav.
  </C.Property>
  <C.Property @name="<:header>" @type="named block">
    A named block where the content for the “header” area of the SideNav is rendered. The `SideNav::Header` component should be added here.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    A named block where the content for the “body” or main content of the SideNav is rendered. The `SideNav::List` and `SideNav::PortalTarget` components should be added here when used.
  </C.Property>
  <C.Property @name="<:footer>" @type="named block">
    A named block where the content for the “footer” section of the SideNav is rendered.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Header

<Doc::ComponentApi as |C|>
  <C.Property @name="<:logo>" @type="named block">
    A named block where the main product logo linked to your app’s home page will be rendered. The `SideNav::HomeLink` component should be added here.
  </C.Property>
  <C.Property @name="<:actions>" @type="named block">
    A named block where the header “action” components will be rendered. Typically `Dropdown` components and/or `SideNav::IconButton` components will be added here. Special SideNav coordinated styling can be applied to dropdowns by adding the `hds-side-nav__dropdown` class name.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Header::HomeLink

The `SideNav::Header::HomeLink` component uses the generic `Hds::Interactive` component. For more details about this utility component please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted. Typically you would add the icon name for your product.
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
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required="true">
    The value of the aria-label. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Header::IconButton

The `SideNav::Header::IconButton` component uses the generic `Hds::Interactive` component. For more details about this utility component please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required="true">
    The value of the `aria-label`. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::PortalTarget

The `SideNav::PortalTarget` component is used to receive some content "transported" through the portal and inject it into its position in the DOM tree. For details about how portals work refer to the [`ember-stargate` documentation](https://github.com/simonihmig/ember-stargate).

!!! Info

The component is implemented to support [multiple portals](https://github.com/simonihmig/ember-stargate#portaltarget).

!!!

<Doc::ComponentApi as |C|>
  <C.Property @name="targetName" @type="string" @values={{array "hds-side-nav-portal-target" "string" }} @default="hds-side-nav-portal-target">
    The unique name used by [`ember-stargate`](https://github.com/simonihmig/ember-stargate#usage) to identify the portal. If provided, the same name must be used in the `SideNav::Portal` to point to the correct target.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Portal

The `SideNav::Portal` component is used to "transport" some content through the portal into the target element. For details about how portals work refer to the [`ember-stargate` documentation](https://github.com/simonihmig/ember-stargate).

The content yielded in the component is injected inside a `Hds::SideNav::List` element (hence all its sub-components available as yielded components).

<Doc::ComponentApi as |C|>
  <C.Property @name="<[P].extraBefore/Item/BackLink/Title/Link/extraAfter>" @type="yielded component">
    Sub-components yielded from `Hds::SideNav::List` (see below).
  </C.Property>
  <C.Property @name="targetName" @type="string" @values={{array "hds-side-nav-portal-target" "string" }} @default="hds-side-nav-portal-target">
    The unique name used by [`ember-stargate`](https://github.com/simonihmig/ember-stargate#usage) to identify the target portal. If provided, the same name must be used in the `SideNav::PortalTarget` to identify it.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string">
    The value of the `aria-label` that is applied to the `<nav>` element in the `Hds::SideNav::List` component.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>


### SideNav::List

The `SideNav::List` component is used to wrap and contain the `SideNav::List::Title`, `SideNav::List::Link`, `SideNav::List::BackLink` and `SideNav::List::Item` components.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[L].extraBefore>" @type="yielded component">
    Container that yields its content before the `<ul>` list of items (but inside the `<nav>` wrapper)
  </C.Property>
  <C.Property @name="<[L].Item>" @type="yielded component">
    The generic `SideNav::List::Item` component (see below).
  </C.Property>
  <C.Property @name="<[L].BackLink>" @type="yielded component">
    The `SideNav::List::BackLink` component (see below).
  </C.Property>
  <C.Property @name="<[L].Title>" @type="yielded component">
    The `SideNav::List::Title` component (see below).
  </C.Property>
  <C.Property @name="<[L].Link>" @type="yielded component">
    The `SideNav::List::Link` component (see below).
  </C.Property>
  <C.Property @name="<[L].extraAfter>" @type="yielded component">
    Container that yields its content after the `<ul>` list of items (but inside the `<nav>` wrapper)
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::List::Item

The `SideNav::List::Item` component can be used to contain generic content.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside the `<li>` element.
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
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::List::Title

The `SideNav::List::Title` component is used to display a title for related `SideNav::List::Link` components.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside the element.
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
    If set to `true`, adds the class name of “active” to the rendered interactive element. Used to indicate the currently active page Link.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default. If set to `true`, displays a right aligned “external-link” icon.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside the element (after the leading icon/text/badge/count block, before the trailing icon).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

