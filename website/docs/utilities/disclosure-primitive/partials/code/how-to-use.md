!!! Warning

This component is intended only for internal Helios use. If you need to use it, contact the Design Systems Team.
!!!

## How to use this component

The `DisclosurePrimitive` component renders an interactive element that triggers a custom event handler provided by the `:toggle` block (passed via `hash` by Ember). To comply with accessibility best practices, this element is usually a button or a component that renders a button.

When the content is disclosed, the container can be closed by toggling the button (`click` or `enter/return`).

**Note:** [MenuPrimitive](/utilities/menu-primitive), another variant of this primitive, includes extra functionality to close the content panel by either clicking outside of the content, or via the `esc` key.


```handlebars
<Hds::DisclosurePrimitive>
  <:toggle as |t|>
    <button type="button" {{on "click" t.onClickToggle}}>Click me</button>
  </:toggle>
  <:content>
    your content here
  </:content>
</Hds::DisclosurePrimitive>
```

### Content positioning

The `:content` block is **not** positioned in relation to the `:toggle` block.
