<h1>Link::Inline component - How to use</h1>

<section data-section="how-to-use">
  

  <h4 class="dummy-h4">Basic use</h4>
  <p class="dummy-paragraph">The most basic invocation requires some content to be passed as children and one of the two
    <code class="dummy-code">@href</code>
    or
    <code class="dummy-code">@route</code>
    arguments (for details on how URLs and routing are handled see below).</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Inline @href="...">Watch tutorial video</Hds::Link::Inline>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <div class="hds-typography-body-300">
    <Hds::Link::Inline @href="...">Watch tutorial video</Hds::Link::Inline>
  </div>

  <h4 class="dummy-h4">Add an icon</h4>
  <p class="dummy-paragraph">To add an icon to your inline link, give the
    <code class="dummy-code">@icon</code>
    a
    <a href="https://flight-hashicorp.vercel.app/">Flight icon</a>
    name:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Inline @href="..." @icon="external-link">Watch tutorial video</Hds::Link::Inline>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <div class="hds-typography-body-300">
    <Hds::Link::Inline @href="#" @icon="external-link">Watch tutorial video</Hds::Link::Inline>
  </div>

  <p class="dummy-paragraph"><em>Notice: since the
      <code class="dummy-code">Hds::Link::Inline</code>
      doesn't have an intrinsic size, the size of the icon is calculated proportionally (via
      <code class="dummy-code">em</code>) in relation to the font-size of the text
    </em>.</p>

  <h4 class="dummy-h4">Icon position</h4>
  <p class="dummy-paragraph">By default, if you define an icon, it is placed after the text. If you would like to
    position the icon before the text, define
    <code class="dummy-code">@iconPosition</code>:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Inline @href="..." @icon="film" @iconPosition="leading">Watch tutorial video</Hds::Link::Inline>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <div class="hds-typography-body-300">
    <Hds::Link::Inline @href="#" @icon="film" @iconPosition="leading">Watch tutorial video</Hds::Link::Inline>
  </div>

  <h4 class="dummy-h4">Color</h4>
  <p class="dummy-paragraph">
    There are two available colors for a Link (Inline):
    <code class="dummy-code">primary</code>
    and
    <code class="dummy-code">secondary</code>. The default is
    <code class="dummy-code">primary</code>. To use a different color, declare another value for
    <code class="dummy-code">@color</code>:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Link::Inline @color="primary" @href="...">Read tutorial</Hds::Link::Inline>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <div class="hds-typography-body-300">
    <Hds::Link::Inline @color="primary" @href="...">Read tutorial</Hds::Link::Inline>
    <br />
    <Hds::Link::Inline @color="secondary" @href="...">Read tutorial</Hds::Link::Inline>
  </div>

  <h4 class="dummy-h4">URLs and routes handling</h4>
  <p class="dummy-paragraph">You can generate an inline link passing a
    <code class="dummy-code">@href</code>
    or a
    <code class="dummy-code">@route</code>
    to the component. If none of the two is provided, the component will throw an error.</p>
  <p class="dummy-paragraph"><em>Notice: the
      <code class="dummy-code">Link::Inline</code>
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
<Hds::Link::Inline @href="https://www.hashicorp.com/request-demo/terraform">Request a demo</Hds::Link::Inline>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <div class="hds-typography-body-300">
    <Hds::Link::Inline @href="https://www.hashicorp.com/request-demo/terraform">Request a demo</Hds::Link::Inline>
  </div>
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
<Hds::Link::Inline @route="my.page.route" @model="my.page.model">Go to the index page</Hds::Link::Inline>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <div class="hds-typography-body-300">
    <Hds::Link::Inline @route="index">Go to the index page</Hds::Link::Inline>
  </div>
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
