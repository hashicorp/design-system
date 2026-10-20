Visual differences exist between the Helios design language and the IBM/Carbon design language. We have tried to capture the most prominent ones.

## Foundations

### Border

HDS uses softer corners, whereas Carbon features minimal rounded corners.

![](/assets/carbonization/designers/border-radius.png)

### Interactive states

HDS distinguishes hover and active states across all components, while Carbon may mimic focus states or omit certain variations. HDS maps missing states to the closest available option.

![](/assets/carbonization/designers/interactive-states-no-hover.png)

HDS uses two borders (a 1px inner border and a 3px outer outline) for the focus state, while Carbon uses a single 2px inner border.

![](/assets/carbonization/designers/interactive-states-focus.png)

### Layering

HDS relies on box-shadows for depth, while Carbon leans into flat design with minimal shadows and a specific [layering model](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview#layering-model).

![](/assets/carbonization/designers/elevation.png)

## Components

### Buttons

To address Carbon's higher-contrast secondary button variant, HDS introduced a `secondary-muted` variant to preserve existing UI hierarchy for non-primary actions.

![](/assets/carbonization/designers/secondary-button.png)

### Badge and tag

HDS separates non-interactive metadata (Badge) from interactive elements (Tag), whereas Carbon offers a single Tag component for both use cases.

There are several overlaps between the two systems:

![](/assets/carbonization/designers/badge-tag.png)

However, some HDS variants are not supported or available in Carbon. We have retained those variants in `cds` modes and aligned them to the closest Carbon foundations.

![](/assets/carbonization/designers/badge-tag-hds-only.png)
