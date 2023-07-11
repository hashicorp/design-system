## Usage

### When to use

- To give users a way to show and hide sensitive information.

- When needing a form input with the ability to mask its value temporarily.

### When not to use

- To define a password field, use the [Password](/components/form/text-input#password) field instead.

- For general textual input, use the [TextInput](/components/form/text-input) or [Textarea](/components/form/textarea).


## Masked input vs Password input

The MaskedInput is a text field designed to protect sensitive or confidential information while still giving users the ability to show or hide the input value as needed.

A password field is a specific type of form control designed for secure entry of passwords. The value is always masked or hidden to prevent others from easily reading the entered characters. Unlike the masked input, the password field has specific attributes to enhance security and confidentiality of passwords.

### Usage examples

!!! Do

Use the MaskedInput for...

![Form with a masked input](/assets/components/form/masked-input/usage-do.png =770x*)
!!!

!!! Do

Use the MaskedInput for...

![Form with a multiline masked input](/assets/components/form/masked-input/usage-do-multiline.png =770x*)
!!!

!!! Dont

Don't use a MaskedInput when...

![Form with a masked input](/assets/components/form/masked-input/usage-dont.png =770x*)
!!!

## Multiline

Use `isMultiline` to display multiline textual content that requires a larger area. e.g., a Terraform variable. This property replaces the `TextInput` with a `Textarea` field.

## Required and optional

For complex forms, indicate required fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

<Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isRequired={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::MaskedInput::Field>

<Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isMultiline={{true}} @isRequired={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::MaskedInput::Field>

For shorter, simpler forms, indicate optional fields instead.

<Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isOptional={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::MaskedInput::Field>

<Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isMultiline={{true}} @isOptional={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::MaskedInput::Field>

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.

## Related

<!-- only include the 2 most similar/related components -->
- [TextInput](/components/form/text-input)
- [Textarea](/components/form/textarea)
