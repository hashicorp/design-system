## How to use this component

The most basic invocation requires the `type` argument to be passed, along with the `title` and/or `description` content. By default, a `neutral` Alert is generated.

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Type

A different type of Alert can be invoked using the `type` argument.

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

### Title and description

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

### Tag

The `@tag` argument changes the HTML element that wraps the title content of `[A].Title`. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if an Alert appears directly below the main heading of the page, it should be `"h2"`.

```handlebars
<div class="doc-alert-demo-heading">
 <Hds::Text::Display @tag="h1" @size="500">Edit credit card</Hds::Text::Display>
</div>
<Hds::Alert @type="inline" @color="critical" as |A|>
  <A.Title @tag="h2">Form submission error</A.Title>
  <A.Description>Correct the formatting of the following fields to update your user profile:</A.Description>
  <A.Description>
    <Hds::Link::Inline @href="#" @color="secondary">Expiration date</Hds::Link::Inline>
  </A.Description>
</Hds::Alert>
```

!!! Insight

The default `@tag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

### Color

A different color can be applied to the Alert using the `color` argument. This will determine the default icon used in the Alert, unless overwritten.

The “success”, “warning”, and “critical” Alert colors will be read to users before any other content as they include either `role="alert"` or `role="alertdialog"` and `aria-live="polite"` attributes by default.

For informational or promotional content which is non-critical to users, use either the “neutral” or “highlight” colors as these do not include `role` or `aria-live` attributes.

```handlebars
<Hds::Alert @type="inline" @color="success" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Icons

A different icon can be used in the Alert using the `icon` argument. This accepts any [icon](/icons/library) name.

```handlebars
<Hds::Alert @type="inline" @color="success" @icon="bulb" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

If you need to hide the icon, pass `false` to the `icon` argument. This is only an option on page and inline Alerts as compact Alerts require an icon.

```handlebars
<Hds::Alert @type="inline" @color="success" @icon={{false}} as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Dismissal

To enable dismissibility, pass a callback function to the `onDismiss` argument. This will add a dismiss button to the Alert. When that button is clicked, the callback function will be executed. 

Given the variety of use cases and contexts in which alerts are used across products, application teams will need to implement the callback function.

```handlebars
<Hds::Alert @type="inline" @color="warning" @onDismiss={{this.noop}} as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
</Hds::Alert>
```

### Actions

Actions can be passed to the component using one of the suggested `Button` or `LinkStandalone` contextual components.

```handlebars
<Hds::Alert @type="inline" as |A|>
  <A.Title>Title here</A.Title>
  <A.Description>Description here</A.Description>
  <A.Button @text="Your action" @color="secondary" {{on "click" this.yourOnClickFunction}} />
  <A.LinkStandalone @color="secondary" @icon="arrow-right" @iconPosition="trailing" @text="Another action" @href="#" />
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
    <Hds::Link::Inline @color="secondary" @href="#">inline</Hds::Link::Inline>
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
