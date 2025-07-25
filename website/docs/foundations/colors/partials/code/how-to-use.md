## How to use these styles

We offer two ways to apply color to a UI element: **CSS helper classes** or **design tokens**.

We currently only provide CSS helpers for the “semantic” colors, so if you need to use the “palette” or “product/brand” colors, use the design tokens as CSS variables instead.

### CSS helper classes

1. Ensure you’ve imported the relevant CSS file.

```scss
// for product applications
@import "~@hashicorp/design-system-tokens/dist/products/css/helpers/colors.css";

// for hashicorp developer platform
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/colors.css";

```

2. Use one of the predefined CSS helper classes.

```handlebars
<div class="hds-foreground-primary hds-surface-faint hds-border-strong">...</div>
```

When a “border-color” CSS helper is used on an element a `1px solid` border is applied to it. If needing a different border `width/style`, it’s ok to override it.

### Design tokens

Use the color [design tokens](../foundations/tokens) directly in your CSS definitions.

```css
.your-selector {
  color: var(--token-color-foreground-primary);
  background: var(--token-color-surface-faint);
  border: (--token-color-border-strong);
  & :hover {
    color: var(--token-color-foreground-high-contrast);
    background: var(--token-color-foreground-action-active);
  }
}
```