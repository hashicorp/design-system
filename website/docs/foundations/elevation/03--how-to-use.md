<h1>Elevation - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">There are two different ways to apply an "elevation" or "surface" effect to a UI element,
    via
    <strong>design tokens</strong>
    or via
    <strong>CSS helper classes</strong>.</p>
  <p class="dummy-paragraph">Which one to use will depend on the context: since both refer to the same design token
    values, from the design system perspective there's no difference between the two methods (it's more of a preference
    for the "consumer" codebase).</p>

  <h4 class="dummy-h4">Design tokens</h4>
  <p class="dummy-paragraph">You can use the "elevation" and "surface"
    <a href="./tokens">design tokens</a>
    directly in your CSS definitions:</p>
  
  <!-- prettier-ignore-start -->
```css
.your-selector {
  box-shadow: var(--token-elevation-mid-box-shadow);
}
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">These are the <strong>CSS variables</strong> that you can use:</p>
  <DummyVarsList @items={{this.cssVariables.elevations}} />
  <DummyVarsList @items={{this.cssVariables.surfaces}} />
  <p class="dummy-paragraph"><strong>🚨 IMPORTANT: 🚨</strong></p>
  <ul>
    <li class="dummy-paragraph">the "elevation" and "surface" CSS variables can be used
      <strong>only</strong>
      with a
      <code class="dummy-code">box-shadow</code>
      property</li>
    <li class="dummy-paragraph">the border radius depends on the UI element to which is applied to, so it's up to you to
      apply the right
      <code class="dummy-code">border-radius</code></li>
  </ul>

  <h4 class="dummy-h4">CSS helper classes</h4>
  <p class="dummy-paragraph">You can use one of the predefined CSS helper classes:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<div class="hds-elevation-mid">...</div>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">These are the <strong>CSS helper classes</strong> that you can use:</p>
  <DummyVarsList @items={{this.cssHelpers.elevations}} />
  <DummyVarsList @items={{this.cssHelpers.surfaces}} />
  <p class="dummy-paragraph">To use this classes you have to import the CSS file
    <code class="dummy-code">[products|devdot]/css/helpers/elevation.css</code>
    from the
    <code class="dummy-code">@hashicorp/design-system-tokens</code>
    package.</p>
  <p class="dummy-paragraph"><strong>🚨 IMPORTANT: 🚨</strong></p>
  <ul>
    <li class="dummy-paragraph">the border radius depends on the UI element to which is applied to, so it's up to you to
      apply the right
      <code class="dummy-code">border-radius</code></li>
  </ul>
</section>
