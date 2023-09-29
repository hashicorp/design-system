## Component API

This component uses [ember-cli-clipboard](https://github.com/jkusa/ember-cli-clipboard) under the hood.

<Doc::ComponentApi as |C|>
  <C.Property @name="color" @type="enum" @values={{array "primary" "secondary" }} @default="primary"/>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that the component should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="textToCopy" @type="string" @required="true">
    String value or action that returns a string to be copied.
  </C.Property>
  <C.Property @name="container" @type="string">
     Selector string or element object of containing element, typically used in conjunction with modals; set the focused element as the container value.
  </C.Property>
  <C.Property @name="isTruncated" @type="boolean" @default="false">
    Constrains text to one line and truncates it based on available width. Text will only be truncated if it does not fit within the available space.
    <br><br>
    Please be aware there are [serious accessibility concerns](/components/copy/snippet?tab=accessibility) with using this feature.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
