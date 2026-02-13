The Stepper Indicator indicates the relational step value, helping users maintain context in a multi-step flow or sequence. It should be used in larger stepper item patterns with an appropriate label, description, and design language indicating directionality.

There are two types of indicators: `Step::Indicator` and `Task::Indicator`, which can be used in conjunction, or separately depending on hierarchical needs or requirements.


## How to use the Stepper::Step::Indicator

Although not required, the basic invocation should include `text` and `status` arguments.

[[code-snippets/stepper-step-indicator-basic]]

### Adding interactivity

The indicator components are generally meant to be assembled into larger stepper item patterns, so the component’s interactive states should be tied to the larger pattern. This includes `hover`, `active`, and `focus`. That said, to add interactivity directly to the Step Indicator, set the `@isInteractive` argument to `true`.

[[code-snippets/stepper-step-indicator-interactive]]

### Indicating status

To change the status of the Step Indicator, set the `@status` argument to `incomplete`, `progress`, `processing`, or `complete`.

[[code-snippets/stepper-step-indicator-status]]

## How to use the Stepper::Task::Indicator

Although not required, the basic invocation should include a `status` argument.

[[code-snippets/stepper-task-indicator-basic]]

### Adding interactivity

The indicator components are generally meant to be assembled into larger stepper item patterns, so the component’s interactive states should be tied to the larger pattern. This includes `hover`, `active`, and `focus`. That said, to add interactivity directly to the Task Indicator, set the `@isInteractive` argument to `true`.

[[code-snippets/stepper-task-indicator-interactive]]

### Indicating status

To change the status of the Task Indicator, set the `@status` argument to `incomplete`, `progress`, `processing`, or `complete`.

[[code-snippets/stepper-task-indicator-status]]
