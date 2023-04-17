## Component API

### TooltipButton

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @type="string">
    Text string which will appear in the tooltip. May contain basic HTML tags for formatting text such as `strong` and `em` tags. Not intended for multi-paragraph text or other more complex content. May not contain interactive content such as links or buttons.
  </C.Property>
  <C.Property @name="placement" @type="enum" @values={{array "top" "top-start" "top-end" "right" "right-start" "right-end" "bottom" "bottom-start" "bottom-end" "left" "left-start" "left-end" }} @default="top">
    Placement for the tooltip relative to the opener element. Will automatically shift position to remain visible when near the edges of the screen.
  </C.Property>
  <C.Property @name="offset" @type="array">
    Takes two numbers. The first number controls “skidding” or the tooltip displacement from the center of the opener element. The second number controls the “distance” from the opener element.
  </C.Property>
  <C.Property @name="extraTippyOptions" @type="hash">
    You can enable [Tippy.js options](https://atomiks.github.io/tippyjs/v6/all-props/) by passing a hash of the options you wish to use.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### `hds-tooltip` modifier

The modifier offers the same options as the component. See the “How to use” section for syntax examples.