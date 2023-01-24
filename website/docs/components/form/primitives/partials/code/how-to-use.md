## How to use this component

### Form::Label

The default invocation requires text to be passed and a `controlId` argument (the ID of the form control associated with the label).

```handlebars
<Hds::Form::Label @controlId="control-ID">My label</Hds::Form::Label>
```

Pass an `isRequired` argument, when user input is required for the associated form control.

```handlebars
<Hds::Form::Label @controlId="control-ID" @isRequired={{true}}>My label</Hds::Form::Label>
```

Pass an `isOptional` argument, when the user input is optional for the associated form control.

```handlebars
<Hds::Form::Label @controlId="control-ID" @isOptional={{true}}>My label</Hds::Form::Label>
```

If the label needs to contain more than just text, it’s possible to pass structured content to component. While the correct text styling is applied to the component’s container, the layout of the content inside the component is the responsibility of the product team.

!!! Warning

The `<label>` element is linked via `for` attribute to the `<input/select/textarea>` elements. Because this is an interactive element, it cannot have links inside of it, as nested interactive elements cannot be reached by a user with assistive technology.
!!!

```handlebars
<Hds::Form::Label @controlId="control-ID">
  <span>Some text</span>
  <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
</Hds::Form::Label>
```

### Form::HelperText

The default invocation requires text to be passed and a `controlId` argument.

The `controlId` value is used to generate an ID, prefixed with `helper-text-`, so that the ID can be referenced in the `aria-describedby` attribute of the form control. If no `controlId` is provided, no ID is generated. If needed, it can be passed directly as an HTML attribute.

```handlebars
<Hds::Form::HelperText @controlId="control-ID">This is some helper text</Hds::Form::HelperText>
```

If the helper text needs to contain more than just text, use the block form of the component. While the correct styling is applied to the component itself, the nested components may need additional styling and are the responsibility of the product team.

!!! Warning

Interactive elements in text (associated with the input through `aria-describedby`) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, we recommend including a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

```handlebars
<Hds::Form::HelperText @controlId="control-ID">
  Some text with a
  <Hds::Link::Inline @route="show" @model="components/link/inline">Hds::Link::Inline</Hds::Link::Inline>,
  or <code>some formatted code</code> or a <strong>strong message</strong>.
</Hds::Form::HelperText>
```

### Form::Error

The default invocation requires text to be passed and a `controlId` argument.

The `controlId` value will be used to generate an ID, prefixed with `error-`, so that this ID can be referenced in the `aria-describedby` attribute of the form control. If no `controlId` is provided, no ID is generated. If needed, it can be passed directly as an HTML attribute.

```handlebars
<Hds::Form::Error @controlId="control-ID">This is a simple error message</Hds::Form::Error>
```

If the error is made up of multiple messages, it’s possible to iterate over a collection of error messages. 

```handlebars
<Hds::Form::Error @controlId="control-ID" as |Error|>
  {{#each @model.SAMPLE_ERROR_MESSAGES as |message|}}
    <Error.Message>{{message}}</Error.Message>
  {{/each}}
</Hds::Form::Error>
```

### Form::Indicator

If no `isRequired/isOptional` argument is provided, the component will not render anything.

#### Required

Pass an `isRequired` argument, to render a `Required` indicator.

```handlebars
<Hds::Form::Indicator @isRequired={{true}} />
```

#### Optional

Pass an `isOptional` argument, to render an `Optional` indicator.

```handlebars
<Hds::Form::Indicator @isOptional={{true}} />
```

### Form::Legend

The default invocation requires text to be passed.

```handlebars
<Hds::Form::Legend>My legend</Hds::Form::Legend>
```

#### Required

Pass an `isRequired` argument, when user input is required for the associated form control.

```handlebars
<Hds::Form::Legend @isRequired={{true}}>My legend</Hds::Form::Legend>
```

#### Optional

Pass an `isOptional` argument, when user input is optional for the associated form control.

```handlebars
<Hds::Form::Legend @isOptional={{true}}>My legend</Hds::Form::Legend>
```

#### Structured content

If the legend needs to contain more than just text, it’s possible to pass structured content to component. While the correct text styling is applied to the component’s container, the layout of the content inside the component is the responsibility of the product team.

```handlebars
<Hds::Form::Legend>
  <span>Some text</span>
  <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
</Hds::Form::Legend>
```

### Form::Field

!!! Warning

It’s unlikely that you’ll need to use this component direcly, but if you do contact the Design Systems Team so we can provide support.
!!!

The default invocation includes a set of contextual components, a control (in this case a text input) with hashed values passed back to it, and a `@layout` argument. Depending on the context, you may want to pass just the label, or the label _and_ the helper text, while the error message is likely conditional to the validation of the input provided by the user. The arguments `id` and `ariaDescribedBy` are automatically generated by the component and passed back to the control.

The layout of the content inside the "control" container is the responsibility of the product team.

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

### Form::Fieldset

!!! Warning

It’s unlikely that you’ll need to use this component direcly, but if you do contact the Design Systems Team so we can provide support.
!!!

The default invocation includes a set of contextual components, one or more fields (in this case radio buttons within a label), and a `@layout` argument. Depending on the context, you may want to pass just the legend, just the helper text, both or none, while the error message is likely conditional to the validation of the inputs provided by the user.

The layout of the content inside the "control" container is the responsibility of the product team.

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
