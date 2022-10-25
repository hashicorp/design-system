<h1>Alert component - How to use</h1>

<section data-section="how-to-use">
  

  <h4 class="dummy-h4">Basic use</h4>
  <p class="dummy-paragraph">
    The most basic invocation requires the
    <code class="dummy-code">type</code>
    argument to be passed, along with the
    <code class="dummy-code">title</code>
    and/or
    <code class="dummy-code">description</code>
    content. By default a
    <code class="dummy-code">neutral</code>
    alert is generated (with a neutral color applied and a specific icon visible).
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
  </Hds::Alert>
  <p class="dummy-paragraph">
    If needed, you can pass only
    <code class="dummy-code">title</code>
    or only
    <code class="dummy-code">description</code>.
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" as |A|>
    <A.Title>Title here</A.Title>
  </Hds::Alert>
  <br />
  <Hds::Alert @type="inline" as |A|>
    <A.Description>Description here</A.Description>
  </Hds::Alert>

  <h4 class="dummy-h4">Type</h4>
  <p class="dummy-paragraph">
    A different type of alert can be invoked using the
    <code class="dummy-code">type</code>
    argument.
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="page" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="page" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
  </Hds::Alert>

  <h4 class="dummy-h4">Color</h4>
  <p class="dummy-paragraph">
    A different color can be applied to the alert using the
    <code class="dummy-code">color</code>
    argument. This will also determine the icon default used in the alert (unless overwritten, see below).
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" @color="success" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
  </Hds::Alert>

  <h4 class="dummy-h4">Icon</h4>
  <p class="dummy-paragraph">
    A different icon can be used in the alert using the
    <code class="dummy-code">icon</code>
    argument.
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" @color="success" @icon="bulb" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" @color="success" @icon="bulb" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
  </Hds::Alert>
  <p class="dummy-paragraph">
    If instead you want to completely hide the icon you have to pass a
    <code class="dummy-code">false</code>
    value to the
    <code class="dummy-code">icon</code>
    argument.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" @color="success" @icon={{false}} as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" @color="success" @icon={{false}} as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
  </Hds::Alert>

  <h4 class="dummy-h4">Dismiss</h4>
  <p class="dummy-paragraph">
    In some cases the alert needs to be dismissable. In this case you have to pass a callback function to the
    <code class="dummy-code">onDismiss</code>
    argument. This will also automatically add a "dismiss/close" button to the alert, that when clicked will execute the
    callback function.
  </p>
  <p class="dummy-paragraph">
    🚨
    <em><strong>Important</strong>: the actual implementation of what happens to the alert when the callback function is
      invoked is left to the developer (this will likely depent on the type of alert, on the context of where it's used,
      on the specific use case, etc.).</em>
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" @color="warning" @onDismiss={{this.noop}} as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" @color="warning" @onDismiss={{this.noop}} as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
  </Hds::Alert>

  <h4 class="dummy-h4" id="how-to-use-actions">Actions</h4>
  <p class="dummy-paragraph">Actions can optionally be passed to component using one of the suggested
    <code class="dummy-code">Button</code>
    or
    <code class="dummy-code">Link::Standalone</code>
    contextual components.</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Link::Standalone @color="secondary" @icon="plus" @text="Another action" @route="..." />
  <A.Link::Standalone @icon="arrow-right" @iconPosition="leading" @text="Another action" @href="#" />
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
    <A.Button @text="Your action" @color="secondary" />
    <A.Link::Standalone @color="secondary" @icon="plus" @text="Another action" @route="index" />
    <A.Link::Standalone @icon="arrow-right" @iconPosition="trailing" @text="Another action" @href="#" />
  </Hds::Alert>

  <h4 class="dummy-h4" id="how-to-use-description">Structured content</h4>
  <p class="dummy-paragraph">When needed the
    <code class="dummy-code">Description</code>
    contextual component can contain logic, rich HTML or structured content.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>
    The description can contain
    {{#if true}}conditional logic{{/if}}, Ember components, and HTML tags, like
    <strong>strong text</strong>,
    <em>emphasized text</em>,
    <code>code</code>,
    <pre>pre</pre>,
    <a href="#">inline</a>
    <LinkTo @route="index">links</LinkTo>.
  </A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" @color="success" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>
      The description can contain
      {{#if true}}conditional logic{{/if}}, Ember components, and HTML tags, like
      <strong>strong text</strong>,
      <em>emphasized text</em>,
      <code>code</code>,
      <pre>pre</pre>,
      <a href="#">inline</a>
      <a href="/">links</a>.
    </A.Description>
  </Hds::Alert>
  <p class="dummy-paragraph"><em>Notice: for a few simple HTML elements (like
      <code class="dummy-code">strong</code>,
      <code class="dummy-code">em</code>,
      <code class="dummy-code">a</code>,
      <code class="dummy-code">code/pre</code>) we apply styling. If you use other elements you will need to take care
      of styling them accordingly.</em>
  </p>
  <p class="dummy-paragraph">You can pass more than one
    <code class="dummy-code">D.Description</code>
    contextual components to have multiple description lines.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>First line of description.</A.Description>
  <A.Description>Second line of description.</A.Description>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" @color="success" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>First line of description.</A.Description>
    <A.Description>Second line of description.</A.Description>
  </Hds::Alert>

  <h4 class="dummy-h4" id="how-to-use-generic">Generic content</h4>
  <p class="dummy-paragraph">It's also possible to insert custom content in the component using the
    <code class="dummy-code">Generic</code>
    contextual component.
  </p>
  <p class="dummy-paragraph"><em>Notice: the content will appear at the bottom, after title, description and actions,
      and the developer will need to take care of spacing, layout and styling of the custom content in this case.</em>
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Generic>
    [your content here]
  </A.Generic>
</Hds::Alert>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Alert @type="inline" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
    <A.Generic>
      [your content here]
    </A.Generic>
  </Hds::Alert>
  <p class="dummy-paragraph">🚨
    <em><strong>Important</strong>: this method should be used only in special cases and as an escape hatch. If you find
      yourself in need to use it, we suggest to speak with the design system team to check that the solution is
      conformant and satifies the accessibility criteria.
    </em></p>

</section>
