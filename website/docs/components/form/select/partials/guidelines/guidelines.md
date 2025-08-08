## Usage

### When to use

- As a form element that allows the user to make a selection from a pre-defined set of options.

### When not to use

- When a user can select more than one option, consider [Checkbox](/components/form/checkbox).
- When there are fewer than 5 options, consider [Radio](/components/form/radio).
- To display a list of buttons or links in a menu, consider [Dropdown](/components/dropdown).

## Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

If the field is required, consider adding a default value to help the user avoid an error.

<Hds::Form::Select::Field @isRequired={{true}} as |F|>
    <F.Label>Label</F.Label>
    <F.Options>
        <option value="Option 1" selected>Option 1</option>
        <option value="Option 2">Option 2</option>
    </F.Options>
</Hds::Form::Select::Field>

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::Select::Field @isOptional={{true}} as |F|>
    <F.Label>Label</F.Label>
    <F.Options>
        <option value="">--Optional select--</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
    </F.Options>
</Hds::Form::Select::Field>

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.