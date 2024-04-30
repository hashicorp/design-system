## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="<:toggle>" @type="named block">
    A named block that works as "toggle" for the PopoverPrimitive.
    <Doc::ComponentApi as |C|>
      <C.Property @name="[t].popoverElement" @type="function">
        A reference to the popover `:content` element (container).
      </C.Property>
      <C.Property @name="[t].isOpen" @type="tracked property">
        Hook into this tracked property to access the state of `isOpen`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="<:content>" @type="named block">
    A named block for the content that is shown/hidden upon toggling.
    <Doc::ComponentApi as |C|>
      <C.Property @name="[c].toggleElement" @type="function">
        A reference to the `:toggle` element (container).
      </C.Property>
      <C.Property @name="[c].isOpen" @type="tracked property">
        Hook into this tracked property to access the state of `isOpen`.
      </C.Property>
      <C.Property @name="[c].hidePopover" @type="function">
        A function to programmatically hide ("close") the popover.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="anchoredPositionOptions" @type="hash">
    An object with different keys corresponding to different options (see below). These options are forwarded to underlying modifier `hds-anchored-position`, and in turn are passed down to the [Floating UI](https://floating-ui.com) library.
    <Doc::ComponentApi as |C|>
      <C.Property @name="placement" @type="enum" @values={{array "top" "top-start" "top-end" "right" "right-start" "right-end" "bottom" "bottom-start" "bottom-end" "left" "left-start" "left-end"}} @default="bottom">
        Placement for the preferred starting position of the popover relative to the toggle element.
        <br />
        <br />
        _Notice: if `@enableCollision` is set, the popover will automatically shift position to remain visible when near the edges of the screen regardless of the starting placement._
      </C.Property>
      <C.Property @name="strategy" @type="enum" @values={{array "absolute" "fixed"}} @default="absolute">
        Controls how the layout of the popover is applied using the CSS `position` property. Since the component uses the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) which promotes the popover to the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer), there is no need to use the `fixed` position to avoid stacking context conflicts, but we leave the option open for edge cases in which this is needed anyway.
        <br />
        <br />
        _Notice: if the position/strategy is set to `fixed`, the rendering of the popover becomes jagged when the page is scrolled._
      </C.Property>
      <C.Property @name="offsetOptions" @type="number|object" @default="0">
        A number that represents the “distance” between the popover element and the toggle element. An object can also be passed, which enables to individually configure different axis.
        <br />
        <br />
        For details see: [Floating UI > Offset > Options](https://floating-ui.com/docs/offset#options).
        <br />
        <br />
        _Notice: this options can be used to control the relative position of the arrow in relation to the toggle._
      </C.Property>
      <C.Property @name="enableCollisionDetection" @type="boolean|string" @values={{array "true" "false" "flip" "shift" "auto"}} @default="false">
        This property controls if the popover should automatically adapt its position to remain visible when near the edges of the screen. It can be enabled for both axes setting it to `true`, or a single axes can be chosen passing the `flip` or `shift` value. If set to `auto` it will automatically place the popover in the position where there's more space available, but in this case it will ignore the `placement` value.
        <br />
        <br />
        For an overview of how collision detection works and is controlled see: [Floating UI > Tutorial](https://floating-ui.com/docs/tutorial), [Floating UI > Flip](https://floating-ui.com/docs/flip), [Floating UI > Shift](https://floating-ui.com/docs/shift), and [Floating UI > autoPlacement](https://floating-ui.com/docs/autoPlacement).
      </C.Property>
      <C.Property @name="flipOptions" @type="object" @default="{ padding: 8 }">
        The options for the `flip` middleware in Floating UI, that controls the automatic repositioning of the popover along its side axis.
        <br />
        <br />
        For details about how this middleware works (and its options) see: [Floating UI > Flip](https://floating-ui.com/docs/flip)
      </C.Property>
      <C.Property @name="shiftOptions" @type="object" @default="{ padding: 8, limiter: limitShift() }">
        The options for the `shift` middleware in Floating UI, that controls the automatic repositioning of the popover along its axis of alignment.
        <br />
        <br />
        For details about how this middleware works (and its options) see: [Floating UI > Shift](https://floating-ui.com/docs/shift)
      </C.Property>
      <C.Property @name="autoPlacementOptions" @type="object" @default="{ padding: 8 }">
        The options for the `autoPlacement` middleware in Floating UI, that controls the automatic repositioning of the popover based on the most space available.
        <br />
        <br />
        For details about how this middleware works (and its options) see: [Floating UI > Shift](https://floating-ui.com/docs/autoPlacement)
      </C.Property>
      <C.Property @name="middlewareExtra" @type="array">
        An array of "middleware" functions to be executed by the Floating UI library.
        <br />
        <br />
        For details about how these functions work in the context of the library (and how to define custom ones) see: [Floating UI > Middleware](https://floating-ui.com/docs/middleware) and [Floating UI > Custom middleware](https://floating-ui.com/docs/computePosition#custom).
      </C.Property>
      <C.Property @name="arrowOptions.padding" @type="number">
        The padding between the arrow and the edges of the popover element.
        <br />
        <br />
        For details see: [Floating UI > Arrow > Padding](https://floating-ui.com/docs/arrow#padding)
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="isOpen" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Controls if the popover should be rendered initially opened.
    <br />
    <br />
    _Notice: in this case the popover can't be dismissed via `esc` or `click outside` until the end user has interacted with it (it's in a "manual" state)._
  </C.Property>
  <C.Property @name="isInline" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Sets the display for the HTML element which wraps the `:toggle` content. If set to `true` it sets the element's display to `inline-block` (a `<button>` can't have an `inline` layout).
  </C.Property>
  <C.Property @name="toggleContainsInteractive" @type="boolean" @values={{(array true false)}} @default={{false}}>
    Controls if the `:toggle` container should be rendered as a `<button>` (default) or as a `<div>` (when it contains interactive elements) to avoid nested interactive elements (non accessible).
    <br />
    <br />
    _Notice: in this case you can't use "click" event listeners for the toggle, or it may result in unexpected behaviours or non accessible code._
  </C.Property>
  <C.Property @name="toggleAriaLabel" @type="string">
    The `aria-label` value applied to the HTML element that acts as "toggle".
  </C.Property>
  <C.Property @name="popoverWidth" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    By default, the `:content` element adapts to its content size. If a `@popoverWidth` parameter is provided then the popover will have a fixed width.
  </C.Property>
  <C.Property @name="popoverHeight" @type="string" @valueNote="any valid CSS height (px, rem, etc)">
    By default, the `:content` element adapts to its content size. If a `@popoverHeight` parameter is provided then the popover will have a fixed height.
  </C.Property>
  <C.Property @name="popoverHasArrow" @type="boolean" @values={{array "true" "false"}} @default="false">
    If the primitive needs to render an element corresponding to the "arrow" of the popover.
    <br />
    <br />
    _Notice: the arrow element needs to be assigned a size and a visual appearence using the CSS custom properties  `--hds-popover-primitive-arrow-size` and `--hds-popover-primitive-background` (at popover level)._
    <br />
    <br />
    For details about how the arrow is manipulated/positioned see: [Floating UI > Arrow](https://floating-ui.com/docs/arrow).
  </C.Property>
  <C.Property @name="enableSoftEvents" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Assigns "soft" events listeners (`mouseEnter/Leave` + `focusIn/Out`) to the toggle, to control the visibility of the popover content.
  </C.Property>
  <C.Property @name="enableClickEvents" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Assigns a "click" event listener (`onClick`) to the toggle, to control the visibility of the popover content.
  </C.Property>
  <C.Property @name="onOpen" @type="function">
    A callback function invoked when the PopoverPrimitive is opened (if provided).
  </C.Property>
  <C.Property @name="onClose" @type="function">
    A callback function invoked when the PopoverPrimitive is closed (if provided).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
