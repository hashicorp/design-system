<h1>Disclosure - How to use</h1>

<section data-section="how-to-use">
  
  <p class="dummy-paragraph">Invocation of the component would look something like this:</p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Disclosure>
  <:toggle>
    your interactive element here (usually a button)
  </:toggle>
  <:content>
    your content here
  </:content>
</Hds::Disclosure>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">To actually work, you need an interactive element that can trigger a custom event handler
    provided by the
    <code class="dummy-code">:toggle</code>
    block (is passed via
    <code class="dummy-code">hash</code>
    by Ember). This element is usually usually a button, or a component that renders a button (for accessibility
    reasons).
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Disclosure>
  <:toggle as |t|>
    <button type="button" {{on "click" t.onClickToggle}}>Click me</button>
  </:toggle>
  <:content>
    your content here
  </:content>
</Hds::Disclosure>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">When the content is disclosed, the container can be closed in different way: toggling again
    the visibility via the button (<code class="dummy-code">click</code>
    or
    <code class="dummy-code">enter/return</code>), clicking outside of the content, or via the
    <code class="dummy-code">esc</code>
    key.</p>
  <p class="dummy-paragraph">
    <strong>Important:</strong>
    The "content" is not positioned in any way in relation to the toggle: this responsibility is left to the consumers
    (eg by applying a
    <code class="dummy-code">position: absolute</code>
    to a wrapper around the content that is passed to the
    <code class="dummy-code">:content</code>
    block).</p>
</section>
