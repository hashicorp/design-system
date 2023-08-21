## Usage

### When to use

- To give users a way to show and hide sensitive information.

- When a form input with the ability to mask its value temporarily is needed.

### When not to use

- For passwords, use the [Password](/components/form/text-input#password) input instead.

- For general textual input, use the [TextInput](/components/form/text-input) or [Textarea](/components/form/textarea).


## Masked input vs Password input

The Masked Input is a text field designed to protect sensitive or confidential information while allowing users to show or hide the input value as needed.

The password input is a specific type of form control designed for the secure entry of passwords. The value is always masked or hidden to prevent others from reading the entered characters easily. Unlike the Masked Input, the password input has specific attributes to enhance the security and confidentiality of passwords.

### Usage examples

!!! Do

Use the Masked Input to protect sensitive values like secret keys or tokens.

![Form with a masked input](/assets/components/form/masked-input/usage-do.png =770x*)
!!!

!!! Do

Use the Masked Input to protect sensitive values like variables and certificates from unintended exposure.

![Form with a multiline masked input](/assets/components/form/masked-input/usage-do-multiline.png =770x*)
!!!

!!! Dont

Don’t use a Masked Input for password input. Use the [Password](/components/form/text-input#password) input.

![Form with a masked input](/assets/components/form/masked-input/usage-dont.png =770x*)
!!!

## Multiline

Use `isMultiline` to display multiline textual content. e.g., a Terraform variable. This property replaces the `TextInput` with a `Textarea` field.

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

## Copyable masked input 

The new boolean property allows for toggling the display of a Copy Button on the right side of the MaskedInput. When set to `true,` the Copy Button becomes visible, helping users to copy the masked content to their clipboard. Refer to the [copybutton](www.helios.com/copy/copy-button) usage guidelines to learn more about copying content. 

![Masked input with a copy button](/assets/components/form/masked-input/masked-input-has-copy-button.png)

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation
