## How to use this component

`Form::RadioCard::Group` creates:

- a `<fieldset>` container
- a `<legend>` element
- a list of rendered `<Form::RadioCard>` components (with `aria-describedby` attributes automatically generated).

!!! Warning

The `<Hds::Form::RadioCard::Group>` component does not provide the logic for handling the mutually exclusive nature of radio controls (when a Radio Card is checked, any other Radio Cards with the same name that were previously checked become unchecked). You can implement this yourself in an `\{{on "change" this.onChange}}` function or manage the `checked` state of Radio Cards by updating the underlying data.
!!!

The `@name` argument offers an easy way to provide the same name for all the radio controls with a single declaration.

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

### Custom content

Customizable options include:

- Defining custom content using the `Generic` block
- Defining a custom width using the `maxWidth` argument
- Adding multiple [Badge](/components/badge) components

```handlebars
<Hds::Form::RadioCard::Group @name="radio-card-custom-example" as |G|>
  <G.Legend>Cluster type</G.Legend>
  <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
    <R.Label>HCP-managed Consul</R.Label>
    <R.Badge @text="6 clusters left" />
    <R.Generic>
      <ul class="doc-radio-card-list-demo">
        <li class="hds-typography-display-100">Connect workloads in your cloud provider network with HCP</li>
        <li class="hds-typography-display-100">Offload Consul operations to Hashicorp Experts</li>
      </ul>
    </R.Generic>
  </G.RadioCard>
  <G.RadioCard {{on "change" this.onChange}} as |R|>
    <R.Label>Self-managed Consul</R.Label>
    <R.Badge @text="5 clusters left" />
    <R.Badge @text="Kubernetes only" @icon="kubernetes" />
    <R.Generic>
      <ul class="doc-radio-card-list-demo">
        <li class="hds-typography-display-100">Multi-cloud artifact registry</li>
        <li class="hds-typography-display-100">Golden images workflow</li>
        <li class="hds-typography-display-100">Terraform Cloud integration</li>
        <li class="hds-typography-display-100">10 free images/month</li>
        <li class="hds-typography-display-100">250 free requests/month</li>
      </ul>
    </R.Generic>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>
```

### Layout and control position

To change how the cards are layed out in a group set the `@layout` argument to `vertical`. To change the position of the control elements within a card set the `@controlPosition` argument to `left`.

```handlebars
<Hds::Form::RadioCard::Group
  @name="radio-card-layout-vertical"
  @layout="vertical"
  @controlPosition="left" as |G|
>
  <G.Legend>Allow this source connect to the destination</G.Legend>
  <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
    <R.Label>Admin</R.Label>
    <R.Description>Grants full admin capabilities for this project and all workspaces within. Team members can edit and delete this project, manage the team access level, and create and move workspaces.</R.Description>
  </G.RadioCard>
  <G.RadioCard {{on "change" this.onChange}} as |R|>
    <R.Label>Read</R.Label>
    <R.Description>Grants full admin capabilities for this project and all workspaces within. Team members can manage the team access level, and create and move workspaces.</R.Description>
  </G.RadioCard>
  <G.RadioCard {{on "change" this.onChange}} as |R|>
    <R.Label>Write</R.Label>
    <R.Description>Grants full admin capabilities for this project and all workspaces within. Team members can edit this project, manage the team access level, and create and move workspaces.</R.Description>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>
```
