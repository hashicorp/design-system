## Usage

### When to use

- In onboarding, account creation, or initial setups that are broken up into multiple steps.
- To communicate what has and has not been completed in a multi-step flow.
- For progress that does not require a user to remain on the current page to complete.

### When not to use

- When the user needs to remain within the step to complete it, use the [Stepper Nav](/components/stepper/nav).
- For simple forms or when progress doesn't need to be tracked, use structured page content.

## Content

The Stepper List includes a title, an optional description, and a generic slot for content.

### Title

Titles provide an overview to help users understand what tasks need to be completed and their purpose within the flow. Titles are required and should be brief.

### Description

Descriptions are optional. They can be used to provide additional brief context. If used, we recommend providing a description for all steps.

!!! Do

Ensure inclusion of descriptions is consistent.

![A stepper with descriptions for all four steps.](/assets/components/stepper/list/stepper-list-description-do.png)

!!!

!!! Dont

Don't mix and match inclusion of descriptions.

![Steps one and four include descriptions, while steps two and three only have titles.](/assets/components/stepper/list/stepper-list-description-dont.png)

!!!

## Progressive disclosure

We recommend showing the contents of only the **in-progress** step while hiding the contents of other steps. This narrows the focus to only the current step and ensures steps are completed in order. However, this isn’t always feasible, and sometimes context from the previous step is needed for the user to complete the next step. Use your best judgment.

!!! Do 

Only show one call to action at a time.

![Stepper with 4 steps. The current active step is step 2 and it has a call to action button in the content for the user to do the action required for the step.](/assets/components/stepper/list/stepper-list-progressive-disclosure.png)

!!!

!!! Dont

Reduce visual noise by focusing which action the user should be taking first.

![Steps 2 and 3 in the Stepper have primary buttons exposed.](/assets/components/stepper/list/stepper-list-progressive-disclosure-dont.png)

!!!

## Using processing status

Set the status as `processing` to provide the user with immediate feedback when data is submitted within a step.

![A Stepper list with two steps. In the first step, the user is pressing a button and the step is in a processing state.](/assets/components/stepper/list/stepper-list-processing-status.png)

If an error occurs, the error should be displayed within the step. The step status should revert to `progress`.

![A Stepper list with two steps. The first step has an errored out form text input with a message explaining how to fix the error.](/assets/components/stepper/list/stepper-list-processing-status-errored.png)