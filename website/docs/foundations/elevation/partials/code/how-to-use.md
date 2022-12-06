There are two different ways to apply an "elevation" or "surface" effect to a UI element, via **design tokens** or via **CSS helper classes**.

Which one to use will depend on the context: since both refer to the same design token values, from the design system perspective there's no difference between the two methods (it's more of a preference for the "consumer" codebase).

#### Design tokens

You can use the "elevation" and "surface" [design tokens](./tokens) directly in your CSS definitions:

```css
.your-selector {
  box-shadow: var(--token-elevation-mid-box-shadow);
}
```

These are the **CSS variables** that you can use:

<Doc::VarsList @items={{this.cssVariables.elevations}} />
 <Doc::VarsList @items={{this.cssVariables.surfaces}} />


**🚨 IMPORTANT: 🚨**

*   the "elevation" and "surface" CSS variables can be used **only** with a `box-shadow` property
*   the border radius depends on the UI element to which is applied to, so it's up to you to apply the right `border-radius`

#### CSS helper classes

You can use one of the predefined CSS helper classes:

```handlebars
<div class="hds-elevation-mid">...</div>
```

These are the **CSS helper classes** that you can use:

<Doc::VarsList @items={{this.cssHelpers.elevations}} />
 <Doc::VarsList @items={{this.cssHelpers.surfaces}} />


To use this classes you have to import the CSS file `[products|devdot]/css/helpers/elevation.css` from the `@hashicorp/design-system-tokens` package.

**🚨 IMPORTANT: 🚨**

*   the border radius depends on the UI element to which is applied to, so it's up to you to apply the right `border-radius`