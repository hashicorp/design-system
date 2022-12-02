The base form elements collected in this page are used internally as building blocks for the "field" and "group" controls, but can also be used in special cases when you need to implement custom layouts or controls in forms. Unless strictly needed, we **strongly** suggest to use the pre-defined "field" and "group" controls provided by the system (you can find them in the other "form" documentation pages).

#### Form::Label

The most basic invocation just needs a text passed to the component and a `controlId` argument (the ID of the form control associated with the label):

```handlebars
<Hds::Form::Label @controlId="control-ID">My label</Hds::Form::Label>
```

Renders to:

My label

Pass in an `isRequired` argument when the user input is required for the associated form control:

```handlebars
<Hds::Form::Label @controlId="control-ID" @isRequired={{true}}>My label</Hds::Form::Label>
```

Renders to:

My label

Pass in an `isOptional` argument when the user input is optional for the associated form control:

```handlebars
<Hds::Form::Label @controlId="control-ID" @isOptional={{true}}>My label</Hds::Form::Label>
```

Renders to:

My label

There may be cases in which the label needs to contain more than just text. In this case it's possible to pass structured content to it (it's just yielded in output):

```handlebars
<Hds::Form::Label @controlId="control-ID">
  <span>Some text</span>
  <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
</Hds::Form::Label>
```

Renders to:

Some text

**Important:** in this case, while the correct text styling is applied to the component's container, the layout/organization of the content inside the component is left to the consumer.

Note: The `<label>` element is linked via `for` attribute to the `<input/select/textarea>` elements. This means it becomes an interactive element, and for this reason it's not possible to have links inside it (nested interactive elements cannot be reached by a user with assistive technology).

#### Form::HelperText

The most basic invocation just needs a text passed to the component and a `controlId` argument:

```handlebars
<Hds::Form::HelperText @controlId="control-ID">This is some helper text</Hds::Form::HelperText>
```

Renders to:

This is some helper text

Note: the `controlId` value will be used to generate an ID, prefixed with `helper-text-`, so that this ID can be referenced in the `aria-describedby` attribute of the form control. If no `controlId` is provided, no ID is generated (but if needed it can be passed directly as HTML attribute).

There may be some cases in which the helper text needs to contain more than just text. First, it is important to note that interactive elements in text (associated with the input through `aria-describedby`) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only message that informs the user that some help text includes link, and additional keyboard exploration may be required.

To implement additional nested components within the helper text, use the block form of the component. Note that the correct text styling will be applied to the component itself, but the nested components may need additional styling. For example:

```handlebars
<Hds::Form::HelperText @controlId="control-ID">
  Some text with a
  <Hds::Link::Inline @route="show" @model="components/link/inline">Hds::Link::Inline</Hds::Link::Inline>,
  or <code>some formatted code</code> or a <strong>strong message</strong>.
</Hds::Form::HelperText>
```

Renders to:

Some text with a Hds::Link::Inline, or `some formatted code` or a **strong message**.

#### Form::Indicator

To render a `Required` indicator provide a `@isRequired` argument:

```handlebars
<Hds::Form::Indicator @isRequired={{true}} />
```

Renders to:

To render instead an `Optional` indicator provide a `@isOptional` argument:

```handlebars
<Hds::Form::Indicator @isOptional={{true}} />
```

Renders to:

_Notice: if no `@isRequired/@isOptional` argument is provided, the component will not render anything._

#### Form::Error

The most basic invocation just needs a text passed to the component and a `controlId` argument:

```handlebars
<Hds::Form::Error @controlId="control-ID">This is a simple error message</Hds::Form::Error>
```

Renders to:

This is a simple error message

Note: the `controlId` value will be used to generate an ID, prefixed with `error-`, so that this ID can be referenced in the `aria-describedby` attribute of the form control. If no `controlId` is provided, no ID is generated (but if needed it can be passed directly as HTML attribute).

There may be cases in which the error is made of multiple messages. In this case it's possible to iterate over a collection of error messages:

```handlebars
<Hds::Form::Error @controlId="control-ID" as |Error|>
  {{#each @model.SAMPLE_ERROR_MESSAGES as |message|}}
    <Error.Message>{{message}}</Error.Message>
  {{/each}}
</Hds::Form::Error>
```

Renders to:

{{#each @model.SAMPLE\_ERROR\_MESSAGES as |message|}} {{message}} {{/each}}

#### Form::Legend

The most basic invocation just needs a text passed to the component:

```handlebars
<Hds::Form::Legend>My legend</Hds::Form::Legend>
```

Renders to:

My legend

Pass in an `isRequired` argument when the user input is required for the associated form controls:

```handlebars
<Hds::Form::Legend @isRequired={{true}}>My legend</Hds::Form::Legend>
```

Renders to:

My legend

Pass in an `isOptional` argument when the user input is optional for the associated form controls:

```handlebars
<Hds::Form::Legend @isOptional={{true}}>My legend</Hds::Form::Legend>
```

Renders to:

My legend

There may be cases in which the legend needs to contain more than just text. In this case it's possible to pass structured content to it (it's just yielded in output):

```handlebars
<Hds::Form::Legend>
  <span>Some text</span>
  <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
</Hds::Form::Legend>
```

Renders to:

Some text

**Important:** in this case, while the correct text styling is applied to the component's container, the layout/organization of the content inside the component is left to the consumer.

#### Form::Field

Note: it's very unlikely that you will ever need to use this component direcly (it's mainly intended to be used inside the "form" controls). If for any reasons you need to use it in your codebase, please contact the HDS team so they can provide support and guidance. Below we provide in any case an example of how it can be used, but there are many more possible variants to it.

The more general invocation for this component sees a set of contextual components passed to it, a control (in this case a text input) and a `@layout` argument provided, and a few hashed values passed back to the control:

```handlebars
<Hds::Form::Field @layout="vertical" @isRequired={{true}} as |F|>
  <F.Label>This is the label</F.Label>
  <F.HelperText>This is the helper text</F.HelperText>
  <F.Control>
    // add your control here
    <input
      type="email"
      id={{F.id}}
      value="jane.doe@email.com"
      class="my-custom-class"
      aria-describedby={{F.ariaDescribedBy}}
    />
  </F.Control>
  <F.Error>This is the error</F.Error>
</Hds::Form::Field>
```

Renders to:

This is the label This is the helper text {{! add your control here }}  This is the error

Depending on the context/need, one may want to pass just the label, or the label _and_ the helper text, while the error message is likely conditional to the validation of the input provided by the user.

Note also how the arguments `id` and `ariaDescribedBy`, automatically generated by the component, are passed back to the control.

**Important:** in this case the layout/styling of the content inside the "control" container is left to the consumer.

#### Form::Fieldset

Note: it's very unlikely that you will ever need to use this component direcly (it's mainly intended to be used inside the "form" controls). If for any reasons you need to use it in your codebase, please contact the HDS team so they can provide support and guidance. Below we provide in any case an example of how it can be used, but there are many more possible variants to it.

The more general invocation for this component sees a set of contextual components passed to it, one or more fields (in this case radio buttons within a label), a `@layout` argument:

```handlebars
<Hds::Form::Fieldset @layout="horizontal" @isRequired={{true}} as |F|>
  <F.Legend>This is the legend</F.Legend>
  <F.HelperText>This is the helper text</F.HelperText>
  // add your fields here
  <F.Control>
    <label for="my-group-checkbox1" class="my-custom-class">
      <input type="checkbox" id="my-group-checkbox1" checked="checked" />
      selection #1
    </label>
  </F.Control>
  <F.Control>
    <label for="my-group-checkbox2" class="my-custom-class">
      <input type="checkbox" id="my-group-checkbox2" />
      selection #2
    </label>
  </F.Control>
  <F.Error>This is the error</F.Error>
</Hds::Form::Fieldset>
```

Renders to:

This is the legend This is the helper text {{! add your control here }}  selection #1 selection #2 This is the error

Depending on the context/need, one may want to pass just the legend, just the helper text, both or none, while the error message is likely conditional to the validation of the inputs provided by the user.

**Important:** in this case the layout/styling of the content inside the "control" container is left to the consumer.