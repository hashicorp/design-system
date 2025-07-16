## Component API

### Link::Standalone

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium"/>
  <C.Property @name="color" @type="enum" @values={{array "primary" "secondary" }} @default="primary"/>
  <C.Property @name="text" @required={{true}} @type="string">
    The text of the link. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="icon" @required={{true}} @type="string">
    Use this parameter to show an icon. Any [icon](/icons/library) name is acceptable. `icon` is required to ensure the component conforms to accessibility best practices.
  </C.Property>
  <C.Property @name="iconPosition" @type="enum" @values={{array "leading" "trailing" }} @default="leading">
    Positions the icon before or after the text.
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
    Controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
