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