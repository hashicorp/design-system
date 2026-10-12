---
applyTo: "**/*.scss"
description: "Instructions for how CSS and SCSS styles should be written"
---

## Code Style & Quality
- Do not include any unused style blocks
- Use BEM class name conventions
- Do not use `!important`

### HDS tokens
- Use CSS variables from the HDS design tokens for colors, typography, elevation, and border radius. These variables are defined in the `packages/tokens/dist/products/css/tokens.css`.
- Do not use hardcoded values for colors, typography, elevation, and border radius when HDS tokens can be used instead.
- Use HDS token names that are accurate and available in the tokens package.
