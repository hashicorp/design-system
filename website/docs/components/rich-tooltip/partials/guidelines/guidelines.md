## Usage

### When to use

- For adding context to a UI element that consists of more than just a single sentence.
- When necessary to persist descriptive content in the UI; e.g., if the user benefits from cross-referencing information in the component with other elements in the UI.

### When not to use

- For descriptions or context that consists of basic text, consider using the [Tooltip](/components/tooltip) instead.
- For complex functions that dramatically change or alter the UI, consider a [Dropdown](/components/dropdown) instead.
- As a double-confirmation for destructive actions, use a [Modal](/components/modal) instead.
- If the information contained within the component is **essential** to the completing a task. Consider placing this information directly within the page and associated with a specific UI element.

### Rich Tooltip vs. Tooltip

While there is overlap between the Rich Tooltip and the "standard" [Tooltip](/components/tooltip), which component to use depends on:

- the complexity of the content
- the presence of structural or layout elements
- whether there are interactive elements; e.g., links or micro-interactions
- whether the component should persist within the UI

The _majority_ of use-cases can be categorized one of two ways:

1. "Standard" Tooltip: simple text-based content with support for rudimentary formatting (_italic_, **bold**, `monospace`, etc).
2. Rich Tooltip: relatively more complex, dynamic content with support for different layouts, organization of content, links, micro-interactions, diagrams, etc.

More exhaustive examples of what types of content the Rich Tooltip _could_ contain can be found in the [content](#content) section.

## Placement

A Rich Tooltip can be placed in various positions relative to the UI element it is associated with. Choose the placement based on the context and available space around the trigger.

The most common options are: `top`, `bottom`, `left`, `right`.

![Placement examples of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-placement.png)

The Rich Tooltip supports additional placement options: `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`,and `right-end`.

!!! Info

The placement property is _relative_ to the element triggering the component, rather than the direction of the pointer. E.g., `placement=left` will render the component to the _left_ of the trigger, but the pointer will be pointing towards to right.
!!!

### Collision detection

The Rich Tooltip supports collision detection, meaning the `placement` property might be overridden depending on where the component renders in relationship to the edge of the viewport. This ensures that the component doesn't extend outside of the viewport while still being associated with the trigger element.

![Example of collision detection in the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-collision-detection.png)

## Offset

The default recommended distance between the trigger and the Rich Tooltip pointer is 4px.

![Default spacing for the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-offset-spacing.png)

!!! Info

In some cases, adding an offset may be necessary to adjust the position of the RichTooltip. Changing the default offset should be done sparingly and only when it’s necessary to make sure that the component does not obscure or cover the trigger or other important information.
!!!

!!! Do

Adjust the offset when the Rich Tooltip needs to be positioned in a way that it doesn’t obstruct the view of the UI element or information it is associated with.

![Example of adjusting the offset of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-offset-do.png)
!!!

!!! Dont

Don’t add extra offset if the Rich Tooltip would block important information, appear disconnected from the element it is meant to provide information for, or cause confusion for the user.

![Example of adjusting the offset of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-offset-dont.png)
!!!

## Trigger

The Rich Tooltip supports both a default, trigger to implement the component quickly and consistently, but also supports generic or custom elements passed as the trigger.

### InfoText

<!-- TBD on link and name for this component -->

We provide the [InfoText](/components/info-text) component which accounts for the majority of use-cases when implementing a trigger element. This component ensures that the trigger is perceivable, visually consistent, and can be used inline with other content or standalone as part of the layout flow.

More details and specs about this component can be found [here](/#link-to-component)

### Custom trigger

While almost any custom element can be used as a trigger element, usage must conform to the following usability and accessibility success criteria:

- Must have a minimum target area of 24x24 pixels.
- Must have a minimum contrast ratio between the background/surface color of 3:1.
- Should use actionable language to communicate that additional context is obfuscated away from the user.<!-- Question of whether to include this or not -->

More information about this criterion can be found in the [accessibility](?tab=accessibility) section.

!!! Dont

Don’t use a [Badge](/components/badge) or [BadgeCount](/components/badge-count) as the trigger for the component; Badges are intentionally non-interactive elements and don't visually communicate that content is hidden behind a `hover`, `click`, or `focus` interaction.

![Example of using the Rich Tooltip with a badge](/assets/components/rich-tooltip/rich-tooltip-trigger-badge-dont.png)
!!!

!!! Do

Instead, place the default trigger inline with the Badge to communicate the existence of a Rich Tooltip.

![Example of pairing the default trigger with a Badge](/assets/components/rich-tooltip/rich-tooltip-trigger-badge-do.png)
!!!

!!! Dont

Don’t trigger a Rich Tooltip from a form element like a [Text Input](/components/form/text-input), [Select](/components/form/select), or [Textarea](/components/form/textarea).

![Example of triggering a Rich Tooltip from a form element](/assets/components/rich-tooltip/rich-tooltip-trigger-form-input-dont.png)
!!!

!!! Do

Instead, rely on the [Label](/components/form/primitives#formlabel) and [HelperText](/components/form/primitives#helpertext) primitives to communicate details about the field. If _absolutely_ necessary to provide more details about a form element, use the default trigger within [Helper Text](/components/form/primitives#formhelpertext).

![Example within Helper Text](/assets/components/rich-tooltip/rich-tooltip-trigger-helper-text-do.png)

However, note that interactive elements in text will not be read out as interactive elements to users with screen readers; only the text will be read. More details on this recommendation can be found in the [Helper Text documentation](/components/form/primitives?tab=code#formhelpertext-1).
!!!

!!! Do

If necessary to persist the Rich Tooltip within UI upon interaction (a toggle-like experience), consider using a `secondary` [Button](/components/button) as the trigger element. In this scenario use a [`on click`](#interaction) interaction to persist the component.

![Example using a Button to trigger the component](/assets/components/rich-tooltip/rich-tooltip-trigger-secondary-button.png)

This can be useful when displaying instructional information or details that reference different parts of the UI.
!!!

!!! Dont

Don’t use a [Button](/components/button) to trigger a Rich Tooltip if the Button performs a function. This can cause an unexpected overlap in the interaction with the Button and the triggering of the Rich Tooltip.

![Example of incorrectly triggering a Rich Tooltip with a button](/assets/components/rich-tooltip/rich-tooltip-trigger-button-dont.png)
!!!

## Interaction

The Rich Tooltip supports two different interaction methods: a `hover/focus` ("soft") interaction, and a `click` interaction. Which one to use depends on the type and complexity of content displayed by the component, and whether _persisting_ the content in the UI is necessary or beneficial to the user.

1. `Hover/focus`: displays when the mouse enters the trigger or the trigger receives focus. The `RichTooltip` has a timeout by default and will persist for 500 milliseconds (0.5 seconds) _after_ the mouse leaves the trigger.
2. `On click`: displays when the user clicks the trigger with a mouse or if the trigger receives a keyboard event (`spacebar`, `enter/return`).

<!-- Do we set a default interaction in the Ember component? -->

## Content

We are not prescriptive about what type of content a Rich Tooltip can contain, consider these common examples when determining whether the Rich Tooltip is appropriate for your use case.

<!-- Ensure that we have alignment for all of these scenarios -->

### Text with links

This is a common use case for a Rich Tooltip due to the lack of support for interactive content in the standard [Tooltip](/components/tooltip).

![Link within text in the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-links.png)

### Structured content

The Rich Tooltip supports more structure and layout methods to better organize the content hierarchically.

![Structured content within the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-structure.png)

### Key-value pairs

Use the Rich Tooltip to display supplemental key-value pairs or metadata related to an element.

![Key-value pairs within the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-key-value-pair.png)

### Overflow content

![Displaying overflow content with the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-overflow.png)

### Onboarding and walkthrough

Use the Rich Tooltip to communicate step-by-step instructions or introduce them to a new feature.

![Example of onboarding/walkthrough content using the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-onboarding.png)

### Data Visualization

Use the Rich Tooltip to display additional dynamic data within charts, graphs, and other forms of data visualization.

![Example of data visualization using the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-data-visualization.png)

!!! Info

Helios does not currently support foundational styles or components for data visualization. If you have questions about methods or recommendations for implementing this type of feature, please [contact](/about/support) the HDS team.
!!!
