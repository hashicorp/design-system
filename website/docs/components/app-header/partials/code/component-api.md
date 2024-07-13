## Component API

### AppHeader

<Doc::ComponentApi as |C|>
  <C.Property @name="<:globalItemsBefore>" @type="named block">
    A named block where the content for the left-most area of the AppHeader is rendered. The `AppHeader::HomeLink` component should be added here.
  </C.Property>
  <C.Property @name="<:globalItemsAfter>" @type="named block">
    A named block where the content appearing on the left side of the AppHeader next to the `AppHeader::HomeLink` is rendered. Consumer-provided global controls such as an org switcher or project switcher should be added here.
  </C.Property>
  <C.Property @name="<:utilityItems>" @type="named block">
    A named block where the content appearing on the right side of the AppHeader is rendered. Consumer-provided utility controls such as a help menu, user menu, or search button should be added here.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### AppHeader::HomeLink

The `AppHeader::HomeLink` component uses the generic `Hds::Interactive` component. For more details about this utility component, please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted. Typically you would add the icon name for your product.
  </C.Property>
  <C.Property @name="color" @type="string">
    Used to specify an optional custom color provided as any valid CSS color. For more details on acceptable values, see the [FlightIcon color argument](/icons/usage-guidelines?tab=code#fill). If unspecified, it will use the AppHeaders’s default white text color.
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
