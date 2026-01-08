## How to use tokens

### Use tokens in styles

Use the design tokens in your style declarations as CSS custom properties.

[[code-snippets/tokens-in-styles]]

### Use tokens in components

1. Ensure you’ve imported the relevant CSS file.

[[code-snippets/token-import]]

2. If a component accepts a color parameter you can use a design token too.

[[code-snippets/token-as-component-argument]]

For more details on how the design tokens pipeline is implemented, and how the design tokens are generated and distributed, see the repository [@hashicorp/design-system-tokens](https://github.com/hashicorp/design-system/tree/main/packages/tokens).
