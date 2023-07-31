## Component API

This component uses [ember-cli-clipboard](https://github.com/jkusa/ember-cli-clipboard) under the hood.

<Doc::ComponentApi as |C|>
  <C.Property @name="color" @type="enum" @values={{array "secondary" "tertiary" }} @default="tertiary"/>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that the component should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="textToCopy" @type="string" @required="true">
    String value or action that returns a string to be copied.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
