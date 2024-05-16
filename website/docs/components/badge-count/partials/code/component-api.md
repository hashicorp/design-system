## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="type" @type="enum" @values={{array "filled" "inverted" "outlined" }} @default="filled"/>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium"/>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "neutral-dark-mode" }} @default="neutral"/>
  <C.Property @name="text" @type="string">
    Text value that renders in the Badge Count.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
