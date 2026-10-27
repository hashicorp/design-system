Visual differences exist between the Helios design language and the IBM/Carbon design language. We have tried to capture the most prominent ones.

## Borders

HDS uses softer corners, whereas Carbon features minimal rounded corners.

![Comparison of border radius styles for Primary Button, Secondary Button, and Text Input across hds, cds-0, and cds-100 modes](/assets/carbonization/designers/border-radius.png)

## Interactive states

HDS distinguishes hover and active states across all components, while Carbon may mimic focus states or omit certain variations. HDS maps missing states to the closest available option.

![Comparison and gaps of interactive states for the Text Input across hds, cds-0, and cds-100 modes](/assets/carbonization/designers/interactive-states-no-hover.png)

HDS uses two borders (a 1px inner border and a 3px outer outline) for the focus state, while Carbon uses a single 2px inner border.

![Comparison of focus states for the Text Input across hds, cds-0, and cds-100 modes](/assets/carbonization/designers/interactive-states-focus.png)

## Layering

HDS relies on box-shadows for depth, while Carbon leans into flat design with minimal shadows and a specific [layering model](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview#layering-model).

![Comparing elevation specifications across hds, cds-0, and cds-100 modes for the Dropdown and Button components](/assets/carbonization/designers/elevation.png)
