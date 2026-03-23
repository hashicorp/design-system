## How to use this component

When no `@href` or `@route` argument is provided, a plain text Tag will render.

[[code-snippets/tag-basic]]

### Link color

There are two available colors for a link: `primary` and `secondary`. The default is `primary`.

[[code-snippets/tag-color]]

### Dismiss

In most cases, the Tag should be dismissable. If you don’t provide a callback function to the `onDismiss` argument the dismiss button will not be rendered.

[[code-snippets/tag-no-dismiss]]

### Truncation

If the Tag’s content causes it to exceed its max width of about 20 characters, the text will be truncated, and a [Tooltip](/components/tooltip) will be rendered including the full text. The default Tooltip placement is `top`, but this can be customized using the `@tooltipPlacement` argument.

[[code-snippets/tag-truncation]]
