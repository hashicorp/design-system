## Usage

### When to use

- In onboarding, account creation or initial setups that are broken up into multiple steps to more easily segment content.
- To communicate what has and has not been completed in a multi-step flow.
- For progress that does not require a user to remain on a single page to complete.

### When not to use

- When the user needs to remain within the step to complete it, use the [Stepper Nav](/components/stepper/nav).
- For simple forms or when progress doesn't need to be tracked, use structured page content.

## Content

The Stepper List has a title, an optional description, and a generic slot for content.

### Title

Titles provide an overview to help users understand what tasks need to be completed and their purpose within the flow. Titles are required and should be brief.

### Description

Descriptions are optional. They should provide additional context but be brief. We recommend that all steps either have a description or do not.

!!! Do

Ensure description visibility is consistent.

![The stepper with descriptions enabled in every step.](/assets/components/stepper/list/stepper-list-description-do.png)

!!!

!!! Dont

Don't mix and match description visibility.

![Steps one and four with enabled descriptions, while two and three have only a title.](/assets/components/stepper/list/stepper-list-description-dont.png)

!!!

## Progressive disclosure

We recommend showing only the contents of the **in-progress** step. This narrows the focus to the specific step and ensures steps are completed in order. However, this isn’t always possible, and sometimes context from the previous step allows the user to complete the next step. Use your best judgment.

![All steps only showing a title and description other than step 2. Step 2 shows a title, description and a button.](/assets/components/stepper/list/stepper-list-progressive-disclosure.png)

## Using processing status

If data can be submitted within a step, showing the status as `processing` provides the user with immediate feedback.

![A Stepper list with two steps. The first step the user is pressing a button, and the status of the first step is in a processing state.](/assets/components/stepper/list/stepper-list-processing-status.png)

If an error occurs, that error should be displayed within the step. The steps status will revert to `progress`.

![A Stepper list with two steps. The first step has an errored out form text input with a message explaining how to fix the error.](/assets/components/stepper/list/stepper-list-processing-status-errored.png)