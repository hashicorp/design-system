---
category: components
group: form
component: radio-card
section: how-to-use
---

# Form::RadioCard Component - How to use

#### Form::Radio::Group

##### Basic use

The simplest way to invoke a "radio" group is using something like this:

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

Renders to:

Create connection Quick peering with Quick Links Quick peering with quick links will provide the fastest way to connect to your providers’ network. Manual peering using AWS CLI Provide you AWS CLI template to apply connection settings. Manual peering using HCP and AWS web console Manually follow UI instructions to complete configuring a connection at provider side.

This "group" component creates:

*   a `<fieldset>` container
*   a `<legend>` element
*   a list of rendered `<Form::RadioCard>` components (with `aria-describedby` attributes automatically generated).

The `@name` argument offers an easy way to provide the same name for all the radio controls with a single declaration.

Note: The `<Hds::Form::RadioCard::Group>` component does not provide the logic for handling the mutually exclusive nature of radio controls (when a radio card is checked, any other radio cards with the same name that were previously checked become unchecked). You can implement this yourself in an `\{{on "change" this.onChange}}` function or manage the `checked` state of radio cards by updating the underlying data.

##### Custom content

You can define custom content using the `Generic` block and a custom width for the cards using the `maxWidth` argument. It is also possible to use multiple `Badge` component with custom icon or color.

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

Renders to:

Cluster type HCP-managed Consul

*   Connect workloads in your cloud provider network with HCP
*   Offload Consul operations to Hashicorp Experts

Self-managed Consul

*   Multi-cloud artifact registry
*   Golden images workflow
*   Terraform Cloud integration
*   10 free images/month
*   250 free requests/month