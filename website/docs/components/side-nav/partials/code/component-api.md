## Component API

### Side Nav

This is the full-fledged component (responsive and animated).

<Doc::ComponentApi as |C|>
  <C.Property @name="<:header>" @type="named block">
    A named block where the content for the “header” area of the Side Nav is rendered. The `SideNav::Header` component should be added here. It yields the value of `isMinimized` too.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    A named block where the content for the “body” or main content of the Side Nav is rendered. The `SideNav::List` and `SideNav::PortalTarget` components should be added here when used. It yields the value of `isMinimized` too.
  </C.Property>
  <C.Property @name="<:footer>" @type="named block">
    A named block where the content for the “footer” section of the Side Nav is rendered. It yields the value of `isMinimized` too.
  </C.Property>
  <C.Property @name="isResponsive" @type="boolean" @default="true">
    Controls whether the Side Nav is responsive to viewport changes. It can be programmatically turned off by passing `false`.
    <br><br>
    <em>Notice: even if the `@isResponsive` parameter is set to false, some JavaScript is still executed in the background, and event listeners are attached to some DOM elements (even if this functionality is not used).</em>
  </C.Property>
  <C.Property @name="isCollapsible" @type="boolean" @default="false">
    Controls whether the Side Nav is collapsible on large viewports. When this argument and `isResponsive` are set to `true`, a toggle button will permanently be rendered to collapse and expand the Side Nav.
    <br><br>
    <em>Notice: if `@isResponsive` is set to false, this argument has no effect. If you are not injecting content via portals, and you want your content to automatically fade in/out when the Side Nav changes its "minimization" state, you will have to have apply the special `hds-side-nav-hide-when-minimized` class name to the top-level elements of the content you're adding.</em>
  </C.Property>
  <C.Property @name="isMinimized" @type="boolean" @default="false">
    Controls if the Side Nav is rendered collapsed or expanded when initialized. This allows an application to preserve the collapsed/expanded state across sessions. After the initial render, this argument is altered based on user interactions (collapse/expand the Side Nav or resize the window) and it is not a suitable way of controlling the Side Nav state from outside after render (it’s an internal state).
  </C.Property>
  <C.Property @name="hasA11yRefocus" @type="boolean" @default="true">
    Controls whether a "navigator narrator" and a "skip link" are added to the navigation (provided by the [`ember-a11y-refocus` Ember addon](https://github.com/ember-a11y/ember-a11y-refocus)). It can be programmatically turned off by passing `false`. Warning: if it is set to false, then it will fail Bypass Blocks, [Success Criteria 2.4.1](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html). Since this component appears on every page, the application will not be considered conformant.
    <br><br>
    <em>For details about the addon behavior and functionality, refer to the [official documentation](https://github.com/ember-a11y/ember-a11y-refocus#readme).</em>
    <Doc::ComponentApi as |C|>
      <C.Property @name="a11yRefocusSkipTo" @type="string" @default='"#hds-main"'>
        Pass-through property for the `skipTo` argument - The element ID that should receive focus on skip. The default value matches the default id value on the [`AppFrame::Main` component](/layouts/app-frame#afmain).
      </C.Property>
      <C.Property @name="a11yRefocusSkipText" @type="string">
        Pass-through property for the `skipText` argument - The text passed in the skip link; defaults to "Skip to main content".
      </C.Property>
      <C.Property @name="a11yRefocusNavigationText" @type="string">
        Pass-through property for the `navigationText` argument - The text used as navigation message. Defaults to "The page navigation is complete. You may now navigate the page content as you wish.".
      </C.Property>
      <C.Property @name="a11yRefocusRouteChangeValidator" @type="string">
        Pass-through property for the `routeChangeValidator` argument - Custom function used to define which route changes should trigger the refocusing behavior for the navigator narrator. - For details see [Customizing the definition of a route change](https://github.com/ember-a11y/ember-a11y-refocus#customizing-the-definition-of-a-route-change).
      </C.Property>
      <C.Property @name="a11yRefocusExcludeAllQueryParams" @type="boolean">
        Pass-through property for the `excludeAllQueryParams` argument - Can be used when you need to completely opt out of all transition focus management for all query params. Use with caution; you'll typically want to reach for a custom route change validator function instead.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @deprecated={{true}}>
    Accepts a string; the fallback is set to `Open menu` if the menu is closed, and `Close menu` if the menu is open.<br /><br />Note: The purpose of this argument has been replaced by an `aria-labelledby` attribute referencing the "hds-side-nav-header" `h2` combined with the use of `aria-expanded` on the Toggle button tab.
  </C.Property>
  <C.Property @name="onToggleMinimizedStatus" @type="function">
    Callback function invoked when the `SideNav` is collapsed or expanded. The function receives a boolean argument stating if the `SideNav` is minimized or not.
  </C.Property>
  <C.Property @name="onDesktopViewportChange" @type="function">
    Callback function invoked when the viewport changes. The function receives a boolean argument stating if the `SideNav` is in desktop mode or not.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Base

This is the basic component (layout only).

<Doc::ComponentApi as |C|>
  <C.Property @name="<:root>" @type="named block">
    A named block for rendering content outside of the "header/body/footer" containers of the Side Nav.
  </C.Property>
  <C.Property @name="<:header>" @type="named block">
    A named block where the content for the “header” area of the Side Nav is rendered. The `SideNav::Header` component should be added here.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    A named block where the content for the “body” or main content of the Side Nav is rendered. The `SideNav::List` and `SideNav::PortalTarget` components should be added here when used.
  </C.Property>
  <C.Property @name="<:footer>" @type="named block">
    A named block where the content for the “footer” section of the Side Nav is rendered.
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
    A named block where the header “action” components will be rendered. Typically `Dropdown` components and/or `SideNav::IconButton` components will be added here.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Header::HomeLink

The `SideNav::Header::HomeLink` component.

It internally uses the [`Hds::Interactive`](/utilities/interactive) utility component. For more details about this component API, please refer to [its documentation page](/utilities/interactive?tab=code#component-api).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted. Typically you would add the icon name for your product.
  </C.Property>
  <C.Property @name="color" @type="string">
    Used to specify an optional custom color provided as any valid CSS color. For more details on acceptable values, see the [how to use the Icon's `color` argument](/components/icon?tab=code#color). If unspecified, it will use the SideNav’s default white text color.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean">
    Controls whether or not the `<a>` link is external. When left `undefined` or explicitly set to `true` it adds the `target="_blank"` and `rel="noopener noreferrer"` attributes to the `<a>` tag (for security reasons).
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required={{true}}>
    The value of the aria-label. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::Header::IconButton

!!! Warning

**Deprecation notice**

The `SideNav::Header::IconButton` subcomponent is now deprecated. Use the `Hds::Button` component with the `isIconOnly` variant instead.

* [Example usage of an Icon-only Button](/components/side-nav?tab=code#actions) within the Side Nav `:actions` block.
* [Icon-only Button documentation](/components/button?tab=code#icon-only-button)
!!!

The `SideNav::Header::IconButton` component.

It internally uses the [`Hds::Interactive`](/utilities/interactive) utility component. For more details about this component API, please refer to [its documentation page](/utilities/interactive?tab=code#component-api).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string" @required={{true}}>
    Used to show an icon. Any [icon](/icons/library) name is accepted.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean">
    Controls whether or not the `<a>` link is external. When left `undefined` or explicitly set to `true` it adds the `target="_blank"` and `rel="noopener noreferrer"` attributes to the `<a>` tag (for security reasons).
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @default="false">
    This controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required={{true}}>
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
  <C.Property @name="targetName" @type="string" @default="hds-side-nav-portal-target">
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
  <C.Property @name="<[P].ExtraBefore/Item/BackLink/Title/Link/ExtraAfter>" @type="yielded component">
    Sub-components yielded from `Hds::SideNav::List` (see below).
  </C.Property>
  <C.Property @name="targetName" @type="string" @default="hds-side-nav-portal-target">
    The unique name used by [`ember-stargate`](https://github.com/simonihmig/ember-stargate#usage) to identify the target portal. If provided, the same name must be used in the `SideNav::PortalTarget` to identify it.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string">
    The value of the `aria-label` that is applied to the `<nav>` element in the `Hds::SideNav::List` component. This value must be unique on the page, so they can be distinguished from one another.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SideNav::List

The `SideNav::List` component is used to wrap and contain the `SideNav::List::Title`, `SideNav::List::Link`, `SideNav::List::BackLink` and `SideNav::List::Item` components, exposed as yielded contextual components.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[L].ExtraBefore>" @type="yielded component">
    A generic container yielded as contextual component. Its content is injected before the `<ul>` list of items (but inside the `<nav>` wrapper)
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
  <C.Property @name="<[L].ExtraAfter>" @type="yielded component">
    A generic container yielded as contextual component. Its content is injected after the `<ul>` list of items (but inside the `<nav>` wrapper)
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### Contextual components

##### [L].Item

The `SideNav::List::Item` component, yielded as contextual component.

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

The `SideNav::List::BackLink` component, yielded as contextual component.

It internally uses the [`Hds::Interactive`](/utilities/interactive) utility component. For more details about this component API, please refer to [its documentation page](/utilities/interactive?tab=code#component-api).

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @type="string">
    The text content for the `SideNav::List::BackLink` component.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean">
    Controls whether or not the `<a>` link is external. When left `undefined` or explicitly set to `true` it adds the `target="_blank"` and `rel="noopener noreferrer"` attributes to the `<a>` tag (for security reasons).
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

The `SideNav::List::Title` component, yielded as contextual component.

Used to display a title for related `SideNav::List::Link` components.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

##### [L].Link

The `SideNav::List::Link` component, yielded as contextual component.

It internally uses the [`Hds::Interactive`](/utilities/interactive) utility component. For more details about this component API, please refer to [its documentation page](/utilities/interactive?tab=code#component-api).

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
  <C.Property @name="hasSubItems" @type="boolean" @default="false">
    Indicates the existence of sub-item links. If set to `true`, displays a right aligned `chevron-right` icon.
  </C.Property>
  <C.Property @name="isActive" @values={{array "false" "true" }} @default="false">
    If set to `true`, adds the class name of “active” to the rendered interactive element. Used to indicate the currently active page Link.
  </C.Property>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean">
    Controls whether or not the `<a>` link is external. When left `undefined` or explicitly set to `true` it adds the `target="_blank"` and `rel="noopener noreferrer"` attributes to the `<a>` tag (for security reasons). If explicitly set to `true`, it displays also a right aligned “external-link” icon.
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
