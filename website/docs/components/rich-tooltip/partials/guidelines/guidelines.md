## Usage

### When to use

- For adding extra information, in the form of structured content, to a UI element.
- When it’s necessary to _temporarily persist_ extra information in the UI; e.g., if the user benefits from cross-referencing information in the component with other elements in the UI.

!!! Info

**Temporarily persist:** By this, we mean the component will remain open so the content within can be cross-referenced with the rest of the UI until it's explicitly dismissed by the user. More details are in the [interaction](#interaction) section.
!!!

### When not to use

- For extra information that consists of basic text, consider using the [Tooltip](/components/tooltip) instead.
- For complex functions that change or alter the UI, consider a [Dropdown](/components/dropdown) instead.
- As a double-confirmation for destructive actions, use a [Modal](/components/modal) instead.
- If the information is **essential** to the user completing a task. In this case, consider placing this information within the page and associated with a specific UI element.

### Rich Tooltip vs. Tooltip

While there is overlap with the [Tooltip](/components/tooltip), the _majority_ of use cases can be categorized one of two ways:

1. Tooltip: simple, text-based content supporting basic formatting (_italic_, **bold**, `monospace`, etc).
2. Rich Tooltip: _relatively_ more complex, supporting temporary persistence and structured content, links, micro-interactions, diagrams, etc

View more detailed examples of the content the Rich Tooltip could contain in the [content](#content) section.

## Placement

A Rich Tooltip can be placed in various positions relative to the UI element it is associated with.

The most common options are: `top`, `bottom`, `left`, `right`.

![Placement examples of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-placement.png)

The Rich Tooltip supports additional placement options: `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`,and `right-end`.

![Additional placements of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-additional-placements.png)

!!! Info

The placement property is _relative_ to the element that toggles the component, rather than the direction of the pointer. E.g., `placement=left` will render the component to the _left_ of the toggle, but the pointer will be pointing to the right.
!!!

### Collision detection

The Rich Tooltip supports collision detection, meaning the `placement` property might be overridden depending on the position of the component relative to the edge of the viewport. This ensures that the component doesn't extend outside of the viewport while still being associated with the toggle element.

![Example of collision detection in the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-collision-detection.png)

## Offset

The default recommended distance between the toggle and the Rich Tooltip pointer is 4px.

![Default spacing for the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-offset-spacing.png)

!!! Dont

Don’t add extra offset if the Rich Tooltip would block important information, appear disconnected from the element it is meant to provide information for, or cause confusion for the user.

![Example of adjusting the offset of the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-offset-dont.png)
!!!

## Interaction

The Rich Tooltip supports two interaction methods: a `On hover / On focus` ("soft") interaction and a `On click` interaction. Which one to use depends on:

- The type and complexity of content displayed by the component.
- Whether _temporarily persisting_ the content in the UI is necessary or beneficial to the user.

Independent of which interaction is used, the Rich Tooltip can be dismissed by clicking outside of the component or with the `ESC` key.

## Toggle

### Default

By default, we provide a [Toggle](/components/rich-tooltip?tab=specifications#toggle-1) component which should be used in the majority of cases along with the Rich Tooltip. This component ensures that the toggle is perceivable, visually consistent, and can be used inline with other content or standalone as part of the layout flow.

#### How to use

Consider these guidelines when using the default Toggle component:

!!! Do

When used in a block of text, use the "text only"/"no icon" variant, as the icon can unnecessarily break the reading flow of the content.

![Text only underline](/assets/components/rich-tooltip/rich-tooltip-toggle-text-only.png)
!!!

!!! Do

When using the "icon only" variant, ensure the component is paired with other textual elements (like a headline) or elements described by the Rich Tooltip. Don’t use it in isolation or on its own.

![Pairing the icon only variant with textual elements](/assets/components/rich-tooltip/rich-tooltip-icon-only-toggle.png)
!!!

#### Size

The Toggle is available in `small`, `medium`, and `large` sizes in both the Ember and Figma components. If used in a paragraph of text, the Ember component will inherit the size from the surrounding text.

![Sizes of the Toggle](/assets/components/rich-tooltip/rich-tooltip-toggle-sizes.png)

#### Icon

An icon can be used in the Toggle in either the `leading` or `trailing` position, or on its own when paired with another element as a label.

![Icon placement of the Toggle](/assets/components/rich-tooltip/rich-tooltip-toggle-icon.png)

#### Underline

Only available as a component in Figma, the ToggleUnderline component can be used **inline** a block of text like a paragraph.

![Underline only toggle](/assets/components/rich-tooltip/rich-tooltip-toggle-underline.png)

### Custom toggle

If absolutely necessary, toggling the Rich Tooltip using a custom element is supported but should be used sparingly and conform to the following usability and accessibility success criteria:

- Must have a minimum target area of 24x24 pixels.
- Must have a minimum contrast ratio between the background/surface color of 3:1.
- Should use actionable language or be paired with a label to communicate that additional context is hidden from the user.

More information about this success criteria can be found in the [accessibility](?tab=accessibility) section.

!!! Dont

Don’t use a [Badge](/components/badge) or [BadgeCount](/components/badge-count) as the toggle for the Rich Tooltip, Badges are intentionally non-interactive elements and don't visually communicate that content is hidden behind a `hover`, `click`, or `focus` interaction.

![Example of using the Rich Tooltip with a badge](/assets/components/rich-tooltip/rich-tooltip-trigger-badge-dont.png)
!!!

!!! Do

Instead, place the Toggle component inline with the Badge to communicate the existence of a Rich Tooltip.

![Example of pairing the default toggle with a Badge](/assets/components/rich-tooltip/rich-tooltip-trigger-badge-do.png)
!!!

!!! Dont

Don’t toggle a Rich Tooltip from a form element like a [Text Input](/components/form/text-input), [Select](/components/form/select), or [Textarea](/components/form/textarea).

![Example of toggling a Rich Tooltip from a form element](/assets/components/rich-tooltip/rich-tooltip-trigger-form-input-dont.png)
!!!

!!! Do

Instead, use the [Label](/components/form/primitives#formlabel) and [HelperText](/components/form/primitives#helpertext) primitives to communicate details about the field. If _absolutely_ necessary to provide more details about a form element, use the Toggle inline within [Helper Text](/components/form/primitives#formhelpertext).

![Example within Helper Text](/assets/components/rich-tooltip/rich-tooltip-trigger-helper-text-do.png)

However, interactive elements in HelperText will not be read out as interactive to users with screen readers, only the text will be read. More details on this recommendation can be found in the [Helper Text documentation](/components/form/primitives?tab=code#formhelpertext-1).
!!!

## Content

The Rich Tooltip is built to be flexible enough to support a variety of use cases and content. Consider these common examples when determining whether it's appropriate for your use case.

### Text with links

This is a common use case for a Rich Tooltip due to the lack of support for interactive content in the [Tooltip](/components/tooltip).

![Link within text in the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-links.png)

### Structured content

Compared to the "standard" [Tooltip](/components/tooltip), the Rich Tooltip supports more structure and layout methods to better organize the content hierarchically.

![Structured content within the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-structure.png)

### Key-value pairs

Use the Rich Tooltip to display supplemental key-value pairs or metadata related to an element.

![Key-value pairs within the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-key-value-pair.png)

### Overflow content

![Displaying overflow content with the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-overflow.png)

<!--

## Future use cases

### Onboarding and walkthrough

Use the Rich Tooltip to communicate step-by-step instructions or introduce users to a new feature.

![Example of onboarding/walkthrough content using the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-onboarding.png)

### Data Visualization

Use the Rich Tooltip to display additional dynamic data within charts, graphs, and other forms of data visualization.

![Example of data visualization using the Rich Tooltip](/assets/components/rich-tooltip/rich-tooltip-content-data-visualization.png)

!!! Info

Helios does not currently support foundational styles or components for data visualization. If you have questions about methods or recommendations for implementing these types of features, please [contact](/about/support) the HDS team.
!!!
-->

