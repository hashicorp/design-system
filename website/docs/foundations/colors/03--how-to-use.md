# Colors - How to use

There are two different ways to apply a color to a UI element, via **design tokens** or via **CSS helper classes**.

Which one to use will depend on the context: since both refer to the same design token values, from the design system perspective there's no difference between the two methods (it's more of a preference for the "consumer" codebase).

To see the full list of available design tokens (CSS variables) and CSS helpers for the colors, look at the showcase of color palettes below.

**👉 Notice:** at the moment the CSS helpers are available only for "semantic" colors. In the future we may make available helpers for "palette" and "product/branding" colors, but for now for these colors you have to use the design tokens as CSS variables.

#### Design tokens

You can use the color [design tokens](../foundations/tokens) directly in your CSS definitions:

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

#### CSS helper classes

You can use one of the predefined "color" CSS helper classes:

```handlebars
<div class="hds-foreground-primary hds-surface-faint hds-border-strong">...</div>
```

To use this classes you have to import the CSS file `[products|devdot]/css/helpers/colors.css` from the `@hashicorp/design-system-tokens` package.

**👉 Notice:** when a "border-color" CSS helper is used on an element a `1px solid` border is applied to it: if you need a different border `width/style` you have to override it.