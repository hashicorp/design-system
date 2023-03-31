Form Primitives are used to compose form fields.

- `Form::Label` is the label associated with the form control
- `Form::HelperText` is an optional text used to help understand what the field is intended for
- `Form::Error` is the error message shown in case of failed validation of the field
- `Form::Indicator` is the indicator for "Required" or "Optional" inputs
- `Form::Legend` is the legend associated to the fieldset
- `Form::Field` is the generic container for control, label, helper text and error messaging
- `Form::Fieldset` is the generic container to group multiple fields with label, helper text, and error messaging

We use Form Primitives as the building blocks for the “field” and “group” controls. While we recommend using our pre-defined “field” and “group” controls because they provide built-in accessibility support, you can use the Form Primitives to implement custom layouts or controls as necessary.

!!! Info

More details on how to assemble form components in larger form patterns can be found in the [form pattern](/patterns/form-patterns) documentation.
!!!
