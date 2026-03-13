## How to use this component

There are three ways to use the Radio component:

- `Form::Radio::Base` - the base component: the `<input>` control
- `Form::Radio::Field` - the field component: the `<input>` control, with label, helper text, and error messaging (in a wrapping container)
- `Form::Radio::Group` - the group component: a `<legend>` (optional), a list of fields, and error messaging

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}

### Form::Radio::Group

The basic invocation creates:

- a `<fieldset>` container.
- a `<legend>` element.
- a list of rendered `<Form::Radio::Field>` components.

The `@name` argument offers an easy way to provide the same name for all the Radio controls in a single place.

[[code-snippets/radio-group-basic]]

#### Layout

To better fit your spacing requirements, choose between two different layout orientations: `vertical` or `horizontal`.

[[code-snippets/radio-group-layout]]

#### Extra content in legend and helper text

!!! Info

**Accessibility consideration**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Legend` and `HelperText` contextual components used in the Group yield their content. This means you can also pass structured content.

When helper text is added, the component automatically adds an `aria-describedby` attribute to the `fieldset`, associating it with the automatically generated `ID`.

[[code-snippets/radio-group-extra-content]]

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is “required” or “optional”.

[[code-snippets/radio-group-indicators]]

#### Validation

To indicate a field is invalid, provide an error message using the `Error` contextual component.

[[code-snippets/radio-group-validation]]

#### Field items

A group of Radios is made of one or more `Form::Radio::Field` components. All the arguments, attributes, and modifiers that can be passed to `Form::Radio::Field` can be passed to the same items in the Group declaration.

[[code-snippets/radio-field-items]]

{{! ========================= }} {{! ===== BASE + FIELD ===== }} {{! ========================= }}

### Form::Radio::Field and Form::Radio::Base

The Base and Field components are intended for rare cases where the Group component can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

!!! Warning

**Consumer responsibility**

`Form::Checkbox::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

The basic invocation for a Field component creates:

- a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute.
- a `<input type="radio">` control with an automatically generated `ID` attribute.

[[code-snippets/radio-field]]

The basic invocation for a Base component creates an `<input type="radio">` control with an automatically generated `ID` attribute.

[[code-snippets/radio-base]]
