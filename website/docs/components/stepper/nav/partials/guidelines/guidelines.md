## Usage

### When to use

- In complex flows that are broken up into multiple steps to more easily segment content.
- To communicate what has and has not been completed in a multi-step flow.
- For a single, on-page experience that requires completion.

### When not to use 

- For non-complex flows, use the [form pattern](/patterns/form-patterns) on a single page.
- For simple forms or when progress doesn't need to be tracked, use structured page content.
- For progression that doesn’t require a user to remain on the page for, use the [Stepper List](/components/stepper/list).

## Interactive vs non-interactive

The Stepper Nav supports both interactive (default) and non-interactive variants. 

### Interactive steps

A user is able to navigate backwards within the Stepper Nav, however, they cannot navigate forward unless they have completed the current step. This creates consistency for step flow behavior and order of operations.

![](/assets/components/stepper/navigation/stepper-navigation-interactive-steps.png)

![The user's mouse is hovering over step one of four, showing its hover state.](/assets/components/stepper/navigation/stepper-navigation-interactive-backwards-movement.png)

### Non-interactive steps

The non-interactive variant is for read-only purposes and does not allow backwards navigation.

![](/assets/components/stepper/navigation/stepper-navigation-non-interactive-steps.png)

## Content

The Stepper Nav supports a title and an optional description. Content should be limited to only what is necessary, and long form content should live within the body of the page.

### Title

Titles provide an overview to help users understand what tasks need to be completed. Titles are required and should be brief.

### Description

Descriptions provide additional context about the step and are optional. We recommend that all steps either have a description or do not.

!!! Do

Implement consistent description visibility.

![The stepper with descriptions enabled in every step.](/assets/components/stepper/navigation/stepper-navigation-description-do.png)

!!!

!!! Dont

Don't mix and match description visibility.

![Steps one and four with enabled descriptions, while two and three have only a title.](/assets/components/stepper/navigation/stepper-navigation-description-dont.png)

!!!

### Number of steps

We recommended the maximum number of steps be 4. If that isn’t possible, be mindful of how the content within the title and description will wrap on smaller screens.

## Spacing

There should be 32px of padding above the Stepper Nav and 24px below.

![](/assets/components/stepper/navigation/stepper-navigation-spacing-example.png)

## Resizing behavior

Each Step will scale evenly within the Stepper Nav's width. This creates consistency in the sizes of touch targets for hover, active and focus states, especially in larger screens. The total width of the Stepper Nav should match the content of the page.

### Responsive wrapping

Starting at 550px browser width, the Steps within the Stepper Nav will begin to wrap and the progress bar will be removed.

![The Stepper Nav is stacked vertically](/assets/components/stepper/navigation/stepper-navigation-responsive-behavior.png)

## Composition with other components

Always pair a Stepper Nav with a [Button Set](/components/button-set). Navigation interactions between the Stepper Nav and the Button Set should always match. 

If a user can navigate backward within the Button Set, use the interactive variant. Otherwise, use the non-interactive variant.

![](/assets/components/stepper/navigation/stepper-navigation-matching-experiences.png)