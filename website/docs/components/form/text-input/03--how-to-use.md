<h1>Form::TextInput Component - How to use</h1>

<section data-section="how-to-use">
  

  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Note: depending on how you're going to process the user input upon submission (eg. server-side via form
    <code class="dummy-code">POST</code>
    or client-side using JavaScript) you will need to provide a
    <code class="dummy-code">name</code>
    attribute or a custom
    <code class="dummy-code">ID</code>
    attribute to the field. Since the decision on how to process the input data is left to the consumers, in the
    examples provided we will omit these specific arguments, for sake of simplicity.
  </p>

  <p class="dummy-paragraph">As mentioned above, there are two possible ways to use the
    <code class="dummy-code">Form::TextInput</code>
    component: using the "base" variant (essentially just the control itself) or using the "field" variant (the control
    plus label, helper text and error).</p>
  <p class="dummy-paragraph">The "field" one is the one that you will likely want to use, because it provides – for free
    and out of the box – a lot of accessibility-related functionalities. The "base" one is to be used if and when you
    need to achieve custom layouts or have special use cases not covered by the "field" variant.</p>

  {{! ================= }}
  {{! ===== FIELD ===== }}
  {{! ================= }}

  <h4 class="dummy-h4">Form::TextInput::Field</h4>

  <h5 class="dummy-h5">Basic use</h5>
  <p class="dummy-paragraph">The simplest way to invoke a "text input" field is using something like this:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field as |F|>
  <F.Label>Cluster name</F.Label>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field as |F|>
    <F.Label>Cluster name</F.Label>
  </Hds::Form::TextInput::Field>
  <p class="dummy-paragraph">This "field" component creates:</p>
  <ul>
    <li class="dummy-paragraph">
      a
      <code class="dummy-code">&lt;label&gt;</code>
      element with a
      <code class="dummy-code">for</code>
      attribute automatically associated with the input
      <code class="dummy-code">ID</code>
      attribute
    </li>
    <li class="dummy-paragraph">a
      <code class="dummy-code">&lt;input type="text"&gt;</code>
      control with an automatically generated
      <code class="dummy-code">ID</code>
      attribute</li>
  </ul>

  <h5 class="dummy-h5">Input value</h5>
  <p class="dummy-paragraph">You can pre-populate the input passing to it a
    <code class="dummy-code">@value</code>
    argument:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @value="my-cluster-1234" as |F|>
  <F.Label>Cluster name</F.Label>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field @value="my-cluster-1234" as |F|>
    <F.Label>Cluster name</F.Label>
  </Hds::Form::TextInput::Field>

  <h5 class="dummy-h5">Type</h5>
  <p class="dummy-paragraph">You can change the type of input passing to it a
    <code class="dummy-code">@type</code>
    argument:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @type="email" @value="janedoe@email.com" as |F|>
  <F.Label>Email</F.Label>
</Hds::Form::TextInput::Field>
<br />
<Hds::Form::TextInput::Field @type="date" as |F|>
  <F.Label>Date of birth</F.Label>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field @type="email" @value="janedoe@email.com" as |F|>
    <F.Label>Email</F.Label>
  </Hds::Form::TextInput::Field>
  <br />
  <Hds::Form::TextInput::Field @type="date" as |F|>
    <F.Label>Date of birth</F.Label>
  </Hds::Form::TextInput::Field>
  <p class="dummy-paragraph">For the list of supported types look at the
    <a href="#component-api">Component API section</a>
    in this page.</p>

  <h5 class="dummy-h5">Helper text</h5>
  <p class="dummy-paragraph">You can add extra information to the field using an "helper" text:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @value="036140285924" as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field @value="036140285924" as |F|>
    <F.Label>AWS Account ID</F.Label>
    <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
  </Hds::Form::TextInput::Field>
  <p class="dummy-paragraph">When the "helper" text is added, the component automatically adds an
    <code class="dummy-code">aria-describedby</code>
    attribute to the input control, associating it with the automatically generated
    <code class="dummy-code">ID</code>
    of the helper text element.</p>

  <h5 class="dummy-h5">Extra content in label and helper text</h5>
  <p class="dummy-paragraph">The
    <code class="dummy-code">Label</code>
    and
    <code class="dummy-code">HelperText</code>
    contextual components used in the "field" are yielding their content: this means you can pass not just plain text,
    but also structured content. For example:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field as |F|>
  <F.Label>AWS Account ID <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field as |F|>
    <F.Label>AWS Account ID <Hds::Badge @size="small" @text="Beta" /></F.Label>
    <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
  </Hds::Form::TextInput::Field>
  <p class="dummy-paragraph"><em>Notice: If a link is used within a label, helper text, or error text, it will not be
      presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in
      text (associated with the input through aria-describedby) will not be read out as interactive elements to users
      with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only
      message that informs the user that some help text includes link, and additional keyboard exploration may be
      required. As such, it is generally preferable to avoid links within help/error text or labels; however, we
      understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative
      approach is determined.</em></p>

  <h5 class="dummy-h5">Required / Optional</h5>
  <p class="dummy-paragraph">It's possible to add a visual indication if a field is "required" or is "optional" using
    the
    <code class="dummy-code">@isRequired</code>
    and
    <code class="dummy-code">@isOptional</code>
    arguments:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @isRequired={{true}} as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
<br />
<Hds::Form::TextInput::Field @isOptional={{true}} as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field @isRequired={{true}} as |F|>
    <F.Label>AWS Account ID</F.Label>
    <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
  </Hds::Form::TextInput::Field>
  <br />
  <Hds::Form::TextInput::Field @isOptional={{true}} as |F|>
    <F.Label>AWS Account ID</F.Label>
    <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
  </Hds::Form::TextInput::Field>
  <p class="dummy-paragraph"><em>Notice: for complex forms we suggest to indicate
      <strong>required</strong>
      fields, since this is the most explicit and transparent method and ensures users don’t have to make assumptions.
      For shorter, simpler forms (ie. login/signup and feedback requests) we suggest to indicate
      <strong>optional</strong>
      fields.</em></p>

  <h5 class="dummy-h5">Validation</h5>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Notice: the validation of the form fields is entirely delegated to the "consumer" of the HDS components. What we
    provide is the visual representation of an invalid state of the field at UI level. When and how to provide this
    visual feedback to the user is responsibility left to the developer.</p>
  <p class="dummy-paragraph">To show the user that their input is not valid, you have to do two things: declare that the
    field is "invalid" (using the
    <code class="dummy-code">@isInvalid</code>) argument and provide an error message (using the
    <code class="dummy-code">Error</code>
    contextual component):</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @type="email" @value="jane.doe@.com" @isInvalid={{true}} as |F|>
  <F.Label>Email</F.Label>
  <F.Error>Error: the provided email is not valid.</F.Error>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field @type="email" @value="jane.doe@.com" @isInvalid={{true}} as |F|>
    <F.Label>Email</F.Label>
    <F.Error>Error: the email entered is not valid.</F.Error>
  </Hds::Form::TextInput::Field>
  <p class="dummy-paragraph">It's possible to provide more than one error message using the more specific
    <code class="dummy-code">Message</code>
    contextual component:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @type="password" @value="1234" @isInvalid={{true}} as |F|>
  <F.Label>Password</F.Label>
  <F.Error as |E|>
    <E.Message>Length should be at least 12 characters</E.Message>
    <E.Message>Must contain at least a special character</E.Message>
  </F.Error>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field @type="password" @value="1234" @isInvalid={{true}} as |F|>
    <F.Label>Password</F.Label>
    <F.Error as |E|>
      <E.Message>Length should be at least 12 characters</E.Message>
      <E.Message>Must contain at least a special character</E.Message>
    </F.Error>
  </Hds::Form::TextInput::Field>

  <h5 class="dummy-h5">Custom control ID</h5>
  <p class="dummy-paragraph">In case it's necessary to have custom ID for the control, instead of the one automatically
    generated by the component (eg. because it needs to be referenced in the code for other reasons), you just need to
    pass a
    <code class="dummy-code">@id</code>
    argument to the "field":</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @id="my-control" as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph"><em>Notice: in this case all the internal references (<code
        class="dummy-code"
      >id/for/aria-describedby</code>) between the different parts of the field are still automatically generated, only
      they will use the custom ID provided.</em></p>

  <h5 class="dummy-h5">Extra "aria-describedby"</h5>
  <p class="dummy-paragraph">If you want to connect one or more extra elements describing the field to the control, it's
    possible to provide extra ID values to the
    <code class="dummy-code">aria-describedby</code>
    attribute of the control, in addition to the ones automatically generated by the component, passing a
    <code class="dummy-code">@extraAriaDescribedBy</code>
    argument to the "field":</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @extraAriaDescribedBy="my-extra-element-ID" as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  

  <h5 class="dummy-h5">HTML native attributes</h5>
  <p class="dummy-paragraph">As explained above in the
    <a href="#component-api">Component API</a>
    section, the input "field" supports the
    <code class="dummy-code">...attributes</code>
    spreading of HTML attributes over the
    <code class="dummy-code">&lt;input&gt;</code>
    element. This means you can use all the standard HTML attributes of the
    <code class="dummy-code">&lt;input&gt;</code>
    element.</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @type="password" name="user-password" placeholder="Insert your password here" minlength="4" maxlength="64" as |F|>
  <F.Label>Password</F.Label>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field
    @type="password"
    name="user-password"
    placeholder="Insert your password here"
    minlength="4"
    maxlength="64"
    as |F|
  >
    <F.Label>Password</F.Label>
  </Hds::Form::TextInput::Field>
  <p class="dummy-paragraph">This can be useful in case you want to add specific native behaviors to the field, that are
    not exposed directly by the component (eg. providing a
    <code class="dummy-code">name</code>
    for the control, or adding
    <code class="dummy-code">min</code>
    <code class="dummy-code">max</code>
    <code class="dummy-code">minlength</code>
    <code class="dummy-code">maxlength</code>
    <code class="dummy-code">pattern</code>
    attributes to it)
  </p>

  <h5 class="dummy-h5">Events handling</h5>
  <p class="dummy-paragraph">Thanks to the
    <code class="dummy-code">...attributes</code>
    spreading over the
    <code class="dummy-code">&lt;input&gt;</code>
    element, you can use as well all the usual Ember techniques for event handling, validation, etc.</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @type="email" placeholder="eg. name.surname@email.com" {{on "blur" myAction}} as |F|>
  <F.Label>Email</F.Label>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field @type="email" placeholder="eg. name.surname@email.com" {{on "blur" this.noop}} as |F|>
    <F.Label>Email</F.Label>
  </Hds::Form::TextInput::Field>
  <p class="dummy-paragraph">You can use different events, depending on your context/need (eg.
    <code class="dummy-code">input</code>,
    <code class="dummy-code">blur</code>,
    <code class="dummy-code">change</code>).</p>

  <h5 class="dummy-h5">Custom width</h5>
  <p class="dummy-paragraph">By default the input control width is set to fill the parent container (with the exception
    of "date" and "time" input types). It's possible to pass a custom width for the control using the
    <code class="dummy-code">@width</code>
    argument:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Field @type="search" placeholder="Search clusters" @width="200px" as |F|>
  <F.Label>Filter the list:</F.Label>
</Hds::Form::TextInput::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Field @type="search" placeholder="Search clusters" @width="200px" as |F|>
    <F.Label>Filter the list:</F.Label>
  </Hds::Form::TextInput::Field>

  {{! ================= }}
  {{! ===== BASE  ===== }}
  {{! ================= }}

  <h4 class="dummy-h4">Form::TextInput::Base</h4>

  <p class="dummy-paragraph">
    As mentioned above, the "base" element is intended
    <strong>only</strong>
    for those rare cases where the "field" variant can't be used, and a custom implementation needs to be done. For this
    reason we will not go too much in detail on how to use it: most of the explanations above apply also to the "base"
    variant of the component, and for further details refer to the
    <a href="#component-api">Component API</a>
    section on this page, or speak with one of the design system team members.
  </p>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Notice: when the "base" input is used, the developer is completely responsible for the correct implementation of the
    form control, including its accessibility conformance.</p>
  <p class="dummy-paragraph">To give just an example, this could be an invocation of the "base" component you would use:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::TextInput::Base
  @type="email"
  @value="janedoe@email.com"
  aria-label="User email"
  placeholder="eg. name.surname@email.com"
  @isRequired={{true}}
  {{on "blur" myAction}}
/>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::TextInput::Base
    @type="email"
    @value="janedoe@email.com"
    aria-label="User email"
    placeholder="eg. name.surname@email.com"
    @isRequired="\{{true}}"
    {{on "blur" this.noop}}
  />
  <p class="dummy-paragraph">This "base" component creates just the
    <code class="dummy-code">&lt;input type="text"&gt;</code>
    control with an automatically generated
    <code class="dummy-code">ID</code>
    attribute.
  </p>

</section>
