## Component API

### Stepper Navigation

<Doc::ComponentApi as |C|>
  <C.Property @name="<[S].Step>" @type="yielded component">
    `Stepper::Navigation::Step` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[S].Panel>" @type="yielded component">
    `Stepper::Navigation::Panel` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    A named block where the content of a step is rendered. It is only used when leveraging the `@steps` argument.
  </C.Property>
  <C.Property @name="steps" @type="array">
    Array `hash` that defines each step with key-value properties that describe each step. Options:
    <Doc::ComponentApi as |C|>
      <C.Property @name="title" @type="string" @required={{true}}>
      The step's title.
      </C.Property>
      <C.Property @name="description" @type="string">
      The step's description.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="currentStep" @type="integer" @default="0">
    Sets the active step to the base-indexed number provided.
  </C.Property>
  <C.Property @name="isInteractive" @type="boolean" @default="true">
    If set to `true`, navigation to completed steps is allowed using the nav steps.
  </C.Property>
  <C.Property @name="titleTag" @type="enum" @values={{array "div" "h1" "h2" "h3" "h4" "h5" "h6"}} @default="div">
    The HTML tag that wraps the content of each Nav Step title block.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required={{true}}>
    The value of the aria-label. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="onStepChange" @type="function">
    Callback function invoked when `@isInteractive` is set to `true` and a click occurs on an interactive step. The function receives the DOM `event` and the steps's `index` (integer number) as arguments.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [S].Step

The `Stepper::Nav::Step` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="<:title>" @type="named block" @required={{true}}>
    A named block where the title of the step is rendered.
  </C.Property>
  <C.Property @name="<:description>" @type="named block">
    A named block where the description of the step is rendered.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [S].Panel

The `Stepper::Nav::Panel` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<section>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
