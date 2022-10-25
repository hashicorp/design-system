<h1>Form::Radio Component - How to use</h1>

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

  <p class="dummy-paragraph">As mentioned above, there are different possible ways to use the
    <code class="dummy-code">Form::Radio</code>
    component: using the "base" variant (essentially just the control itself), using the "field" variant (the control
    plus label, helper text and error), or using the "group" variant (a list of fields with legend, helper text and
    error).</p>
  <p class="dummy-paragraph">In reality, the "group" one is the one that likely you will want to use, because of the
    nature of the "radio" control (always used in a list of options). The "base" and "field" ones are to be used if and
    when you need to achieve custom layouts or have special use cases not covered by the other variants.</p>

  {{! ================= }}
  {{! ===== GROUP ===== }}
  {{! ================= }}

  <h4 class="dummy-h4">Form::Radio::Group</h4>

  <h5 class="dummy-h5">Basic use</h5>
  <p class="dummy-paragraph">The simplest way to invoke a "radio" group is using something like this:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Group @name="datacenter-demo1" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Group @name="datacenter-demo1" as |G|>
    <G.Legend>Choose datacenter</G.Legend>
    <G.Radio::Field as |F|>
      <F.Label>NYC1</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>DC1</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>NYC2</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>SF1</F.Label>
    </G.Radio::Field>
  </Hds::Form::Radio::Group>
  <p class="dummy-paragraph">This "group" component creates:</p>
  <ul>
    <li class="dummy-paragraph">
      a
      <code class="dummy-code">&lt;fieldset&gt;</code>
      container
    </li>
    <li class="dummy-paragraph">
      a
      <code class="dummy-code">&lt;legend&gt;</code>
      element
    </li>
    <li class="dummy-paragraph">a list of rendered
      <code class="dummy-code">&lt;Form::Radio::Fields&gt;</code>
      components (with
      <code class="dummy-code">ID</code>,
      <code class="dummy-code">for</code>
      and
      <code class="dummy-code">aria-describedby</code>
      attributes automatically generated and correcly linked one with the other).</li>
  </ul>
  <p class="dummy-paragraph">The
    <code class="dummy-code">@name</code>
    argument offers an easy way to provide the same name for all the radio controls in a single place.</p>

  <h5 class="dummy-h5">Layout</h5>
  <p class="dummy-paragraph">You can choose between two different layout orientations, to better fit your spacing
    requirements:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo2" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo2" as |G|>
    <G.Legend>Choose datacenter</G.Legend>
    <G.Radio::Field as |F|>
      <F.Label>NYC1</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>DC1</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>NYC2</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>SF1</F.Label>
    </G.Radio::Field>
  </Hds::Form::Radio::Group>

  <h5 class="dummy-h5">Helper text</h5>
  <p class="dummy-paragraph">You can add extra information to the group using an "helper" text:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo3" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.HelperText>Select which datacenter to use for the initial setup.</G.HelperText>
  <G.Radio::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo3" as |G|>
    <G.Legend>Choose datacenter</G.Legend>
    <G.HelperText>Select which datacenter to use for the initial setup.</G.HelperText>
    <G.Radio::Field as |F|>
      <F.Label>NYC1</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>DC1</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>NYC2</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>SF1</F.Label>
    </G.Radio::Field>
  </Hds::Form::Radio::Group>

  <p class="dummy-paragraph">When the "helper" text is added, the component automatically adds an
    <code class="dummy-code">aria-describedby</code>
    attribute to the
    <code class="dummy-code">fieldset</code>, associating it with the automatically generated
    <code class="dummy-code">ID</code>
    of the helper text element.</p>

  <h5 class="dummy-h5">Extra content in legend and helper text</h5>
  <p class="dummy-paragraph">The
    <code class="dummy-code">Label</code>
    and
    <code class="dummy-code">HelperText</code>
    contextual components used in the "field" are yielding their content: this means you can pass not just plain text,
    but also structured content. For example:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="method-demo1" as |G|>
  <G.Legend>Method <Hds::Badge @size="small" @text="Beta" @color="highlight" /></G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel. See <Hds::Link::Inline @href="#">HTTP protocol</Hds::Link::Inline> for more details.</G.HelperText>
  <G.Radio::Field as |F|>
    <F.Label>POST</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>GET</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>PUT</F.Label>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Group @layout="horizontal" @name="method-demo1" as |G|>
    <G.Legend>Method <Hds::Badge @size="small" @text="Beta" @color="highlight" /></G.Legend>
    <G.HelperText>Choose which HTTP method to use for the communication channel. See
      <Hds::Link::Inline @href="#">HTTP protocol</Hds::Link::Inline>
      for more details.</G.HelperText>
    <G.Radio::Field as |F|>
      <F.Label>POST</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>GET</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>PUT</F.Label>
    </G.Radio::Field>
  </Hds::Form::Radio::Group>
  <p class="dummy-paragraph"><em>Notice: If a link is used within a legend, helper text, or error text, it will not be
      presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in
      text (associated with the input through aria-describedby) will not be read out as interactive elements to users
      with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only
      message that informs the user that some help text includes link, and additional keyboard exploration may be
      required. As such, it is generally preferable to avoid links within help/error text or labels; however, we
      understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative
      approach is determined.</em></p>

  <h5 class="dummy-h5">Required / Optional</h5>
  <p class="dummy-paragraph">It's possible to add a visual indication if a group is "required" or is "optional" using
    the
    <code class="dummy-code">@isRequired</code>
    and
    <code class="dummy-code">@isOptional</code>
    arguments:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Group @isRequired={{true}} @layout="horizontal" @name="method-demo2" as |G|>
  <G.Legend>Method</G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel.</G.HelperText>
  <G.Radio::Field as |F|><F.Label>POST</F.Label></G.Radio::Field>
  <G.Radio::Field as |F|><F.Label>GET</F.Label></G.Radio::Field>
  <G.Radio::Field as |F|><F.Label>PUT</F.Label></G.Radio::Field>
</Hds::Form::Radio::Group>
<br />
<Hds::Form::Radio::Group @isOptional={{true}} @layout="horizontal" @name="method-demo3" as |G|>
  <G.Legend>Method</G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel.</G.HelperText>
  <G.Radio::Field as |F|><F.Label>POST</F.Label></G.Radio::Field>
  <G.Radio::Field as |F|><F.Label>GET</F.Label></G.Radio::Field>
  <G.Radio::Field as |F|><F.Label>PUT</F.Label></G.Radio::Field>
</Hds::Form::Radio::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Group @isRequired={{true}} @layout="horizontal" @name="method-demo2" as |G|>
    <G.Legend>Methods</G.Legend>
    <G.HelperText>Choose which HTTP method to use for the communication channel.</G.HelperText>
    <G.Radio::Field as |F|>
      <F.Label>POST</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>GET</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>PUT</F.Label>
    </G.Radio::Field>
  </Hds::Form::Radio::Group>
  <br />
  <Hds::Form::Radio::Group @isOptional={{true}} @layout="horizontal" @name="method-demo3" as |G|>
    <G.Legend>Methods</G.Legend>
    <G.HelperText>Choose which HTTP method to use for the communication channel.</G.HelperText>
    <G.Radio::Field as |F|>
      <F.Label>POST</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>GET</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>PUT</F.Label>
    </G.Radio::Field>
  </Hds::Form::Radio::Group>
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
  <p class="dummy-paragraph">To show the user that their input is not valid, you have to provide an error message (using
    the
    <code class="dummy-code">Error</code>
    contextual component):</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo4" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Radio::Field>
  <G.Error>Error: you need to choose at least one datacenter.</G.Error>
</Hds::Form::Radio::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo4" as |G|>
    <G.Legend>Choose datacenter</G.Legend>
    <G.Radio::Field as |F|>
      <F.Label>NYC1</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>DC1</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>NYC2</F.Label>
    </G.Radio::Field>
    <G.Radio::Field as |F|>
      <F.Label>SF1</F.Label>
    </G.Radio::Field>
    <G.Error>Error: you need to choose at least one datacenter.</G.Error>
  </Hds::Form::Radio::Group>
  <p class="dummy-paragraph"><em>Notice:</em></p>
  <ul>
    <li class="dummy-paragraph"><em>unlike for the
        <code class="dummy-code">TextInput/Textarea/Select</code>, you don't need to pass a
        <code class="dummy-code">@isInvalid</code>
        arguments to the fields, because the
        <code class="dummy-code">radio</code>
        control doesn't have an "invalid" visual state</em></li>
    <li class="dummy-paragraph"><em>while technically is possible to provide multiple error messages (similar to the
        <code class="dummy-code">TextInput/Textarea/Select</code>
        controls), in reality is very unlikely that you will need to (in case, please speak with the design system team)</em></li>
  </ul>

  <h5 class="dummy-h5">"Field" items</h5>
  <p class="dummy-paragraph">As explained above, a "group" of radios is made of one or more "field" radio components (<code
      class="dummy-code"
    >Form::Radio::Field</code>). So all the arguments, attributes and modifiers that can be passed to the "field"
    component, can be passed to the same items in the "group" declaration. For example:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Group @layout="vertical" @name="datacenter-demo5" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field @id="datacenter-NYC1" checked @value="NYC1" {{on "change" myAction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>CoreSite- 32 Avenue of the Americas</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-DC1" @value="DC1" {{on "change" myAction}} as |F|>
    <F.Label>DC1</F.Label>
    <F.HelperText>CoreSite- K Street</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-NYC2" @value="NYC2" {{on "change" myAction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>H5 Data Center - 325 Hudson Street</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-SF1" @value="SF1" {{on "change" myAction}} as |F|>
    <F.Label>SF1</F.Label>
    <F.HelperText>INAP - 650 Townsend Street</F.HelperText>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Group @layout="vertical" @name="datacenter-demo5" as |G|>
    <G.Legend>Choose datacenter</G.Legend>
    <G.Radio::Field @id="datacenter-NYC1" checked @value="NYC1" {{on "change" this.noop}} as |F|>
      <F.Label>NYC1</F.Label>
      <F.HelperText>CoreSite- 32 Avenue of the Americas</F.HelperText>
    </G.Radio::Field>
    <G.Radio::Field @id="datacenter-DC1" @value="DC1" {{on "change" this.noop}} as |F|>
      <F.Label>DC1</F.Label>
      <F.HelperText>CoreSite- K Street</F.HelperText>
    </G.Radio::Field>
    <G.Radio::Field @id="datacenter-NYC2" @value="NYC2" {{on "change" this.noop}} as |F|>
      <F.Label>NYC1</F.Label>
      <F.HelperText>H5 Data Center - 325 Hudson Street</F.HelperText>
    </G.Radio::Field>
    <G.Radio::Field @id="datacenter-SF1" @value="SF1" {{on "change" this.noop}} as |F|>
      <F.Label>SF1</F.Label>
      <F.HelperText>INAP - 650 Townsend Street</F.HelperText>
    </G.Radio::Field>
  </Hds::Form::Radio::Group>

  {{! ========================= }}
  {{! ===== BASE + FIELD  ===== }}
  {{! ========================= }}

  <h4 class="dummy-h4">Form::Radio::Base / Form::Radio::Field</h4>

  <p class="dummy-paragraph">
    As mentioned above, the "base" and "field" variants are intended
    <strong>only</strong>
    for those rare cases where the "group" variant can't be used, and a custom implementation needs to be done. For this
    reason we will not go too much in detail on how to use them: for further details refer to the
    <a href="#component-api">Component API</a>
    section on this page, or speak with one of the design system team members.
  </p>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Notice: when the "base" radio is used, the developer is completely responsible for the correct implementation of the
    form control, including its accessibility conformance.</p>
  <p class="dummy-paragraph">To give just an example, this could be an invocation of the "base" component you would use:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Base
  name="data-center"
  aria-label="San Francisco datacenter number 1"
  @value="SF1"
  {{on "change" myAction}}
/>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Base
    name="data-center"
    aria-label="San Francisco datacenter number 1"
    @value="SF1"
    {{on "change" this.noop}}
  />
  <p class="dummy-paragraph">This "base" component creates just the
    <code class="dummy-code">&lt;input type="radio"&gt;</code>
    control with an automatically generated
    <code class="dummy-code">ID</code>
    attribute.
  </p>
  <p class="dummy-paragraph">Similarly, this could be an invocation of the "field" component:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Radio::Field name="data-center" @value="SF1" {{on "change" myAction}} as |F|>
  <F.Label>SF1</F.Label>
</Hds::Form::Radio::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Radio::Field name="data-center" @value="SF1" {{on "change" this.noop}} as |F|>
    <F.Label>SF1</F.Label>
  </Hds::Form::Radio::Field>
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
      <code class="dummy-code">&lt;input type="radio"&gt;</code>
      control with an automatically generated
      <code class="dummy-code">ID</code>
      attribute</li>
  </ul>

</section>
