## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="[RT].ToggleInfoText" @type="yielded component">
    Standard toggle element to use, to ensure that the toggle is perceivable, visually consistent, and can be used inline with other content or standalone as part of the layout flow.
    <Doc::ComponentApi>
      <C.Property @name="yield">
        Text passed as child is yielded to the `<span>` HTML element that applies the dotted underline styling to it.
      </C.Property>
      <C.Property @name="size" @type="string" @values={{array "small" "medium" "large" }}>
        If undefined (default), the text inherits its typographic styles from the parent element.
        <br />
        If `@size` is defined, a typographic style (and font size) is applied  according to the scale `body-100/200/300`.
        <br />
        In all the cases the icon size is proportional to the font size (`1em`).
      </C.Property>
      <C.Property @name="icon" @type="string">
        Use this parameter to show an icon. Any [icon](/icons/library) name is acceptable.
      </C.Property>
      <C.Property @name="iconPosition" @type="enum" @values={{array "leading" "trailing" }} @default="leading">
        Positions the icon before or after the text.
      </C.Property>
      <C.Property @name="...attributes">
        This sub-component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="[RT].ToggleGeneric" @type="yielded component">
    Generic container that yields its content inside the "toggle" element.
  </C.Property>
  <C.Property @name="[RT].PopoverContent" @type="yielded component">
    Generic container that yields its content inside the "tooltip" popover element.
    <br />
    <br />
    _⚠️ Important: we apply a CSS reset (`all: initial`) to the container, to avoid that styles applied to the parent elements leak into the tooltip content. If you find any issue with this reset please [speak with the Design System team](/about/support)._
  </C.Property>
  <C.Property @name="[RT].isOpen" @type="yielded tracked property">
    Hook into this tracked property to access the state of `isOpen`.
  </C.Property>
  <C.Property @name="[RT].close" @type="yielded function">
    A function to programmatically close the toggle.
  </C.Property>
  <C.Property @name="isOpen" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Controls if the tooltip should be rendered initially opened.
    <br />
    <br />
    _Notice: in this case the tooltip can't be dismissed via `esc` or "click outside" until the end user has interacted with it (it's in a "manual" state)._
  </C.Property>
  <C.Property @name="isInline" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Sets the display for the HTML element which wraps the "toggle" content. If set to `true` it sets the element's display to `inline-block` (a `<button>` can't have an `inline` layout).
  </C.Property>
  <C.Property @name="toggleContainsInteractive" @type="boolean" @values={{(array true false)}} @default={{false}}>
    Controls if the "toggle" container should be rendered as a `<button>` (default) or as a `<div>` (when it contains interactive elements) to avoid nested interactive elements (non accessible).
    <br />
    <br />
    _Notice: in this case you can't use "click" event listeners for the toggle, or it may result in unexpected behaviours or non accessible code._
  </C.Property>
  <C.Property @name="toggleAriaLabel" @type="string">
    The `aria-label` value applied to the HTML element that acts as "toggle".
  </C.Property>
  <C.Property @name="popoverPlacement" @type="enum" @values={{array "top" "top-start" "top-end" "right" "right-start" "right-end" "bottom" "bottom-start" "bottom-end" "left" "left-start" "left-end"}} @default="bottom">
    Placement for the preferred starting position of the tooltip relative to the toggle element.
    <br />
    <br />
    _Notice: if `@enableCollision` is set, the popover will automatically shift position to remain visible when near the edges of the screen regardless of the starting placement._
  </C.Property>
  <C.Property @name="popoverOffset" @type="number|object" @default="12">
    A number that represents the “distance” between the tooltip and the toggle element (used to control the relative position of the arrow in relation to the toggle). An object can also be passed, which enables you to individually configure a different axis.
    <br />
    <br />
    For details see: [Floating UI > Offset > Options](https://floating-ui.com/docs/offset#options).
  </C.Property>
  <C.Property @name="popoverWidth" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    By default, the tooltip adapts to its content size. If a `@popoverWidth` parameter is provided then the tooltip will have a fixed width.
  </C.Property>
  <C.Property @name="popoverHeight" @type="string" @valueNote="any valid CSS height (px, rem, etc)">
    By default, the tooltip adapts to its content size. If a `@popoverHeight` parameter is provided then the tooltip will have a fixed height.
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
  <C.Property @name="enableCollisionDetection" @type="boolean|string" @values={{array "true" "false" "flip" "shift" "auto"}} @default="false">
    This property controls if the tooltip should automatically adapt its position to remain visible when near the edges of the viewport. It can be enabled for both axes by setting it to `true`, or a single axis can be chosen by passing the `flip` or `shift` value. If set to `auto` it will automatically place the popover in the position where there's more space available, but in this case it will ignore the `popoverPlacement` value.
    <br />
    <br />
    For an overview of how collision detection works and is controlled see: [Floating UI > Tutorial](https://floating-ui.com/docs/tutorial), [Floating UI > Flip](https://floating-ui.com/docs/flip), [Floating UI > Shift](https://floating-ui.com/docs/shift), and [Floating UI > autoPlacement](https://floating-ui.com/docs/autoPlacement).
  </C.Property>
  <C.Property @name="onOpen" @type="function">
    A callback function invoked when the tooltip is opened (if provided).
  </C.Property>
  <C.Property @name="onClose" @type="function">
    A callback function invoked when the tooltip is closed (if provided).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
