!!! Info

**Setting realistic expectations**

An AI assistant connected to the Helios MCP is a powerful tool for exploring the design system, generating quick prototypes, and accelerating routine work. However, unlike a human, AI cannot infer design intent. The output quality depends directly on clear inputs—including well-structured designs, clear prompts, and adequate context.
!!!

While primarily intended for engineering workflows, the Helios MCP server can help designers prototype, test component properties, and vet concepts quickly.

Follow these guidelines to get the most out of Helios when translating your Figma mockups, components, styles, and variables into code.

## Prepare your Figma file

To get the most out of the Helios MCP, ensure Figma files are appropriately structured, named, and machine-readable. While a human can ask clarifying questions or spot subtle patterns, AI relies entirely on the file's layer structure, metadata, and explicit prompt context. Clear input leads directly to clear output.

### Use connected HDS components

Most HDS Figma components have a counterpart in code. When using attached Figma instances, AI automatically reads their properties, variant options, and usage guidelines.

Detaching HDS components breaks the link to the component metadata. Without that context, AI is forced to infer properties, often resulting in something non-standard.

To give an AI assistant the best available Helios context:

- Use assets directly from the Helios library in Figma: styles, variables, components, patterns, and icons.
- Use properties that are exposed in the Figma component to customize it.
- Check for detached assets using Figma's [Check Designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma) feature and re-attach assets where necessary.
- Refrain from overriding styles or variables within a component, as this creates divergence between the design input and the code output.

### Use HDS tokens and styles

HDS design tokens are available in Figma as variables or styles and map directly to CSS properties in code.

- Design Tokens: Using a variable like `page-primary` tells AI the raw color _and_ its semantic role in the system.
- Hex Values: Using a hex value like `#ffffff` leaves AI guessing whether it should be `page-primary`, `surface-primary`, or `neutral-0`.

The same applies to typography. Applying the `body-200` text style tells AI which tokens to reference or which properties to pass to `<HdsText>`.

### Use auto layout

Auto Layout provides structured data about direction, spacing, padding, alignment, and wrapping. AI uses this data to map your frames to flexible code layouts (like `<HdsLayoutFlex>` and `<HdsLayoutGrid>`).

Designs built without Auto Layout force both humans and AI to guess at intended spacing and structure, which often leads to inaccurate code.

- Use Auto Layout for any frame containing more than one element.
- Define spacing explicitly using gap and padding variables rather than manually positioning elements on canvas.
- Avoid absolute positioning unless specifically required, e.g., tooltips, overlays, etc.

### Figma hygiene

Layer names provide essential metadata for AI. Clear, consistent names help it identify the hierarchy and purpose of your design. Figma's default names like `Frame 47`, `Group 3`, or `Rectangle 12` give AI no meaningful context.

- Name frames and groups based on their purpose, e.g., `header`, `sidenav`, `form-section`, `empty-state`.
- Rename component instances to reflect their specific purpose, e.g., changing "Text Input" to `name-input`. This adds helpful context without breaking the underlying metadata.
- Avoid unnecessary nesting. Only nest frames or groups when required for Auto Layout, hierarchy, or visual structure.

### Validate files with "Check Designs"

Before passing your designs to an AI assistant or engineer, run Figma's **[Check Designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma)** feature. It automatically flags missing structure and context, helping you spot:

- Detached variables and type styles (which it can often auto-restore)
- Detached components (flagged, but cannot be auto-restored)
- Spacing inconsistencies where system tokens can be applied

HDS Ember components do not use spacing tokens, so applying spacing variables is not required for code generation.

![An example of Check Designs detecting detached variables in a Figma design file](/assets/tooling/mcp-server/mcp-server-check-designs-example.png)

!!! Info

**Note on Token Suggestions**

While Check Designs can automatically restore detached variables, double-check its suggestions. It identifies matching values, not semantic intent, so it might suggest `neutral-0` when `page-primary` is the correct choice. Always review token suggestions against your design intent.
!!!

