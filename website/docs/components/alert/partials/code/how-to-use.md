## How to use this component

The most basic invocation requires the `type` argument to be passed, along with the `title` and/or `description` content. By default, a `neutral` alert is generated.

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Type

A different type of alert can be invoked using the `type` argument.

```handlebars
<Hds::Alert @type="page" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

```handlebars
<Hds::Alert @type="compact" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Content

Optionally, you can pass only `title` or only `description`.

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

### Color

A different color can be applied to the alert using the `color` argument. This will determine the default icon used in the alert, unless overwritten.

```handlebars
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Icons

A different icon can be used in the alert using the `icon` argument. This accepts any [Helios icon](/foundations/icons/) name.

```handlebars
<Hds::Alert @type="inline" @color="success" @icon="bulb" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

If you need to hide the icon, pass `false` to the `icon` argument. This is only an option on page and inline alerts as compact alerts require an icon.

```handlebars
<Hds::Alert @type="inline" @color="success" @icon={{false}} as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Dismissal

To enable dismissibility, pass a callback function to the `onDismiss` argument. This will add a dismiss button to the alert. When that button is clicked, the callback function will be executed. 

Given the variety of use cases and contexts in which alerts are used across products, application teams will need to implement the callback function.

```handlebars
<Hds::Alert @type="inline" @color="warning" @onDismiss={{this.noop}} as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Actions

Actions can be passed to the component using one of the suggested `Button` or `Link::Standalone` contextual components.

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Button @text="Your action" @color="secondary" {{on "click" this.yourOnClickFunction}} />
  <A.Link::Standalone @icon="arrow-right" @iconPosition="trailing" @text="Another action" @href="#" />
</Hds::Alert>
```

### Structured content

When needed, the `Description` contextual component can contain logic, rich HTML, or structured content.

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

You can pass more than one `D.Description` contextual component to have multiple description lines.

```handlebars
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>First line of description.</A.Description>
  <A.Description>Second line of description.</A.Description>
</Hds::Alert>
```

### Generic content

Use the `Generic` contextual component to insert custom content. Generic content will appear after the title, description, and actions. Application teams will need to implement spacing, layout, and styling for generic content.

!!! Warning

Use this method with caution and as an escape hatch. Contact the Design Systems Team to check that the solution is conformant and satisfies accessibility criteria.
!!!

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Generic>
    [your content here]
  </A.Generic>
</Hds::Alert>
```
