!!! Info

We currently do not ship a cohesive set of components supporting onboarding, only guidelines and recommendations for how to compose HDS components together. If this would help in your work please [submit a request](/about/support).

For now, reference our Figma [Patterns](#jory-insert-link) library and implementation in [Terraform/Atlas](#jory-insert-link).
!!!

Onboard new users and communicate updates to existing features using this pattern, recommended components, and structure.

## Beacon

Use a Beacon element to highlight a new or updated feature, or otherwise draw attention to a specific part of the UI. Position the Beacon adjacent to or subtly overlapping the UI element it is intended to highlight.

The Beacon is used as an interactive element to toggle open a [Rich Tooltip](/components/rich-tooltip) containing information about the feature.

![A Beacon attached to a button highlighting a new function to analyze your configuration with an AI agent](/assets/patterns/new-feature-onboarding/new-feature-onboarding-beacon-example.png)

## Rich Tooltip

Use the [Rich Tooltip](/components/rich-tooltip) to convey information about the new feature, support a multi-step flow, link out to additional documentation, release notes, or a changelog.

When toggled open, the onboarding Rich Tooltip should be positioned adjacent (either top, bottom, left, or right) to the Beacon with a gap of 4px.

At a minimum, we recommend including text about the feature, but other common elements include:

- title: to display the name of the feature
- [Badge](/components/badge): to communicate the status of the new feature and add visual interest.
- actions: use one or more [Buttons](/components/button)) to navigate a multi-step onboarding flow.

![Content within a Rich Tooltip explaining the value of the new feature](/assets/patterns/new-feature-onboarding/new-feature-onboarding-auto-configuration-example.png)

## Persistence and display

Highlighting new features to a user is important, but can risk being intrusive or interrupting a workflow. Consider when to display onboarding-focused components and how they should be persisted after a user has interacted with them.

!!! Do

- Show the Beacon adjacent to a new feature the first time a user sees it.
- Do provide the user with an escape hatch to dismiss the onboarding tooltip if necessary. This holds true for single-step new feature onboarding, or multi-step onboarding flows.
- Persist the status of whether the user has seen or interacted with the onboarding materials, consider using `localStorage` or persisting the viewed state in user preferences or settings.
!!!

!!! Dont

- Display the Beacon or onboarding elements again _after_ a user has interacted with it, or dismissed it.
- Don't open an onboarding RichTooltip by default, this can be intrusive and potentially annoy the user.
!!!

## Multi-step sequences

When onboarding users to more complex features, or when the feature touches multiple parts of the UI, consider breaking the onboarding experience into multiple smaller, easier-to-digest sequential steps. This can be helpful to highlight the initial entry point of a new or updated feature, and subsequently highlight key aspects of the feature as they relate to a critical user journey (CUJ).

Support navigation-oriented actions in a multi-step onboarding sequence by using the HDS [Button](/components/button) component. Use short, navigation-oriented language like "Next", "Back", and "Cancel" for these actions.

In a multi-step onboarding sequence, highlight the first step in the sequence using a Beacon, then continue using the Beacon paired with a Rich Tooltip for each subsequent step to draw the user's eye through the flow.