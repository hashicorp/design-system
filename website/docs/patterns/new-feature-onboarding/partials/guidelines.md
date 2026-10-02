- Define new-feature onboarding as a reusable product pattern.
- Describe the relationship between the Beacon and Helios Rich Tooltip.
- Clarify the pattern's scope, intended benefits, and limitations.

Onboard new users and communicate updates to existing features using this pattern, guidelines, and recommended component structure.

!!! Info

We currently do not ship a cohesive set of components supporting onboarding, only guidelines and recommendations for how to compose HDS components together. If this would help in your work please [submit a request](/about/support).

For now, reference our Figma [Patterns](#jory-insert-link) library and implementation in [Terraform/Atlas](#jory-insert-link).
!!!

## Structure

### Beacon

Use a Beacon element to highlight a new or updated feature, or otherwise draw attention to a specific part of the UI. Position the Beacon adjacent to or subtlely overlapping the UI element it is intended to highlight.

The Beacon is used as an interactive element to toggle open a [Rich Tooltip](/components/rich-tooltip) containing information about the feature.

![A Beacon attached to a button highlighting a new function to analyze your configuration with an AI agent](#)

### Rich Tooltip

Use the [Rich Tooltip](/components/rich-tooltip) to convey information about the new feature, support a multi-step flow, link out to additional documentation, release notes, or a changelog.

When toggled open, the onboarding Rich Tooltip should be positioned adjacent (either top, bottom, left, or right) to the Beacon with a gap of 4px.

At a minimum we recommend including text about the feature, but other common elements include:

- title: displaying the name of the feature
- [Badge](/components/badge): communicating the status of the new feature and adding visual interest.
- actions (generally using one or more [Buttons](/components/button)) to navigate a multi-step onboarding flow.

## Persistence and display eligibility

Highlighting new features to a user is important, but also runs the risk of being intrusive or interrupting a workflow. Consider when to display onboarding-focused components and how they should be persisted after a user has interacted with them.

!!! Do

Show the Beacon adjacent to a new feature the first time a user sees it.
!!!

!!! Dont

Display the Beacon or onboarding elements again _after_ a user has interacted with it, or dismissed it.
!!!

!!! Do

Do provide the user with an escape hatch to dismiss the onboarding tooltip if necessary. This holds true for single-step new feature onboarding, or multi-step onbaording flows.
!!!

!!! Dont

Don't open an onboarding RichTooltip by default, this can be intrusive and potentially annoy the user.
!!!

!!! Do

Persist the status of whether the user has see or interacted with the onboarding materials, consider using `localStorage` or persisting the viewed state in user preferences or settings.
!!!

## Multi-step sequences

When onboarding users on to more complex features, or when the feature touches multiple parts of the UI, consider breaking the onboarding experience into multiple smaller, easier-to-digest sequential steps. This be helpful to highlight the initial entry point of a new or updated feature, and subsequently highlight key aspects of the feature as they relate to a critical user journey (CUJ).

Support navigation-oriented actions in a multi-step onboarding sequence by using the HDS [Button](/components/button) component. Use straightforward language like "Next", "Back", and "Cancel" for these actions as they are short and easily recognizable as navigation-oriented.

![An example of actions within the onboarding Rich Tooltip](/#jory-insert-image)

With a multi-step onboarding sequence, highlight the first step in the sequence with a Beacon, then continue using the Beacon paired with the Rich Tooltip for each subsquent step to help draw the users eye through the flow.

<!-- Jory insert a video prototype of some sort here -->