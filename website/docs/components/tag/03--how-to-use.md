<h1>Tag component - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">
    Use tags to indicate an object's categorization, i.e., for filtering. Use a
    <a href="/components/badge/01_overview/">badge</a>
    instead for static metadata, status, or to indicate a new feature.
  </p>

  <h4 class="dummy-h4">Basic use</h4>
  <p class="dummy-paragraph">Invocation of the component would look something like this:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Tag @text="My text tag" @onDismiss={{this.yourOnDismissFunction}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">In this case, since no
    <code class="dummy-code">@href</code>
    or
    <code class="dummy-code">@route</code>
    argument is provided it will render the tag as plain text.
  </p>
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Tag @text="My text tag" @onDismiss={{this.noop}} />

  <h4 class="dummy-h4">Color</h4>
  <p class="dummy-paragraph">
    There are two available colors for a link:
    <code class="dummy-code">primary</code>
    and
    <code class="dummy-code">secondary</code>. The default is
    <code class="dummy-code">primary</code>.
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Tag @color="primary" @text="My link tag" @href="#" @onDismiss={{this.yourOnDismissFunction}} />
```
<!-- prettier-ignore-end -->

  
  

  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Tag @color="primary" @text="My link tag" @href="#" @onDismiss={{this.noop}} />
  <Hds::Tag @color="secondary" @text="My link tag" @href="#" @onDismiss={{this.noop}} />

  <h4 class="dummy-h4">Dismiss</h4>
  <p class="dummy-paragraph">
    In most cases the tag needs to be dismissable. If you don't provide a callback function to the
    <code class="dummy-code">onDismiss</code>
    argument the "dismiss/remove" button will not be rendered.
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Tag @color="primary" @text="My link tag" @href="#" />
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Tag @text="My link tag" @href="#" />
</section>
