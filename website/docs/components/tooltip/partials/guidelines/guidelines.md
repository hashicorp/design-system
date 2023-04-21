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

<Doc::Layout @spacing="80px">
  <Hds::TooltipButton @text="Top" @placement="top">
    <FlightIcon @name="info" aria-label="top placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Bottom" @placement="bottom">
    <FlightIcon @name="info" aria-label="bottom placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Left" @placement="left">
    <FlightIcon @name="info" aria-label="left placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Right" @placement="right">
    <FlightIcon @name="info" aria-label="right placement" />
  </Hds::TooltipButton>
</Doc::Layout>

<Doc::Layout @spacing="80px">
  <Hds::TooltipButton @text="Top-start" @placement="top-start">
    <FlightIcon @name="info" aria-label="top-start placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Bottom-start" @placement="bottom-start">
    <FlightIcon @name="info" aria-label="bottom-start placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Left-start" @placement="left-start">
    <FlightIcon @name="info" aria-label="left-start placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Right-start" @placement="right-start">
    <FlightIcon @name="info" aria-label="right-start placement" />
  </Hds::TooltipButton>
</Doc::Layout>

<Doc::Layout @spacing="80px">
  <Hds::TooltipButton @text="Top-end" @placement="top-end">
    <FlightIcon @name="info" aria-label="top-end placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Bottom-end" @placement="bottom-end">
    <FlightIcon @name="info" aria-label="bottom-end placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Left-end" @placement="left-end">
    <FlightIcon @name="info" aria-label="left-end placement" />
  </Hds::TooltipButton>
  <Hds::TooltipButton @text="Right-end" @placement="right-end">
    <FlightIcon @name="info" aria-label="right-end placement" />
  </Hds::TooltipButton>
</Doc::Layout>

## Offset

The default and recommended distance between the trigger and the tooltip's pointer or arrow is 4px.

![Default offset of the tooltip](/assets/components/tooltip/tooltip-spacing.png)

!!! Info

 In some cases, an offset may be necessary to adjust the position of the tooltip. The offset should be used sparingly when it's necessary to make sure that the tooltip does not obscure or cover the trigger or important information.
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
