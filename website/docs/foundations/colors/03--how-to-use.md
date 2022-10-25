<h1>Colors - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">There are two different ways to apply a color to a UI element, via
    <strong>design tokens</strong>
    or via
    <strong>CSS helper classes</strong>.</p>
  <p class="dummy-paragraph">Which one to use will depend on the context: since both refer to the same design token
    values, from the design system perspective there's no difference between the two methods (it's more of a preference
    for the "consumer" codebase).</p>

  <p class="dummy-paragraph">To see the full list of available design tokens (CSS variables) and CSS helpers for the
    colors, look at the showcase of color palettes below.</p>
  <p class="dummy-paragraph"><strong>👉 Notice:</strong>
    at the moment the CSS helpers are available only for "semantic" colors. In the future we may make available helpers
    for "palette" and "product/branding" colors, but for now for these colors you have to use the design tokens as CSS
    variables.</p>

  <h4 class="dummy-h4">Design tokens</h4>
  <p class="dummy-paragraph">You can use the color
    <a href="../foundations/tokens">design tokens</a>
    directly in your CSS definitions:</p>
  
  <!-- prettier-ignore-start -->
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
<!-- prettier-ignore-end -->

  

  <h4 class="dummy-h4">CSS helper classes</h4>
  <p class="dummy-paragraph">You can use one of the predefined "color" CSS helper classes:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<div class="hds-foreground-primary hds-surface-faint hds-border-strong">...</div>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">To use this classes you have to import the CSS file
    <code class="dummy-code">[products|devdot]/css/helpers/colors.css</code>
    from the
    <code class="dummy-code">@hashicorp/design-system-tokens</code>
    package.</p>
  <p class="dummy-paragraph"><strong>👉 Notice: </strong>
    when a "border-color" CSS helper is used on an element a
    <code class="dummy-code">1px solid</code>
    border is applied to it: if you need a different border
    <code class="dummy-code">width/style</code>
    you have to override it.</p>
</section>
