!!! Info

These guidelines are meant to assist teams in designing and building new feature onboarding workflows. Currently there aren't Ember components to support this pattern, but they can be composed using HDS components.

For now, reference our Figma [Patterns](#jory-insert-link) library and implementation in [Terraform/Atlas](#jory-insert-link).

If having a dedicated component would help in your work, please [submit a request](/about/support).
!!!

The new feature onboarding pattern outlines a consistent way to onboard new users or communicate updates to new or existing features. This pattern can exist as a single entity or be part of a multi-step sequence.

## Beacon

A beacon highlights a new or updated feature, or otherwise draws attention to a specific part of the UI. It should be positioned adjacent to or slightly overlapping the UI element it is intended to highlight.

Clicking on a beacon should toggle a [Rich Tooltip](/components/rich-tooltip) containing information about the feature.

![A Beacon attached to a button highlighting a new function to analyze your configuration with an AI agent](/assets/patterns/new-feature-onboarding/new-feature-onboarding-beacon-example.png)

## Rich Tooltip

Use the [Rich Tooltip](/components/rich-tooltip) to convey information about the new feature, support a multi-step flow, or link out to additional documentation, release notes, or a changelogs.

At a minimum, we recommend including text about the feature, but other common elements include:

- Title: to display the name of the feature
- [Badge](/components/badge): to communicate the status of the new feature; e.g., "Alpha", "Beta", "New", "Updated".
- Actions: use one or more [Buttons](/components/button)) to navigate a multi-step onboarding flow.

![Content within a Rich Tooltip explaining the value of the new feature](/assets/patterns/new-feature-onboarding/new-feature-onboarding-auto-configuration-example.png)

## Persistence and display

Highlighting new features is important, but it can be intrusive or disruptive to users' workflows. consider when best to display onboarding-focused components and how they should persist after users interact with them.

!!! Do

- Show the Beacon adjacent to a new feature the first time a user sees it.
- Do provide the user with an escape hatch to dismiss the onboarding tooltip if necessary. This holds true for single-step new feature onboarding, or multi-step onboarding flows.
- Persist the status of whether the user has seen or interacted with the onboarding materials, consider using `localStorage` or persisting the viewed state in user preferences or settings.
!!!

!!! Dont

- Don't display the Beacon or onboarding elements again _after_ a user has interacted with it, or dismissed it.
- Don't open an onboarding RichTooltip by default, this can be intrusive and potentially annoy the user.
!!!

## Multi-step sequences

When onboarding users to more complex features, or when the feature touches multiple parts of the UI, consider breaking the experience into multiple easier-to-digest steps. This can be helpful to highlight the initial entry point of a new or updated feature, and subsequently highlight key aspects of the feature as they relate to a critical user journey (CUJ).

Support navigation in a multi-step onboarding sequence by using a [Button](/components/button) component. Use navigation-oriented language like "Next", "Back", and "Cancel".

In a multi-step sequence, use a beacon to highlight the first step. When a user is ready to move forward, the beacon (and open RichTooltip) should appear at the next step, and so on until all steps are complete or the user has opted out of the rest of the flow. Moving the beacon to each step will draw the user's eye through the flow.

<video width="100%" controls loop>
  <source
    src="/assets/patterns/new-feature-onboarding/multi-step-onboarding-sequence.mp4"
    type="video/mp4"
  />
</video>