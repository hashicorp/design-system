## Component API

### AppHeader

<Doc::ComponentApi @component="app-header" @section="api" />

### AppHeader::HomeLink

The `AppHeader::HomeLink` component uses the generic `Hds::Interactive` component. For more details about this utility component, please refer to [its documentation page](/utilities/interactive).

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string" @required={{true}}>
    Used to show an icon. Any [icon](/icons/library) name is accepted. [See guidance on which icon to use depending on the product](/components/app-header#home-link).
  </C.Property>
  <C.Property @name="text" @type="string" @required={{true}}>
    Used to display text inline with the logo. If `@isIconOnly` is set to `true`, this value will instead be passed to the `aria-label` of the `<a>` tag.
  </C.Property>
  <C.Property @name="isIconOnly" @type="boolean" @default="true">
    Indicates if the Home Link will only contain a icon/logo. If set to `false`, the `@text` property will be rendered adjacent to the logo.
  </C.Property>
  <C.Property @name="color" @type="string">
    Used to specify an optional custom color provided as any valid CSS color. For more details on acceptable values, see the [Icon color argument](/components/icon?tab=code#fill). If unspecified, it will use the App Headers’s default white text color.
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
    This controls whether the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
