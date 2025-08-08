## Usage

### When to use

- In complex flows that are broken up into multiple steps.
- To communicate what has and has not been completed in a multi-step flow.
- For a single page multi-step flow that requires completion.

### When not to use

- For simple flows, use the [form pattern](/patterns/form-patterns) on a single page.
- For simple forms or when progress doesn't need to be tracked, use structured page content.
- For a progression of tasks that doesn’t require a user to remain on the same page, use the [Stepper List](/components/stepper/list).

## Interactive vs non-interactive

The Stepper Nav supports both interactive (default) and non-interactive variants.

### Interactive steps

Users can navigate backwards within the Stepper Nav steps but cannot navigate forwards unless they have completed the current step. This creates consistency for step flow behavior and the order of operations.

![](/assets/components/stepper/nav/stepper-nav-interactive-steps.png)

![The user's mouse is hovering over step one of four, showing its hover state.](/assets/components/stepper/nav/stepper-nav-interactive-backwards-movement.png)

### Non-interactive steps

The non-interactive variant is for read-only purposes and does not allow backwards navigation.

![](/assets/components/stepper/nav/stepper-nav-non-interactive-steps.png)

## Spacing

There should be 32px of spacing above the Stepper Nav and 24px below.

![](/assets/components/stepper/nav/stepper-nav-spacing-example.png)

## Resizing behavior

Each step scales evenly to fit within the total width of the Stepper Nav. This ensures consistent touch target sizes for hover, active, and focus states. The total width of the Stepper Nav should match the page content width.

### Responsive layout

At browser widths of 550px and below, the steps will stack vertically and not display a connecting progress bar.

![On small screens, the steps in a Stepper Nav switch from horizontal orientation to vertical.](/assets/components/stepper/nav/stepper-nav-responsive-behavior.png)

## Composition with other components

Always pair the Stepper Nav with appropriate navigation [Buttons](/components/button) such as "Next" and "Previous". Buttons can be wrapped with a [Button Set](/components/button-set) to ensure consistent spacing between them.

If backwards navigation is allowed, use an interactive Stepper Nav, otherwise use the non-interactive variant.

![](/assets/components/stepper/nav/stepper-nav-matching-experiences.png)