<h1>Typography - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">The suggested way to apply the typographic definitions to a UI element is using the
    <strong>predefined CSS helper classes</strong>
    provided.</p>

  <h4 class="dummy-h4">Design tokens</h4>
  <p class="dummy-paragraph">There are numerous
    <a href="./tokens">typographic design tokens</a>
    in our system.</p><p class="dummy-paragraph">Since they are "atomic" definitions that associate a particular
    typographic property (e.g.
    <code class="dummy-code">font-size</code>, or
    <code class="dummy-code">line-height</code>, or
    <code class="dummy-code">letter-spacing</code>) to a single value, they are not exactly "typographic" styles.</p><p
    class="dummy-paragraph"
  >For this reason we
    <strong>strongly advise against</strong>
    using them directly in your CSS, and prefer the CSS helpers provided by the system, to avoid "mix &amp; match" of
    typographic styles.
  </p>

  <h4 class="dummy-h4">CSS helper classes</h4>
  <p class="dummy-paragraph">There are different CSS helper classes that can be used for different purposes.</p>
  <p class="dummy-paragraph">If you want to change
    <strong>only</strong>
    the
    <em>font-family</em>
    you can use one the "font-family" helpers:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<p class="hds-font-family-sans-text">...</p>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">These helpers are meant to use in very special cases, when the designers used custom
    typographic styles.</p>
  <p class="dummy-paragraph"><em>Notice: the "font-family-sans-display" helper is intented for headings and titles,
      while the "font-family-sans-text" helper is intended for body copy text. The "font-family-mono-code" helper is
      intended for monospaced text.</em></p>

  <p class="dummy-paragraph">In most of the cases, you will use the <em>typography</em> CSS helpers:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<p class="hds-typography-display-300">...</p>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">These classes will contain, in a single declaration, everything that you need to apply a
    "standard" style to an element:
    <em>font-family</em>,
    <em>font-size</em>,
    <em>line-height</em>, plus a reset for
    <em>margin</em>
    and
    <em>padding</em>
    to
    <code class="dummy-code">0px</code>
    (to match how they behave in Figma).</p>

  <p class="dummy-paragraph">If you want to change the
    <em>font-weight</em>
    of an element you can use one the "font-weight" helpers:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<!-- with font-family CSS helpers -->
<p class="hds-font-family-sans-text hds-font-weight-medium">...</p>

<!-- with typographic style CSS helpers -->
<p class="hds-typography-display-300 hds-font-weight-semibold">...</p>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">These are the <strong>CSS helper classes</strong> that you can use:</p>
  <DummyVarsList @items={{this.cssHelpers.families}} />
  <DummyVarsList @items={{this.cssHelpers.weights}} />
  <DummyVarsList @items={{this.cssHelpers.styles}} />
  <p class="dummy-paragraph">To use this classes you have to import the CSS file
    <code class="dummy-code">[products|devdot]/css/helpers/typography.css</code>
    from the
    <code class="dummy-code">@hashicorp/design-system-tokens</code>
    package.</p>
  <p class="dummy-paragraph"><strong>🚨 IMPORTANT: 🚨</strong></p>
  <ul>
    <li class="dummy-paragraph">while the
      <em>font-family/font-weight/typography</em>
      helpers can be combined together in code, in reality not all the combinations are valid from the design
      perspective: please refer to the design documentation to see which styles combinations are allowed.</li>
  </ul>

</section>
