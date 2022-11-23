---
title: Stepper Indicator
category: components
component: stepper
section: component-api
---

**Note:** Since the `indicator` components are meant to be assembled into larger stepper item patterns, the component's interactive states should be tied to the larger pattern. This includes `hover`, `active`, and `focus`.

#### Stepper::Step::Indicator

Here is the API for the `Step::Indicator` component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `status` | enum | `incomplete` `progress` `processing` `complete` |  |
| `isInteractive` | boolean |  | By default the `Indicator::Step` is not interactive and has no hover state. Usage for this variant is generally recommended for onboarding-type sequences or list-item steps. |
| `text` | string |  | Generally corresponds with the numerical value of the index of the item in an array of multiple steps. |

#### Stepper::Task::Indicator

Here is the API for the `Task::Indicator` component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `status` | enum | `incomplete` `progress` `processing` `complete` |  |
| `isInteractive` | boolean |  |  |