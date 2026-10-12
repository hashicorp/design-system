## ToggleButton secondary muted color

In HashiCorp applications the `secondary` button variant is used in many contexts that require less strong visual hierarchy than the Carbon theme `secondary` button variant provides.

To help maintain this visual hierarch on Carbon themes, the `@color` argument of the `ToggleButton` supports a value `secondary-muted`. This variant is visually identical to the `secondary` color for HDS themes, but differs for Carbon themes. Use the `secondary-muted` color to have a `ToggleButton` on Carbon themes which is less visually dominant.

Change the theme in the snippet below to a Carbon theme to see the difference between the `secondary` and `secondary-muted` variants.

[[code-snippets/dropdown-toggle-button-secondary-muted]]

### When to use secondary

- For a `ToggleButton` which is in its own context and not paired with others
- Lorem ipsum dolor sit amet

### When to use secondary-muted

- For a `ToggleButton` part of a button set
- Lorem ipsum dolor sit amet