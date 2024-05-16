## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="type" @type="enum" @values={{array "filled" "inverted" "outlined" }} @default="filled"/>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium"/>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "neutral-dark-mode" "highlight" "critical" "success" "warning" }} @default="neutral"/>
  <C.Property @name="text" @type="string">
    The text of the Badge or value of the screen-reader only element if `isIconOnly` is set to `true`. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use this parameter to show an icon. Any [icon](/icons/library) name is acceptable.
  </C.Property>
  <C.Property @name="isIconOnly" @type="boolean" @default="false">
    This indicates if the button will only contain an icon. An internal check is in place to ensure that accessible text is still applied to the component.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
