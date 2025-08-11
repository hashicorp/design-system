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

<Doc::Layout @spacing="16px">
  <Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isRequired={{true}} @width="300px" as |F|>
    <F.Label>Label</F.Label>
  </Hds::Form::MaskedInput::Field>
  <Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isMultiline={{true}} @isRequired={{true}} @width="300px" as |F|>
    <F.Label>Label</F.Label>
  </Hds::Form::MaskedInput::Field>
</Doc::Layout>

For shorter, simpler forms, indicate optional fields instead.

<Doc::Layout @spacing="16px">
  <Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isOptional={{true}} @width="300px" as |F|>
    <F.Label>Label</F.Label>
  </Hds::Form::MaskedInput::Field>
  <Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isMultiline={{true}} @isOptional={{true}} @width="300px" as |F|>
    <F.Label>Label</F.Label>
  </Hds::Form::MaskedInput::Field>
</Doc::Layout>

## Copying the Masked Input value

Setting the `hasCopyButton` property to `true` will display a [Copy Button](/components/copy/button) adjacent to the Masked Input, allowing users to copy the value in the Masked Input to their clipboard. Refer to the [Copy Button](/components/copy/button) usage guidelines for more details around copying content. 

<Doc::Layout @spacing="16px">
  <Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @width="300px" @hasCopyButton={{true}} as |F|>
    <F.Label>Label</F.Label>
  </Hds::Form::MaskedInput::Field>
  <Hds::Form::MaskedInput::Field @value="0362df4996ca864b4df9e42cba0d6d" @isMultiline={{true}} @width="300px" @hasCopyButton={{true}} as |F|>
    <F.Label>Label</F.Label>
  </Hds::Form::MaskedInput::Field>
</Doc::Layout>

## Character Count

!!! Warning

**Consumer responsibility**

The character count is not coupled with the invalid state of the field. Instead, it is the responsibility of the consumer to implement validation at the application-level.
!!!

Use a character count to communicate the current length of the value in an input and whether it meets or exceeds the length requirements passed to the component. The component accepts multiple arguments to set length requirements and exposes several computed values to support custom messages. Visit the [primitive code](/components/form/primitives?tab=code#formcharactercount-1) documentation for more details.

### Default messages

Depending on which property (or properties) are passed to the component, a different default message will be displayed by the component to communicate the relationship between the current length of the input value (`currentLength`) and the maximum length (`maxLength`), minimum length (`minLength`), or both.

<video width="100%" controls loop>
  <source
    src="/assets/components/form/masked-input/masked-input-character-count-default-interactions.mp4"
    type="video/mp4"
  />
</video>

_Test and interact with the default messaging examples in the [primitive code](/components/form/primitives?tab=code#formcharactercount-1) documentation._

The default messages provide a consistent messaging pattern for the component by clearly communicating length requirements to the user while displaying their progress towards meeting the requirements.

![A workspace name input with the text "work" entered. If the character count is showing current length, it reads "4 characters entered". If maximum length, it reads "21 characters remaining". If minimum length, it reads "1 character remaining".](/assets/components/form/masked-input/masked-input-character-count-defaults-filled.png)

### Usage in Figma

For representative consistency, the Figma component mirrors the default messages that are rendered in the Ember component and are labelled as such; `currentLength` (the default variant), `maxLength`, `minLength`, and `custom`.

In all variants except the `custom` variant, we recommend _only_ overriding the numerical value (e.g., "{numerical value} characters is allowed"). Overriding the text in these variants will require a custom implementation on the engineering side, instead, the `custom` variant should be used.

### Custom messages

A custom message in the character count is supported and can be used when a product or application-specific message or term is required, e.g., "registry" or "workspace".

!!! Dont

Avoid presenting duplicate information between the helper text and the character count. Helper text should be used to provide persistent requirements while character count represents more of a progress indicator towards a length requirement.

![Workspace name input where the helper text says there is a 5 character minimum and the character count below the input also says there is a 5 character minimum.](/assets/components/form/masked-input/masked-input-character-count-dont-helper-text-overlap.png)

!!!

!!! Dont

Don’t use the character count to display static details about the field. Use [helper text](/components/form/primitives?tab=content#helper-text) to provide extra details about the information being requested and the character count to communicate the user’s progress toward meeting the requirements.

![](/assets/components/form/masked-input/masked-input-character-count-dont-helper-text.png)

!!!

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.