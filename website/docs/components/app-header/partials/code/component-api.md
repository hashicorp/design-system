## Component API

### AppHeader

<Doc::ComponentApi as |C|>
  <C.Property @name="<:logo>" @type="named block">
    A named block where the main product logo linked to your app’s home page is rendered. The `AppHeader::HomeLink` component should be added here.
  </C.Property>
  <C.Property @name="<:globalActions>" @type="named block">
    A named block where the global actions will be rendered. Typically, a “context switcher” (e.g., “org switcher” or “project switcher”) control should be added here.
  </C.Property>
  <C.Property @name="<:utilityActions>" @type="named block">
    A named block where the utility actions will be rendered. Typically, `Dropdown` or `Button` components should be added here, such as a help menu, user menu, or search button.
  </C.Property>
  <C.Property @name="breakpoint" @type="string" @default="1088px">
    Set a custom breakpoint to control the page width at which the UI switches from displaying the mobile/small view vs. the desktop/view.
  </C.Property>
  <C.Property @name="hasA11yRefocus" @type="boolean" @default="true">
    Controls whether a "navigator narrator" and a "skip link" are added to the navigation (provided by the [`ember-a11y-refocus` Ember addon](https://github.com/ember-a11y/ember-a11y-refocus)). It can be programmatically turned off by passing `false`. Warning: if it is set to false, then it will fail Bypass Blocks, [Success Criteria 2.4.1](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html). Since this component appears on every page, the application will not be considered conformant.
    <br><br>
    <em>For details about the addon behaviour and functionality, refer to the [official documentation](https://github.com/ember-a11y/ember-a11y-refocus#readme).</em>
    <Doc::ComponentApi as |C|>
      <C.Property @name="a11yRefocusSkipTo" @type="string">
        Pass-through property for the `skipTo` argument - The element ID that should receive focus on skip.
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
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppHeader::HomeLink

The `AppHeader::HomeLink` component uses the generic `Hds::Interactive` component. For more details about this utility component, please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted. [See guidance on which icon to use depending on the product](/components/app-header#home-link).
  </C.Property>
  <C.Property @name="color" @type="string">
    Used to specify an optional custom color provided as any valid CSS color. For more details on acceptable values, see the [FlightIcon color argument](/components/icon?tab=code#fill). If unspecified, it will use the App Headers’s default white text color.
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
    This controls whether the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required={{true}}>
    The value of the aria-label. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
