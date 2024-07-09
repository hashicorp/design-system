## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="[RT].Toggle" @type="yielded component">
    The `RichTooltip::Toggle` component (see below).
  </C.Property>
  <C.Property @name="[RT].Bubble" @type="yielded component">
    The `RichTooltip::Bubble` component (see below).
  </C.Property>
  <C.Property @name="isOpen" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Controls if the tooltip should be rendered initially opened.
    <br />
    <br />
    _Notice: in this case the tooltip can't be dismissed via `esc` or "click outside" until the end user has interacted with it (it's in a "manual" state)._
  </C.Property>
  <C.Property @name="enableSoftEvents" @type="boolean" @default="true" @values={{array "true" "false"}}>
    Assigns "soft" event listeners (`mouseEnter/Leave` + `focusIn/Out`) to the toggle to control the visibility of the tooltip.
  </C.Property>
  <C.Property @name="enableClickEvents" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Assigns a "click" event listener (`onClick`) to the toggle to control the visibility of the tooltip.
    <br />
    <br />
    _Notice: enabling "click" event listeners will automatically disable "soft" event listeners._
  </C.Property>
  <C.Property @name="onOpen" @type="function">
    A callback function invoked when the tooltip is opened (if provided).
  </C.Property>
  <C.Property @name="onClose" @type="function">
    A callback function invoked when the tooltip is closed (if provided).
  </C.Property>
  <C.Property @name="[RT].isOpen" @type="yielded tracked property">
    Hook into this tracked property to access the state of `isOpen`.
  </C.Property>
  <C.Property @name="[RT].close" @type="yielded function">
    Hook into this function to programmatically close the toggle.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

The Toggle and Bubble elements are passed into the Rich Tooltip as yielded components, using the `Toggle` and `Bubble` keys.

#### RichTooltip::Toggle

Standard toggle element to use, consisting of a text string and an optional icon, to ensure that the toggle is perceivable, visually consistent, and can be used inline with other content or standalone as part of the layout flow.

It can also be used with generic content, in which case consumers will need to ensure the component is used in a [conformant accessible way](/components/rich-tooltip?tab=accessibility).

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @type="string">
    A plain text string rendered in an HTML `<span>` element inside the toggle button. It has a dotted underline styling applied to it.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use this parameter to show an icon. Any [icon](/icons/library) name is acceptable. The icon size is proportional to the font size (`1em`).
    <br />
    <br />
    _If the toggle contains only an icon, an `aria-label` value must be assigned to the toggle to make it accessible._
  </C.Property>
  <C.Property @name="iconPosition" @type="enum" @values={{array "leading" "trailing"}} @default="trailing">
    Positions the icon before or after the text.
  </C.Property>
  <C.Property @name="size" @type="string" @values={{array "undefined" "small" "medium" "large"}} @default="undefined">
    If undefined, the `@text` inherits its typographic styles including size from the parent element.
    If the `@size` is defined, a typographic style including font size is applied to the `@text` according to the scale `body-100/200/300`.
    <br />
    <br />
    _⚠️ Important: The size is applied only to the `@text`, not the `yield` content._
  </C.Property>
  <C.Property @name="isInline" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Sets the display for the HTML `<button>` element which is used in the "toggle". If `true`, it sets the element’s display to `inline-flex`. (Note: a `<button>` can’t have an `inline` layout.)
  </C.Property>
  <C.Property @name="yield">
    It’s possible to yield generic content to the "toggle" element, instead of using the `@text` argument. This should be used only in special edge cases where including text or an icon in the toggle doesn’t work for the specific context or design.
    <br />
    <br />
    _⚠️ Important: In this case it’s up to the consumers to make sure the implementation is compliant with the [accessibility requirements](/components/rich-tooltip?tab=accessibility)._
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### RichTooltip::Bubble

Generic container that yields its content inside the "tooltip" popover element.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the tooltip's bubble.
    <br />
    <br />
    _⚠️ Important: We apply a CSS reset (`all: initial`) to the container, to avoid  having styles applied to the parent elements leak into the tooltip content. If you find any issue with this reset, please [speak with the Design System team](/about/support)._
  </C.Property>
  <C.Property @name="placement" @type="enum" @values={{array "top" "top-start" "top-end" "right" "right-start" "right-end" "bottom" "bottom-start" "bottom-end" "left" "left-start" "left-end"}} @default="bottom">
    Placement for the preferred starting position of the tooltip's bubble relative to the toggle element.
    <br />
    <br />
    _Note: If `@enableCollisionDetection` is set, the bubble will automatically shift position to remain visible when near the edges of the screen regardless of the starting placement._
  </C.Property>
  <C.Property @name="offset" @type="number|object" @default="12">
    A number that represents the “distance” between the tooltip's bubble and the toggle element (used to control the relative position of the arrow in relation to the toggle). An object can also be passed, which enables you to individually configure a different axis.
    <br />
    <br />
    For details see: [Floating UI > Offset > Options](https://floating-ui.com/docs/offset#options).
  </C.Property>
  <C.Property @name="enableCollisionDetection" @type="boolean|string" @values={{array "true" "false" "flip" "shift" "auto"}} @default="false">
    This property controls whether the tooltip should automatically adapt its position to remain visible when near the edges of the viewport. It can be enabled for both axes by setting it to `true` or for a single axis by passing either the `flip` or `shift` values. If set to `auto`, it will automatically place the popover in the position where there's more space available, but in this case, it will ignore the `placement` value.
    <br />
    <br />
    For an overview of how collision detection works and is controlled see: [Floating UI > Tutorial](https://floating-ui.com/docs/tutorial), [Floating UI > Flip](https://floating-ui.com/docs/flip), [Floating UI > Shift](https://floating-ui.com/docs/shift), and [Floating UI > autoPlacement](https://floating-ui.com/docs/autoPlacement).
  </C.Property>
  <C.Property @name="width" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    By default, the bubble adapts to its content size. If a `@width` parameter is provided, then the bubble will have a fixed width.
  </C.Property>
  <C.Property @name="height" @type="string" @valueNote="any valid CSS height (px, rem, etc)">
    By default, the bubble adapts to its content size. If an `@height` parameter is provided, then the bubble will have a fixed height.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>