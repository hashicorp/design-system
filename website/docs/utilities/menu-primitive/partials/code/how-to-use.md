!!! Warning

The `MenuPrimitive` component is deprecated and will be removed in a future major release. We recommend migrating to [PopoverPrimitive](/utilities/popover-primitive).

!!!

## How to use this component

The `MenuPrimitive` component renders an interactive element that triggers a custom event handler provided by the `:toggle` block (passed via `hash` by Ember). To comply with accessibility best practices, this element is usually a button or a component that renders a button.

When the content is disclosed, the container can be closed in various way; toggling via the button (`click` or `enter/return`), clicking outside of the content, or via the `esc` key.

**Note:** [DisclosurePrimitive](/utilities/disclosure-primitive), another variant of this primitive, excludes the functionality to close the content panel by either clicking outside of the content, or via the `esc` key.

```handlebars
<Hds::MenuPrimitive>
  <:toggle as |t|>
    <button type="button" {{on "click" t.onClickToggle}}>Click me</button>
  </:toggle>
  <:content>
    your content here
  </:content>
</Hds::MenuPrimitive>
```

### Content positioning

The `:content` block is **not** positioned in relation to the `:toggle` block. We recommend applying `position: absolute` to a wrapper around the content that is then passed to the `:content` block.
