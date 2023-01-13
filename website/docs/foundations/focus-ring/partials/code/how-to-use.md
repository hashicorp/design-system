
## How to use this style

We recommend applying the “focus-ring” style to an element using the **design token** provided as a custom CSS property.

!!! Info 

Note that `border-radius` is not included with this token and needs to be set according to the specs of the UI element. Consider using `inherit`.
!!!

### Design tokens (recommended)

Use the `--token-focus-ring-action-box-shadow` [design token](./tokens) directly in your CSS definitions. Note that it can only be used with the `box-shadow` property.

```css
.your-selector {
  [...your CSS declarations]
  &:focus,
  &:focus-visible {
    box-shadow: var(--token-focus-ring-action-box-shadow);
    border-radius: inherit;
  }
}
```

### CSS helper classes

The CSS helper class `.hds-focus-ring-box-shadow` is a wrapper of the design token. It’s likely you’ll need to use this helper class in composition with other classes (instead of directly in a template) because it’s connected to the element’s “focused” pseudo-state.

To use this class, import the CSS file:

```scss
// for product applications
@import "~@hashicorp/design-system-tokens/dist/products/css/helpers/focus-ring.css";

// for hashicorp developer platform
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/focus-ring.css";
```

### Sass mixins

While we offer two Sass mixins `hds-focus-ring-basic` and `hds-focus-ring-with-pseudo-element`, they’re mainly used in the design system codebase. 

In addition to applying the focus style, these mixins also account for all declarations of `:focus/:focus-visible` in the different browsers.

If needing to use these mixins, import the Sass file: 

<!-- IS THIS CORRECT? ARE THERE OTHER DETAILS WE NEED TO INCLUDE? -->
```scss
@import "~@hashicorp/design-system-components/app/styles/mixins/_focus-ring.scss";
```

You can then invoke the mixins:

```css
/* include the mixin file via @use (path will depend on your context) */
@use '../mixins/focus-ring' as *;

/* apply the focus-ring as box-shadow ('action' will be the default color ) */
.your-selector {
  [...your CSS declarations]
  @include hds-focus-ring-basic();
}

/* apply the focus-ring as pseudo-element (with 'critical' color ) */
.your-selector {
  [...your CSS declarations]
  @include hds-focus-ring-with-pseudo-element($top: 0, $right: 0, $bottom: 0, $left: 0, $radius: 5px, $color: critical);
}
```

## Examples

### Border radius

<div class="hds-focus-ring-action-box-shadow" style="margin-bottom: 16px;">
  <Doc::Placeholder @text="no radius" @width="100" @height="100" @background="transparent" />
</div>

<div class="hds-focus-ring-action-box-shadow" style="margin-bottom: 16px; border-radius: 5px;">
  <Doc::Placeholder @text="with border radius" @width="100" @height="100" @background="transparent" />
</div>

### Colors

<div class="hds-focus-ring-action-box-shadow" style="margin-bottom: 16px;">
  <Doc::Placeholder @text="action" @width="100" @height="100" @background="transparent" />
</div>

<div class="hds-focus-ring-critical-box-shadow" style="margin-bottom: 16px;">
  <Doc::Placeholder @text="critical" @width="100" @height="100" @background="transparent" />
</div>