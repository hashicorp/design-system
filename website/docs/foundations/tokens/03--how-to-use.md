<h1>Design tokens - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">You can use the design tokens in your CSS code as CSS custom properties:</p>
  
  <!-- prettier-ignore-start -->
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
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">If a component accepts a color parameter you can use a design token too:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<FlightIcon @name="alert-circle" @color="var(--token-color-foreground-success)" />
```
<!-- prettier-ignore-end -->

  <p class="dummy-paragraph">To use the design tokens as CSS variables you have to import the CSS file
    <code class="dummy-code">[products|devdot]/css/tokens.css</code>
    from the
    <code class="dummy-code">@hashicorp/design-system-tokens</code>
    package.</p>
  <p class="dummy-paragraph">For more details on how the design tokens pipeline is implemented, and how the design
    tokens are generated and distributed, see the repository
    <a
      href="https://github.com/hashicorp/design-system/tree/main/packages/tokens"
      target="_blank"
      rel="noopener noreferrer"
    >@hashicorp/design-system-tokens</a>.</p>
</section>
