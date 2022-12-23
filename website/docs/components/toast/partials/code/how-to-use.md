## How to use this component

The most basic invocation requires the `type` arguments to be passed, and an `onDismiss` callback function, along with the `title` and/or `description` content. By default a `neutral` toast is generated (with a neutral color applied and a specific icon visible).

```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

!!! Critical 

The actual implementation of what happens to the alert when the `onDismiss` function is invoked is left to the developer.
!!!

If needed, you can pass only `title` or only `text` as argument.

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

A different color can be applied to the toast using the `color` argument. This will also determine the icon default used in the toast unless it is overwritten.

```handlebars
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

### Icon

A different icon can be used in the toast using the `icon` argument.

```handlebars
<Hds::Toast @color="success" @icon="bulb" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>

```

If instead you want to completely hide the icon you have to pass a `false` value to the `icon` argument.

```handlebars
<Hds::Toast @color="success" @icon={{false}} @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

### Actions

Actions can optionally be passed into the component using one of the suggested `Button` or `Link::Standalone` yielded components.

```handlebars
<Hds::Toast @color="critical" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
  <T.Button @text="Your action" @color="secondary" @onClick={{this.yourOnClickFunction}} />
  <T.Link::Standalone @color="secondary" @icon="plus" @text="Another action" @route="components" @color="secondary" />
</Hds::Toast>
```

### Structured content

When needed the `Description` contextual component can contain logic, rich HTML or structured content.

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

!!! Info

For a few simple HTML elements (like `strong`, `em`, `a`, `code/pre`) we apply styling. If you use other elements you will need to take care of styling them accordingly.
!!!

You can pass more than one `D.Description` contextual components to have multiple description lines.

```handlebars
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>First line of description.</T.Description>
  <T.Description>Second line of description.</T.Description>
</Hds::Toast>
```

### Generic content

it’s also possible to insert custom content in the `Generic` contextual component.

!!! Info

The content will appear at the bottom, after title, description and actions, and the developer will need to take care of spacing, layout and styling of the custom content in this case.
!!!

```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
  <T.Generic>
    [your content here]
  </T.Generic>
</Hds::Toast>
```

!!! Info

This method should be used only in special cases and as an escape hatch. If you find yourself in need to use it, we suggest to speak with the design system team to check that the solution is conformant and satifies the accessibility criteria.
!!!