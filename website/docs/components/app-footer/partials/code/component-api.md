## Component API

### AppFooter

The base `AppFooter` component includes a copyright notice. It also wraps and contains the `AppFooter::StatusLink`, `AppFooter::LegalLinks`, `AppFooter::Link`, and `AppFooter::Item` child components as well as `ExtraBefore` and `ExtraAfter` yielded components.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[AF].ExtraBefore>" @type="yielded component">
    Container that yields its content before the `<ul>` list of links and items.
  </C.Property>
  <C.Property @name="<[AF].StatusLink>" @type="yielded component">
    The `AppFooter::StatusLink` component (see below).
  </C.Property>
  <C.Property @name="<[AF].LegalLinks>" @type="yielded component">
    The `AppFooter::LegalLinks` component (see below).
  </C.Property>
  <C.Property @name="<[AF].Link>" @type="yielded component">
    The `AppFooter::Link` component (see below).
  </C.Property>
  <C.Property @name="<[AF].Item>" @type="yielded component">
    The `AppFooter::Item` component which is used for custom non-link content (see below).
  </C.Property>
  <C.Property @name="<[AF].ExtraAfter>" @type="yielded component">
    Container that yields its content after the `<ul>` list of links and items.
  </C.Property>
  <C.Property @name="theme" @type="string"  @values={{array "light" "dark" }} @default="light">
    Set the overall theme used by the component and its children.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @default="&quot;Footer items&quot;">
    Accepts a localized string. The `ariaLabel` value is applied to the list of `AppFooter` content.
  </C.Property>
  <C.Property @name="copyrightYear" @type="string" @default="currentYear">
    Pass a custom year value for the `Copyright` instead of the default current year value.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppFooter::StatusLink

<Doc::ComponentApi as |C|>
  <C.Property @name="status" @type="string" @values={{array "operational" "degraded" "maintenance" "outage" }}>
    Passing one of the defined values sets the associated `text`, `statusIcon`, and `statusIconColor`. Either `status` or `text` must be passed or an error will be thrown.
  </C.Property>
  <C.Property @name="statusIcon" @type="string">
    Pass a custom icon name.
  </C.Property>
  <C.Property @name="statusIconColor" @type="string">
    Pass a custom icon color. Accepts any valid CSS color value.
  </C.Property>
  <C.Property @name="text" @type="string">
    Pass a custom text value.
  </C.Property>
  <C.Property @name="href">
    Pass a custom href for the link. (URL parameter that’s passed down to the `<a>` element.)
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @default="false">
    Controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @default="false">
    Controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppFooter::LegalLinks

<Doc::ComponentApi as |C|>
  <C.Property @name="hrefForSupport" @type="string" @default="&quot;https://www.hashicorp.com/support&quot;">
    Override the default href value with a custom url value.
  </C.Property>
  <C.Property @name="hrefForTerms" @type="string" @default="&quot;https://www.hashicorp.com/terms-of-service&quot;">
    Override the default href value with a custom url value.
    <br>
    <br>
    Note: As this links to the ToS of the website, you should overwrite this value with the ToS most relevant to your product application.
  </C.Property>
  <C.Property @name="hrefForPrivacy" @type="string" @default="&quot;https://www.hashicorp.com/privacy&quot;">
    Override the default href value with a custom url value.
  </C.Property>
  <C.Property @name="hrefForSecurity" @type="string" @default="&quot;https://www.hashicorp.com/security&quot;">
    Override the default href value with a custom url value.
  </C.Property>
  <C.Property @name="Accessibility" @type="string" @default="&quot;https://www.hashicorp.com/accessibility&quot;">
    Override the default href value with a custom url value.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @default="&quot;Legal links&quot;">
    Accepts a localized string. The `ariaLabel` value is applied to the nested list of included legal links.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppFooter::Link

<Doc::ComponentApi as |C|>
  <C.Property @name="href">
    URL parameter that’s passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @default="false">
    Controls if the `<a>` link is external. For security reasons, we add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it by default.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @default="false">
    Controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the `<a>` HTML element.
  </C.Property>
   <C.Property @name="icon" @type="string">
    Use this parameter to show an icon. Any [icon](/icons/library) name is acceptable.
  </C.Property>
  <C.Property @name="iconPosition" @type="enum" @values={{array "leading" "trailing" }} @default="trailing">
    Positions the icon before or after the text.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppFooter::Item

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the `<li>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
