## Usage

### When to use

When displaying additional context or information that is not critical to the user’s task or decision-making process.

### When not to use

- When the content is too lengthy or complex.
- When the information provided is critical to the user’s task or decision-making process, consider moving the content to the page or an [alert](https://helios.hashicorp.design/components/alert).

!!! Do

Use tooltips to provide additional context or supplementary non-critical information.

![Correct use of a tooltip](/assets/components/tooltip/tooltip-when-to-use.png)

!!!

!!! Dont

Avoid using tooltips to place crucial information related to the user’s task.

![Incorrect use of a tooltip](/assets/components/tooltip/tooltip-when-not-to-use.png)

!!!


## Placement

Tooltips can be placed in various positions relative to the UI element they are associated with. Choose the placement based on the context and available space around the tooltip trigger.

The most common options are: `top`, `bottom`, `left`, `right`.

![Tooltip with wrapped text](/assets/components/tooltip/tooltip-placement.png)

The tooltip supports additional placement options: `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`, `right-end`.

## Offset

!!! Info

 In some cases, adding an offset may be necessary to adjust the position of the tooltip. Changing the default offset should be done sparingly and only when it’s necessary to make sure that the tooltip does not obscure or cover the trigger or other important information.
!!!

The default and recommended distance between the trigger and the tooltip’s pointer is 4px.

![Default offset of the tooltip](/assets/components/tooltip/tooltip-spacing.png)

!!! Do

Adjust the offset when the tooltip needs to be positioned in a way that it doesn’t obstruct the view of the UI element or information it is associated with.

![Tooltip with adjusted offset](/assets/components/tooltip/tooltip-offset-do.png)
!!!

!!! Dont

Don’t add extra offset if the tooltip would block important information, appear disjointed from the element it is meant to provide information for, or cause confusion for the user.

![Tooltip with adjusted offset](/assets/components/tooltip/tooltip-offset-dont.png)
!!!

## Content

The tooltip should contain text only. Basic text formatting, such as bold and italic, is supported.

If more complex content is necessary to convey the information, consider other display components or moving the content to the page.

![Tooltip with bold and italic text](/assets/components/tooltip/tooltip-text-formatting.png)

## Text overflow

!!! Info

**Differences between Figma and code**

Text wrapping can be achieved using the property `isMultiline` in Figma.
!!!

The text should wrap when it exceeds a maximum width of 280px. There is no character limit, but we recommend keeping it short and concise (~80 characters).

![Tooltip with wrapped text](/assets/components/tooltip/tooltip-text-wrapping.png)