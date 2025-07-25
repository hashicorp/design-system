## Component API

### Tag

<Doc::ComponentApi as |C|>
  <C.Property @name="color" @type="enum" @values={{array "primary" "secondary" }} @default="primary">
    Sets the color of a link when `@route` or `@href` are set.
  </C.Property>
  <C.Property @name="text" @type="string" @required={{true}}>
    The text of the Tag; or link text when the `@route` or `@href` are set. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string">
    Accepts a string; the fallback is set to `Dismiss`. Note that the total value of the `aria-label` attribute is `@ariaLabel` + `@text`.
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
    Controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the @route.
  </C.Property>
  <C.Property @name="tooltipPlacement" @type="enum" @values={{array "top" "right" "bottom" "left" }} @default="top">
    Placement for the preferred starting tooltip position relative to the text when the text is truncated. The tooltip will automatically shift position to remain visible when near the edges of the screen regardless of the starting placement. The Tooltip component supports [additional placement options](/components/tooltip?tab=code#component-api) which you can explore if needed.
  </C.Property>
  <C.Property @name="onDismiss" @type="function">
    Enables the dismiss feature. When a function is passed, the "dismiss" button is displayed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
