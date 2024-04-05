## Usage

### When to use

- For adding context to a UI element that consists of more than just a single sentence.
- When necessary to persist descriptive content in the UI; e.g., if the user benefits from cross-referencing information in the component with other elements in the UI.

### When not to use

- For descriptions or context that consists of basic text, consider using the [Tooltip](/components/tooltip) instead.
- For complex functions that dramatically change or alter the UI, consider a [Dropdown](/components/dropdown) instead.
- As a double-confirmation for destructive actions, use a [Modal](/components/modal) instead.
- If the information contained within the component is **essential** to the user completing a task.

### Rich Tooltip vs. Tooltip

While there is overlap between the Rich Tooltip and the "standard" [Tooltip](/components/tooltip), which component to use depends on:

- the complexity of the content and presence of some form of structure or layout
- whether there are interactive elements; e.g., links or micro-interactions
- whether the component should persist within the UI

#### Content type

By design, the "standard" Tooltip only supports basic string values to add short descriptions and context to elements within the UI. In contrast, the Rich Tooltip is agnostic in the content it supports; it can accept anything that is passed to it as `yeilded` content.

Using this differentiation, the _majority_ of use-cases can be categorized one of two ways:

1. "Standard" Tooltip: simple text-based content with support for rudimentary formatting (_italic_, **bold**, `monospace`, etc).
2. Rich Tooltip: relatively more complex content with support for different layouts, organization of content, links, micro-interactions, diagrams, etc.

<!-- TODO: Reference this content in the Tooltip docs -->

More exhaustive examples of what types of content the Rich Tooltip _could_ contain can be found in the [content](#content) section.

#### Interaction

The "standard" Tooltip is shown when the mouse enters/hovers the trigger (or TooltipButton) or when it recieves focus from the keyboard or assistive technology. The Rich Tooltip can be shown with either a `hover/focus` interaction or a `click` interaction, where it will persist in the UI until explicitly dismissed.

## Placement

A Rich Tooltip can be placed in various positions relative to the UI element it is associated with. Choose the placement based on the context and available space around the trigger.

The most common options are: `top`, `bottom`, `left`, `right`.

<!--Insert image here-->

The Rich Tooltip supports additional placement options: `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`,and `right-end`.

### Collision detection

Depending on where the Rich Tooltip renders within the UI, this placement may be overridden 

## Offset

<!-- Are we supporting this similarly to the Tooltip? -->

## Trigger element

The Rich Tooltip supports both a default out-of-the-box trigger to implement the component quickly and consistently, but also supports generic or custom elements passed as the trigger.

### Default trigger

### Custom trigger

While almost any custom element can be used as a trigger element, usage must conform to the following usability and accessibility success criteria:

- Must have a minimum target area of 24x24 pixels.
- Must have a minimum contrast ratio between the background/surface color of 3:1.
- Should not rely solely on an icon, instead should be paired with a label.
- Should use actionable language to communicate that additional context is obfuscated away from the user.

!!! Info

More information about this criterion can be found in the [accessibility](?tab=accessibility) section.
!!!

When choosing a custom element to use as a trigger, consider the following interaction guidelines and what the user will expect as an optimal experience.

#### Badges

#### Other interactive elements

## Interaction

The Rich Tooltip supports two different interaction methods: a `hover/focus` ("soft") interaction, and a `click` interaction. Which one to use depends on the type and complexity of content displayed by the component, and whether _persisting_ the content in the UI is necessary or beneficial to the user.

1. `Hover/focus`: 
2. `On click`:

<!-- Do we set a default interaction in the Ember component? -->

## Content

We are not prescriptive about what type of content a Rich Tooltip can contain, but consider the following high-level guidelines and examples when determining whether to use this component or not.

### Text with links

### Structured content

### Key-value pairs

### Instructions

### Onboarding

### Overflow content

