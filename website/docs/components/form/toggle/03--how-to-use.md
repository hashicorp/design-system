<h1>Form::Toggle Component - How to use</h1>

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
    <code class="dummy-code">Form::Toggle</code>
    component: using the "base" variant (essentially just the control itself), using the "field" variant (the control
    plus label, helper text and error), or using the "group" variant (a list of fields with legend, helper text and
    error).</p>
  <p class="dummy-paragraph">The "field" and "group" ones are the one that likely you will want to use, because they
    provide – for free and out of the box – a lot of accessibility-related functionalities. The "base" one is to be used
    if and when you need to achieve custom layouts or have special use cases not covered by the other variants.</p>

  {{! ================= }}
  {{! ===== FIELD ===== }}
  {{! ================= }}

  <h4 class="dummy-h4">Form::Toggle::Field</h4>

  <p class="dummy-paragraph">The "field" variant of the toggle component is to be used when there's a single choice to
    make for the user. If there are multiple related choices, the "group" variant should be used instead.</p>

  <h5 class="dummy-h5">Basic use</h5>
  <p class="dummy-paragraph">The simplest way to invoke a "toggle" field is using something like this:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Field as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Field as |F|>
    <F.Label>Enable cost estimation</F.Label>
  </Hds::Form::Toggle::Field>
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
      <code class="dummy-code">&lt;input type="checkbox"&gt;</code>
      control with an automatically generated
      <code class="dummy-code">ID</code>
      attribute</li>
  </ul>

  <h5 class="dummy-h5">Input value</h5>
  <p class="dummy-paragraph">You can provide a value to the input passing to it a
    <code class="dummy-code">@value</code>
    argument:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Field @value="enable" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Field @value="enable" as |F|>
    <F.Label>Enable cost estimation</F.Label>
  </Hds::Form::Toggle::Field>

  <h5 class="dummy-h5">Checked</h5>
  <p class="dummy-paragraph">You can set the toggle to "checked" passing to it the standard HTML
    <code class="dummy-code">checked</code>
    attribute:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Field @value="enable" checked as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Field @value="enable" checked as |F|>
    <F.Label>Enable cost estimation</F.Label>
  </Hds::Form::Toggle::Field>

  <h5 class="dummy-h5">Helper text</h5>
  <p class="dummy-paragraph">You can add extra information to the field using an "helper" text:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Field as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Field as |F|>
    <F.Label>Enable cost estimation</F.Label>
    <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
  </Hds::Form::Toggle::Field>
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
<Hds::Form::Toggle::Field as |F|>
  <F.Label>Enable cost estimation <Hds::Badge @size="small" @text="Beta" @color="highlight" /></F.Label>
  <F.HelperText>See <Hds::Link::Inline @href="#">our pricing</Hds::Link::Inline> for more information.</F.HelperText>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Field as |F|>
    <F.Label>Enable cost estimation <Hds::Badge @size="small" @text="Beta" @color="highlight" /></F.Label>
    <F.HelperText>See <Hds::Link::Inline @href="#">our pricing</Hds::Link::Inline> for more information.</F.HelperText>
  </Hds::Form::Toggle::Field>
  <p class="dummy-paragraph"><em>Notice: If a link is used within a label, helper text, or error text, it will not be
      presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in
      text (associated with the input through aria-describedby) will not be read out as interactive elements to users
      with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only
      message that informs the user that some help text includes link, and additional keyboard exploration may be
      required. As such, it is generally preferable to avoid links within help/error text or labels; however, we
      understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative
      approach is determined.</em></p>

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
<Hds::Form::Toggle::Field as |F|>
  <F.Label>I approve the changes.</F.Label>
  <F.Error>Error: it's necessary to explicitly approve the changes to continue.</F.Error>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Field as |F|>
    <F.Label>I approve the changes.</F.Label>
    <F.Error>Error: it's necessary to explicitly approve the changes to continue.</F.Error>
  </Hds::Form::Toggle::Field>

  <p class="dummy-paragraph"><em>Notice: unlike for the
      <code class="dummy-code">TextInput/Textarea/Select</code>, you don't need to pass a
      <code class="dummy-code">@isInvalid</code>
      argument to the field, because the
      <code class="dummy-code">toggle</code>
      control doesn't have an "invalid" visual state.</em></p>

  <h5 class="dummy-h5">Custom control ID</h5>
  <p class="dummy-paragraph">In case it's necessary to have custom ID for the control, instead of the one automatically
    generated by the component (eg. because it needs to be referenced in the code for other reasons), you just need to
    pass a
    <code class="dummy-code">@id</code>
    argument to the "field":</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Field @id="my-control" as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Toggle::Field>
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
<Hds::Form::Toggle::Field @extraAriaDescribedBy="my-extra-element-ID" as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  

  <h5 class="dummy-h5">HTML native attributes</h5>
  <p class="dummy-paragraph">As explained above in the
    <a href="#component-api">Component API</a>
    section, the input "field" supports the
    <code class="dummy-code">...attributes</code>
    spreading of HTML attributes over the
    <code class="dummy-code">&lt;input type="checkbox"&gt;</code>
    element. This means you can use all the standard HTML attributes of the
    <code class="dummy-code">&lt;input type="checkbox"&gt;</code>
    element.</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Field name="enable" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Field name="enable" as |F|>
    <F.Label>Enable cost estimation</F.Label>
  </Hds::Form::Toggle::Field>
  <p class="dummy-paragraph">This can be useful in case you want to add specific native behaviors to the field, that are
    not exposed directly by the component (eg. providing a
    <code class="dummy-code">name</code>
    for the control)
  </p>

  <h5 class="dummy-h5">Events handling</h5>
  <p class="dummy-paragraph">Thanks to the
    <code class="dummy-code">...attributes</code>
    spreading over the
    <code class="dummy-code">&lt;input type="checkbox"&gt;</code>
    element, you can use as well all the usual Ember techniques for event handling, validation, etc.</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Field {{on "change" myAction}} as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Field {{on "change" this.noop}} as |F|>
    <F.Label>Enable cost estimation</F.Label>
  </Hds::Form::Toggle::Field>
  <p class="dummy-paragraph">You can use different events, depending on your context/need (eg.
    <code class="dummy-code">input</code>,
    <code class="dummy-code">change</code>).</p>

  {{! ================= }}
  {{! ===== GROUP ===== }}
  {{! ================= }}

  <h4 class="dummy-h4">Form::Toggle::Group</h4>

  <p class="dummy-paragraph">The "group" variant of the toggle component is to be used when there are multiple related
    choices to make for the user, or a single one that needs to be presented with an extra "legend". If there is a
    single choice with no need for an extra "legend", the "field" variant should be used instead.</p>

  <p class="dummy-banner dummy-paragraph"><FlightIcon @name="info" />
    It's unlikely that you will ever need to use a "group" of toggle fields (from a design/UX perspective in this case
    is better to use a group of checkboxes). For this reason we will not explain in detail how to use the "group"
    variant (apart from the case of a toggle "group" with single choice). Please refer to the documentation for the
    <a href="/components/form/checkbox/01_overview/"><code class="dummy-code">Form::Toggle::Group</code></a>
    documentation for more details, or speak with the design system team for guidance on what to do in this specific
    case.</p>

  <h5 class="dummy-h5">"Group" with single choice</h5>
  <p class="dummy-paragraph">There may be use cases in which you need to create a toggle "group" that contains a single
    "field" element (eg. for design reasons, to show the "legend" in a similar position for other control's labels). In
    that case is acceptable to have a group with a single "field" element. For example:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Group as |G|>
  <G.Legend>Visibility</G.Legend>
  <G.Toggle::Field name="private" @id="visibility-private" as |F|>
    <F.Label>Private</F.Label>
    <F.HelperText>Making a box private prevents users from accessing it unless given permission.</F.HelperText>
  </G.Toggle::Field>
</Hds::Form::Toggle::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Group as |G|>
    <G.Legend>Visibility</G.Legend>
    <G.Toggle::Field name="private" @id="visibility-private" as |F|>
      <F.Label>Private</F.Label>
      <F.HelperText>Making a box private prevents users from accessing it unless given permission.</F.HelperText>
    </G.Toggle::Field>
  </Hds::Form::Toggle::Group>

  {{! ================= }}
  {{! ===== BASE  ===== }}
  {{! ================= }}

  <h4 class="dummy-h4">Form::Toggle::Base</h4>

  <p class="dummy-paragraph">
    As mentioned above, the "base" element is intended
    <strong>only</strong>
    for those rare cases where the "field" or "group" variants can't be used, and a custom implementation needs to be
    done. For this reason we will not go too much in detail on how to use it: most of the explanations above apply also
    to the "base" variant of the component, and for further details refer to the
    <a href="#component-api">Component API</a>
    section on this page, or speak with one of the design system team members.
  </p>
  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Notice: when the "base" toggle is used, the developer is completely responsible for the correct implementation of
    the form control, including its accessibility conformance.</p>
  <p class="dummy-paragraph">To give just an example, this could be an invocation of the "base" component you would use:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::Toggle::Base
  name="enable-cost-estimation"
  aria-label="Enable cost estimation"
  @value="enable"
  {{on "change" myAction}}
/>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::Toggle::Base
    name="enable-cost-estimation"
    aria-label="Enable cost estimation"
    @value="enable"
    {{on "change" this.noop}}
  />
  <p class="dummy-paragraph">This "base" component creates just the
    <code class="dummy-code">&lt;input type="checkbox"&gt;</code>
    control with an automatically generated
    <code class="dummy-code">ID</code>
    attribute.
  </p>

</section>
