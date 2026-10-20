There are several distinct visual differences between the Helios design language and the IBM/Carbon design language. We have tried to capture most of these below.

## Foundations

### Border radius

When it comes to border radiuses, HDS uses softer corners across our components, while in CDS there are minimal rounded corners.

![](/assets/carbonization/designers/border-radius.png)

### Interactive states

#### Gaps in states

There are several components in Carbon that do not differentiate hover or active states or the active states mimic the focus state. We distinguish these states across all HDS components, so if there are gaps, we're aligning to the closest best option, depending on the missing state.

![](/assets/carbonization/designers/interactive-states-no-hover.png)

#### Focus

The visual design for the focus state in HDS is to have 2 borders, an inside border and an outer border (or outline). In Carbon, they generally have one 2px inside border.

![](/assets/carbonization/designers/interactive-states-focus.png)

### Elevation

Each component in HDS that sits above the main page has a visible elevation using box-shadows. In CDS, they lean more into flat design using very minimal shadows.

![](/assets/carbonization/designers/elevation.png)

## Components

### Buttons

#### Secondary buttons

Carbon's secondary button variant has much more prominence than the HDS secondary button. Across our applications, HDS secondary buttons are used repeatedly for most non-primary action. Given Carbon's version has more contrast, we've opted to introduce a new variant of the Button in HDS called `seconary-muted`, which in HDS is a duplicate of `secondary`, but in cds modes, is a more subtle option to use where needed. Teams will likely want to migrate to the new variant to keep consistent hierarchy with the current UI.

![](/assets/carbonization/designers/secondary-button.png)

### Badge and Tag

In HDS, we differentiate between `Badge` and `Tag` where badges are used for non-interactive metadata and tags can be used when interaction is needed, such as in a list of filters. In Carbon, they only offer a `Tag` which can be both static and interactive. 

The following are where the overlap exists between the two systems:

![](/assets/carbonization/designers/badge-tag.png)

There are gaps across both HDS and Carbon that are not supported. That said, we will be retaining the variants that we offer that Carbon does not and will not be implementing the variants that Carbon offers that HDS does not support.

![](/assets/carbonization/designers/badge-hds-only.png)

![](/assets/carbonization/designers/tag-hds-only.png)
