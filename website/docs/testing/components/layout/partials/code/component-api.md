## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="spacing" @type="string">
    Add spaces in between child elements. Accepts a custom css unit spacing size. Supported units:`px`, `rem`, `em`, and `%`.
  </C.Property>
  <C.Property @name="direction" @type="string" @values={{array "horizontal" "vertical" }} @default="horizontal">
    Set the direction in which child elements are laid out.
  </C.Property>
  <C.Property @name="align" @type="string" @values={{array "left" "right" "center" "justify" }} @default="left">
    Align the child elements wrapped by the `Doc::Layout` component.
  </C.Property>
</Doc::ComponentApi>

