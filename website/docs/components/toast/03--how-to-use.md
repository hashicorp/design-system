---
title: Toast
category: components
component: toast
section: how-to-use
---

#### Basic use

The most basic invocation requires the `type` arguments to be passed, and an `onDismiss` callback function, along with the `title` and/or `description` content. By default a `neutral` toast is generated (with a neutral color applied and a specific icon visible).

```handlebars
<Hds::Toast @onDismiss={{ your function here }} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

Renders to:

Title here Description here

🚨 _**Important**: the actual implementation of what happens to the alert when the `onDismiss` function is invoked is left to the developer._

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

Renders to:

Title here  
Description here

#### Color

A different color can be applied to the toast using the `color` argument. This will also determine the icon default used in the toast (unless overwritten, see below).

```handlebars
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

Renders to:

Title here Description here

#### Icon

A different icon can be used in the toast using the `icon` argument.

```handlebars
<Hds::Toast @color="success" @icon="bulb" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>

```

Renders to:

Title here Description here

If instead you want to completely hide the icon you have to pass a `false` value to the `icon` argument.

```handlebars
<Hds::Toast @color="success" @icon={{false}} @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
</Hds::Toast>
```

Renders to:

Title here Description here

#### Actions

Actions can optionally be passed into the component using one of the suggested `Button` or `Link::Standalone` yielded components.

```handlebars
<Hds::Toast @color="critical" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
  <T.Button @text="Your action" @color="secondary" @onClick={{this.yourOnClickFunction}} />
  <T.Link::Standalone @color="secondary" @icon="plus" @text="Another action" @route="..." @color="secondary" />
</Hds::Toast>
```

Renders to:

Title here Description here

#### Structured content

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

Renders to:

Title here The description can contain {{#if true}}conditional logic{{/if}}, Ember components, and HTML tags, like **strong text**, _emphasized text_, `code`,

pre

, [inline](#) [links](/).

_Notice: for a few simple HTML elements (like `strong`, `em`, `a`, `code/pre`) we apply styling. If you use other elements you will need to take care of styling them accordingly._

You can pass more than one `D.Description` contextual components to have multiple description lines.

```handlebars
<Hds::Toast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>First line of description.</T.Description>
  <T.Description>Second line of description.</T.Description>
</Hds::Toast>
```

Renders to:

Title here First line of description. Second line of description.

#### Generic content

It's also possible to insert custom content in the `Generic` contextual component.

_Notice: the content will appear at the bottom, after title, description and actions, and the developer will need to take care of spacing, layout and styling of the custom content in this case._

```handlebars
<Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|>
  <T.Title>Title here</T.Title>
  <T.Description>Description here</T.Description>
  <T.Generic>
    [your content here]
  </T.Generic>
</Hds::Toast>
```

Renders to:

Title here Description here \[your content here\]

🚨 _**Important**: this method should be used only in special cases and as an escape hatch. If you find yourself in need to use it, we suggest to speak with the design system team to check that the solution is conformant and satifies the accessibility criteria._