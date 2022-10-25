# Stepper Indicator Component - Overview

A stepper indicator helps the user maintain context and directionality when advancing through a multi-step flow or feature, and in certain circumstances, could act as a navigational device between steps. It is generally assembled as part of a larger stepper pattern.

For practical accessibility purposes, consider a stepper (the whole component) to be a list of items, with each step being a list item.

As of this writing the HDS team publishes two separate (but related) `Stepper Indicator` components that serve different hierarchical purposes.

1.  The `Stepper::Step::Indicator` component: used in higher-order step-based flows that contain multiple steps that a user must complete sequentially.
2.  The `Stepper::Task::Indicator` component: used either on its own to denote smaller task-oriented flows or in combination with the `Step` indicator to list multiple tasks within a step.