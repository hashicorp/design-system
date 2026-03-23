## How to use this component

There are two ways to use the Masked Input component:

- `Form::MaskedInput::Base` - the base component: the input control with a toggle button.
- `Form::MaskedInput::Field` - the field component: the input control with a toggle button, a label, helper text, and error messaging (in a wrapping container).

We recommend using the Field component as it provides built-in accessibility functionality. Use the Base component to achieve custom layouts or for special use cases not covered by the Field component.

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

### Form::MaskedInput::Field

The basic invocation requires a `Label`. This creates:

- a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute.
- a `<input type="text">` or a `<textarea>` control with an automatically generated `ID` attribute.

[[code-snippets/masked-input-basic]]

#### Input value

Pass a `@value` argument to pre-populate the input. By default, the content is visually obfuscated ("masked") and users can make it visible using the associated toggle button.

[[code-snippets/masked-input-value]]

If you need to make the content visible by default or control the masking from outside the component, use the `@isContentMasked` argument.

[[code-snippets/masked-input-default-visible]]

#### Multiline

!!! Info

**Code consideration**

When the multiline input is masked, the browser converts newline characters to masked characters: this means that the multiline text will appear as a single long string of characters, even if it’s inside a `<textarea>` element.

When the text is not masked, the newline characters will be respected. This means it may occupy more lines than when it’s masked (see the example above).

Something to keep in mind when designing and implementing functionality that makes use of this component.
!!!

Set `@isMultiline` argument to `true` to render a `<textarea>`

[[code-snippets/masked-input-multiline]]

#### Copy button

To allow users to copy the input value to their clipboard, set the `@hasCopyButton` argument to `true`.

[[code-snippets/masked-input-copy-button]]

#### Helper text

You can add extra information to the field using helper text. When helper text is added, the component automatically adds an `aria-describedby` attribute to the input control, associating it with the automatically generated `ID` of the helper text element.

[[code-snippets/masked-input-helper-text]]

#### Extra content in label and helper text

!!! Info

**Accessibility consideration**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

[[code-snippets/masked-input-extra-content]]

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is "required" or "optional".

[[code-snippets/masked-input-indicators]]

#### Character count

If the user input needs to be limited to a certain number of characters, use `@maxLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements. This property does not restrict the users from entering characters over the limit. To define the maximum string length that the user can enter, set `maxlength` attribute on the associated input field.

[[code-snippets/masked-input-character-count]]

If the user input is required to have a certain number of characters, use `@minLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements.

[[code-snippets/masked-input-character-count-min]]

When the user input needs to be in a certain range, use both `@minLength` and `@maxLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements.

[[code-snippets/masked-input-character-count-range]]

##### Custom message

For custom messages, you can use the following arguments to build a relevant message: `currentLength` (the current number of characters in the associated form control), `maxLength` (the maximum number of characters allowed in the associated form control), `minLength` (the minimum number of characters required in the associated form control), `remaining` (the difference between `maxLength` and `currentLength`), and `shortfall` (the difference between `currentLength` and `minLength`).

[[code-snippets/masked-input-character-count-custom]]

##### Validation based on length

You can raise an error based on the number of characters entered into a field using a custom validation function.

[[code-snippets/masked-input-character-count-validation]]

#### Validation

To indicate a field is invalid, use the `@isInvalid` argument and provide an error message using the `Error` contextual component.

[[code-snippets/masked-input-validation]]

Add more than one error message using the more specific `Message` contextual component.

[[code-snippets/masked-input-multiple-errors]]

#### Custom control ID

If a custom ID is needed for the control instead of the one automatically generated by the component, pass the `@id` argument to the field.

!!! Info

In this case, all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated and will use the custom ID provided.
!!!

[[code-snippets/masked-input-custom-id]]

#### Additional `aria-describedby`

Pass an `@extraAriaDescribedBy` argument to the field to connect one or more extra elements describing the field to the control. This provides extra ID values to the `aria-describedby` attribute of the control, in addition to those automatically generated by the component.

[[code-snippets/masked-input-extra-describedby]]

#### HTML native attributes

This component supports use of `...attributes`. This means you can use all the standard HTML attributes of the input control element. This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (e.g., providing a `name` for the control, or adding `min`, `max`, `minlength`, `maxlength`, or `pattern` attributes to it).

[[code-snippets/masked-input-attrs]]

#### Events handling

This component supports the use of `...attributes`, which allows you to use all the usual Ember techniques for event handling (e.g., `input`, `blur`, `change`), validation, etc.

[[code-snippets/masked-input-events]]

#### Custom width

By default, the input control width is set to fill the parent container.

Pass a custom width for the control using the `@width` argument.

[[code-snippets/masked-input-custom-width]]

{{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

### Form::MaskedInput::Base

!!! Warning

`Form::MaskedInput::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

The Base component is intended for rare cases where the Field component can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

The default invocation creates a `<input type="text">` or a `<textarea>` control with an automatically generated `ID` attribute.

[[code-snippets/masked-input-base]]

!!! Info

**Code consideration**

When the multiline input is masked, the browser converts newline characters to masked characters: this means that the multiline text will appear as a single long string of characters, even though it’s inside a `<textarea>` element.

Instead, when the text is not masked it will respect the newline characters: this means it may occupy more lines that when it’s masked (try the example above).

Something to keep in mind when designing and implementing functionality that requires this component.
!!!

When the `@isMultiline` argument is set to `true`, it creates a `<textarea>` control with an automatically generated `ID` attribute. You can adjust the height of `<textarea>` either by using the `rows` attribute or by setting a custom `@height` value.

[[code-snippets/masked-input-base-multiline]]
