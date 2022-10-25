<h1>Toast component - How to use</h1>

<section data-section="how-to-use">
  

  <h4 class="dummy-h4">Basic use</h4>
  <p class="dummy-paragraph">
    The most basic invocation requires the
    <code class="dummy-code">type</code>
    arguments to be passed, and an
    <code class="dummy-code">onDismiss</code>
    callback function, along with the
    <code class="dummy-code">title</code>
    and/or
    <code class="dummy-code">description</code>
    content. By default a
    <code class="dummy-code">neutral</code>
    toast is generated (with a neutral color applied and a specific icon visible).
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
    <T.Description>Description here</T.Description>
  </Hds::Toast>

  <p class="dummy-paragraph">
    🚨
    <em><strong>Important</strong>: the actual implementation of what happens to the alert when the
      <code class="dummy-code">onDismiss</code>
      function is invoked is left to the developer.</em>
  </p>

  <p class="dummy-paragraph">
    If needed, you can pass only
    <code class="dummy-code">title</code>
    or only
    <code class="dummy-code">text</code>
    as argument.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
  </Hds::Toast>
  <br />
  <Hds::Toast @onDismiss={{this.noop}} as |T|>
    <T.Description>Description here</T.Description>
  </Hds::Toast>

  <h4 class="dummy-h4">Color</h4>
  <p class="dummy-paragraph">
    A different color can be applied to the toast using the
    <code class="dummy-code">color</code>
    argument. This will also determine the icon default used in the toast (unless overwritten, see below).
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
    <T.Description>Description here</T.Description>
  </Hds::Toast>

  <h4 class="dummy-h4">Icon</h4>
  <p class="dummy-paragraph">
    A different icon can be used in the toast using the
    <code class="dummy-code">icon</code>
    argument.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @color="success" @icon="bulb" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>

```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @color="success" @icon="bulb" @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
    <T.Description>Description here</T.Description>
  </Hds::Toast>
  <p class="dummy-paragraph">
    If instead you want to completely hide the icon you have to pass a
    <code class="dummy-code">false</code>
    value to the
    <code class="dummy-code">icon</code>
    argument.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @color="success" @icon={{false}} @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @color="success" @icon={{false}} @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
    <T.Description>Description here</T.Description>
  </Hds::Toast>

  <h4 class="dummy-h4">Actions</h4>
  <p class="dummy-paragraph">Actions can optionally be passed into the component using one of the suggested
    <code class="dummy-code">Button</code>
    or
    <code class="dummy-code">Link::Standalone</code>
    yielded components.</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @color="critical" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
  <T.Button @text="Your action" @color="secondary" @onClick={{this.yourOnClickFunction}} />
  <T.Link::Standalone @color="secondary" @icon="plus" @text="Another action" @route="..." @color="secondary" />
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @color="critical" @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
    <T.Description>Description here</T.Description>
    <T.Button @text="Your action" @color="secondary" />
    <T.Link::Standalone @color="secondary" @icon="plus" @text="Another action" @route="index" />
  </Hds::Toast>

  <h4 class="dummy-h4" id="how-to-use-description">Structured content</h4>
  <p class="dummy-paragraph">When needed the
    <code class="dummy-code">Description</code>
    contextual component can contain logic, rich HTML or structured content.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>
    The description can contain
    {{#if true}}conditional logic{{/if}}, Ember components, and HTML tags, like
    <strong>strong text</strong>,
    <em>emphasized text</em>,
    <code>code</code>,
    <pre>pre</pre>,
    <a href="#">inline</a>
    <LinkTo @route="index">links</LinkTo>.
  </T.Description>
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
    <T.Description>
      The description can contain
      {{#if true}}conditional logic{{/if}}, Ember components, and HTML tags, like
      <strong>strong text</strong>,
      <em>emphasized text</em>,
      <code>code</code>,
      <pre>pre</pre>,
      <a href="#">inline</a>
      <a href="/">links</a>.
    </T.Description>
  </Hds::Toast>
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
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>First line of description.</T.Description>
  <T.Description>Second line of description.</T.Description>
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @color="success" @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
    <T.Description>First line of description.</T.Description>
    <T.Description>Second line of description.</T.Description>
  </Hds::Toast>

  <h4 class="dummy-h4">Generic content</h4>
  <p class="dummy-paragraph">It's also possible to insert custom content in the
    <code class="dummy-code">Generic</code>
    contextual component.
  </p>
  <p class="dummy-paragraph"><em>Notice: the content will appear at the bottom, after title, description and actions,
      and the developer will need to take care of spacing, layout and styling of the custom content in this case.</em>
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
  <T.Generic>
    [your content here]
  </T.Generic>
</Hds::Toast>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Toast @onDismiss={{this.noop}} as |T|>
    <T.Title>Title here</T.Title>
    <T.Description>Description here</T.Description>
    <T.Generic>
      [your content here]
    </T.Generic>
  </Hds::Toast>
  <p class="dummy-paragraph">🚨
    <em><strong>Important</strong>: this method should be used only in special cases and as an escape hatch. If you find
      yourself in need to use it, we suggest to speak with the design system team to check that the solution is
      conformant and satifies the accessibility criteria.
    </em></p>
</section>
