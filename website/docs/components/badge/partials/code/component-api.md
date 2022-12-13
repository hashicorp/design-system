Here is the API for the component:

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium"/>
  <C.Property @name="type" @type="enum" @values={{array "filled" "inverted" "outlined" }} @default="filled"/>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "neutral-dark-mode" "highlight" "critical" "success" "warning" }} @default="neutral"/>
  <C.Property @name="text" @type="string">
    The text of the badge or value of the screen-reader only element if `isIconOnly` is set to `true`. _If no text value is defined an error will be thrown._
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use this parameter to show an icon. Acceptable value: any Flight icon name.
  </C.Property>
  <C.Property @name="isIconOnly" @type="boolean">
    This indicates if the button will only contain an icon. _Notice: an internal check is in place to ensure that accessible text is still applied to the component._
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>