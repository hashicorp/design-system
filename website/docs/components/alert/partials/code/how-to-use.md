#### Basic use

The most basic invocation requires the `type` argument to be passed, along with the `title` and/or `description` content. By default a `neutral` alert is generated (with a neutral color applied and a specific icon visible).

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

Renders to:

Title here Description here

If needed, you can pass only `title` or only `description`.

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
</Hds::Alert>
```

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

Renders to:

Title here  
Description here

#### Type

A different type of alert can be invoked using the `type` argument.

```handlebars
<Hds::Alert @type="page" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

Renders to:

Title here Description here

#### Color

A different color can be applied to the alert using the `color` argument. This will also determine the icon default used in the alert (unless overwritten, see below).

```handlebars
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

Renders to:

Title here Description here

#### Icon

A different icon can be used in the alert using the `icon` argument.

```handlebars
<Hds::Alert @type="inline" @color="success" @icon="bulb" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

Renders to:

Title here Description here

If instead you want to completely hide the icon you have to pass a `false` value to the `icon` argument.

```handlebars
<Hds::Alert @type="inline" @color="success" @icon={{false}} as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

Renders to:

Title here Description here

#### Dismiss

In some cases the alert needs to be dismissable. In this case you have to pass a callback function to the `onDismiss` argument. This will also automatically add a "dismiss/close" button to the alert, that when clicked will execute the callback function.

**Important**: the actual implementation of what happens to the alert when the callback function is invoked is left to the developer (this will likely depent on the type of alert, on the context of where it's used, on the specific use case, etc.).

```handlebars
<Hds::Alert @type="inline" @color="warning" @onDismiss={{this.noop}} as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

Renders to:

Title here Description here

#### Actions

Actions can optionally be passed to component using one of the suggested `Button` or `Link::Standalone` contextual components.

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Button @text="Your action" @color="secondary" @onClick={{this.noop}} />
  <A.Link::Standalone @color="secondary" @icon="plus" @text="Another action" @route="components" />
  <A.Link::Standalone @icon="arrow-right" @iconPosition="leading" @text="Another action" @href="#" />
</Hds::Alert>
```

Renders to:

Title here Description here

#### Structured content

When needed the `Description` contextual component can contain logic, rich HTML or structured content.

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

Renders to:

Title here The description can contain {{#if true}}conditional logic{{/if}}, Ember components, and HTML tags, like **strong text**, _emphasized text_, `code`,

pre

, [inline](#) [links](/).

_Notice: for a few simple HTML elements (like `strong`, `em`, `a`, `code/pre`) we apply styling. If you use other elements you will need to take care of styling them accordingly._

You can pass more than one `D.Description` contextual components to have multiple description lines.

```handlebars
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>First line of description.</A.Description>
  <A.Description>Second line of description.</A.Description>
</Hds::Alert>
```

Renders to:

Title here First line of description. Second line of description.

#### Generic content

It's also possible to insert custom content in the component using the `Generic` contextual component.

_Notice: the content will appear at the bottom, after title, description and actions, and the developer will need to take care of spacing, layout and styling of the custom content in this case._

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Generic>
    [your content here]
  </A.Generic>
</Hds::Alert>
```

Renders to:

Title here Description here \[your content here\]

**Important**: this method should be used only in special cases and as an escape hatch. If you find yourself in need to use it, we suggest to speak with the design system team to check that the solution is conformant and satifies the accessibility criteria.