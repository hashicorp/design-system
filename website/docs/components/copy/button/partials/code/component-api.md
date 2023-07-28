## Component API

This component uses [ember-cli-clipboard](https://github.com/jkusa/ember-cli-clipboard) under the hood.

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" }} @default="medium"/>
    <C.Property @name="isIconOnly" @type="boolean" @default="false">
    Indicates if the button will only contain an icon. An internal check is in place to ensure that accessible text is still applied to the component.
  </C.Property>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that a button should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="text" @required="true" @type="string">
    The text of the button or value of `aria-label` if `isIconOnly` is set to `true`. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="textToCopy" @type="string | function">
    String value or action that returns a string to be copied.
  </C.Property>
  <C.Property @name="targetToCopy" @type="string | function">
     Selector string of element or action that returns an element from which to copy text.
  </C.Property>
  <C.Property @name="container" @type="string">
     Selector string or element object of containing element, typically used in conjunction with modals; set the focused element as the container value".
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
