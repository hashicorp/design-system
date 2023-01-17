## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="color" @type="enum" @values={{array "primary" "secondary" }} @default="primary"/>
  <C.Property @name="yield">
    Elements passed as children are yielded to the content of the `<a>` HTML element.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use this parameter to show an icon. Any [icon name](/foundations/icons) is acceptable.
  </C.Property>
  <C.Property @name="iconPosition" @type="enum" @values={{array "leading" "trailing" }} @default="trailing">
    Positions the icon before or after the text.
  </C.Property>
  <C.Property @name="href">
    This is the URL parameter that is passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the `<a>` link is external and so for security reasons we need to add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it.
  </C.Property>
  <C.Property @name="route models model query current-when replace">
    These are the parameters that are passed down as arguments to the `<LinkTo/LinkToExternal>` component. For more details about these parameters see the [Ember documentation](https://guides.emberjs.com/release/routing/linking-between-routes/#toc_the-linkto--component) or the [LinkTo component API specs](https://api.emberjs.com/ember/release/classes/Ember.Templates.components/methods/input?anchor=LinkTo).
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @values={{array "false" "true" }} @default="false">
    This controls if the "LinkTo" is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
