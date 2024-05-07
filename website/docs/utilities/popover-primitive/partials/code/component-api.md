## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="isOpen" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Controls if the popover should be rendered initially opened.
    <br />
    <br />
    _Notice: in this case, the popover can't be dismissed via `esc` or `click outside` until the end user has interacted with it (it's in a "manual" state)._
  </C.Property>
  <C.Property @name="enableSoftEvents" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Assigns "soft" event listeners (`mouseEnter/Leave` + `focusIn/Out`) to the toggle, to control the visibility of the popover content.
  </C.Property>
  <C.Property @name="enableClickEvents" @type="boolean" @default="false" @values={{array "true" "false"}}>
    Assigns a click event listener (`onClick`) to the toggle, to control the visibility of the popover content.
  </C.Property>
  <C.Property @name="onOpen" @type="function">
    A callback function invoked when the popover is opened (if provided).
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Provides a callback function invoked when the popover is closed (if provided).
  </C.Property>
  <C.Property @name="[PP].setupPrimitiveContainer" @type="modifier">
    Provides a modifier that needs to be applied to the container of the toggle and popover elements.
  </C.Property>
  <C.Property @name="[PP].setupPrimitiveToggle" @type="modifier">
    Provides a modifier that needs to be applied to the toggle element.
    <br />
    <br />
    _⚠️ Important: The HTML element must be a `<button>` for accessibility conformance. If not, the component will throw an error._
  </C.Property>
  <C.Property @name="[PP].setupPrimitivePopover" @type="modifier">
    Provides a modifier that needs to be applied to the popover element. It accepts an `anchoredPositionOptions` object as "named" argument, with different keys corresponding to different options (see below). These options are forwarded to the underlying `hds-anchored-position` modifier, and in turn are passed down to the [Floating UI](https://floating-ui.com) library.
    <Doc::ComponentApi as |C|>
      <C.Property @name="anchoredPositionOptions.placement" @type="enum" @values={{array "top" "top-start" "top-end" "right" "right-start" "right-end" "bottom" "bottom-start" "bottom-end" "left" "left-start" "left-end"}} @default="bottom">
        Placement for the preferred starting position of the popover relative to the toggle element.
        <br />
        <br />
        _Notice: if `@enableCollision` is set, the popover will automatically shift position to remain visible when near the edges of the screen regardless of the starting placement._
      </C.Property>
      <C.Property @name="anchoredPositionOptions.strategy" @type="enum" @values={{array "absolute" "fixed"}} @default="absolute">
        Controls how the layout of the popover is applied using the CSS `position` property. Since the component uses the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) which promotes the popover to the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer), there is no need to use the `fixed` position to avoid stacking context conflicts, but we leave the option open for edge cases in which this is needed.
        <br />
        <br />
        _Notice: if the position/strategy is set to `fixed`, the rendering of the popover becomes janky when the page is scrolled._
      </C.Property>
      <C.Property @name="anchoredPositionOptions.offsetOptions" @type="number|object" @default="0">
        A number that represents the distance between the popover element and the toggle element. An object can also be passed, which enables individually configuring different axes.
        <br />
        <br />
        For details see: [Floating UI > Offset > Options](https://floating-ui.com/docs/offset#options).
        <br />
        <br />
        _Notice: These options can be used to control the relative position of the arrow in relation to the toggle._
      </C.Property>
      <C.Property @name="anchoredPositionOptions.enableCollisionDetection" @type="boolean|string" @values={{array "true" "false" "flip" "shift" "auto"}} @default="false">
        This property controls whether the popover should automatically adapt its position to remain visible when near the edges of the screen. It can be enabled for both axes by setting it to `true`, or a single axes can be chosen by passing either the `flip` or `shift` values. If set to `auto`, it will automatically place the popover in the position where there's more space available, but in this case, it will ignore the `placement` value.
        <br />
        <br />
        For an overview of how collision detection works and is controlled see: [Floating UI > Tutorial](https://floating-ui.com/docs/tutorial), [Floating UI > Flip](https://floating-ui.com/docs/flip), [Floating UI > Shift](https://floating-ui.com/docs/shift), and [Floating UI > autoPlacement](https://floating-ui.com/docs/autoPlacement).
      </C.Property>
      <C.Property @name="anchoredPositionOptions.flipOptions" @type="object" @default="{ padding: 8 }">
        The options for the `flip` middleware in Floating UI, that controls the automatic repositioning of the popover along its side axis.
        <br />
        <br />
        For details about how this middleware works (and its options) see: [Floating UI > Flip](https://floating-ui.com/docs/flip)
      </C.Property>
      <C.Property @name="anchoredPositionOptions.shiftOptions" @type="object" @default="{ padding: 8, limiter: limitShift() }">
        The options for the `shift` middleware in Floating UI, that controls the automatic repositioning of the popover along its axis of alignment.
        <br />
        <br />
        For details about how this middleware works (and its options) see: [Floating UI > Shift](https://floating-ui.com/docs/shift)
      </C.Property>
      <C.Property @name="anchoredPositionOptions.autoPlacementOptions" @type="object" @default="{ padding: 8 }">
        The options for the `autoPlacement` middleware in Floating UI that controls the automatic repositioning of the popover based on the most space available.
        <br />
        <br />
        For details about how this middleware works (and its options) see: [Floating UI > Shift](https://floating-ui.com/docs/autoPlacement)
      </C.Property>
      <C.Property @name="anchoredPositionOptions.middlewareExtra" @type="array">
        An array of "middleware" functions to be executed by the Floating UI library.
        <br />
        <br />
        For details about how these functions work in the context of the library (and how to define custom ones) see: [Floating UI > Middleware](https://floating-ui.com/docs/middleware) and [Floating UI > Custom middleware](https://floating-ui.com/docs/computePosition#custom).
      </C.Property>
      <C.Property @name="anchoredPositionOptions.arrowElement" @type="DOM element">
        A reference to the DOM element that represents the "arrow" decoration, if it exists, that allows its position to be updated according to the popover position in relation to the toggle anchor.
        <br />
        <br />
        For details see: [Floating UI > Arrow](https://floating-ui.com/docs/arrow)
      </C.Property>
      <C.Property @name="anchoredPositionOptions.arrowElement" @type="string">
        A DOM selector for the "arrow", if it's not possible to provide a direct reference to the DOM element (internally it's then converted to the `arrowElement` option).
      </C.Property>
      <C.Property @name="anchoredPositionOptions.arrowPadding" @type="number">
        The padding between the arrow and the edges of the popover element.
        <br />
        <br />
        For details see: [Floating UI > Arrow > Padding](https://floating-ui.com/docs/arrow#padding)
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="[PP].toggleElement" @type="DOM element">
    Provides a reference to the toggle DOM element element (container).
  </C.Property>
  <C.Property @name="[PP].arrowElement" @type="DOM element">
    Provides a reference to the arrow DOM element (if provided to the `setupPrimitivePopover` modifier through the `anchoredPositionOptions` object).
  </C.Property>
  <C.Property @name="[PP].popoverElement" @type="DOM element">
    A reference to the popover DOM element (container).
  </C.Property>
  <C.Property @name="[PP].showPopover" @type="function">
    Hook into this function to programmatically show the popover.
  </C.Property>
  <C.Property @name="[PP].hidePopover" @type="function">
    Hook into this function to programmatically hide ("close") the popover.
  </C.Property>
  <C.Property @name="[PP].togglePopover" @type="function">
    Hook into this function to programmatically toggle the visibility of the popover.
  </C.Property>
  <C.Property @name="[PP].isOpen" @type="tracked property">
    Hook into this tracked property to access the state of `isOpen`.
  </C.Property>
</Doc::ComponentApi>
