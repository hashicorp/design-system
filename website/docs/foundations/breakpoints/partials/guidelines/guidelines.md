Breakpoints are viewport widths where layouts adjust to support responsive experiences on varied screen sizes and devices. These values are used to create utilities and helper components that standardize changes in UI at these widths.

## The ranges

There are five HDS breakpoint values: `sm`, `md`, `lg`, `xl`, and `xxl`.

| Name   | Value        | Application                   |
| ------ | ------------ | ----------------------------- |
| sm     | 480px        | 480 → 767                     |
| md     | 768px        | 768 → 1087                    |
| lg     | 1088px       | 1088 → 1439                   |
| xl     | 1440px       | 1440 → 1919                   |
| xxl    | 1920px       | 1920 and up                   |

The breakpoint name refers to a range of pixel values, not just the starting value. For example, the `sm` breakpoint refers to widths between 480px and 767px. This helps simplify the language around what these ranges mean when designing and increases the flexibility in implementation.

_Note: the range 0-479px is intentionally left without a name. We don't anticipate designers needing to produce mockups for screen sizes below this width and from the audits conducted, Cloud UI has set a standard of 480px for the most narrow design. From a development perspective, in a mobile-first approach the range below 480px can be covered using default styles (overwritten via media queries for subsequent ranges)._

### Custom values

The provided breakpoints serve as a cohesive _starting_ point for design, which is why templates have been provided in our [Patterns library](https://www.figma.com/design/5Pv32j4QiOOD8lkFTD1dxC/HDS-Patterns-v2.0?m=auto&node-id=71-11371&t=OvSfKLEJhHntQQZA-1) for this purpose. However, custom values may be necessary for specific use cases that these breakpoints do not cover. For example, if a team discovers that users with 2500px viewports are using a product, a nuanced approach to the UI at that screen size may be required. In such cases, a custom width value may be used to enhance the user experience.

!!! insight

**Migration tip** 

If a custom value already exists that is relatively close to an established breakpoint, we recommend migrating it to the nearest standard breakpoint. This creates a consistent and predictable experience for the user as they work within (and across) the HashiCorp product suite.
!!!

## Designing with purpose

Not all designs require redesigning at each breakpoint. Only when designs are considered complicated and/or constrained by UI elements should a designer take the time to show how they change as the viewport changes in size.

For example, a UI featuring a table layout may not require changes for each breakpoint because the expected behavior is for the table to maintain its full width regardless of the breakpoint value. A design isn't necessary to elaborate this standard behavior.

![](/assets/foundations/breakpoints/breakpoints-table-example.png)

Redesigning across multiple breakpoints is often necessary for complex UIs, such as a landing page with cards arranged in a grid. As the viewport size decreases, both the position and content of the cards change, requiring nuanced designs across breakpoints. In such scenarios, designers should specify how the layout adjusts at the `sm`, `md`, and `lg` views.

![Diagram depicting "large", "medium", and "small" screen sizes displaying a varying number of columns in rows of content blocks.](/assets/foundations/breakpoints/breakpoints-card-designs-shfting.png)

## Responsiveness in Helios

Responsive behavior is already built into some Helios components. These components include, but are not limited to:
* [App Side Nav](/components/app-side-nav) (width collapses below lg breakpoint)
* [Stepper Nav](/components/stepper/nav) (layout shifts below sm breakpoint)
* [Pagination](/components/pagination) (layout stacks below lg breakpoint)
* [Grid](layouts/grid) (supports `sm`, `md`, `lg`, `xl`, and `xxl` views for defining responsive column widths)
