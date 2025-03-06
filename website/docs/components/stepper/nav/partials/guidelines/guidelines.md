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

A user can navigate backwards within the Stepper Nav steps but cannot navigate forwards unless they have completed the current step. This creates consistency for step flow behavior and the order of operations.

![](/assets/components/stepper/nav/stepper-nav-interactive-steps.png)

![The user's mouse is hovering over step one of four, showing its hover state.](/assets/components/stepper/nav/stepper-nav-interactive-backwards-movement.png)

### Non-interactive steps

The non-interactive variant is for read-only purposes and does not allow backwards navigation.

![](/assets/components/stepper/nav/stepper-nav-non-interactive-steps.png)

## Content

The Stepper Nav supports a title and an optional description. Content should be limited to only what is necessary, and long form content should live within the body of the Step.

### Title

Titles provide an overview to help users understand what tasks need to be completed. Titles are required and should be brief.

### Description

Descriptions provide additional context about the step and are optional. We recommend that all steps either have a description or do not.

!!! Do

Use descriptions consistently.

![The stepper with descriptions included in every step.](/assets/components/stepper/nav/stepper-nav-description-do.png)

!!!

!!! Dont

Don't mix and match inclusion of descriptions.

![Stepper where steps one and four include descriptions, while steps two and three have only a title.](/assets/components/stepper/nav/stepper-nav-description-dont.png)

!!!

### Number of steps

We recommended the maximum number of steps be 4. If that isn’t possible, be mindful of how the content within the title and description will wrap on smaller screens.

## Spacing

There should be 32px of spacing above the Stepper Nav and 24px below.

![](/assets/components/stepper/nav/stepper-nav-spacing-example.png)

## Resizing behavior

Each step scales evenly to fit within the total width of the Stepper Nav. This ensures consistent touch target sizes for hover, active, and focus states. The total width of the Stepper Nav should match the page content width.

### Responsive layout

At browser widths of 550px and below the steps will stack vertically and not display a connecting progress bar.

![On small screens, the steps in a Stepper Nav switch from horizontal orientation to vertical.](/assets/components/stepper/nav/stepper-nav-responsive-behavior.png)

## Composition with other components

Always pair a Stepper Nav with a [Button Set](/components/button-set). Navigation interactions between the Stepper Nav and the Button Set should always match. 

If a user can navigate backward within the Button Set, use the interactive Stepper Nav. Otherwise, use the non-interactive variant.

![](/assets/components/stepper/nav/stepper-nav-matching-experiences.png)