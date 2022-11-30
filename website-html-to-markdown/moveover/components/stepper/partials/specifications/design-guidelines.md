## When to use

- As a visual decorator to assist in the status and context of a multi-step flow.
- Within a larger stepper or step item pattern paired with a label and description.

## When not to use

- In isolation or not as part of a larger pattern.

---

## Anataomy

### Step indicator

![Step Indicator Anatomy](/assets/components/stepper/stepper-step_indicator-anatomy.png)

#### Text

Required (indicates the step sequence)

#### Status

Required

#### Is Interactive

Optional (defaults to false)

### Task indicator

![Task Indicator Anatomy](/assets/components/stepper/stepper-task_indicator-anatomy.png)

#### Status

Required

#### Is Interactive

Optional (defaults to false)

---

## State

### Step

#### Non-interactive

Incomplete

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="incomplete" />
</section>

Progress

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="progress" />
</section>

Processing

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="processing" />
</section>

Complete

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="complete" />
</section>

#### Interactive

Incomplete

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="incomplete" @isInteractive={{true}} />
</section>

Progress

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="progress" @isInteractive={{true}} />
</section>

Processing

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="processing" @isInteractive={{true}} />
</section>

Complete

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="complete" @isInteractive={{true}} />
</section>

### Task

#### Non interactive

Incomplete

<section>
  <Hds::Stepper::Task::Indicator @status="incomplete" />
</section>

Progress

<section>
  <Hds::Stepper::Task::Indicator @status="progress" />
</section>

Processing

<section>
  <Hds::Stepper::Task::Indicator @status="processing" />
</section>

Complete

<section>
  <Hds::Stepper::Task::Indicator @status="complete" />
</section>

#### Interactive

Incomplete

<section>
  <Hds::Stepper::Task::Indicator @status="incomplete" @isInteractive={{true}} />
</section>

Progress

<section>
  <Hds::Stepper::Task::Indicator @status="progress" @isInteractive={{true}} />
</section>

Processing

<section>
  <Hds::Stepper::Task::Indicator @status="processing" @isInteractive={{true}} />
</section>

Complete

<section>
  <Hds::Stepper::Task::Indicator @status="complete" @isInteractive={{true}} />
</section>

_Banner (informational):_ Note: Since the Stepper Indicator is intended to be part of a larger pattern, it's interactive state should be tied to the larger pattern component.

---

## Status

### Step

#### Non-interactive

Indicates a step that is part of a list of steps that can be complete sequentially, out of order, or asynchronously.

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="incomplete" @isInteractive={{false}} />
  <Hds::Stepper::Step::Indicator @text="1" @status="progress" @isInteractive={{false}} />
  <Hds::Stepper::Step::Indicator @text="1" @status="processing" @isInteractive={{false}} />
  <Hds::Stepper::Step::Indicator @text="1" @status="complete" @isInteractive={{false}} />
</section>

#### Interactive

Indicates a step that is part of a sequential flow and can be interacted with as a navigational device.

<section>
  <Hds::Stepper::Step::Indicator @text="1" @status="incomplete" @isInteractive={{true}} />
  <Hds::Stepper::Step::Indicator @text="1" @status="progress" @isInteractive={{true}} />
  <Hds::Stepper::Step::Indicator @text="1" @status="processing" @isInteractive={{true}} />
  <Hds::Stepper::Step::Indicator @text="1" @status="complete" @isInteractive={{true}} />
</section>

### Task

#### Non-interacctive

Indicates a task that is part of a list of tasks which can be completed sequentially, out of order, or asynchronously.

<section>
  <Hds::Stepper::Task::Indicator @status="incomplete" @isInteractive={{false}} />
  <Hds::Stepper::Task::Indicator @status="progress" @isInteractive={{false}} />
  <Hds::Stepper::Task::Indicator @status="processing" @isInteractive={{false}} />
  <Hds::Stepper::Task::Indicator @status="complete" @isInteractive={{false}} />
</section>

#### Interactive

Indicates a task that is part of a sequential flow and can be interacted with as a navigational device.

<section>
  <Hds::Stepper::Task::Indicator @status="incomplete" @isInteractive={{true}} />
  <Hds::Stepper::Task::Indicator @status="progress" @isInteractive={{true}} />
  <Hds::Stepper::Task::Indicator @status="processing" @isInteractive={{true}} />
  <Hds::Stepper::Task::Indicator @status="complete" @isInteractive={{true}} />
</section>

---

## Content

While the most common example of content within a stepper indicator is numerical (1, 2, 3), other types of sequential ordering may also be used (A, B, C).

_Banner (informational):_ Note: this is only relevant for the Step Indicator, the task indicator does not accept a text property.

---

## Accessibility

There is no specific WCAG Success Criteria applicable for the Stepper Indicator on its own. Since we are only providing the Stepper Indicator and not the entire stepper (at this time), authors are responsible to ensure WCAG conformance is met in any components they build.

However, when assembling the Stepper Indicator into a larger stepper pattern, ensure that all accessibility criteria are met.
