!!! Warning

This component is intended only for internal Helios use. If you need to use it, please [contact](/about/support) the Design Systems Team.
!!!

## How to use this component

The `PopoverPrimitive` is a **headless component** that associates a "toggle" element with a "popover" element (both elements act as containers). "Soft" (hover/focus) or click event listeners can be assigned to the toggle, and when triggered they toggle the visibility of the popover.

When the popover is visible, it can be closed in various ways: toggling via the "soft" or click events, clicking outside of the popover, or via the `esc` key.

Under the hood, the component uses the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to promote the popover content to the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer). This solves issues related to stacking contexts and provides "light dismiss" functionality (click outside / `esc` key) out of the box.

The primitive also uses the [Floating UI](https://floating-ui.com/) third-party library to provide anchoring as well as automatic positioning and collision detection functionality.

!!! Insight

**Learn more**

- For details about the native web Popover API, see: [MDN / Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- For details about the Floating UI third-party library, see: [Floating UI](https://floating-ui.com/)


!!!

The internal logic and APIs of this component are quite complex; it's impossible to describe everything in detail. Below we provide a few basic examples, but if you need more in-depth knowledge of how the primitive can be configured and used, we suggest looking at the source code of the component itself as well as the `hds-anchored-position` modifier, which is a custom wrapper around the Floating UI library.

### Basic invocation

The basic invocation of this primitive uses three different modifiers (`setupPrimitiveContainer`, `setupPrimitiveToggle`, and `setupPrimitivePopover`) applied to three distinct elements (which can be either HTML elements or Ember components):

```handlebars{data-execute=false}
<Hds::PopoverPrimitive as |PP|>
  <div id="container" {{PP.setupPrimitiveContainer}}>
    <button id="toggle" {{PP.setupPrimitiveToggle}}>toggle</button>
    <div id="popover" {{PP.setupPrimitivePopover}}>popover content</div>
  </div>
</Hds::PopoverPrimitive>
```

The primitive itself doesn't provide any styling to the container, toggle, popover (and arrow) elements, and doesn't generate any extra HTML beyond that which is yielded to the component itself. It provides only the popover, anchoring, and collision detection functionalities to the elements that the "setup" modifiers are applied to.

### Event listeners

The visibility of the popover can be toggled via "soft" event listeners (hover/focus) applied to the toggle element:

```handlebars{data-execute=false}
<Hds::PopoverPrimitive @enableSoftEvents={{true}} as |PP|>
  <div id="container" {{PP.setupPrimitiveContainer}}>
    <button id="toggle" {{PP.setupPrimitiveToggle}}>toggle</button>
    <div id="popover" {{PP.setupPrimitivePopover}}>popover content</div>
  </div>
</Hds::PopoverPrimitive>
```

_Notice: The actual technical events used are `mouseEnter/Leave` and `focusIn/Out`._

Alternatively, the toggle behaviour can be enabled via "click" events:

```handlebars{data-execute=false}
<Hds::PopoverPrimitive @enableClickEvents={{true}} as |PP|>
  <div id="container" {{PP.setupPrimitiveContainer}}>
    <button id="toggle" {{PP.setupPrimitiveToggle}}>toggle</button>
    <div id="popover" {{PP.setupPrimitivePopover}}>popover content</div>
  </div>
</Hds::PopoverPrimitive>
```

!!! Warning

Important: if you don't apply either `@enableSoftEvents` or `@enableClickEvents` the popover will not become visible with any kind of interaction (unless it's rendered already opened via the special `@isOpen` argument).

!!!

### Content positioning

The popover element can be positioned in relation to the toggle anchor using the `placement` argument of the `@anchoredPositionOptions`:

```handlebars{data-execute=false}
<Hds::PopoverPrimitive as |PP|>
  <div id="container" {{PP.setupPrimitiveContainer}}>
    <button id="toggle" {{PP.setupPrimitiveToggle}}>toggle</button>
    <div
      id="popover"
      {{PP.setupPrimitivePopover anchoredPositionOptions=(hash placement="top-start")}}
    >popover content</div>
  </div>
</Hds::PopoverPrimitive>
```

### Collision detection

The collision detection logic can be controlled using the `enableCollisionDetection` argument of the `@anchoredPositionOptions`:

```handlebars{data-execute=false}
<Hds::PopoverPrimitive as |PP|>
  <div id="container" {{PP.setupPrimitiveContainer}}>
    <button id="toggle" {{PP.setupPrimitiveToggle}}>toggle</button>
    <div
      id="popover"
      {{PP.setupPrimitivePopover anchoredPositionOptions=(hash enableCollisionDetection=true)}}
    >popover content</div>
  </div>
</Hds::PopoverPrimitive>
```

For details about how the collision detection works, refer to the [Floating UI > Tutorial](https://floating-ui.com/docs/tutorial).

### With an arrow

It is possible to account for an arrow element in the positioning of the popover, if an `arrowSelector` (or directly an `arrowElement` reference) is provided to the `anchoredPositionOptions`:

```handlebars{data-execute=false}
<Hds::PopoverPrimitive as |PP|>
  <div id="container" {{PP.setupPrimitiveContainer}}>
    <button id="toggle" {{PP.setupPrimitiveToggle}}>toggle</button>
    <div
      id="popover"
      {{PP.setupPrimitivePopover anchoredPositionOptions=(hash arrowSelector="arrow")}}
    >
      <div id="arrow" />
      popover content
    </div>
  </div>
</Hds::PopoverPrimitive>
```

### Other `anchoredPositionOptions`

Other options and configurations can be provided to the popover via the `@anchoredPositionOptions` argument. Refer to the [Component API](#component-api) section below for more details, and to the code of the `hds-anchored-position` modifier for an in-depth understanding of how this modifier works.
