Form primitives are used to compose form fields.

- `Form::Label` is the label associated with the form control
- `Form::HelperText` is an optional extra text used to help the user understand what the field is intended for
- `Form::Error` is the error message shown to the user in case of failed validation of the field
- `Form::Indicator` is the indicator for "Required" or "Optional" user inputs
- `Form::Legend` is the legend associated to the fieldset
- `Form::Field` is the generic container for control, label, helper text and error messaging
- `Form::Fieldset` is the generic container to group multiple fields with label, helper text, and error messaging

We use form primitives, internally, as the building blocks for the "field" and "group" controls. They can also be used in special cases when needing to implement custom layouts or controls. We recommend using our pre-defined "field" and "group" controls, as they provide built-in accessibility support.