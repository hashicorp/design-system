## Component API

### Stepper List

<Doc::ComponentApi as |C|>
  <C.Property @name="<[S].Step>" @type="yielded component">
    `Stepper::List::Step` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="titleTag" @type="enum" @values={{array "div" "h1" "h2" "h3" "h4" "h5" "h6"}} @default="div">
    The HTML tag that wraps the content of each Nav Step title block.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @required={{true}}>
    The value of the aria-label. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [S].Step

The `Stepper::List::Step` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="<:title>" @type="named block" @required={{true}}>
    A named block where the title of the step is rendered.
  </C.Property>
  <C.Property @name="<:description>" @type="named block">
    A named block where the description of the step is rendered.
  </C.Property>
  <C.Property @name="<:content>" @type="named block">
    A named block where any additional content of the step is rendered.
  </C.Property>
  <C.Property @name="status" @type="enum" @values={{array "incomplete" "progress" "processing" "complete" }} @default="incomplete">
    Sets the status of the Step.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
