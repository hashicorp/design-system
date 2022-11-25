---
title: Stepper Indicator
category: components
component: stepper
section: component-api
---

Note: Since the `indicator` components are meant to be assembled into larger stepper item patterns, the component's interactive states should be tied to the larger pattern. This includes `hover`, `active`, and `focus`.

#### Stepper::Step::Indicator

Here is the API for the `Step::Indicator` component:

<Doc::ComponentApi as |C|><C.Property @name="status" @type="enum" @value="incomplete progress processing complete" @default="incomplete">–</C.Property><C.Property @name="isInteractive" @type="boolean" @value="–">By default the `Indicator::Step` is not interactive and has no hover state. Usage for this variant is generally recommended for onboarding-type sequences or list-item steps.</C.Property><C.Property @name="text" @type="string" @value="–">Generally corresponds with the numerical value of the index of the item in an array of multiple steps.</C.Property></Doc::ComponentApi>

#### Stepper::Task::Indicator

Here is the API for the `Task::Indicator` component:

<Doc::ComponentApi as |C|><C.Property @name="status" @type="enum" @value="incomplete progress processing complete" @default="incomplete">–</C.Property><C.Property @name="isInteractive" @type="boolean" @value="–">–</C.Property></Doc::ComponentApi>