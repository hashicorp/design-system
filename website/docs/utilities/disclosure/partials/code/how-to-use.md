## How to use this component

Use an interactive element that can trigger a custom event handler provided by the `:toggle` block (is passed via `hash` by Ember). This element is usually usually a button, or a component that renders a button (for accessibility reasons).

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

When the content is disclosed, the container can be closed in different way: toggling again the visibility via the button (`click` or `enter/return`), clicking outside of the content, or via the `esc` key.

!!! Warning

The "content" is not positioned in any way in relation to the toggle: this responsibility is left to the consumers (eg by applying a `position: absolute` to a wrapper around the content that is passed to the `:content` block).

!!!
