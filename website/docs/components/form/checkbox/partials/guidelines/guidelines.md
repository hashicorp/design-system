## Usage

### When to use

- To allow users to check or uncheck an option or setting.
- To allow users to select one or more options from a list.

### When not to use

- When only one choice can be selected, consider [Radio](/components/form/radio/) buttons.
- When checking or unchecking results in an immediate change, consider [Toggle](/components/form/toggle).

## Layout

We recommend using vertical Checkbox groups, especially with short option lists.

<Doc::Layout @spacing="48px">
  <Hds::Form::Checkbox::Group @layout="vertical" as |G|>
    <G.Legend>Vertical group</G.Legend>
    <G.CheckboxField as |F|>
      <F.Label>Label</F.Label>
    </G.CheckboxField>
    <G.CheckboxField as |F|>
      <F.Label>Label</F.Label>
    </G.CheckboxField>
    <G.CheckboxField as |F|>
      <F.Label>Label</F.Label>
    </G.CheckboxField>
  </Hds::Form::Checkbox::Group>
  <Hds::Form::Checkbox::Group @layout="horizontal" as |G|>
    <G.Legend>Horizontal group</G.Legend>
    <G.CheckboxField as |F|>
      <F.Label>Label</F.Label>
    </G.CheckboxField>
    <G.CheckboxField as |F|>
      <F.Label>Label</F.Label>
    </G.CheckboxField>
    <G.CheckboxField as |F|>
      <F.Label>Label</F.Label>
    </G.CheckboxField>
  </Hds::Form::Checkbox::Group>
</Doc::Layout>

## Indeterminate state

Indeterminate states indicate a "partially checked" condition in nested structures or tables. 

!!! Do

![Example of proper usage of the indeterminate state in the checkbox] (/assets/components/form/checkbox/checkbox-indeterminate-do.png)
!!!

!!! Dont

![Example of misuse of the indeterminate state in the checkbox] (/assets/components/form/checkbox/checkbox-indeterminate-dont.png)
!!!

## Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

<Hds::Form::Checkbox::Group @layout="vertical" @isRequired={{true}} as |G|>
  <G.Legend>Group label</G.Legend>
  <G.CheckboxField as |F|>
    <F.Label>Label</F.Label>
  </G.CheckboxField>
  <G.CheckboxField as |F|>
    <F.Label>Label</F.Label>
  </G.CheckboxField>
</Hds::Form::Checkbox::Group>

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::Checkbox::Group @layout="vertical" @isOptional={{true}} as |G|>
  <G.Legend>Group label</G.Legend>
  <G.CheckboxField as |F|>
    <F.Label>Label</F.Label>
  </G.CheckboxField>
  <G.CheckboxField as |F|>
    <F.Label>Label</F.Label>
  </G.CheckboxField>
</Hds::Form::Checkbox::Group>

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.
