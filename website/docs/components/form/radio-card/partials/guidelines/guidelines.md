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

## Legend style

### Default style

When placed along with other form components, we recommend using the default legend style provided by the component.

![Default legend style](/assets/components/form/radio-card/radio-card-default-legend.png =600x*)

### Display style

When using the Radio Card Group as its own section, we recommend using `Display/400/Bold` for the legend.

![Display/400/Bold legend style](/assets/components/form/radio-card/radio-card-heading.png =600x*)

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.

## Content

### Form::Label

!!! Warning

**Labels and link**

Labels are part of the radio’s selectable area, making them interactive elements. This means that links inside labels are nested interactive elements and cannot be reached by assistive technology. If you plan to add links to radios, please contact the Design Systems Team for guidance.
!!!

For general content recommendations, refer to the [Primitives](/components/form/primitives) documentation.

## Related

- [Radio](/components/form/radio)
- [Card](/components/card)
