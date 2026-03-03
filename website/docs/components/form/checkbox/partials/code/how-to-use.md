## How to use this component

There are three ways to use the Checkbox component:

- `Form::Checkbox::Base` - the base component: the `<input>` control
- `Form::Checkbox::Field` - the field component: the `<input>` control, with label, helper text, and error messaging (in a wrapping container)
- `Form::Checkbox::Group` - the group component: a `<legend>` (optional), a list of fields, and error messaging

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}

### Form::Checkbox::Group

Use `Form::Checkbox::Group` when there are multiple related options to choose from, or a single one that needs to be presented with an extra `Legend`. If there’s a single choice and no need for an extra `Legend`, use `Form::Checkbox::Field`.

The basic invocation creates:

- a `<fieldset>` container.
- a `<legend>` element.
- a list of rendered `<Form::Checkbox::Field>` components.

The `@name` argument offers an easy way to provide the same name for all the Checkbox controls in a single place.

[[code-snippets/checkbox-group-basic]]

#### Layout

To better fit your spacing requirements, choose between two different layout orientations: `vertical` or `horizontal`.

[[code-snippets/checkbox-group-vertical]]

[[code-snippets/checkbox-group-horizontal]]

#### Extra content in legend and helper text

!!! Info

**Accessibility consideration**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Legend` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

When helper text is added, the component automatically adds an `aria-describedby` attribute to the `fieldset`, associating it with the automatically generated `ID`.

[[code-snippets/checkbox-group-extra-describedby]]

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is “required” or “optional”.

[[code-snippets/checkbox-group-indicators]]

#### Validation

To indicate a field is invalid, provide an error message using the `Error` contextual component.

[[code-snippets/checkbox-group-validation]]

#### Field items

A group of Checkboxes is made of one or more `Form::Checkbox::Field` components. All the arguments, attributes, and modifiers that can be passed to `Form::Checkbox::Field` can be passed to the same items in the Group declaration.

[[code-snippets/checkbox-group-attrs]]

#### Group with a single choice

There may be use cases in which you need to create a Checkbox group that contains a single field element (e.g., to show the `Legend` in a similar position for other control’s labels). 

[[code-snippets/checkbox-group-one-item]]

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

### Form::Checkbox::Field

The field variant of the Checkbox component is to be used when there’s a single choice to make for the user. If there are multiple related choices, use `Form::Checkbox::Group`.

The basic invocation requires a `Label`. This creates:

- a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute.
- an `<input type="checkbox">` control with an automatically generated `ID` attribute.

[[code-snippets/checkbox-field-basic]]

#### Input value

Pass a `@value` argument to the checkbox input.

[[code-snippets/checkbox-field-value]]

#### Checked

Use the standard HTML `checked` attribute to mark the input as checked.

[[code-snippets/checkbox-field-checked]]

#### Indeterminate

In addition to the checked and unchecked states, a checkbox can be in an indeterminate state, also referred to as partially checked state. A common use case for this state is when a parent checkbox allows the user to select multiple child checkboxes at once. The visual appearance of the checkbox is determined based on the [`indeterminate` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#indeterminate_state_checkboxes).

[[code-snippets/checkbox-field-indeterminate]]

#### Extra content in legend and helper text

!!! Info

**Accessibility consideration**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

When helper text is added, the component automatically adds an `aria-describedby` attribute to the `fieldset`, associating it with the automatically generated `ID`.

[[code-snippets/checkbox-field-complex]]

#### Validation

To indicate a field is invalid, provide an error message using the `Error` contextual component.

[[code-snippets/checkbox-field-validation]]

#### Custom control ID

If needing a custom ID for the control instead of the one automatically generated by the component, pass the `@id` argument to the field.

In this case all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated and will use the custom ID provided.

[[code-snippets/checkbox-field-custom-id]]

#### Additional `aria-describedby`

Pass an `@extraAriaDescribedBy` argument to the field to connect one or more extra elements describing the field to the control. This provides extra ID values to the `aria-describedby` attribute of the control, in addition to those automatically generated by the component.

[[code-snippets/checkbox-field-extra-describedby]]

#### HTML native attributes

This component supports use of `...attributes`. This means you can use all the standard HTML attributes of the `<input>` element. This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (e.g., providing a `name` for the control).

[[code-snippets/checkbox-field-attrs]]

#### Events handling

Because this component supports use of `...attributes`, you can use all the usual Ember techniques for event handling (e.g., `input`, `change`), validation, etc. 

[[code-snippets/checkbox-field-events]]

{{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

### Form::Checkbox::Base

The Base element is intended for rare cases where the Field or Group components can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

!!! Warning

**Consumer responsibility**

`Form::Checkbox::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

A basic invocation creates an `<input type="checkbox">` control with an automatically generated `ID` attribute.

[[code-snippets/checkbox-base-attrs]]
