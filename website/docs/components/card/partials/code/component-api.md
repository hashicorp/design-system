## Component API

### Card

<Doc::ComponentApi as |C|>
  <C.Property @name="level" @type="enum" @values={{array "base" "mid" "high" }} @default="base">
    Controls the level of elevation (amount of "shadow" effect).
  </C.Property>
  <C.Property @name="levelHover" @type="enum" @values={{array "base" "mid" "high" }}>
    Controls the level of elevation for the `:hover` state.
  </C.Property>
  <C.Property @name="levelActive" @type="enum" @values={{array "base" "mid" "high" }}>
    Controls the level of elevation for the `:active` state.
  </C.Property>
  <C.Property @name="background" @type="enum" @values={{array "neutral-primary" "neutral-secondary" }} @default="neutral-primary">
    Controls the background color.
  </C.Property>
  <C.Property @name="hasBorder" @type="boolean" @default="false">
    Controls whether or not the Card has a visible external border.
  </C.Property>
  <C.Property @name="overflow" @type="enum" @values={{array "visible" "hidden" }} @default="visible">
    Controls the "overflow" property for the component.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
