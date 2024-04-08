!!! Warning

This component is intended only for internal Helios use. If you need to use it, please contact the Design Systems Team.
!!!

## How to use this component

The `PopoverPrimitive` component allows to associate a `:toggle` element with a `:content` element (both elements act as containers). "Soft" (hover/focus) or "click" events listener can be assigned to the first one, and when triggered they toggle the visibility of the second one.

When the `:content` is visible, the container can be closed in various ways: toggling via the "soft"  or "click" events, clicking outside of the popover, or via the `esc` key.

The component under the hood uses the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to promote the popover content to the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer): this solves all the issues related to stacking contexts, and provides the "light dismiss" (click outside / `esc` key) out of the box.

It also uses the third-party library [Floating UI](https://floating-ui.com/) to provide the anchoring and automatic positioning/collision detection functionalities.

For older browsers (in particular Firefox 124 and older) that don't support the Popover API, it uses a [Popover Polyfill](https://github.com/oddbird/popover-polyfill) library to emulate the native behaviour.

!!! Insight

**Learn more**

For details about the native web Popover API see: [MDN / Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

For details about the Floating UI third-party library see: [Floating UI](https://floating-ui.com/)

!!!

The internal logic and APIs of this component are both quite complex, it's impossible to describe everything in detail. Below we provide a few basic examples, but if you need more in-depth knowledge of how it can be configured and used we suggest looking at the source code of the component itself, as well as the `hds-anchored-position` modifier, which is a custom wrapper around the Floating UI library.


### Event listeners (for toggle)

The visibility of the `:content` block can be toggled via "soft" event listeners (hover/focus) applied to the `:toggle` container:

```handlebars
<Hds::PopoverPrimitive
  @enableSoftEvents={{true}}
  class="doc-popover-primitive-custom-style"
>
  <:toggle>hover or focus me</:toggle>
  <:content>your popover content here</:content>
</Hds::PopoverPrimitive>
```

_Notice: from a pure technical standpoint, the events are `mouseEnter/Leave` and `focusIn/Out`._

Alternatively, the toggle behaviour can be enabled via "click" events:

```handlebars
<Hds::PopoverPrimitive
  @enableClickEvents={{true}}
  class="doc-popover-primitive-custom-style"
>
  <:toggle>click me</:toggle>
  <:content>your popover content here</:content>
</Hds::PopoverPrimitive>
```

!!! Warning

Important: if you don't apply any of the `@enableSoftEvents` or `@enableClickEvents` the popover will not become visible with any kind of interaction (unless it's rendered already opened via the special `@isOpen` argument).

!!!

### Content positioning

The `:content` block can be positioned in relation to the `:toggle` block using the `placement` argument of the `@anchoredPositionOptions`:

```handlebars
<Hds::PopoverPrimitive
  @anchoredPositionOptions={{(hash placement="top-start")}}
  @enableSoftEvents={{true}}
  class="doc-popover-primitive-custom-style"
>
  <:toggle>toggle</:toggle>
  <:content>your popover content here</:content>
</Hds::PopoverPrimitive>
```

### Content sizing

The `:content` block can be assigned fixed horizontal/vertical sizes using the `@popoverWidth` and `@popoverHeight` arguments:

```handlebars
<Hds::PopoverPrimitive
  @enableSoftEvents={{true}}
  @popoverWidth="200px"
  @popoverHeight="100px"
  class="doc-popover-primitive-custom-style"
>
  <:toggle>toggle</:toggle>
  <:content>your popover content here</:content>
</Hds::PopoverPrimitive>
```

### Collision detection

It's possible to enable the collision detection logic using the `enableCollisionDetection` argument of the `@anchoredPositionOptions`:

```handlebars
<Hds::PopoverPrimitive
  @anchoredPositionOptions={{(hash enableCollisionDetection=true)}}
  @enableSoftEvents={{true}}
  class="doc-popover-primitive-custom-style"
>
  <:toggle>toggle</:toggle>
  <:content>your popover content here</:content>
</Hds::PopoverPrimitive>
```

For details about how the collision detection works refer to the [Floating UI > Tutorial](https://floating-ui.com/docs/tutorial).

### Other `anchoredPositionOptions`

There are more possible options and configurations that can be provided to the popover via the `@anchoredPositionOptions` argument. Refer to the [Component API](#component-api) section below for more details.

### Applied to interactive elements

If the popover is applied to an element that is interactive (e.g., a button, a link, an input) or that contains interactive elements as children, the "wrapping" `:toggle` element must be rendered as a generic `<div>` instead of a `<button>` to avoid nesting interactive elements (not accessible). To achieve that, you have to set `@toggleContainsInteractive` to `true` (in this case you have to use "soft" event listeners for the toggle):

```handlebars
<Hds::PopoverPrimitive
  @toggleContainsInteractive={{true}}
  @enableSoftEvents={{true}}
  class="doc-popover-primitive-custom-style"
>
  <:toggle>
    <button type="button" {{on "click" this.onClickButton}}>Click me</button>
  </:toggle>
  <:content>your popover content here</:content>
</Hds::PopoverPrimitive>
```

### With an arrow

It's possible to add an arrow to the popover element by setting the `@popoverHasArrow` argument to `true`:

```handlebars
<Hds::PopoverPrimitive
  @popoverHasArrow={{true}}
  @anchoredPositionOptions={{(hash offsetOptions=12 arrowOptions=(hash padding=8))}}
  @enableSoftEvents={{true}}
  class="doc-popover-primitive-custom-style"
>
  <:toggle>toggle</:toggle>
  <:content>your popover content here</:content>
</Hds::PopoverPrimitive>
```

In this case, the arrow element needs to be styled by assigning a size and a visual appearence via the CSS custom properties  `--hds-popover-primitive-arrow-size` and `--hds-popover-primitive-background` (at popover level).
