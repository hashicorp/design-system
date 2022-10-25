<h1>Interactive - How to use</h1>

<section data-section="how-to-use">
  

  <h4 class="dummy-h4">Basic use (&lt;button&gt;)</h4>
  <p class="dummy-paragraph">Invocation of the component would look something like this:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Interactive>
    your content here (will be yielded)
</Hds::Interactive>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">In this case, since no
    <code class="dummy-code">@href</code>
    or
    <code class="dummy-code">@route</code>
    argument is provided it will generate in output an HTML
    <code class="dummy-code">&lt;button&gt;</code>
    element.
  </p>
  <p class="dummy-paragraph"><em>Notice: a
      <code class="dummy-code">type="button"</code>
      HTML attribute is applied by default to the element, but this can be overwritten using the "splattributes".</em></p>

  <h4 class="dummy-h4">With "@href" parameter (&lt;a&gt;)</h4>
  <p class="dummy-paragraph"><strong>🚨 ATTENTION</strong>: we can't support the direct use of the
    <code class="dummy-code">href</code>
    HTML attribute because we need to rely on the
    <code class="dummy-code">@href</code>
    Ember argument to differentiate between different types of generated output.</p>
  <p class="dummy-paragraph">If an <code class="dummy-code">@href</code> argument is provided:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Interactive @href="https://google.com">
    your content here
</Hds::Interactive>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">it will generate in output an HTML
    <code class="dummy-code">&lt;a&gt;</code>
    link element with
    <code class="dummy-code">target="_blank"</code>
    and
    <code class="dummy-code">rel="noopener noreferrer"</code>
    attributes.
  </p>
  <p class="dummy-paragraph"><em>We add these attributes by default because this is the most common case (internal links
      are generally handled using a
      <code class="dummy-code">@route</code>
      argument). This behavior can be overridden (see below).</em>
  </p>
  <p class="dummy-paragraph">If an
    <code class="dummy-code">@isHrefExternal</code>
    argument is provided with
    <code class="dummy-code">false</code>
    value:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Interactive @href="#your-local-anchor-id" @isHrefExternal={{false}}>
    your content here
</Hds::Interactive>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">it will generate in output an HTML
    <code class="dummy-code">&lt;a&gt;</code>
    link element
    <strong>without</strong>
    the HTML
    <code class="dummy-code">target</code>
    and
    <code class="dummy-code">rel</code>
    attributes.
  </p>

  <h4 class="dummy-h4">With "@route" parameter (&lt;LinkTo&gt;/&lt;LinkToExternal&gt;)</h4>
  <p class="dummy-paragraph">If a <code class="dummy-code">@route</code> argument is provided:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Interactive @route="list" @model="...">
    your content here
</Hds::Interactive>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">it will generate in output a
    <code class="dummy-code">&lt;LinkTo&gt;</code>
    component.
  </p>

  <p class="dummy-paragraph">If the
    <code class="dummy-code">@route</code>
    is external to the current engine (<a
      href="https://ember-engines.com/docs/link-to-external"
      target="_blank"
      rel="noopener noreferrer"
    >more details here</a>), you need to provide an extra
    <code class="dummy-code">@isRouteExternal</code>
    parameter:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Interactive @route="list" @isRouteExternal={{true}} @model="..." >
    your content here
</Hds::Interactive>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">and it will generate in output a
    <code class="dummy-code">&lt;LinkToExternal&gt;</code>
    component.
  </p>

  <p class="dummy-paragraph"><em>Notice: all the standard arguments for the
      <code class="dummy-code">&lt;LinkTo/LinkToExternal&gt;</code>
      components are supported (eg.
      <code class="dummy-code">models</code>,
      <code class="dummy-code">model</code>,
      <code class="dummy-code">query</code>,
      <code class="dummy-code">current-when</code>,
      <code class="dummy-code">replace</code>). For more details about these parameters see the
      <a
        href="https://guides.emberjs.com/release/routing/linking-between-routes/#toc_the-linkto--component"
        target="_blank"
        rel="noopener noreferrer"
      >Ember documentation</a>
      or the
      <a
        href="https://api.emberjs.com/ember/release/classes/Ember.Templates.components/methods/input?anchor=LinkTo"
        target="_blank"
        rel="noopener noreferrer"
      >LinkTo component API specs</a>.</em></p>
</section>
