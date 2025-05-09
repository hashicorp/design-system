## Breakpoints

Breakpoints define specific viewport widths where the layout adjusts to support responsive experiences across screen sizes and devices.

These values are then used to create utilities and helper components to standardize changes of the UI at different viewport sizes.

### The ranges

Helios defines five breakpoints: `sm`, `md`, `lg`, `xl`, and `xxl`.

| Name   | Value        | Application                   |
| ------ | ------------ | ----------------------------- |
| sm     | 480px        | 480 → 767                     |
| md     | 768px        | 768 → 1087                    |
| lg     | 1088px       | 1088 → 1439                   |
| xl     | 1440px       | 1440 → 1919                   |
| xxl    | 1920px       | 1920 and up                   |

The breakpoint name refers to a range of pixel values, not just the starting value. For example, the `sm` breakpoint refers to widths between 480px and 767px. This helps simplify the language around what these ranges mean when designing and increases the flexibility in implementation.

### Working with custom values

The provided breakpoints serve as a cohesive _starting_ point for design. However, custom values may be necessary for specific use cases that these breakpoints do not cover. For example, if a team discovers that users with 2500px viewports are using a product, a nuanced approach to the UI at that screen size may be required. In such cases, an additional value can be added to enhance the user experience.

!!! info

If a custom value already exists that is relatively close to an established breakpoint, it is recommended that it be migrated to the nearest standard breakpoint. This creates a consistent and predictable experience for the user as they work within (and across) the HashiCorp product suite.

!!!

## Designing with purpose

Not all designs require redesigning at each breakpoint. Only when designs are considered complicated and/or constrained by UI elements should a designer take the time to show how they change as the viewport changes in size. 

For example, a UI featuring a table layout may not require changes for each breakpoint because the expected behavior is for the table to maintain its full width regardless of the breakpoint value. A design isn't necessary to elaborate this standard behavior.

![Wireframed table shown expanding in size.](/assets/foundations/breakpoints/breakpoints-table-example.png)

Redesigning across multiple breakpoints is often necessary for complex UIs, such as a landing page with cards arranged in a grid. As the viewport size decreases, both the position and content of the cards change, requiring nuanced designs across breakpoints. In such scenarios, designers should specify how the layout adjusts at the `sm`, `md`, and `lg` views.

![Diagram depicting "large", "medium", and "small" screen sizes displaying a varying number of columns in rows of content blocks.](/assets/foundations/breakpoints/breakpoints-card-designs-shfting.png)
