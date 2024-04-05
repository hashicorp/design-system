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

The _majority_ of use-cases can be categorized one of two ways:

1. "Standard" Tooltip: simple text-based content with support for rudimentary formatting (_italic_, **bold**, `monospace`, etc).
2. Rich Tooltip: relatively more complex content with support for different layouts, organization of content, links, micro-interactions, diagrams, etc.

More exhaustive examples of what types of content the Rich Tooltip _could_ contain can be found in the [content](#content) section.

<!-- insert some do/dont blocks here -->

## Placement

A Rich Tooltip can be placed in various positions relative to the UI element it is associated with. Choose the placement based on the context and available space around the trigger.

The most common options are: `top`, `bottom`, `left`, `right`.

<!--Insert image here-->

The Rich Tooltip supports additional placement options: `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`,and `right-end`.

### Collision detection

The RichTooltip supports collision detection, therefore, the `placement` property might be overridden depending on where the component renders in relationship to the edge of the viewport. This ensures that the component never extends outside of the viewport and always displays in a placement most appropriate for the size of the viewport and the positioning of trigger element.

<!-- image example of this -->

## Offset

The default recommended distance between the trigger and the Rich Tooltip pointer is 4px.

<!-- Image of this default -->

!!! Info

In some cases, adding an offset may be necessary to adjust the position of the RichTooltip. Changing the default offset should be done sparingly and only when it’s necessary to make sure that the component does not obscure or cover the trigger or other important information.
!!!

!!! Do

Adjust the offset when the Rich Tooltip needs to be positioned in a way that it doesn’t obstruct the view of the UI element or information it is associated with.

<!-- Image example -->
!!!

!!! Dont

Don’t add extra offset if the Rich Tooltip would block important information, appear disconnected from the element it is meant to provide information for, or cause confusion for the user.

<!-- Image example -->
!!!

## Trigger

The Rich Tooltip supports both a default, trigger to implement the component quickly and consistently, but also supports generic or custom elements passed as the trigger.

### Default trigger

### Custom trigger

While almost any custom element can be used as a trigger element, usage must conform to the following usability and accessibility success criteria:

- Must have a minimum target area of 24x24 pixels.
- Must have a minimum contrast ratio between the background/surface color of 3:1. <!-- Question of whether to include this or not -->
- Should use actionable language to communicate that additional context is obfuscated away from the user.

!!! Info

More information about this criterion can be found in the [accessibility](?tab=accessibility) section.
!!!

With these requirements in mind, consider these options prior to creating a custom element:

!!! Dont

Don’t use a [Badge](/components/badge) as the trigger for the component; Badges are intentionally non-interactive elements and don't visually communicate that content is hidden behind a `hover`, `click`, or `focus` interaction.

<!-- Insert image here -->

This same recommendation applies for the [Badge Count](/components/badge-count) component.
!!!

!!! Do

Instead, place the default trigger inline with the Badge to communicate the existence of a Rich Tooltip.

<!-- insert image -->
!!!

!!! Dont

Don’t trigger a Rich Tooltip from a form element like a [Text Input](/components/form/text-input), [Select](/components/form/select), or [Textarea](/components/form/textarea).

<!-- Insert image -->
!!!

!!! Do

Instead, use the supported [Primitives](/components/form/primitives) to communicate this content.

<!-- Insert image -->
!!!

!!! Do

If _absolutely_ necessary to provide additional context within a form element, use the default trigger within the [Helper Text](/components/form/primitives#formhelpertext).

<!-- insert image -->
<!-- discuss with team whether to include this or not -->

However, note that interactive elements in text will not be read out as interactive elements to users with screen readers; only the text will be read. More details on this recommendation can be found in the [Helper Text documentation](/components/form/primitives?tab=code#formhelpertext-1).
!!!

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