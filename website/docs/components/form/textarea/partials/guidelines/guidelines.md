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

## Character Count

!!! Warning

**Consumer responsibility**

The character count is not coupled with the invalid state of the field. Instead, it is the responsibility of the consumer to implement validation at the application-level.
!!!

Use a character count to communicate the current length of the value in a textarea and whether it meets or exceeds the length requirements passed to the component. The component accepts multiple arguments to set length requirements and exposes several computed values to support custom messages. Visit the [primitive code](/components/form/primitives?tab=code#formcharactercount-1) documentation for more details.

### Default messages

Depending on which property (or properties) are passed to the component, a different default message will be displayed by the component to communicate the relationship between the current length of the textarea value (`currentLength`) and the maximum length (`maxLength`), minimum length (`minLength`), or both.

<video width="100%" controls loop>
  <source
    src="/assets/components/form/textarea/textarea-character-count-default-interactions.mp4"
    type="video/mp4"
  />
</video>

_Test and interact with the default messaging examples in the [primitive code](/components/form/primitives?tab=code#formcharactercount-1) documentation._

The default messages provide a consistent messaging pattern for the component by clearly communicating length requirements to the user while displaying their progress towards meeting the requirements.

![A workspace name textarea with the text "work" entered. If the character count is showing current length, it reads "4 characters entered". If maximum length, it reads "21 characters remaining". If minimum length, it reads "1 character remaining".](/assets/components/form/textarea/textarea-character-count-defaults-filled.png)

### Usage in Figma

For representative consistency, the Figma component mirrors the default messages that are rendered in the Ember component and are labelled as such; `currentLength` (the default variant), `maxLength`, `minLength`, and `custom`.

In all variants except the `custom` variant, we recommend _only_ overriding the numerical value (e.g., "{numerical value} characters is allowed"). Overriding the text in these variants will require a custom implementation on the engineering side, instead, the `custom` variant should be used.

### Custom messages

A custom message in the character count is supported and can be used when a product or application-specific message or term is required, e.g., "registry" or "workspace".

!!! Dont

Avoid presenting duplicate information between the helper text and the character count. Helper text should be used to provide persistent requirements while character count represents more of a progress indicator towards a length requirement.

![Workspace name textarea where the helper text says there is a 5 character minimum and the character count below the textarea also says there is a 5 character minimum.](/assets/components/form/textarea/textarea-character-count-dont-helper-text-overlap.png)

!!!

!!! Dont

Don’t use the character count to display static details about the field. Use [helper text](/components/form/primitives?tab=content#helper-text) to provide extra details about the information being requested and the character count to communicate the user’s progress toward meeting the requirements.

![](/assets/components/form/textarea/textarea-character-count-dont-helper-text.png)

!!!

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.