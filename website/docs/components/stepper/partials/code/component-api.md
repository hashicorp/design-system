## Component API

We provide two separate but related `Stepper Indicator` components that serve different hierarchical purposes:

1.  `Stepper::Step::Indicator`: used for step-based flows containing multiple steps a user must complete sequentially.
2.  `Stepper::Task::Indicator`: used either on its own to denote smaller task-oriented flows or combined with the `Step` indicator to list multiple tasks within a step.

### Stepper::Step::Indicator

<Doc::ComponentApi as |C|>
  <C.Property @name="status" @type="enum" @values={{array "incomplete" "progress" "processing" "complete" }} @default="incomplete">
    Sets the status of `Step::Indicator`.
  </C.Property>
  <C.Property @name="isInteractive" @type="boolean" @default="false">
    Sets interactivity of `Step::Indicator`.
  </C.Property>
  <C.Property @name="text" @type="string">
    Corresponds with the numerical value of the item’s index in an array of multiple steps.
  </C.Property>
</Doc::ComponentApi>

### Stepper::Task::Indicator

<Doc::ComponentApi as |C|>
  <C.Property @name="status" @type="enum" @values={{array "incomplete" "progress" "processing" "complete" }} @default="incomplete">
    Sets the status of `Task::Indicator`.
  </C.Property>
  <C.Property @name="isInteractive" @type="boolean" @default="false">
    Sets interactivity of `Task::Indicator`.
  </C.Property>
</Doc::ComponentApi>