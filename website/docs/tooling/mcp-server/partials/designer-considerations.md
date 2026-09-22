!!! Info

**Setting realistic expectations**

An AI assistant connected to the Helios MCP is a powerful tool for exploring the design system, generating quick prototypes, and accelerating routine work. However, it is not a tool that can realize design intent on its own. An experienced engineer reviewing your Figma file can often infer meaning even when the file is imperfect, something that an AI assistant cannot feasibly accomplish. The quality of its output is directly correlated to the quality of the input; e.g., your design preparation, prompt, and provided relevant context.
!!!

## Design hygiene

To get the most out of using the Helios MCP server with an AI assistant, your Figma file or the input you are passing to the assistant needs to be machine-readable; structured in a way that allows an assistant to accurately understand what you've designed and translate it into a meaningful output. Contrary to an engineer using judgement, recognizing patterns, asking clarifying questions, and applying years of experience, an AI assistant reads only the metadata and pixels your file contains. If that data is incomplete or ambiguous, the output will be too.

### Connected HDS components

Almost all HDS Figma components are linked to a counterpart in code. When you use a component from the HDS library, an AI assistant can see the the metadata of the component: its name, supported properties, accepted variants, the type of content it expresses, and recommendations for how it should be used. When a component is detached, that link to necessary metadata is severed. The AI assistant will struggle to identify it as an HDS component, restricting access to the necessary context that would otherwise constrain and guide its output.

A detached component is also no longer bound by the properties the component actually supports in code. It becomes a visual approximation representing something that doesn't exist or isn't achievable within the system.

To ensure the best possible output from an AI assistant:

- Stick to assets from the Helios library in Figma; styles, variables, components, patterns, and icons.
- Use properties that are exposed in the Figma component to customize it.
- Check for detached assets using Figma's [Check Designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma) feature and re-attach elements where necessary.
- Refrain from overriding styles or variables within the component, this will create a divergence between the design input and the code output.

### Use HDS styles, variables, and tokens

HDS design tokens (variables and styles in Figma) are named values that map directly to CSS custom properties in code. When you apply a style token like `page-primary` to a background color, an AI assistant knows both the semantic intent and the exact code-level value that should be used. When you apply a raw hex value (e.g., `#ffffff`), an AI assistant sees a color but has no context about what role it plays in the system and cannot reliably determine whether it should be `page-primary`, `surface-primary`, or `neutral-0`, even if they all resolve to the same hex value.

The same principle applies to typography: using a text style named `body-200` tells the assistant exactly which typographic token to reference in code, or which properties to set when using the `<HdsText>` component.

### Use Auto Layout and Figma's layout mechanisms

When a frame or layer uses Auto Layout, an AI assistant receives structured information about how elements relate to each other: direction, spacing, padding, alignment, and wrapping behavior. This maps closely to flexbox in CSS and ensures that a design reflects that natural flow of the document object model (DOM).

!!! Insight

A layer that uses Auto Layout can be interpreted by an AI assistant to use HDS layout components like `<HdsLayoutFlex>` and `<HdsLayoutGrid>`.
!!!

Designs built without a formalized layout or outside of the natural document flow require engineers and AI assistants to make assumptions (or infer) spacing and structure, which are often incorrect.

- Use Auto Layout on most (if not all) frames and layers that contain more than one element.
- Define document flow and structure by setting gap and padding on elements with Auto Layout, not by dragging elements into position visually.
- Avoid using absolute positioning unless there is a specific, intentional reason (e.g., overlays, positioned tooltips).

### Layer naming and organization

Layer names are part of the metadata an AI assistant reads. Descriptive, consistent names help the assistant understand the hierarchy and purpose of elements, where Figma's default layer names (`Frame 47`, `Group 3`, `Rectangle 12`) provide no meaningful information.

- Name frames and groups to reflect their purpose: `header`, `sidebar`, `form-section`, `empty-state`.
- Component instances usually inherit a sensible name from the library; these can be left as is, or renamed to match the intent of the instance (e.g., `name-input` for a text input collecting a users name). Renaming a component instance does not diminish the metadata or context made available to an AI assistant.
- Flatten nested groups that don't serve a structural purpose.
- Avoid nesting frames inside frames unless there's an intentional layout or hierarchical reason.

### Run Figma Check Designs as a pre-flight step

Before handing off your designs to an engineer or AI assistant, run Figma's **[Check Designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma)** feature. This scans your file to identify gaps that degrade the context the assistant receives and improves the quality of its output by flagging:

- Detached color variables, typography styles, and effects (and can auto-restore many of them)
- Detached components (flagged, but cannot be auto-restored)
- Spacing inconsistencies and where HDS spacing variables can be applied (though this is not required as spacing tokens are not used within HDS Ember components)

![An example of Check Designs detecting detached variables in a Figma design file](/assets/tooling/mcp-server/mcp-server-check-designs-example.png)

!!! Info

**Figma Check Designs**

Figma's Check Designs feature can detect detached variables/styles and can often automatically restore them. However, Check Designs does not always map to the semantically correct token. For example, it may suggest `neutral-0` where `page-primary` is the appropriate choice. Use Check Designs as a starting point, then review flagged items with the HDS token documentation to confirm the right token for each context.
!!!


