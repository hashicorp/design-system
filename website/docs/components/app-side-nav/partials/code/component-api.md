## Component API

### App Side Nav

This is the full-fledged component (responsive and animated).

<Doc::ComponentApi as |C|>
  <C.Property @name="<:header>" @type="named block">
    A named block where optional content for the “header” area of the App Side Nav is rendered. It yields the value of `isMinimized` too.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    A named block where the content for the “body” or main content of the App Side Nav is rendered. The `AppSideNav::List` and `AppSideNav::PortalTarget` components should be added here when used. It yields the value of `isMinimized` too.
  </C.Property>
  <C.Property @name="<:footer>" @type="named block">
    A named block where the content for the “footer” section of the App Side Nav is rendered. It yields the value of `isMinimized` too.
    <br><br>
    When the App Side Nav is paired with the [`Hds::AppHeader`](/components/app-header) component, you may not need to include the `<:footer>` block or related content.
  </C.Property>
  <C.Property @name="isResponsive" @type="boolean" @default="true">
    Controls whether the App Side Nav is responsive to viewport changes. It can be programmatically turned off by passing `false`.
    <br>
    <em>Notice: even if the `@isResponsive` parameter is set to false, some JavaScript is still executed in the background, and event listeners are attached to some DOM elements (even if this functionality is not used).</em>
  </C.Property>
  <C.Property @name="isCollapsible" @type="boolean" @default="false">
    Controls whether the App Side Nav is collapsible on large viewports. When this argument and `isResponsive` are set to `true`, a toggle button will permanently be rendered to collapse and expand the App Side Nav.
    <br>
    <em>Notice: if `@isResponsive` is set to false, this argument has no effect.</em>
  </C.Property>
  <C.Property @name="isMinimized" @type="boolean" @default="false">
    Controls if the App Side Nav is rendered collapsed or expanded when initialized. This allows an application to preserve the collapsed/expanded state across sessions. After the initial render, this argument is altered based on user interactions (collapse/expand the App Side Nav or resize the window) and it is not a suitable way of controlling the App Side Nav state from outside after render (it’s an internal state).
  </C.Property>
  <C.Property @name="toggleButtonAriaLabel" @type="string">
    Accepts a localized string; the fallback is set to `Open menu` if the menu is closed, and `Close menu` if the menu is open.
  </C.Property>
  <C.Property @name="onToggleMinimizedStatus" @type="function">
    Callback function invoked when the `AppSideNav` is collapsed or expanded. The function receives a boolean argument stating if the `AppSideNav` is minimized or not.
  </C.Property>
  <C.Property @name="onDesktopViewportChange" @type="function">
    Callback function invoked when the viewport changes. The function receives a boolean argument stating if the `AppSideNav` is in desktop mode or not.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppSideNav::Base

This is the basic component (layout only).

<Doc::ComponentApi as |C|>
  <C.Property @name="<:root>" @type="named block">
    A named block for rendering content outside of the "header/body/footer" containers of the App Side Nav.
  </C.Property>
  <C.Property @name="<:header>" @type="named block">
    A named block where optional content for the “header” area of the App Side Nav is rendered.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    A named block where the content for the “body” or main content of the App Side Nav is rendered. The `AppSideNav::List` and `AppSideNav::PortalTarget` components should be added here when used.
  </C.Property>
  <C.Property @name="<:footer>" @type="named block">
    A named block where optional content for the “footer” section of the App Side Nav is rendered.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppSideNav::PortalTarget

The `AppSideNav::PortalTarget` component is used to receive some content "transported" through the portal and inject it into its position in the DOM tree. For details about how portals work refer to the [`ember-stargate` documentation](https://github.com/simonihmig/ember-stargate).

!!! Info

The component is implemented to support [multiple portals](https://github.com/simonihmig/ember-stargate#portaltarget).

!!!

<Doc::ComponentApi as |C|>
  <C.Property @name="targetName" @type="string" @default="hds-side-nav-portal-target">
    The unique name used by [`ember-stargate`](https://github.com/simonihmig/ember-stargate#usage) to identify the portal. If provided, the same name must be used in the `AppSideNav::Portal` to point to the correct target.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppSideNav::Portal

The `AppSideNav::Portal` component is used to "transport" some content through the portal into the target element. For details about how portals work refer to the [`ember-stargate` documentation](https://github.com/simonihmig/ember-stargate).

The content yielded in the component is injected inside a `Hds::SideNav::List` element (hence all its sub-components available as yielded components).

<Doc::ComponentApi as |C|>
  <C.Property @name="<[P].ExtraBefore/Item/BackLink/Title/Link/ExtraAfter>" @type="yielded component">
    Sub-components yielded from `Hds::SideNav::List` (see below).
  </C.Property>
  <C.Property @name="targetName" @type="string" @default="hds-side-nav-portal-target">
    The unique name used by [`ember-stargate`](https://github.com/simonihmig/ember-stargate#usage) to identify the target portal. If provided, the same name must be used in the `AppSideNav::PortalTarget` to identify it.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string">
    The value of the `aria-label` that is applied to the `<nav>` element in the `Hds::SideNav::List` component. This value must be unique on the page, so they can be distinguished from one another.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppSideNav::List

The `AppSideNav::List` component is used to wrap and contain the `AppSideNav::List::Title`, `AppSideNav::List::Link`, `AppSideNav::List::BackLink` and `AppSideNav::List::Item` components, exposed as yielded contextual components.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[L].ExtraBefore>" @type="yielded component">
    A generic container yielded as contextual component. Its content is injected before the `<ul>` list of items (but inside the `<nav>` wrapper)
  </C.Property>
  <C.Property @name="<[L].Item>" @type="yielded component">
    The generic `AppSideNav::List::Item` component (see below).
  </C.Property>
  <C.Property @name="<[L].BackLink>" @type="yielded component">
    The `AppSideNav::List::BackLink` component (see below).
  </C.Property>
  <C.Property @name="<[L].Title>" @type="yielded component">
    The `AppSideNav::List::Title` component (see below).
  </C.Property>
  <C.Property @name="<[L].Link>" @type="yielded component">
    The `AppSideNav::List::Link` component (see below).
  </C.Property>
  <C.Property @name="<[L].ExtraAfter>" @type="yielded component">
    A generic container yielded as contextual component. Its content is injected after the `<ul>` list of items (but inside the `<nav>` wrapper)
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### Contextual components

##### [L].Item

The `AppSideNav::List::Item` component, yielded as contextual component.

It can be used to contain generic content.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of an `<li>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

##### [L].BackLink

The `AppSideNav::List::BackLink` component, yielded as contextual component.

It internally uses the [`Hds::Interactive`](/utilities/interactive) utility component. For more details about this component API, please refer to [its documentation page](/utilities/interactive?tab=code#component-api).

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @type="string">
    The text content for the `AppSideNav::List::BackLink` component.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @default="false">
    This controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

##### [L].Title

The `AppSideNav::List::Title` component, yielded as contextual component.

Used to display a title for related `AppSideNav::List::Link` components.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

##### [L].Link

The `AppSideNav::List::Link` component, yielded as contextual component.

It internally uses the [`Hds::Interactive`](/utilities/interactive) utility component. For more details about this component API, please refer to [its documentation page](/utilities/interactive?tab=code#component-api).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted.
  </C.Property>
  <C.Property @name="text" @type="string">
    The text content for the `AppSideNav::List::Link` component.
  </C.Property>
  <C.Property @name="iconColor" @type="string | CSS color" @values={{array "primary" "strong" "faint" "disabled" "high-contrast" "action" "action-hover" "action-active" "highlight" "highlight-on-surface" "highlight-high-contrast" "success" "success-on-surface" "success-high-contrast" "warning" "warning-on-surface" "warning-high-contrast" "critical" "critical-on-surface" "critical-high-contrast" }}>
    The color of the icon expressed as one of the possible [foreground color](/foundations/colors?tab=palette#foreground-1) names. As a fallback solution to handle special cases, a valid CSS color string (hex, rgb, rgba, etc.) is also accepted (in this case it works by setting the value of the icon SVG’s `fill` property). If no `@iconColor` argument is provided, the component will inherit its color from the `AppSideNav::List` parent container.
  </C.Property>
  <C.Property @name="badge" @type="string">
    Displays an optional `Badge`. Accepts the text value that should go in [Badge](/components/badge).
  </C.Property>
  <C.Property @name="count" @type="string">
    Displays an optional `BadgeCount` indicator. Accepts the text value that should go in [Badge Count](/components/badge-count).
  </C.Property>
  <C.Property @name="hasSubItems" @type="boolean" @default="false">
    Indicates the existence of sub-item links. If set to `true`, displays a right aligned `chevron-right` icon.
  </C.Property>
  <C.Property @name="isActive" @values={{array "false" "true" }} @default="false">
    If set to `true`, adds the class name of “active” to the rendered interactive element. Used to indicate the currently active page Link.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @default="false">
    This controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default. If set to `true`, displays a right aligned “external-link” icon.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the link (after the leading icon/text/badge/count block, before the trailing icon).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
