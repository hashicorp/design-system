## Usage

### When to use

- To allow users to check or uncheck an option or setting.
- To allow users to select one or more options from a list.

### When not to use

- When only one choice can be selected, consider [Radio](/components/form/radio/) buttons.
- When checking or unchecking results in an immediate change, consider [Toggle](/components/form/toggle).

### Layout

We recommend using vertical Checkbox groups, especially with short option lists.

<Doc::Layout @spacing="48px">
  <Hds::Form::Checkbox::Group @layout="vertical" as |G|>
    <G.Legend>Vertical group</G.Legend>
    <G.Checkbox::Field as |F|>
      <F.Label>Label</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field as |F|>
      <F.Label>Label</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field as |F|>
      <F.Label>Label</F.Label>
    </G.Checkbox::Field>
  </Hds::Form::Checkbox::Group>
  <Hds::Form::Checkbox::Group @layout="horizontal" as |G|>
    <G.Legend>Horizontal group</G.Legend>
    <G.Checkbox::Field as |F|>
      <F.Label>Label</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field as |F|>
      <F.Label>Label</F.Label>
    </G.Checkbox::Field>
    <G.Checkbox::Field as |F|>
      <F.Label>Label</F.Label>
    </G.Checkbox::Field>
  </Hds::Form::Checkbox::Group>
</Doc::Layout>

### Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

<Hds::Form::Checkbox::Group @layout="vertical" @isRequired={{true}} as |G|>
  <G.Legend>Group label</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::Checkbox::Group @layout="vertical" @isOptional={{true}} as |G|>
  <G.Legend>Group label</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>

## Error validation

For error validation recommendations, refer to the [Primitives](/components/form/primitives) documentation.

## Content

For general content recommendations, refer to the [Primitives](/components/form/primitives) documentation.

## Related

- [Radio](/components/form/radio)
- [Toggle](/components/form/toggle)
