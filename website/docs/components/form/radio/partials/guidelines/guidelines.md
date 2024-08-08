## Usage

### When to use

- To allow users to select a single option from a group of two or more mutually exclusive options.

### When not to use

- When users should check and uncheck an option, consider [Checkbox](/components/form/checkbox).
- When users need to select more than one option from a list, consider [Checkbox](/components/form/checkbox).
- When checking or unchecking results in an immediate change, consider [Toggle](/components/form/toggle).

### Layout

We recommend using vertical Radio groups, especially with short option lists.

<Doc::Layout @spacing="48px">
  <Hds::Form::Radio::Group @layout="vertical" @name="group" as |G|>
    <G.Legend>Vertical group</G.Legend>
    <G.RadioField as |F|>
      <F.Label>Label</F.Label>
    </G.RadioField>
    <G.RadioField as |F|>
      <F.Label>Label</F.Label>
    </G.RadioField>
    <G.RadioField as |F|>
      <F.Label>Label</F.Label>
    </G.RadioField>
  </Hds::Form::Radio::Group>
  <Hds::Form::Radio::Group @layout="horizontal" @name="group" as |G|>
    <G.Legend>Horizontal group</G.Legend>
    <G.RadioField as |F|>
      <F.Label>Label</F.Label>
    </G.RadioField>
    <G.RadioField as |F|>
      <F.Label>Label</F.Label>
    </G.RadioField>
    <G.RadioField as |F|>
      <F.Label>Label</F.Label>
    </G.RadioField>
  </Hds::Form::Radio::Group>
</Doc::Layout>

### Required and optional

Generally, we recommend pre-selecting one of the radio buttons by default. However, there could be cases where the default selection could affect the user’s choice (the power of suggestion), and leaving all radio buttons unselected may provide a better user experience. Use required and optional indicators in those instances.

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

<Hds::Form::Radio::Group @isRequired={{true}} @layout="vertical" @name="group" as |G|>
  <G.Legend>Group label</G.Legend>
  <G.RadioField as |F|>
    <F.Label>Label</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>Label</F.Label>
  </G.RadioField>
</Hds::Form::Radio::Group>

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::Radio::Group @isOptional={{true}} @layout="vertical" @name="group" as |G|>
  <G.Legend>Group label</G.Legend>
  <G.RadioField as |F|>
    <F.Label>Label</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>Label</F.Label>
  </G.RadioField>
</Hds::Form::Radio::Group>

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.

## Generic content

The radio field and group both support the addition of generic content below all other sub-components in both horizontal and vertical variants.

![Showing generic instances appending below the radio field and group types and vertical and horizontal variants](/assets/components/form/radio/radio-generic-instance.png)

## Content

For general content recommendations, refer to the [Primitives](/components/form/primitives) documentation.