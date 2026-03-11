## How to use this component

!!! Insight

Given the complexity and level of custom code required to use this component, it is not possible to cover all the possible use cases in this documentation.

If you need assistance implementing a key-value input pattern using this component, or migrate an existing one, [contact the Design Systems Team](/about/support) for support.

!!!

The basic invocation of the Key Value Inputs requires the `@data` argument. This is used as the initial data to create the rows of inputs.

Each input is associated with a field, that contains a label; the input; and an optional indicator, helper text, and error message.

[[code-snippets/key-value-inputs-basic]]

### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indicator that the entire Key Value Inputs is required or optional.

[[code-snippets/key-value-inputs-indicators]]

To add the visual indicator to a specific field, use the `@isRequired`/`@isOptional` argument directly on the field itself.

[[code-snippets/key-value-inputs-field-indicators]]

### Validation

The Key Value Inputs can be validated at the fieldset level or on each individual field. You can choose which level is appropriate depending on the use case, but it is best practice to make any error message as specific as possible. Avoid putting the error on the fieldset if the issue occurs on a single field.

To display an error for the entire fieldset (the whole group of inputs), use the `[F].Error` component yielded by the `:footer` named block.

[[code-snippets/key-value-inputs-validation]]

To display an error on a single field, set the `isInvalid` argument on the `[R].Field` yielded component, and use the `[F].Error` yielded component.

[[code-snippets/key-value-inputs-field-validation]]

### Input types

The `Form::KeyValueInputs::Field` component yields [File Input](/components/form/file-input?tab=code#formfileinputbase-1), [Masked Input](/components/form/masked-input?tab=code#formmaskedinputbase-1), [Select](/components/form/select?tab=code#formselectbase-1), [SuperSelect::Single](/components/form/super-select?tab=code#superselectsinglebase), [SuperSelect::Multiple](/components/form/super-select?tab=code#superselectmultiplebase), [TextInput](/components/form/text-input?tab=code#formtextinputbase-1), and [Textarea](/components/form/textarea?tab=code#formtextareabase-1) inputs.

[[code-snippets/key-value-inputs-input-types]]

### Generic content

If there is additional content needed in the header or a need for an unsupported input type, there are generic slots available.

[[code-snippets/key-value-inputs-generic]]

### Field width

Fields are equal width by default. Use the Field’s `width` argument to customize field widths.

[[code-snippets/key-value-inputs-field-width]]

## Component interaction

!!! Info

Out of the box, the Key Value Inputs component provides only the overall layout and the UI elements it's made of. The component doesn't come with pre-defined interactions or UX patterns built-in in code. These are left to the consumers to implement, case by case , following the [general guidance described in the guidelines](/components/form/key-value-inputs?tab=guidelines).

!!!

Below we showcase a couple of examples of common patterns. They should be used as starting point, and adapted to the actual context and needs.

### Updating the rows

Consumers are responsible for handling the logic to add or remove a row. To do this, use the `onClick` argument to pass a callback function on the yielded `[F].AddRowButton` in the `:footer` named block or the yielded `[R].DeleteRowButton` in the `:row` named block.

[[code-snippets/key-value-inputs-update-rows]]

### Maximum number of rows

Consumers are responsible for implementing the logic for the maximum number of rows a user can add. If they have reached the maximum number of rows, you can use the yielded Alert in the `:footer` named block to notify them, and remove the yielded `[F].AddRowButton`.

[[code-snippets/key-value-inputs-max-rows]]
