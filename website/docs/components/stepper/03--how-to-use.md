# Stepper Indicator Component - How to use

The stepper indicator is used to indicate the relational step number or value, helping the user maintain context in a multi-step flow or sequence. It should be used in larger stepper item patterns with an appropriate label, description, and visual language indicating directionality.

There are two types of indicators, `step` and `task` which can be used in conjunction, or separately depending on hierarchical needs or requirements.

#### Stepper::Step::Indicator

##### Basic use

```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="incomplete" />
```

Renders to:

##### Adding interactivity

```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="incomplete" @isInteractive={{true}} />
```

Renders to:

##### Indicating status

```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="progress" @isInteractive={{true}} />
```

Renders to:

##### Indicating processing

```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="processing" @isInteractive={{true}} />
```

Renders to:

##### Rendering a complete step

```handlebars
<Hds::Stepper::Step::Indicator @text="1" @status="complete" @isInteractive={{true}} />
```

Renders to:

#### Stepper::Task::Indicator

##### Basic use

```handlebars
<Hds::Stepper::Task::Indicator @status="incomplete" />
```

Renders to:

##### Adding interactivity

```handlebars
<Hds::Stepper::Task::Indicator @status="incomplete" @isInteractive={{true}} />
```

Renders to:

##### Indicating status

```handlebars
<Hds::Stepper::Task::Indicator @status="progress" @isInteractive={{true}} />
```

Renders to:

##### Indicating processing

```handlebars
<Hds::Stepper::Task::Indicator @status="processing" @isInteractive={{true}} />
```

Renders to:

##### Rendering a complete task

```handlebars
<Hds::Stepper::Task::Indicator @status="complete" @isInteractive={{true}} />
```

Renders to: