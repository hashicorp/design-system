## Usage

### When to use

When displaying additional context or information that is not critical to the user's task or decision-making process.

### When not to use

- When the content is too lengthy or complex.
- When the information provided is critical to the user's task or decision-making process, consider moving the content to the page or an [alert](https://helios.hashicorp.design/components/alert).

tooltip-when-to-use

!!! Do

![Correct use of a tooltip](/assets/components/tooltip/tooltip-when-to-use.png)

!!!

!!! Dont

![Incorrect use of a tooltip](/assets/components/tooltip/tooltip-when-not-to-use.png)

!!!


## Placement

Tooltips can be placed in various positions relative to the UI element they are associated with. Choose the placement based on the context and available space around the tooltip trigger.

There are twelve placement options: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`, `right-end`.

![Tooltip with wrapped text](/assets/components/tooltip/tooltip-placement.png)

## Offset

The default and recommended distance between the trigger and the tooltip's pointer or arrow is 4px.

![Default offset of the tooltip](/assets/components/tooltip/tooltip-spacing.png)

!!! Info

 In some cases, an offset may be necessary to adjust the position of the tooltip. The offset should be used sparingly when it's necessary to make sure that the tooltip does not obscure or cover the trigger or important information.
!!!

!!! Do

Adjust the offset when the tooltip needs to be positioned in a way that it doesn't obstruct the view of the UI element or information it is associated with.

![Tooltip with adjusted offset](/assets/components/tooltip/tooltip-offset-do.png)
!!!

!!! Dont

Don't add extra offset if the tooltip blocks important information or appears disjointed from the element it is meant to provide information for, and can cause confusion for the user. 

![Tooltip with adjusted offset](/assets/components/tooltip/tooltip-offset-dont.png)
!!!

## Content

The tooltip should contain text only. Basic text formatting, such as bold and italic is supported.

If more complex content is necessary to convey the information, consider other display components or moving the content to the page.

![Tooltip with bold and italic text](/assets/components/tooltip/tooltip-text-formatting.png)

## Text overflow

The text should wrap when it exceeds a maximum width of 280px. There is no character limit, but we recommend keeping them short and concise (~80 characters).

![Tooltip with wrapped text](/assets/components/tooltip/tooltip-text-wrapping.png)

!!! Info

Text wrapping can be achieved through the property `isMultiline` in Figma.
!!!

## Related

<!-- only include the 2 most similar/related components -->
- [Modal](https://helios.hashicorp.design/components/modal)
