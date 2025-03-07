## How to use this component

When no `@href` or `@route` argument is provided, a plain text Tag will render.

```handlebars
<Hds::Tag @text="My text tag" @onDismiss={{this.yourOnDismissFunction}} />
```

### Link color

There are two available colors for a link: `primary` and `secondary`. The default is `primary`.

```handlebars
<Hds::Tag @color="primary" @text="My link tag" @route="show" @model="components/tag" @onDismiss={{this.yourOnDismissFunction}} />
```

```handlebars
<Hds::Tag @color="secondary" @text="My link tag" @route="show" @model="components/tag" @onDismiss={{this.yourOnDismissFunction}} />
```

### Dismiss

In most cases, the Tag should be dismissable. If you don’t provide a callback function to the `onDismiss` argument the dismiss button will not be rendered.

```handlebars
<Hds::Tag @color="primary" @text="My link tag" @route="show" @model="components/tag" />
```

### Truncation

If the Tag’s content causes it to exceed its max width of about 20 characters, the text will be truncated, and a [Tooltip](/components/tooltip) will be rendered including the full text. The default Tooltip placement is `top`, but this can be customized using the `@tooltipPlacement` argument.

```handlebars
<Hds::Tag @text="This is a very long text that should go on multiple lines" @tooltipPlacement="right" />
```