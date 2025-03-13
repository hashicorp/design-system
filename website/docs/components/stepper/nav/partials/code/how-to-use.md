## How to use this component

The Stepper Nav component is used to track the linear progress of a user in a given on-page flow.

To use this component, you can either pass in the contextual Step and Panel components, or use the `@steps` argument to pass in an array of steps.

### Using contextual components

The `Hds::Stepper::Nav::Step` and `Hds::Stepper::Nav::Panel` are yielded as contextual components.

```handlebars
<Hds::Stepper::Nav @ariaLabel="Basic usage" as |S|>
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

When using the `@steps` argument, use the named block `<:body>` to pass in step content. This can be used if the template for steps content is consistent across steps, or conditionally rendered based on arguments other than the `currentStep`.

```handlebars
<Hds::Stepper::Nav
  @currentStep={{this.demoCurrentStep}}
  @steps={{array
    (hash title="Step 1")
    (hash title="Step 2")
    (hash title="Step 3")
  }}
  @ariaLabel="Using steps argument"
  @onStepChange={{this.demoOnStepChange}}
>
  <:body>
    {{#if (eq this.demoCurrentStep 0)}}
      Content 1
    {{else if (eq this.demoCurrentStep 1)}}
      Content 2
    {{else}}
      Content 3
    {{/if}}
    {{#if true}}
      Conditional content
    {{/if}}
  </:body>
</Hds::Stepper::Nav>
```

### Step status

The status of steps is controlled automatically through the `@currentStep` argument. The argument is zero-indexed and sets the active step to the value provided. The status of a step is determined in the following ways in relation to the `@currentStep`.
- A step equal to `@currentStep` is active
- All steps less than `@currentStep` are completed
- All steps greater than `@currentStep` are incomplete

By default, `@currentStep` is equal to 0.

```handlebars
<Hds::Stepper::Nav
  @currentStep={{this.demoCurrentStep}}
  @ariaLabel="Status"
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

### Interactivity

The `@isInteractive` argument controls if navigation between steps is allowed using the steps. By default `@isInteractive` is `true`.

#### Interactive

When `@isInteractive` is set to `true`, users can navigate to completed steps by clicking on the step. Users can only navigate to completed steps, not incomplete ones.

When a click on a step occurs, the `@onStepChange` handler can be used to pass a custom function to update the current step number.

```handlebars
<Hds::Stepper::Nav
  @currentStep={{this.demoCurrentStep}}
  @ariaLabel="Interactive"
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

#### Not interactive

When `@isInteractive` is set to `false`, the component steps do not allow navigation between steps.

```handlebars
<Hds::Stepper::Nav
  @currentStep={{1}}
  @isInteractive={{false}}
  @ariaLabel="Interactive"
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

### Without panels

The component can be used without the `[S].Panel` contextual component, or `<:body>` named block. In this use case, the component operates similar to a static list. This can be used if the content of the steps is outside of the component.

!!! Info

Due to accessibility implications, `@isInteractive` must be set to `false` when using the component without panels.

!!!

```handlebars
<Hds::Stepper::Nav
  @isInteractive={{false}}
  @ariaLabel="Standalone contextual components"
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
</Hds::Stepper::Nav>
Steps content
```

## Composition with other components

The Stepper Nav should be paired with appropriate navigation [Buttons](/components/button). Buttons can be wrapped with a [Button Set](/components/button-set) to ensure consistent spacing between them.

```handlebars
<Hds::Stepper::Nav
  @currentStep={{this.demoButtonsCurrentStep}}
  @ariaLabel="Component composition"
  @onStepChange={{this.demoButtonsOnStepChange}}
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
  <S.Panel>
    Content 1
    <Hds::Button @text="Next" {{on "click" this.onNextClickDemo}} />
  </S.Panel>
  <S.Panel>
    Content 2
    <Hds::ButtonSet>
      <Hds::Button
        @text="Previous"
        @color="secondary"
        {{on "click" this.onPreviousClickDemo}}
      />
      <Hds::Button @text="Next" {{on "click" this.onNextClickDemo}} />
    </Hds::ButtonSet>
  </S.Panel>
  <S.Panel>
    Content 3
    <Hds::Button
      @text="Previous"
      @color="secondary"
      {{on "click" this.onPreviousClickDemo}}
    />
  </S.Panel>
</Hds::Stepper::Nav>
```