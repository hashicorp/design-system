## Usage

### When to use

- As a form element that provides users with a way to read, input, or edit data in a multi-line field.

### When not to use

- If needing a single-line input, consider [TextInput](/components/form/text-input).
- If needing to allow the user to make a selection from a predetermined list of options, consider [Checkbox](/components/form/checkbox), [Radio button](/components/form/radio), [Select](/components/form/select).

## Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

<Hds::Form::Textarea::Field @isRequired={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::Textarea::Field>

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::Textarea::Field @isOptional={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::Textarea::Field>

[Marking required fields in forms](https://www.nngroup.com/articles/required-fields/)

## Character count

For tracking the number of characters entered into a Textarea and defining requirements around minimum and maximum length, refer to the [Character count](/components/form/primitives#formcharactercount) documentation.

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.