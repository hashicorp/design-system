The Stepper Indicator indicates the relational step value, helping users maintain context in a multi-step flow or sequence. It should be used in larger stepper item patterns with an appropriate label, description, and design language indicating directionality.

There are two types of indicators: `Step::Indicator` and `Task::Indicator`, which can be used in conjunction, or separately depending on hierarchical needs or requirements.


## How to use the Stepper::Step::Indicator

Although not required, the basic invocation should include `text` and `status` arguments.

```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="incomplete" />
```

### Adding interactivity

The indicator components are generally meant to be assembled into larger stepper item patterns, so the component’s interactive states should be tied to the larger pattern. This includes `hover`, `active`, and `focus`. That said, to add interactivity directly to the Step Indicator, set the `@isInteractive` argument to `true`.

```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="incomplete" @isInteractive={{true}} />
```

### Indicating status

To change the status of the Step Indicator, set the `@status` argument to `incomplete`, `progress`, `processing`, or `complete`.

```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="progress" @isInteractive={{true}} />
<Hds::Stepper::Step::Indicator @text="1" @status="processing" @isInteractive={{true}} />
<Hds::Stepper::Step::Indicator @text="1" @status="complete" @isInteractive={{true}} />
```

## How to use the Stepper::Task::Indicator

Although not required, the basic invocation should include a `status` argument.

```handlebars
<Hds::Stepper::Task::Indicator @status="incomplete" />
```

### Adding interactivity

The indicator components are generally meant to be assembled into larger stepper item patterns, so the component’s interactive states should be tied to the larger pattern. This includes `hover`, `active`, and `focus`. That said, to add interactivity directly to the Task Indicator, set the `@isInteractive` argument to `true`.

```handlebars
<Hds::Stepper::Task::Indicator @status="incomplete" @isInteractive={{true}} />
```

### Indicating status

To change the status of the Task Indicator, set the `@status` argument to `incomplete`, `progress`, `processing`, or `complete`.

```handlebars
<Hds::Stepper::Task::Indicator @status="progress" @isInteractive={{true}} />
<Hds::Stepper::Task::Indicator @status="processing" @isInteractive={{true}} />
<Hds::Stepper::Task::Indicator @status="complete" @isInteractive={{true}} />
```
