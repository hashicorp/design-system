## Secondary muted color

Both the Carbon and the HashiCorp design systems include a secondary variant for the Button component. However, the secondary variant in Carbon themes is much darker and more visually prominent than the secondary variant in the HDS classic theme. This difference in prominence was found to throw off the visual hierarchy when Carbon themes were used within HashiCorp applications.

To solve this issue, a lighter `secondary-muted` color option is available for the `@color` argument. When using one of the Carbon themes, `secondary-muted` can be used instead of `secondary` to preserve a consistent visual hierarchy. The `secondary` color can be used in cases where a stronger visual hierarchy is desired.

**Note:** When using the classic HDS theme, the `secondary-muted` color will be visually the same as `secondary`.

Change the theme in the snippet below to a Carbon theme to see the difference between the `secondary` and `secondary-muted` color variants.

[[code-snippets/button-secondary-muted]]

### When to use secondary

- For buttons which are in their own context and not paired with others
- Lorem ipsum dolor sit amet

### When to use secondary-muted

- For buttons part of a button set
- Lorem ipsum dolor sit amet