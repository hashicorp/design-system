## Usage

### When to use

- To give users a way to show and hide sensitive information.
- When needing a form input with the ability to mask its value temporarily.

### When not to use

- To define a password field, use the [Password](/components/form/text-input#password) field instead.
- For general textual input, use the [TextInput](/components/form/text-input) or [Textarea](/components/form/textarea).

### Usage examples


## Sensitive vs Password input

A password field is a specific type of form control designed for secure entry of passwords. The value is always masked or hidden to prevent others from easily reading the entered characters. Unlike the sensitive input, the password field has specific attributes to enhance security and confidentiality of passwords.

The sensitive input is a text field designed to protect sensitive or confidential information while still giving users the ability to show or hide the input value as needed.

## Multiline

Use `isMultiline` to display multiline textual content that requires a larger area. e.g., A Terraform variable. This property replaces the `TextInput` with a `Textarea` field.

## Required and optional

For complex forms, indicate required fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.

## Related

<!-- only include the 2 most similar/related components -->
- [TextInput](/components/form/text-input)
- [Textarea](/components/form/textarea)
