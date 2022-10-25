<h1>Form::RadioCard Component - How to use</h1>

<section data-section="how-to-use">
  

  <h4 class="dummy-h4">Form::Radio::Group</h4>

  <h5 class="dummy-h5">Basic use</h5>
  <p class="dummy-paragraph">The simplest way to invoke a "radio" group is using something like this:</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::RadioCard::Group @name="radio-card-basic-example" @alignment="center" as |G|>
  <G.Legend>Create connection</G.Legend>
    <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
      <R.Icon @name="aws-color" />
      <R.Label>Quick peering with Quick Links</R.Label>
      <R.Badge @text="2-5 min" />
      <R.Description>Quick peering with quick links will provide the fastest way to connect to your providers’ network.</R.Description>
    </G.RadioCard>
    <G.RadioCard {{on "change" this.onChange}} as |R|>
      <R.Icon @name="aws-color" />
      <R.Label>Manual peering using AWS CLI</R.Label>
      <R.Badge @text="5-10 min" />
      <R.Description>Provide you AWS CLI template to apply connection settings.</R.Description>
    </G.RadioCard>
    <G.RadioCard {{on "change" this.onChange}} as |R|>
      <R.Icon @name="hcp" />
      <R.Label>Manual peering using HCP and AWS web console</R.Label>
      <R.Badge @text="30-60 min" />
      <R.Description>Manually follow UI instructions to complete configuring a connection at provider side.</R.Description>
    </G.RadioCard>
</Hds::Form::RadioCard::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::RadioCard::Group @name="radio-card-basic-example" @alignment="center" as |G|>
    <G.Legend>Create connection</G.Legend>
    <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
      <R.Icon @name="aws-color" />
      <R.Label>Quick peering with Quick Links</R.Label>
      <R.Badge @text="2-5 min" />
      <R.Description>Quick peering with quick links will provide the fastest way to connect to your providers’ network.</R.Description>
    </G.RadioCard>
    <G.RadioCard {{on "change" this.onChange}} as |R|>
      <R.Icon @name="aws-color" />
      <R.Label>Manual peering using AWS CLI</R.Label>
      <R.Badge @text="5-10 min" />
      <R.Description>Provide you AWS CLI template to apply connection settings.</R.Description>
    </G.RadioCard>
    <G.RadioCard {{on "change" this.onChange}} as |R|>
      <R.Icon @name="hcp" />
      <R.Label>Manual peering using HCP and AWS web console</R.Label>
      <R.Badge @text="30-60 min" />
      <R.Description>Manually follow UI instructions to complete configuring a connection at provider side.</R.Description>
    </G.RadioCard>
  </Hds::Form::RadioCard::Group>

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
      <code class="dummy-code">&lt;Form::RadioCard&gt;</code>
      components (with
      <code class="dummy-code">aria-describedby</code>
      attributes automatically generated).</li>
  </ul>
  <p class="dummy-paragraph">The
    <code class="dummy-code">@name</code>
    argument offers an easy way to provide the same name for all the radio controls with a single declaration.
  </p>

  <p class="dummy-banner dummy-banner--info dummy-paragraph"><FlightIcon @name="info" />
    Note: The
    <code class="dummy-code">&lt;Hds::Form::RadioCard::Group&gt;</code>
    component does not provide the logic for handling the mutually exclusive nature of radio controls (when a radio card
    is checked, any other radio cards with the same name that were previously checked become unchecked). You can
    implement this yourself in an
    <code class="dummy-code">\{{on "change" this.onChange}}</code>
    function or manage the
    <code class="dummy-code">checked</code>
    state of radio cards by updating the underlying data.

  </p>

  <h5 class="dummy-h5">Custom content</h5>
  <p class="dummy-paragraph">You can define custom content using the
    <code class="dummy-code">Generic</code>
    block and a custom width for the cards using the
    <code class="dummy-code">maxWidth</code>
    argument. It is also possible to use multiple
    <code class="dummy-code">Badge</code>
    component with custom icon or color.</p>
  
  
  <!-- prettier-ignore-start -->
```handlebars
<Hds::Form::RadioCard::Group @name="radio-card-custom-example" as |G|>
  <G.Legend>Cluster type</G.Legend>
  <G.RadioCard @maxWidth="33%" @checked={{true}} {{on "change" this.onChange}} as |R|>
    <R.Label>HCP-managed Consul</R.Label>
    <R.Badge @text="6 clusters left" />
    <R.Generic>
      <ul>
        <li>Connect workloads in your cloud provider network with HCP</li>
        <li>Offload Consul operations to Hashicorp Experts</li>
      </ul>
    </R.Generic>
  </G.RadioCard>
  <G.RadioCard @maxWidth="33%" {{on "change" this.onChange}} as |R|>
    <R.Label>Self-managed Consul</R.Label>
    <R.Badge @text="5 clusters left" />
    <R.Badge @text="Kubernetes only" @icon="kubernetes" />
    <R.Generic>
      <ul>
        <li>Multi-cloud artifact registry</li>
        <li>Golden images workflow</li>
        <li>Terraform Cloud integration</li>
        <li>10 free images/month</li>
        <li>250 free requests/month</li>
      </ul>
    </R.Generic>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>
```
<!-- prettier-ignore-end -->

  
  
  <p class="dummy-paragraph">Renders to:</p>
  <Hds::Form::RadioCard::Group @name="radio-card-custom-example" as |G|>
    <G.Legend>Cluster type</G.Legend>
    <G.RadioCard @maxWidth="33%" @checked={{true}} {{on "change" this.onChange}} as |R|>
      <R.Label>HCP-managed Consul</R.Label>
      <R.Badge @text="6 clusters left" />
      <R.Generic>
        <ul class="dummy-form-radio-card-custom-content">
          <li>Connect workloads in your cloud provider network with HCP</li>
          <li>Offload Consul operations to Hashicorp Experts</li>
        </ul>
      </R.Generic>
    </G.RadioCard>
    <G.RadioCard @maxWidth="33%" {{on "change" this.onChange}} as |R|>
      <R.Label>Self-managed Consul</R.Label>
      <R.Badge @text="5 clusters left" />
      <R.Badge @text="Kubernetes only" @icon="kubernetes" />
      <R.Generic>
        <ul class="dummy-form-radio-card-custom-content">
          <li>Multi-cloud artifact registry</li>
          <li>Golden images workflow</li>
          <li>Terraform Cloud integration</li>
          <li>10 free images/month</li>
          <li>250 free requests/month</li>
        </ul>
      </R.Generic>
    </G.RadioCard>
  </Hds::Form::RadioCard::Group>
</section>
