## How to use this component

### Form::Label

The default invocation requires text to be passed and a `controlId` argument (the ID of the form control associated with the label).

[[code-snippets/form-primitives-basic]]

Pass an `isRequired` argument, when user input is required for the associated form control.

[[code-snippets/form-primitives-required]]

Pass an `isOptional` argument, when the user input is optional for the associated form control.

[[code-snippets/form-primitives-optional]]

If the label needs to contain more than just text, it’s possible to pass structured content to component. While the correct text styling is applied to the component’s container, the layout of the content inside the component is the responsibility of the product team.

!!! Warning

**Accessibility alert**

The `<label>` element is linked via `for` attribute to the `<input/select/textarea>` elements. Because this is an interactive element, it cannot have links inside of it, as nested interactive elements cannot be reached by a user with assistive technology.
!!!

[[code-snippets/form-primitives-structured]]

### Form::HelperText

The default invocation requires text to be passed and a `controlId` argument.

The `controlId` value is used to generate an ID, prefixed with `helper-text-`, so that the ID can be referenced in the `aria-describedby` attribute of the form control. If no `controlId` is provided, no ID is generated. If needed, it can be passed directly as an HTML attribute.

[[code-snippets/form-primitives-helper-text]]

If the helper text needs to contain more than just text, use the block form of the component. While the correct styling is applied to the component itself, the nested components may need additional styling and are the responsibility of the product team.

!!! Warning

**Accessibility alert**

Interactive elements in text (associated with the input through `aria-describedby`) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, we recommend including a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

[[code-snippets/form-primitives-interactive-accessibility]]

### Form::CharacterCount

The default invocation requires a `controlId` argument referencing a valid `<input>` or `<textarea>` element and a `@value` argument storing the value of the associated form control.

The `controlId` value is used to generate an ID, prefixed with `character-count-`, so that the ID can be referenced in the `aria-describedby` attribute of the form control.

[[code-snippets/form-primitives-character-count]]

If the user input needs to be limited to a certain number of characters, use `@maxLength` to guide the user in meeting the length requirements. This property does not restrict the users from entering characters over the limit. To define the maximum string length that the user can enter, set `maxlength` attribute on the associated input field.

[[code-snippets/form-primitives-max-length]]

If the user input is required to have a certain number of characters, use `@minLength` to guide the user in meeting the length requirements.

[[code-snippets/form-primitives-min-length]]

When the user input needs to be in a certain range, use both `@minLength` and `@maxLength` to guide the user in meeting the length requirements.

[[code-snippets/form-primitives-both-min-max]]

#### Custom message

For custom messages, you can use the following arguments to build a relevant message: `currentLength` (the current number of characters in the associated form control), `maxLength` (the maximum number of characters allowed in the associated form control), `minLength` (the minimum number of characters required in the associated form control), `remaining` (the difference between `maxLength` and `currentLength`), and `shortfall` (the difference between `currentLength` and `minLength`).

[[code-snippets/form-primitives-custom-message]]

### Form::Error

The default invocation requires text to be passed and a `controlId` argument.

The `controlId` value will be used to generate an ID, prefixed with `error-`, so that this ID can be referenced in the `aria-describedby` attribute of the form control. If no `controlId` is provided, no ID is generated. If needed, it can be passed directly as an HTML attribute.

[[code-snippets/form-primitives-error]]

If the error is made up of multiple messages, it’s possible to iterate over a collection of error messages.
<!-- TODO: NOT WORKING IN CODE-SNIPPET VERSION
```handlebars
<Hds::Form::Error @controlId="control-ID" as |Error|>
  {{#each this.SAMPLE_ERROR_MESSAGES as |message|}}
    <Error.Message>{{message}}</Error.Message>
  {{/each}}
</Hds::Form::Error>
``` -->

[[code-snippets/form-primitives-error-iteration]]

### Form::Indicator

If no `isRequired/isOptional` argument is provided, the component will not render anything.

#### Required

Pass an `isRequired` argument, to render a `Required` Indicator.

[[code-snippets/form-primitives-indicator-required]]

#### Optional

Pass an `isOptional` argument, to render an `Optional` Indicator.

[[code-snippets/form-primitives-indicator-optional]]

### Form::Legend

The default invocation requires text to be passed.

[[code-snippets/form-primitives-legend-default]]

#### Required

Pass an `isRequired` argument, when user input is required for the associated form control.

[[code-snippets/form-primitives-legend-required]]

#### Optional

Pass an `isOptional` argument, when user input is optional for the associated form control.

[[code-snippets/form-primitives-legend-optional]]

#### Structured content

If the legend needs to contain more than just text, it’s possible to pass structured content to component. While the correct text styling is applied to the component’s container, the layout of the content inside the component is the responsibility of the product team.

[[code-snippets/form-primitives-legend-structured]]

### Form::Field

!!! Callout

It’s unlikely that you’ll need to use this component directly, but if you do [contact the Design Systems Team](/about/support) so we can provide support.
!!!

The default invocation includes a set of contextual components, a control (in this case a text input) with hashed values passed back to it, and a `@layout` argument. Depending on the context, you may want to pass just the label, or the label _and_ the helper text, while the error message is likely conditional to the validation of the input provided by the user. The arguments `id` and `ariaDescribedBy` are automatically generated by the component and passed back to the control.

The layout of the content inside the "control" container is the responsibility of the product team.

[[code-snippets/form-primitives-field-default]]

### Form::Fieldset

!!! Callout

It’s unlikely that you’ll need to use this component directly, but if you do [contact the Design Systems Team](/about/support) so we can provide support.
!!!

The default invocation includes a set of contextual components, one or more fields (in this case radio buttons within a label), and a `@layout` argument. Depending on the context, you may want to pass just the legend, just the helper text, both or none, while the error message is likely conditional to the validation of the inputs provided by the user.

The layout of the content inside the "control" container is the responsibility of the product team.

[[code-snippets/form-primitives-fieldset]]
