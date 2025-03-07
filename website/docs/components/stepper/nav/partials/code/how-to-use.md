## How to use this component

The Stepper Nav component is used to track the linear progress of a user in a given on-page flow.

To use this component, you can either pass in the contextual Step and Panel components, or use the `@steps` argument to pass in an array of steps.

### Using contextual components

The `Hds::Stepper::Nav::Step` and `Hds::Stepper::Nav::Panel` are yielded as contextual components. The number of steps and panels added must be equal.

```handlebars
<Hds::Stepper::Nav as |S|>
  <S.Step>
    <:title>Step 1</:title>
  </S.Step>
  <S.Step>
    <:title>Step 2</:title>
  </S.Step>
  <S.Step>
    <:title>Step 3</:title>
  </S.Step>

  <S.Panel>Content 1</S.Panel>
  <S.Panel>Content 2</S.Panel>
  <S.Panel>Content 3</S.Panel>
</Hds::Stepper::Nav>
```

### Using the @steps argument

When using the `@steps` argument, use the named block `<:body>` to pass in step content.

```handlebars
<Hds::Stepper::Nav
  @steps={{array
    (hash title="Step 1")
    (hash title="Step 2")
    (hash title="Step 3")
  }}
>
  <:body>
    {{#if (eq this.currentStep 0)}}
      Content 1
    {{else if (eq this.currentStep 1)}}
      Content 2
    {{else}}
      Content 3
    {{/if}}
  </:body>
</Hds::Stepper::Nav>
```

### Step state

The state of steps is controlled automatically through the `@currentStep` argument. The argument is base-indexed and sets the active step to the value provided. The status of a step is determined in the following ways in relation to the `@currentStep`.
- A step equal to `@currentStep` is active
- All steps less than `@currentStep` are completed
- All steps greater than `@currentStep` are incomplete

By default, `@currentStep` is equal to 0.

```handlebars
<Hds::Stepper::Nav @currentStep={{1}} as |S|>
  <S.Step>
    <:title>Step 1</:title>
  </S.Step>
  <S.Step>
    <:title>Step 2</:title>
  </S.Step>
  <S.Step>
    <:title>Step 3</:title>
  </S.Step>

  <S.Panel>Content 1</S.Panel>
  <S.Panel>Content 2</S.Panel>
  <S.Panel>Content 3</S.Panel>
</Hds::Stepper::Nav>
```

### Interactivity

The `@isInteractive` argument is used to control if navigation between steps is allowed using the steps. If `true`, users can navigate to completed steps by clicking on the Step. Users can only navigate to completed steps, not incomplete ones.

When a click on a step occurs, the `@onStepChange` handler can be used to pass a custom function to update the current step number.

```handlebars
<Hds::Stepper::Nav
  @currentStep={{this.demoCurrentStep}}
  @isInteractive={{true}}
  @onStepChange={{this.demoOnStepChange}}
  as |S|
>
  <S.Step>
    <:title>Step 1</:title>
  </S.Step>
  <S.Step>
    <:title>Step 2</:title>
  </S.Step>
  <S.Step>
    <:title>Step 3</:title>
  </S.Step>

  <S.Panel>Content 1</S.Panel>
  <S.Panel>Content 2</S.Panel>
  <S.Panel>Content 3</S.Panel>
</Hds::Stepper::Nav>
```
