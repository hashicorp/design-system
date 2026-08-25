!!! Info

**Setting realistic expectations**

An AI agent connected to the Helios MCP is a powerful tool for exploring the design system, generating quick prototypes, and accelerating routine work. However, it is not a tool that can realize design intent on its own. An experienced engineer reviewing your Figma file can often infer meaning even when the file is imperfect, something that an AI agent cannot feasibly accomplish. The quality of its output is directly correlated to the quality of the input; e.g., your design preparation, prompt, and provided relevant context.
!!!

## Design hygiene

To get the most out of an AI agent, your Figma file or the input you are passing to the agent needs to be machine-readable; structured in a way that allows an agent (which reads metadata, not pixels) to accurately understand what you've designed and translate it into a meaningful output. Contrary to an engineer using judgement, recognizing patterns, asking clarifying questions, and applying years of experience, an AI agent reads only the data your file contains. If that data is incomplete or ambiguous, the output will be too.

### Connected HDS components

Almost all HDS Figma components are linked to a counterpart in code. When you use a component from the HDS library, the AI agent can see not just what the component looks like, but what is _is_: its name, suported properties, accepted variants, the type of content it expresses, and how it should be used. When a component is detached, that link is severed. The AI agent will struggle to identify it as an HDS component, preventing access to the necessary context that would otherwise constrain and guide its output.

A detached component is also no longer bound by the properties the component actually supports in code. It becomes a visual approximation that may represent something that doesn't exist or isnt' achievable within the system.

To ensure the best possible output from an AI agent:

- Stick to assets from the Helios library in Figma; styles, variables, components, patterns, and icons.
- Use properties that are exposed in the Figma component to customize it.
- Check for detached assets using Figma's [Check Designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma) feature and retached elements where necessary.

### Use HDS styles, variables, and tokens



