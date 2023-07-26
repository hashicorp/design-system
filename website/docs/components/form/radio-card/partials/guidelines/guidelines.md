## Usage

Use the Radio Card Group in most cases. Use individual Radio Cards only in special cases and sparingly.

### When to use

- To allow users to select a single option from a group of two or more Radio Cards.

### When not to use

- As a static card, use a [Card](/components/card)
- When a user could select multiple options, use a [Checkbox](/components/form/checkbox)

## Control position

In most cases, we recommend using the bottom position. Still, we offer Radio Cards in a left position, which is a good option when the content in the cards is minimal.

### Bottom

<Hds::Form::RadioCard::Group @name="control-position-bottom" @controlPosition="bottom" as |G|>
  <G.RadioCard @maxWidth="33%" as |R|>
    <R.Icon @name="layers" />
    <R.Label>L7 permissions</R.Label>
    <R.Description>The source service may or may not connect to the destination service via unique permissions based on L7 criteria: path, header, or method.</R.Description>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

### Left

<Hds::Form::RadioCard::Group @name="control-position-left" @controlPosition="left" as |G|>
  <G.RadioCard @maxWidth="50%" as |R|>
    <R.Label>Use a preset</R.Label>
    <R.Description>Choose the authenticator you’ll be working with; Vault populates default settings.</R.Description>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

## Alignment

### Left

<Hds::Form::RadioCard::Group @alignment="left" @name="control-position-bottom" @controlPosition="bottom" as |G|>
  <G.RadioCard @maxWidth="33%" as |R|>
    <R.Icon @name="layers" />
    <R.Label>L7 permissions</R.Label>
    <R.Description>The source service may or may not connect to the destination service via unique permissions based on L7 criteria: path, header, or method.</R.Description>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

### Center

<Hds::Form::RadioCard::Group @alignment="center" @name="control-position-bottom" @controlPosition="bottom" as |G|>
  <G.RadioCard @maxWidth="33%" as |R|>
    <R.Icon @name="grafana-color" />
    <R.Label>Grafana Cloud</R.Label>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

## Layout

In most cases, use the horizontal layout to maximize the real estate available. Use the vertical layout intentionally when assembled with other components within limited horizontal space, or when needing to create a vertical options list with radio cards.

### Horizontal

<Hds::Form::RadioCard::Group @name="radio-card-horizontal-layout" as |G|>
  <G.Legend>Allow this source connect to the destination</G.Legend>
  <G.RadioCard @checked={{true}} {{on "change" this.onChange}} as |R|>
    <R.Icon @name="arrow-right" @color="var(--token-color-foreground-success)" />
    <R.Label>Allow</R.Label>
    <R.Description>The source service will be allowed to connect to the destination.</R.Description>
  </G.RadioCard>
  <G.RadioCard {{on "change" this.onChange}} as |R|>
    <R.Icon @name="skip" @color="var(--token-color-foreground-critical)" />
    <R.Label>Deny</R.Label>
    <R.Description>The source service will not be allowed to connect to the destination.</R.Description>
  </G.RadioCard>
  <G.RadioCard {{on "change" this.onChange}} as |R|>
    <R.Icon @name="layers" @color="var(--token-color-foreground-primary)" />
    <R.Label>Application aware</R.Label>
    <R.Description>The source may or may not connect to the destination service via unique permissions based on Layer 7 criteria: path, header, or method.</R.Description>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

### Vertical

<Hds::Form::RadioCard::Group @name="radio-card-vertical-layout" @controlPosition="left" @layout="vertical" as |G|>
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

## Nested badge

Badges can be used in radio cards to display additional information and context. To ensure proper usage of the badge component, refer to the [guidelines](/components/badge).

<Hds::Form::RadioCard::Group @name="radio-card-nested-badge" as |G|>
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

## Legend style

### Default style

When placed along with other form components, we recommend using the default legend style provided by the component.

![Default legend style](/assets/components/form/radio-card/radio-card-default-legend.png =600x*)

### Display style

When using the Radio Card Group as its own section, we recommend using `Display/400/Bold` for the legend.

![Display/400/Bold legend style](/assets/components/form/radio-card/radio-card-heading.png =600x*)

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.

## Content

### Form::Label

!!! Warning

**Labels and link**

Labels are part of the radio’s selectable area, making them interactive elements. This means that links inside labels are nested interactive elements and cannot be reached by assistive technology. If you plan to add links to radios, please contact the Design Systems Team for guidance.
!!!

For general content recommendations, refer to the [Primitives](/components/form/primitives) documentation.
