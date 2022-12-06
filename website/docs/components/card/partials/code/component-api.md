Here is the API for the component:

<Doc::ComponentApi as |C|>
  <C.Property @name="level" @type="enum">
    This controls the level of elevation ("shadow" visual effect). _Notice: `low` and `higher` are not correct values for this component (by design)._
  </C.Property>
  <C.Property @name="levelHover" @type="enum">
    This controls the level of elevation on `:hover` state.
  </C.Property>
  <C.Property @name="levelActive" @type="enum">
    This controls the level of elevation on `:active` state.
  </C.Property>
  <C.Property @name="background" @type="enum" @value="neutral-primary, neutral-secondary" @default="neutral-primary">
    This controls the background color. _Notice: later we may decide/need to add more colors, but for now we have found only these two use cases._
  </C.Property>
  <C.Property @name="hasBorder" @type="boolean">
    This controls if the card has a visual "edge", an external border (technically is an extra 1px shadow on top of the other drop shadows). _Notice: the color of the border is pre-defined. If you need a custom border you have to wrap your content in an element and assign the border to it (in that case, remember to inherit the border radius)._
  </C.Property>
  <C.Property @name="overflow" @type="enum" @value="hidden, visible" @default="hidden">
    This controls if the main wrapper (who has a border-radius applied) has overflow = visible or hidden. We expect that this is needed in case part of the content (eg. a tooltip) needs to go beyond the bounding box of the card itself.
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>