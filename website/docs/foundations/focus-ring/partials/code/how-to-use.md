
## How to use this style

We recommend applying the “focus-ring” style to an element using the **design token** provided as a custom CSS property.

!!! Warning 

**Consumer responsibility**

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

To use this class, ensure you’ve imported the relevant CSS file:

```scss
// for product applications
@import "~@hashicorp/design-system-tokens/dist/products/css/helpers/focus-ring.css";

// for hashicorp developer platform
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/focus-ring.css";
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