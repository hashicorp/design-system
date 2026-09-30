!!! Info

**Setting realistic expectations**

An AI assistant connected to the Helios MCP is a powerful tool for exploring the design system, generating quick prototypes, and accelerating routine work. However, it is not a tool that can interpret design intent reliably on its own. An experienced engineer reviewing your Figma file can often infer meaning even when the file is imperfect, something that an AI assistant cannot feasibly accomplish. The quality of its output is directly correlated with the quality of the input, including your design preparation, prompt, and relevant context.
!!!

While the Helios MCP server is generally intended for an engineering workflow, it can also provide value for designers working to test component properties, create high-resolution prototypes, vet design concepts, and other pre-production practices.

Use these guidelines when working in a Figma-to-code pipeline, where the MCP server acts as an interpretive layer between Helios Figma components, properties, styles, variables, and working code.

## Prepare your Figma file

To get the most out of the Helios MCP server with an AI assistant, your Figma file or the input you are passing to the assistant needs to be machine-readable and structured in a way that allows an assistant to accurately understand what you've designed and translate it into a meaningful output. Unlike an engineer using judgement, recognizing patterns, asking clarifying questions, and applying years of experience, an AI assistant reads only the metadata and pixels your file contains. If that data is incomplete or ambiguous, the output will be too.

### Use connected HDS components

Almost all HDS Figma components are linked to a counterpart in code. When you use a component from the HDS library, an AI assistant can access its metadata: its name, supported properties, accepted variants, intended purpose, and recommendations for use. When a component is detached, the link to this metadata is severed. The AI assistant will struggle to identify it as an HDS component, restricting access to the context that would otherwise constrain and guide its output. Detached components are also no longer bound by the properties the corresponding code component supports, becoming visual approximations of something that may not be achievable within the system.

To give an AI assistant the best available Helios context:

- Use assets directly from the Helios library in Figma: styles, variables, components, patterns, and icons.
- Use properties that are exposed in the Figma component to customize it.
- Check for detached assets using Figma's [Check Designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma) feature and re-attach assets where necessary.
- Refrain from overriding styles or variables within a component, as this creates divergence between the design input and the code output.

### Use HDS tokens and styles

HDS tokens are named values exposed in Figma through variables and styles that map directly to CSS custom properties in code. When you apply a Figma variable like `page-primary` as a background fill, an AI assistant knows both the semantic intent and the exact code-level value to use. When you apply a raw hex value (e.g., `#ffffff`), an AI assistant sees a color but has no context about its role in the system and cannot reliably determine whether it should be `page-primary`, `surface-primary`, or `neutral-0`, even if they all resolve to the same hex value.

The same principle applies to typography: using a text style such as `body-200` tells the assistant which typographic token to reference in code or which properties to pass to `<HdsText>`.

### Use Figma's layout mechanisms

When a frame or layer uses Auto Layout, an AI assistant receives structured information about how elements relate to each other: direction, spacing, padding, alignment, and wrapping behavior. This maps closely to [flexbox in CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox) and ensures that a design reflects the natural flow of the document object model (DOM).

!!! Insight

A layer that uses Auto Layout can be interpreted by an AI assistant to use HDS layout components like `<HdsLayoutFlex>` and `<HdsLayoutGrid>`, even if an equivalent component does not exist in Figma.
!!!

Designs built without a formalized layout or outside of the natural document flow require engineers and AI assistants to make assumptions about spacing and structure, which are often incorrect.

- Use Auto Layout for frames and layers that contain more than one element.
- Define document flow and structure by setting gap and padding on elements with Auto Layout, not by dragging elements into position visually.
- Avoid using absolute positioning unless there is a specific, intentional reason (e.g., overlays, positioned tooltips).

### Name and organize layers

Layer names are part of the metadata an AI assistant reads. Descriptive, consistent names help the assistant understand the hierarchy and purpose of elements, whereas Figma's default layer names (`Frame 47`, `Group 3`, `Rectangle 12`) provide no meaningful information.

- Name frames and groups to reflect their purpose: `header`, `sidebar`, `form-section`, `empty-state`.
- Component instances usually inherit a sensible name from the library. Leave these as is or rename them to match the instance's intent (e.g., `name-input` for a text input collecting a user's name). Renaming a component instance does not affect the metadata or context available to an AI assistant.
- Flatten nested groups that don't serve a structural purpose.
- Pursue a flat layout; avoid nesting frames inside frames unless there's an intentional layout, hierarchical, or structural purpose.

### Run Figma Check Designs before handoff

Before handing off your designs to an engineer or AI assistant, run Figma's **[Check Designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma)** feature. It identifies gaps that reduce the context available to an assistant, including:

- Detached color variables, typography styles, and effects (and can auto-restore many of them)
- Detached components (flagged, but cannot be auto-restored)
- Spacing inconsistencies and places where HDS spacing variables can be applied

HDS Ember components do not use spacing tokens, so applying spacing variables is not required for code generation.

![An example of Check Designs detecting detached variables in a Figma design file](/assets/tooling/mcp-server/mcp-server-check-designs-example.png)

!!! Info

**Figma Check Designs**

Check Designs can often automatically restore detached variables and styles. However, it does not always suggest the semantically correct token. For example, it may suggest `neutral-0` where `page-primary` is the appropriate choice. Use Check Designs as a starting point, then review flagged items with the HDS token documentation to confirm the right token for each context.
!!!

