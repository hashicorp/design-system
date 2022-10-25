<h1>Link::Standalone component - How to use</h1>

<section data-section="how-to-use">
  

  <h4 class="dummy-h4">Basic use</h4>
  <p class="dummy-paragraph">The most basic invocation requires both
    <code class="dummy-code">icon</code>
    and
    <code class="dummy-code">text</code>
    to be passed and one of the two
    <code class="dummy-code">@href</code>
    or
    <code class="dummy-code">@route</code>
    arguments (for details on how URLs and routing are handled see below).</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Standalone @icon="film" @text="Watch tutorial video" @href="..." />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Link::Standalone @icon="film" @text="Watch tutorial video" @href="#" />

  <h4 class="dummy-h4">Icon position</h4>
  <p class="dummy-paragraph">By default the icon is placed before the text. If you would like to position it after the
    text, define
    <code class="dummy-code">@iconPosition</code>:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Standalone @icon="film" @iconPosition="trailing" @text="Watch tutorial video" @href="..." />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Link::Standalone @icon="film" @iconPosition="trailing" @text="Watch tutorial video" @href="#" />

  <h4 class="dummy-h4">Color</h4>
  <p class="dummy-paragraph">
    There are two available colors for a Link (Standalone):
    <code class="dummy-code">primary</code>
    and
    <code class="dummy-code">secondary</code>. The default is
    <code class="dummy-code">primary</code>. To use a different color, declare another value for
    <code class="dummy-code">@color</code>:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Standalone @color="primary" @icon="collections" @text="Read tutorial" @href="..." />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Link::Standalone @icon="collections" @text="Read tutorial" @color="primary" @href="#" />
  <br />
  <Hds::Link::Standalone @icon="collections" @text="Read tutorial" @color="secondary" @href="#" />

  <h4 class="dummy-h4">Size</h4>
  <p class="dummy-paragraph">
    There are three sizes available:
    <code class="dummy-code">small</code>,
    <code class="dummy-code">medium</code>
    and
    <code class="dummy-code">large</code>. The default is
    <code class="dummy-code">medium</code>. To use a different size, declare a value for
    <code class="dummy-code">@size</code>:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Standalone @icon="collections" @text="Read tutorial" @size="small" @href="..." />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Link::Standalone @icon="collections" @text="Read tutorial" @size="small" @href="#" />
  <br />
  <Hds::Link::Standalone @icon="collections" @text="Read tutorial" @size="medium" @href="#" />
  <br />
  <Hds::Link::Standalone @icon="collections" @text="Read tutorial" @size="large" @href="#" />

  <h4 class="dummy-h4">URLs and routes handling</h4>
  <p class="dummy-paragraph">You can generate a standalone link passing a
    <code class="dummy-code">@href</code>
    or a
    <code class="dummy-code">@route</code>
    to the component. If none of the two is provided, the component will throw an error.</p>
  <p class="dummy-paragraph"><em>Notice: the
      <code class="dummy-code">Link::Standalone</code>
      component internally uses the generic
      <code class="dummy-code">Hds::Interactive</code>
      component. For more details about how this low-level component works please refer to
      <a href="/utilities/interactive/01_overview/">its documentation page</a>.</em></p>
  <h5 class="dummy-h5">With @href</h5>
  <p class="dummy-paragraph">If you pass a
    <code class="dummy-code">@href</code>
    argument a
    <code class="dummy-code">&lt;a&gt;</code>
    link will be generated:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Standalone @icon="terraform" @text="Request a demo" @href="https://www.hashicorp.com/request-demo/terraform" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Link::Standalone
    @icon="terraform"
    @text="Request a demo"
    @href="https://www.hashicorp.com/request-demo/terraform"
  />
  <p class="dummy-paragraph">⚠️
    <strong>Important</strong>: when using the
    <code class="dummy-code">@href</code>
    argument the component adds by default the attributes
    <code class="dummy-code">target="_blank"</code>
    and
    <code class="dummy-code">rel="noopener noreferrer"</code>
    to the
    <code class="dummy-code">&lt;a&gt;</code>
    element (because this is the most common use case: internal links are generally handled using a
    <code class="dummy-code">@route</code>
    argument). If the
    <code class="dummy-code">href</code>
    points to an internal link, or uses a different protocol (eg. "mailto" of "ftp") you can pass
    <code class="dummy-code">@isHrefExternal=&lbrace;&lbrace;true&rbrace;&rbrace;</code>
    to the component and it will not add the
    <code class="dummy-code">target</code>
    and
    <code class="dummy-code">rel</code>
    attributes (but you can pass yours if needed, using the
    <code class="dummy-code">...attributes</code>
    spreading. For more details see the
    <a href="/utilities/interactive/01_overview/">Hds::Interactive component</a>.</p>

  <h5 class="dummy-h5">With @route</h5>
  <p class="dummy-paragraph">If you pass a
    <code class="dummy-code">@route</code>
    argument a
    <code class="dummy-code">&lt;a&gt;</code>
    link will be generated using a
    <code class="dummy-code">&lt;LinkTo&gt;</code>
    Ember component:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Standalone @icon="collections" @text="Go to the index page" @route="my.page.route" @model="my.page.model" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Link::Standalone @icon="collections" @text="Go to the index page" @route="index" />
  <p class="dummy-paragraph">⚠️
    <strong>Important</strong>: if the route is external to your current engine you have to pass also
    <code class="dummy-code">@isRouteExternal=&lbrace;&lbrace;true&rbrace;&rbrace;</code>
    to the component so that it will use
    <code class="dummy-code">&lt;LinkToExternal&gt;</code>
    instead of a simple
    <code class="dummy-code">&lt;LinkTo&gt;</code>
    for the
    <code class="dummy-code">@route</code>. For more details see the
    <a href="/utilities/interactive/01_overview/">Hds::Interactive component</a></p>
  <p class="dummy-paragraph"><em>Notice: all the standard arguments for the
      <code class="dummy-code">&lt;LinkTo/LinkToExternal&gt;</code>
      components are supported (eg.
      <code class="dummy-code">models/model/query/current-when/replace</code>).</em></p>
</section>
