## Component API

The ApplicationState component has three child components:

- Header
- Body
- Footer

<Doc::ComponentApi as |C|>
  <C.Property @name="errorCode" @type="string">
    Indicates that the component is being used for an error state.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### ApplicationState::Header

<Doc::ComponentApi as |C|>
  <C.Property @name="titleText" @type="string"  />
</Doc::ComponentApi>

### ApplicationState::Body

<Doc::ComponentApi as |C|>
  <C.Property @name="bodyText" @type="string" />
</Doc::ComponentApi>

### ApplicationState::Footer

Up to one footer link is supported in the empty state; an additional "help" link is available in the error state.

<Doc::ComponentApi as |C|>
  <C.Property @name="iconName" @type="string">
    The icon to be used with the standalone link.
  </C.Property>
  <C.Property @name="footerText" @type="string">
    The link text.
  </C.Property>
  <C.Property @name="href" @type="string">
    The URL to be linked.
  </C.Property>
  <C.Property @name="helpIcon" @type="string">
    Default icon is `help`, but any valid icon name is supported.
  </C.Property>
  <C.Property @name="helpText" @type="string">
    Default text is "Need Help", but it can be customized for localization/internationalization purposes.
  </C.Property>
  <C.Property @name="helpHref" @type="string">
    The URL to the help page.
  </C.Property>
</Doc::ComponentApi>
