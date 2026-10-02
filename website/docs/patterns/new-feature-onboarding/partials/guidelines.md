- Define new-feature onboarding as a reusable product pattern.
- Describe the relationship between the Beacon and Helios Rich Tooltip.
- Clarify the pattern's scope, intended benefits, and limitations.

Onboard new users and communicate updates to existing features using this pattern, guidelines, and recommended component structure.

!!! Info

We currently do not ship a cohesive set of components focused on onboarding, if this would help in your work please [submit a request](/about/support).
!!!

## Structure

### Beacon

- Describe the Beacon's role in calling attention to a newly available feature.
- Define how the Beacon attaches to the feature it introduces.
- Identify the Beacon states and their relationship to tooltip visibility.
- Establish expectations for Beacon placement relative to the target feature.

### Rich Tooltip

- Describe the Rich Tooltip's role in providing contextual onboarding content.
- Identify acceptable content types and recommended content hierarchy.
- Define the tooltip toggle and its relationship to the Beacon.
- Document placement and collision-detection expectations.

### Composed pattern

- Describe how the Beacon and Rich Tooltip work together as one onboarding experience.
- Define the target feature as the stable visual anchor for the pattern.
- Establish the minimum anatomy required for a complete onboarding instance.
- Identify optional elements, including links and actions.

### Placement and timing

- Recommend attaching the Beacon directly to the feature being introduced.
- Define when the onboarding experience should appear during a user journey.
- Address viewport constraints, scrolling, and collision handling.
- Prevent the pattern from obscuring critical controls or information.

## Persistence and display eligibility

- Define conditions for displaying onboarding to eligible users.
- Recommend persistence after view, interaction, dismissal, or feature use.
- Establish conditions for re-display and limits on repeat exposure.
- Address user, account, workspace, and feature-release state considerations.

## Multi-step flows

- Define when a multi-step flow is appropriate.
- Recommend a clear sequence and progression between steps.
- Keep each step anchored to the feature or context it explains.
- Establish completion, dismissal, skip, and resume behavior.
- Define limits that keep a multi-step flow lightweight and focused.