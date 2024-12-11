## How to use these styles

You can apply a border radius to a UI element via design tokens.

### Design tokens

Use the border radius [design tokens](../foundations/tokens) directly in your CSS definitions.

```css
.your-selector {
  border-radius: var(--token-border-radius-medium);
}
```

#### Available CSS variables

##### Radius variables

<!-- algolia-ignore-start -->
<Doc::VarsList @items={{this.cssVariables.radii}} />
<!-- algolia-ignore-end -->
