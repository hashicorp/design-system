While we provide visual styling for this component, the product team must implement other features like placement, transitions, and what happens on dismiss (e.g., with an Ember addon).

## How to use this component

The basic invocation requires the `type` argument, an `onDismiss` callback function, and the `title` and/or `description` content. By default a `neutral` Toast is generated.

```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

### Title and description

Optionally, you can pass only `title` or only `description`.

```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
</Hds::Toast>
```

```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

### Color

A different color can be applied to the Toast using the `color` argument. This will determine the default icon used in the Toast, unless overwritten.

```handlebars
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

### Icon

A different icon can be used in the Toast using the `icon` argument. This accepts any [icon](/icons/library) name.

```handlebars
<Hds::Toast @color="success" @icon="bulb" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>

```

If you need to hide the icon, pass `false` to the `icon` argument.

```handlebars
<Hds::Toast @color="success" @icon={{false}} @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

### Actions

Actions can be passed to the component using one of the suggested `Button` or `LinkStandalone` contextual components.

```handlebars
<Hds::Toast @color="critical" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
  <T.Button @text="Your action" @color="secondary" {{on "click" this.yourOnClickFunction}} />
  <T.LinkStandalone @color="secondary" @icon="plus" @text="Another action" @route="components" @color="secondary" />
</Hds::Toast>
```

### Structured content

When needed, the `Description` contextual component can contain logic, rich HTML, or structured content.

We apply styling for a few simple HTML elements (e.g., `strong`, `em`, `a`, `code/pre`). If using other elements, you’ll need to style them accordingly.

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

You can pass more than one `D.Description` contextual components to have multiple description lines.

```handlebars
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>First line of description.</T.Description>
  <T.Description>Second line of description.</T.Description>
</Hds::Toast>
```

### Generic content

!!! Warning

Use this method with caution and as an escape hatch. [Contact the Design Systems Team](/about/support) to check that the solution is conformant and satisfies accessibility criteria.
!!!

Use the `Generic` contextual component to insert custom content. Generic content will appear after the title, description, and actions. Product teams will need to implement spacing, layout, and styling for generic content.

```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
  <T.Generic>
    [your content here]
  </T.Generic>
</Hds::Toast>
```
