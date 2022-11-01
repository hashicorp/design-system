# Focus ring - How to use

The suggested way to apply a "focus-ring" style to an UI element is using the specific **design token** provided as CSS custom property.

#### Design tokens

You can use the `--token-focus-ring-action-box-shadow` [design token](./tokens) directly in your CSS definitions:

```css
.your-selector {
  [...your CSS declarations]
  &:focus,
  &:focus-visible {
    box-shadow: var(--token-focus-ring-action-box-shadow);
  }
}
```

**🚨 IMPORTANT: 🚨**

*   the design token as CSS variable can be used **only** with a `box-shadow` property
*   the border radius depends on the UI element to which is applied to, so it's up to you to apply the right `border-radius` (tip: consider to use the `inherit` value).

#### CSS helper classes

We provide also a **CSS helper class** `.hds-focus-ring-box-shadow`, that is a wrapper of the design token above, but it's unlikely you can use it directly in a template, since this style is connected to the "focused" pseudo-state of an element (more likely it would be used in composition with other classes).

To use this class you have to import the CSS file `[products|devdot]/css/helpers/focus-ring.css` from the `@hashicorp/design-system-tokens` package.

**🚨 IMPORTANT: 🚨**

*   the border radius depends on the UI element to which is applied to, so it's up to you to apply the right `border-radius` (tip: consider to use the `inherit` value).

#### Sass mixins

We have also created two **Sass mixins** `hds-focus-ring-basic` and `hds-focus-ring-with-pseudo-element` but they're mainly used for internal use (to the design system codebase). These mixins do more than just apply the focus style: they also take care of all the different way to declare the `:focus/:focus-visible` for different browsers.

To use these mixins you have to import the Sass file `packages/components/app/styles/mixins/_focus-ring.scss` contained in the `@hashicorp/design-system` monorepo or the same file `app/styles/mixins/_focus-ring.scss` distributed in the `@hashicorp/design-system-components` package.

Then the mixins can be invoked in this way:

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