!!! Information

**Note**: the color names and tokens used here refer to the version 7.0 or above of the components package (version 6.0 or above of the tokens package). If you are using an older version, refer to the correct [documentation for your version](/whats-new/release-notes).

!!!

## How to use these styles

We offer two ways to apply color to a UI element: **CSS helper classes** or **design tokens**.

We currently only provide CSS helpers for the “semantic” colors, so if you need to use the “palette” or “product/brand” colors, use the design tokens as CSS variables instead.

### CSS helper classes

1. Ensure you’ve imported the relevant CSS file.

[[code-snippets/colors-helper-classes-import]]

2. Use one of the predefined CSS helper classes.

[[code-snippets/colors-helper-classes-usage]]

When a “border-color” CSS helper is used on an element a `1px solid` border is applied to it. If needing a different border `width/style`, it’s ok to override it.

### Design tokens

Use the color [design tokens](../foundations/tokens) directly in your CSS definitions.

[[code-snippets/colors-tokens]]
