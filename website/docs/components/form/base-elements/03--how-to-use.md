<h1>Form / Base elements - How to use</h1>

<section data-section="how-to-use">
  

  <p class="dummy-paragraph">
    The base form elements collected in this page are used internally as building blocks for the "field" and "group"
    controls, but can also be used in special cases when you need to implement custom layouts or controls in forms.
    Unless strictly needed, we
    <strong>strongly</strong>
    suggest to use the pre-defined "field" and "group" controls provided by the system (you can find them in the other
    "form" documentation pages).
  </p>

  <h4 class="dummy-h4">Form::Label</h4>
  <p class="dummy-paragraph">
    The most basic invocation just needs a text passed to the component and a
    <code class="dummy-code">controlId</code>
    argument (the ID of the form control associated with the label):
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Label @controlId="control-ID">My label</Hds::Form::Label>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Label @controlId="control-ID">My label</Hds::Form::Label>
  <p class="dummy-paragraph">
    Pass in an
    <code class="dummy-code">isRequired</code>
    argument when the user input is required for the associated form control:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Label @controlId="control-ID" @isRequired={{true}}>My label</Hds::Form::Label>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Label @controlId="control-ID" @isRequired={{true}}>My label</Hds::Form::Label>
  <p class="dummy-paragraph">
    Pass in an
    <code class="dummy-code">isOptional</code>
    argument when the user input is optional for the associated form control:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Label @controlId="control-ID" @isOptional={{true}}>My label</Hds::Form::Label>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Label @controlId="control-ID" @isOptional={{true}}>My label</Hds::Form::Label>
  <p class="dummy-paragraph">
    There may be cases in which the label needs to contain more than just text. In this case it's possible to pass
    structured content to it (it's just yielded in output):
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Label @controlId="control-ID">
  <span>Some text</span>
  <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
</Hds::Form::Label>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Label @controlId="control-ID">
    <span>Some text</span>
    <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
  </Hds::Form::Label>
  <p class="dummy-paragraph">
    <strong>Important:</strong>
    in this case, while the correct text styling is applied to the component's container, the layout/organization of the
    content inside the component is left to the consumer.</p>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Note: The
    <code class="dummy-code">&lt;label&gt;</code>
    element is linked via
    <code class="dummy-code">for</code>
    attribute to the
    <code class="dummy-code">&lt;input/select/textarea&gt;</code>
    elements. This means it becomes an interactive element, and for this reason it's not possible to have links inside
    it (nested interactive elements cannot be reached by a user with assistive technology).
  </p>

  <h4 class="dummy-h4">Form::HelperText</h4>
  <p class="dummy-paragraph">
    The most basic invocation just needs a text passed to the component and a
    <code class="dummy-code">controlId</code>
    argument:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::HelperText @controlId="control-ID">This is some helper text</Hds::Form::HelperText>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::HelperText @controlId="control-ID">This is some helper text</Hds::Form::HelperText>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Note: the
    <code class="dummy-code">controlId</code>
    value will be used to generate an ID, prefixed with
    <code class="dummy-code">helper-text-</code>, so that this ID can be referenced in the
    <code class="dummy-code">aria-describedby</code>
    attribute of the form control. If no
    <code class="dummy-code">controlId</code>
    is provided, no ID is generated (but if needed it can be passed directly as HTML attribute).</p>
  <p class="dummy-paragraph">
    There may be some cases in which the helper text needs to contain more than just text. First, it is important to
    note that interactive elements in text (associated with the input through
    <code class="dummy-code">aria-describedby</code>) will not be read out as interactive elements to users with screen
    readers; only the text itself will be read. As such, it is recommended to have a screen reader-only message that
    informs the user that some help text includes link, and additional keyboard exploration may be required.
  </p>
  <p class="dummy-paragraph">
    To implement additional nested components within the helper text, use the block form of the component. Note that the
    correct text styling will be applied to the component itself, but the nested components may need additional styling.
    For example:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::HelperText @controlId="control-ID">
  Some text with a
  <Hds::Link::Inline @route="components.link.inline">Hds::Link::Inline</Hds::Link::Inline>,
  or <code>some formatted code</code> or a <strong>strong message</strong>.
</Hds::Form::HelperText>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::HelperText @controlId="control-ID">
    Some text with a
    <Hds::Link::Inline @route="components.link.inline">Hds::Link::Inline</Hds::Link::Inline>, or
    <code>some formatted code</code>
    or a
    <strong>strong message</strong>.
  </Hds::Form::HelperText>

  <h4 class="dummy-h4">Form::Indicator</h4>
  <p class="dummy-paragraph">
    To render a
    <code class="dummy-code">Required</code>
    indicator provide a
    <code class="dummy-code">@isRequired</code>
    argument:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Indicator @isRequired={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Indicator @isRequired={{true}} />
  <p class="dummy-paragraph">
    To render instead an
    <code class="dummy-code">Optional</code>
    indicator provide a
    <code class="dummy-code">@isOptional</code>
    argument:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Indicator @isOptional={{true}} />
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Indicator @isOptional={{true}} />

  <p class="dummy-paragraph"><em>Notice: if no
      <code class="dummy-code">@isRequired/@isOptional</code>
      argument is provided, the component will not render anything.</em></p>

  <h4 class="dummy-h4">Form::Error</h4>
  <p class="dummy-paragraph">
    The most basic invocation just needs a text passed to the component and a
    <code class="dummy-code">controlId</code>
    argument:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Error @controlId="control-ID">This is a simple error message</Hds::Form::Error>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Error @controlId="control-ID">This is a simple error message</Hds::Form::Error>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Note: the
    <code class="dummy-code">controlId</code>
    value will be used to generate an ID, prefixed with
    <code class="dummy-code">error-</code>, so that this ID can be referenced in the
    <code class="dummy-code">aria-describedby</code>
    attribute of the form control. If no
    <code class="dummy-code">controlId</code>
    is provided, no ID is generated (but if needed it can be passed directly as HTML attribute).</p>
  <p class="dummy-paragraph">
    There may be cases in which the error is made of multiple messages. In this case it's possible to iterate over a
    collection of error messages:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Error @controlId="control-ID" as |Error|>
  {{#each @model.SAMPLE_ERROR_MESSAGES as |message|}}
    <Error.Message>{{message}}</Error.Message>
  {{/each}}
</Hds::Form::Error>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Error @controlId="control-ID" as |Error|>
    {{#each @model.SAMPLE_ERROR_MESSAGES as |message|}}
      <Error.Message>{{message}}</Error.Message>
    {{/each}}
  </Hds::Form::Error>

  <h4 class="dummy-h4">Form::Legend</h4>
  <p class="dummy-paragraph">
    The most basic invocation just needs a text passed to the component:
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Legend>My legend</Hds::Form::Legend>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Legend>My legend</Hds::Form::Legend>
  <p class="dummy-paragraph">
    Pass in an
    <code class="dummy-code">isRequired</code>
    argument when the user input is required for the associated form controls:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Legend @isRequired={{true}}>My legend</Hds::Form::Legend>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Legend @isRequired={{true}}>My legend</Hds::Form::Legend>
  <p class="dummy-paragraph">
    Pass in an
    <code class="dummy-code">isOptional</code>
    argument when the user input is optional for the associated form controls:
  </p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Legend @isOptional={{true}}>My legend</Hds::Form::Legend>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Legend @isOptional={{true}}>My legend</Hds::Form::Legend>
  <p class="dummy-paragraph">
    There may be cases in which the legend needs to contain more than just text. In this case it's possible to pass
    structured content to it (it's just yielded in output):
  </p>
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Legend>
  <span>Some text</span>
  <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
</Hds::Form::Legend>
```
<!-- prettier-ignore-end -->

  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Legend>
    <span>Some text</span>
    <Hds::Badge @size="small" @text="Some badge" @color="highlight" />
  </Hds::Form::Legend>
  <p class="dummy-paragraph">
    <strong>Important:</strong>
    in this case, while the correct text styling is applied to the component's container, the layout/organization of the
    content inside the component is left to the consumer.</p>

  <h4 class="dummy-h4">Form::Field</h4>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />Note: it's very unlikely that
    you will ever need to use this component direcly (it's mainly intended to be used inside the "form" controls). If
    for any reasons you need to use it in your codebase, please contact the HDS team so they can provide support and
    guidance. Below we provide in any case an example of how it can be used, but there are many more possible variants
    to it.</p>
  <p class="dummy-paragraph">
    The more general invocation for this component sees a set of contextual components passed to it, a control (in this
    case a text input) and a
    <code class="dummy-code">@layout</code>
    argument provided, and a few hashed values passed back to the control:
  </p>
  
  
  <!-- prettier-ignore-start -->
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
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Field @layout="vertical" @isRequired={{true}} as |F|>
    <F.Label>This is the label</F.Label>
    <F.HelperText>This is the helper text</F.HelperText>
    <F.Control>
      {{! add your control here }}
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
  <p class="dummy-paragraph">Depending on the context/need, one may want to pass just the label, or the label
    <em>and</em>
    the helper text, while the error message is likely conditional to the validation of the input provided by the user.</p>
  <p class="dummy-paragraph">Note also how the arguments
    <code class="dummy-code">id</code>
    and
    <code class="dummy-code">ariaDescribedBy</code>, automatically generated by the component, are passed back to the
    control.</p>
  <p class="dummy-paragraph"><em><strong>Important:</strong>
      in this case the layout/styling of the content inside the "control" container is left to the consumer.</em></p>

  <h4 class="dummy-h4">Form::Fieldset</h4>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />Note: it's very unlikely that
    you will ever need to use this component direcly (it's mainly intended to be used inside the "form" controls). If
    for any reasons you need to use it in your codebase, please contact the HDS team so they can provide support and
    guidance. Below we provide in any case an example of how it can be used, but there are many more possible variants
    to it.</p>
  <p class="dummy-paragraph">
    The more general invocation for this component sees a set of contextual components passed to it, one or more fields
    (in this case radio buttons within a label), a
    <code class="dummy-code">@layout</code>
    argument:
  </p>
  
  
  <!-- prettier-ignore-start -->
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
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Fieldset @layout="horizontal" @isRequired={{true}} as |F|>
    <F.Legend>This is the legend</F.Legend>
    <F.HelperText>This is the helper text</F.HelperText>
    {{! add your control here }}
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
  <p class="dummy-paragraph">Depending on the context/need, one may want to pass just the legend, just the helper text,
    both or none, while the error message is likely conditional to the validation of the inputs provided by the user.</p>
  <p class="dummy-paragraph"><em><strong>Important:</strong>
      in this case the layout/styling of the content inside the "control" container is left to the consumer.</em></p>

</section>
