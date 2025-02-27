## Usage

### When to use

- In complex flows that are broken up into multiple steps to more easily segment content.
- To communicate progress in a mult-step flow; what has been completed, and what has yet to be completed.
- For progress that does not require a user to remain on a single page to complete.

### When not to use 

- For page level, linear progress that requires a user to remain on the page for, use the [Stepper Navigation](/components/stepper/navigation).
- Don't require specific progress tracking, use structured page content.


## Content

The Stepper has a title, an optional description and a generic slot for content.

### Title

Titles are required and help users understand, from an overview perspective, what tasks need to be completed. Titles should be brief, and only a couple of words.

### Description

Descriptions are optional and should be brief and provide additional context to the title. We recommend that all steps either have a description or none do.

!!! Do

![The stepper with descriptions enabled in every step.](/assets/components/stepper/list/stepper-list-description-do.png)

!!!

!!! Dont

![Steps one and four with enabled descriptions, while two and three have only a title.](/assets/components/stepper/list/stepper-list-description-dont.png)

!!!

## Progressive disclosure

We recommend that the contents of the in-progress step be displayed at a time. This narrows the focus on the specific task at hand and ensures that they are completed in the specified order. However, this isn’t always possible and sometimes context from the previous step allows the user to complete the next step.

![All steps only showing a title and description other than step 2. Step 2 shows a title, description and a button.](/assets/components/stepper/list/stepper-list-progressive-disclosure.png)

## Using processing status

If a Step’s contents have submission capabilities, a processing status can help the user understand that their data is in the process of being submitted.

![A Stepper list with two steps. The first step the user is pressing a button, and the status of the first step is in a processing state.](/assets/components/stepper/list/stepper-list-processing-status.png)

If an error occurs, that error should be displayed within the Step, and the status of the Step will revert back to “progress.”