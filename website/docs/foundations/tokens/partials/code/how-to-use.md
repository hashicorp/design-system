You can use the design tokens in your CSS code as CSS custom properties:

```css
.your-selector {
  color: var(--token-color-foreground-highlight);
  background: var(--token-color-background-highlight);
  border: 1px solid var(--token-color-border-highlight);
  font-family: var(--token-typography-body-base-font-family);
  font-size: var(--token-typography-body-base-font-size);
  line-height: var(--token-typography-body-base-line-height);
}
```

If a component accepts a color parameter you can use a design token too:

```handlebars
<FlightIcon @name="alert-circle" @color="var(--token-color-foreground-success)" />
```

To use the design tokens as CSS variables you have to import the CSS file `[products|devdot]/css/tokens.css` from the `@hashicorp/design-system-tokens` package.

For more details on how the design tokens pipeline is implemented, and how the design tokens are generated and distributed, see the repository [@hashicorp/design-system-tokens](https://github.com/hashicorp/design-system/tree/main/packages/tokens).