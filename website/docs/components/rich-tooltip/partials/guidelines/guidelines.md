## Usage

### When to use

- For adding extra information to a UI element that consists of more than a single sentence.
- When it’s necessary to persist extra information in the UI; e.g., if the user benefits from cross-referencing information in the component with other elements in the UI.

### When not to use

- For extra information that consists of basic text, consider using the [Tooltip](/components/tooltip) instead.
- For complex functions that change or alter the UI, consider a [Dropdown](/components/dropdown) instead.
- As a double-confirmation for destructive actions, use a [Modal](/components/modal) instead.
- If the information is **essential** to the user completing a task. Consider placing this information within the page and associated with a specific UI element.

### Rich Tooltip vs. Tooltip

While there is overlap between the Rich Tooltip and the "standard" [Tooltip](/components/tooltip), which component to use depends on:

- the complexity of the content
- whether structural or layout elements are used
- whether there are interactive elements; e.g., links or micro-interactions
- whether the component should persist within the UI

The _majority_ of use-cases can be categorized one of two ways:

1. "Standard" Tooltip: simple, text-based content with support for rudimentary formatting (_italic_, **bold**, `monospace`, etc).
2. Rich Tooltip: _relatively_ more complex, dynamic content with support for different layouts, organization of content, links, micro-interactions, diagrams, etc.

View more detailed examples of the content the Rich Tooltip could contain in the [content](#content) section.

## Placement

A Rich Tooltip can be placed in various positions relative to the UI element it is associated with. Choose the placement based on the context and available space around the toggle.

The most common options are: `top`, `bottom`, `left`, `right`.

![Placement examples of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-placement.png)

The Rich Tooltip supports additional placement options: `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`,and `right-end`.

!!! Info

The placement property is _relative_ to the element toggleing the component, rather than the direction of the pointer. E.g., `placement=left` will render the component to the _left_ of the toggle, but the pointer will be pointing to the right.
!!!

### Collision detection

The Rich Tooltip supports collision detection, meaning the `placement` property might be overridden depending on the position of the component relative to the edge of the viewport. This ensures that the component doesn't extend outside of the viewport while still being associated with the toggle element.

![Example of collision detection in the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-collision-detection.png)

## Offset

The default recommended distance between the toggle and the Rich Tooltip pointer is 4px.

![Default spacing for the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-offset-spacing.png)

!!! Info

In some cases, adding an offset may be necessary to adjust the position of the RichTooltip. Changing the default offset should be done sparingly and only when it’s necessary to make sure that the component does not obscure or cover the toggle or other important information.
!!!

!!! Do

Adjust the offset when the Rich Tooltip needs to be positioned in a way that it doesn’t obstruct the UI element or information it is associated with.

![Example of adjusting the offset of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-offset-do.png)
!!!

!!! Dont

Don’t add extra offset if the Rich Tooltip would block important information, appear disconnected from the element it is meant to provide information for, or cause confusion for the user.

![Example of adjusting the offset of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-offset-dont.png)
!!!

## Toggle

The Rich Tooltip supports both a default toggle (InfoText) to use the component in a consistent manner, but also supports generic or custom elements passed to the toggle element.

### InfoText

Be default, we provide the [InfoText](/components/rich-tooltip?tab=specifications#infotext-1) component which accounts for the majority of use-cases for the Rich Tooltip. This component ensures that the toggle is perceivable, visually consistent, and can be used inline with other content or standalone as part of the layout flow.

!!! Info

For now, the InfoText component should only be used with the Rich Tooltip. In Figma, this component is published separately for flexibility, while in Ember the component is more coupled with the Rich Tooltip.
!!!

#### Variants

- `size`: `small`, `medium` (default), `large`
- `hasText`: boolean; defaults to true
- `hasTrailingIcon`: boolean; defaults to true
- `hasLeadingIcon`: boolean

#### States

![InfoText states](/assets/components/rich-tooltip/infotext-states.png)

### Custom toggle

While almost any element can be used to toggle the Rich Tooltip, custom elements must conform to the following usability and accessibility success criteria:

- Must have a minimum target area of 24x24 pixels.
- Must have a minimum contrast ratio between the background/surface color of 3:1.
- Should use actionable language to communicate that additional context is obfuscated away from the user.<!-- Question of whether to include this or not -->

More information about this success criteria can be found in the [accessibility](?tab=accessibility) section.

!!! Dont

Don’t use a [Badge](/components/badge) or [BadgeCount](/components/badge-count) as the toggle for the Rich Tooltip; Badges are intentionally non-interactive elements and don't visually communicate that content is hidden behind a `hover`, `click`, or `focus` interaction.

![Example of using the Rich Tooltip with a badge](/assets/components/rich-tooltip/rich-tooltip-trigger-badge-dont.png)
!!!

!!! Do

Instead, place the InfoText component inline with the Badge to communicate the existence of a Rich Tooltip.

![Example of pairing the default toggle with a Badge](/assets/components/rich-tooltip/rich-tooltip-trigger-badge-do.png)
!!!

!!! Dont

Don’t toggle a Rich Tooltip from a form element like a [Text Input](/components/form/text-input), [Select](/components/form/select), or [Textarea](/components/form/textarea).

![Example of toggling a Rich Tooltip from a form element](/assets/components/rich-tooltip/rich-tooltip-trigger-form-input-dont.png)
!!!

!!! Do

Instead, use the [Label](/components/form/primitives#formlabel) and [HelperText](/components/form/primitives#helpertext) primitives to communicate details about the field. If _absolutely_ necessary to provide more details about a form element, use the InfoText within [Helper Text](/components/form/primitives#formhelpertext).

![Example within Helper Text](/assets/components/rich-tooltip/rich-tooltip-trigger-helper-text-do.png)

However, interactive elements in HelperText will not be read out as interactive to users with screen readers, only the text will be read. More details on this recommendation can be found in the [Helper Text documentation](/components/form/primitives?tab=code#formhelpertext-1).
!!!

!!! Do

If it's necessary to persist the Rich Tooltip within the UI, consider using a `secondary` [Button](/components/button) as the toggle element. In this scenario use the [`on click`](#interaction) interaction to persist the component.

![Example using a Button to toggle the component](/assets/components/rich-tooltip/rich-tooltip-trigger-secondary-button.png)

This can be useful when displaying instructional information or details that reference different parts of the UI.
!!!

!!! Dont

Don’t use a [Button](/components/button) to toggle a Rich Tooltip if the Button performs a function. This can cause an unexpected overlap in the interaction with the Button and the toggleing of the Rich Tooltip.

![Example of incorrectly toggling a Rich Tooltip with a button](/assets/components/rich-tooltip/rich-tooltip-trigger-button-dont.png)
!!!

## Interaction

The Rich Tooltip supports two different interaction methods: a `hover/focus` ("soft") interaction and a `click` interaction. Which one to use depends on the type and complexity of content displayed by the component, and whether _persisting_ the content in the UI is necessary or beneficial to the user.

1. `Hover/focus` (default): displays when the mouse enters the toggle or the toggle receives focus. The `RichTooltip` has a timeout by default and will persist for 500 milliseconds (0.5 seconds) _after_ the mouse leaves the toggle.
2. `On click`: displays when the user clicks the toggle with a mouse or if the toggle receives a keyboard event (`spacebar`, `enter/return`).

## Content

We are not prescriptive about what type of content a Rich Tooltip can contain; consider these common examples when determining whether the Rich Tooltip is appropriate for your use case.

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

Use the Rich Tooltip to communicate step-by-step instructions or introduce users to a new feature.

![Example of onboarding/walkthrough content using the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-onboarding.png)

### Data Visualization

Use the Rich Tooltip to display additional dynamic data within charts, graphs, and other forms of data visualization.

![Example of data visualization using the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-data-visualization.png)

!!! Info

Helios does not currently support foundational styles or components for data visualization. If you have questions about methods or recommendations for implementing these types of features, please [contact](/about/support) the HDS team.
!!!
