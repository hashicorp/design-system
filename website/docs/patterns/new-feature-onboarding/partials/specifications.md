## Specifications

### Pattern anatomy

- Beacon: required; highlights the new feature and anchors the onboarding experience.
- Rich Tooltip: required; contains contextual onboarding guidance.
- Target feature: required; the product feature introduced by the pattern.
- Tooltip content: required; explains the feature's value or next step.
- Action or link: optional; directs the user to a relevant next step or supporting resource.
- Step indicator: optional; communicates progress in a multi-step flow.

### Acceptable Helios components

- Use Beacon to highlight the new feature.
- Use Rich Tooltip to present structured, supplemental onboarding content.
- Use the Rich Tooltip default Toggle unless a custom trigger is necessary and accessible.
- Use Helios Text components to structure tooltip headings and body content.
- Use Helios Button or Link components for optional actions.
- Use a standard Tooltip rather than a Rich Tooltip when content is simple, text-only supplemental information.

### Rich Tooltip interaction

- Define whether onboarding uses click or soft hover/focus interaction.
- Define initial open-state behavior and associated dismissal expectations.
- Document click-away and Escape-key dismissal behavior.
- Specify focus handling when tooltip content includes interactive elements.

### Rich Tooltip placement

- Define preferred tooltip placement relative to the Beacon and target feature.
- Use collision detection to keep the tooltip visible within the viewport.
- Define placement alternatives for edge-of-viewport and responsive scenarios.
- Maintain a clear visual relationship between the tooltip and its target feature.

### Spacing and layout

- Define spacing between the Beacon, target feature, and Rich Tooltip.
- Preserve adequate target size and separation from adjacent controls.
- Define responsive layout behavior for narrow viewports.
- Prevent overlapping or obscuring important page content.

### States and behavior

- Define initial, open, dismissed, completed, and unavailable states.
- Define Beacon behavior after the tooltip is dismissed or onboarding is completed.
- Define state transitions for multi-step flows.
- Define error and fallback behavior when the target feature is unavailable.