## How to use these styles

You can apply an `elevation` or `surface` effect to an element via **design tokens** or **CSS helper classes**.

!!! Info

Note that `border-radius` is not included with this token and needs to be set according to the specs of the UI element.
!!!

### Design tokens

Use the `elevation` and `surface` [design tokens](./tokens) directly in your CSS definitions. Note that it can only be used with the `box-shadow` property.

```css
.your-selector {
  box-shadow: var(--token-elevation-high-box-shadow);
}
```

#### Available CSS variables

##### Elevation variables
<Doc::VarsList @items={{this.cssVariables.elevations}} />

##### Surface variables
<Doc::VarsList @items={{this.cssVariables.surfaces}} />


### CSS helper classes

1. Ensure you’ve imported the relevant CSS file. 

```scss
// for product applications
@import "~@hashicorp/design-system-tokens/dist/products/css/helpers/elevation.css";

// for hashicorp developer platform
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/elevation.css";
```

2. Use a predefined CSS helper class.

```handlebars
<div class="hds-elevation-high">...</div>
```
#### Available CSS helper classes

##### Elevation helpers
<Doc::VarsList @items={{this.cssHelpers.elevations}} />

##### Surface helpers
<Doc::VarsList @items={{this.cssHelpers.surfaces}} />