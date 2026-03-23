## How to use this component

The Stepper Nav component is used to track the linear progress of a user in a given on-page flow.

To use this component, you can either pass in the contextual Step and Panel components, or use the `@steps` argument to pass in an array of steps.

### Using contextual components

The `Hds::Stepper::Nav::Step` and `Hds::Stepper::Nav::Panel` are yielded as contextual components.

[[code-snippets/stepper-nav-contextual-components]]

### Using the @steps argument

When using the `@steps` argument, use the named block `<:body>` to pass in step content. This can be used if the template for steps content is consistent across steps, or conditionally rendered based on arguments other than the `currentStep`.

[[code-snippets/stepper-nav-steps-arg]]

### Step status

The status of steps is controlled automatically through the `@currentStep` argument. The argument is zero-indexed and sets the active step to the value provided. The status of a step is determined in the following ways in relation to the `@currentStep`.
- A step equal to `@currentStep` is active
- All steps less than `@currentStep` are completed
- All steps greater than `@currentStep` are incomplete

By default, `@currentStep` is equal to 0.

[[code-snippets/stepper-nav-step-status]]

### Interactivity

The `@isInteractive` argument controls if navigation between steps is allowed using the steps. By default `@isInteractive` is `true`.

#### Interactive

When `@isInteractive` is set to `true`, users can navigate to completed steps by clicking on the step. Users can only navigate to completed steps, not incomplete ones.

When a click on a step occurs, the `@onStepChange` handler can be used to pass a custom function to update the current step number.

[[code-snippets/stepper-nav-interactive]]

#### Not interactive

When `@isInteractive` is set to `false`, the component steps do not allow navigation between steps.

[[code-snippets/stepper-nav-not-interactive]]

### Without panels

!!! Warning

**Accessibility alert**

Due to accessibility implications, `@isInteractive` must be set to `false` when using the component without panels.
!!!

The component can be used without the `[S].Panel` contextual component, or `<:body>` named block. In this use case, the component operates similar to a static list. This can be used if the content of the steps is outside of the component.

[[code-snippets/stepper-nav-no-panels]]

## Composition with other components

The Stepper Nav should be paired with appropriate navigation [Buttons](/components/button). Buttons can be wrapped with a [Button Set](/components/button-set) to ensure consistent spacing between them.

[[code-snippets/stepper-nav-composition]]
