## Usage

### When to use

- In complex flows that are broken up into multiple steps to more easily segment content.
- To communicate progress in a mult-step flow; what has been completed, and what has yet to be completed.
- For a single, on-page experience that requires completion.

### When not to use 

- Non-complex flow, use the [form pattern](/patterns/form-patterns) on a single page.
- Don't require specific progress tracking, use structured page content.
- For progression that doesn’t require a user to remain on the page for, use the [Stepper List](/components/stepper/list).

## Content

Content in the Stepper should be brief and to the point. The Stepper has a title and an optional description.

### Title

Titles are required and help users understand, from an overview perspective, what tasks need to be completed. Titles should be brief, and only a couple of words.

### Description

Descriptions are optional and should be brief and provide additional context to the title. We recommend that all steps either have a description or none do.

!!! Do

![The stepper with descriptions enabled in every step.](/assets/components/stepper/navigation/stepper-navigation-description-do.png)

!!!

!!! Dont

![Steps one and four with enabled descriptions, while two and three have only a title.](/assets/components/stepper/navigation/stepper-navigation-description-dont.png)

!!!

### Number of steps

It is recommended that the max number of steps be 4, however if that isn’t possible, be mindful of how the content within the title and description wraps in smaller screens.

## Interactive vs non-interactive

The Stepper Nav allows for both interactive (default) and non-interactive variants. Once a user navigates backward with the interactive variant, they cannot progress forward through the Stepper. The Non-interactive variant is for read-only purposes and does not allow backwards navigation within the Stepper.

![Subtitle "Interactive" followed by an interactive variant of the Stepper Nav. Another subtitle "Non-interactive" followed by a non-interactive variant of the Stepper Nav.](/assets/components/stepper/navigation/stepper-navigation-interactive-non-interactive.png)

The interactive variant allows for backward movement after a step has been completed.

![The user's mouse is hovering over step one, showing its hover state.](/assets/components/stepper/navigation/stepper-navigation-interactive-backwards-movement.png)

## Spacing

To account for the absolutely positioned indicator within each Step, it is recommended to provide a 32px padding on the top of the Stepper and 24px below. 

![](/assets/components/stepper/navigation/stepper-navigation-spacing-example.png)

## Mirroring experiences

A [Button Set](/components/button-set) should always be present alongside a Stepper. Ensure that navigation between the Stepper and the Button Set matches. If a user can navigate backward within the Button Set, use the interactive variant. Otherwise, use the non-interactive variant. It is recommended that the Stepper’s width matches the width of the page’s content.

![](/assets/components/stepper/navigation/stepper-navigation-matching-experiences.png)