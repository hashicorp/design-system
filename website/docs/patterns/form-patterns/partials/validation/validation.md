!!! Warning

While we provide the structure and visual consistency for validation, the messaging and functionality need to be implemented by the product teams.
!!!

Form validation ensures that required fields are not empty, are correctly formatted, and the data submitted matches the requirements for application. A successful validation strategy relies on three key concepts:

1. **Uses clear language:** the validation message should be human readable and easy to understand.
2. **Displayed at the right time:** The validation message should be displayed as soon as possible to when the error occurred.
3. **Displayed in the right place:** the validation message should be noticeable and located where the error occurred.

!!! Info

At this time Helios components only support error validation. If you have a need for successful validation in your application please submit a [request](/about/support).
!!!

## Types of validation

We recommend using a combination of client-side and server-side validation for the best user experience.

### Client-side

[Client-side validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) is an initial check in the browser to ensure that required fields aren’t empty and the value is in the correct format.

![Example of client side form validation](/assets/components/form/primitives/form-primitives-validation-client.png =600x*)

### Server-side

Server-side validation provides a more thorough check on the server once the data has been submitted and helps keep our applications safe.

![Example of server side form validation](/assets/components/form/primitives/form-primitives-validation-server.png =600x*)

## Validation methods

When validation is displayed to the user impacts the time it takes to complete a form and the amount of context-switching required by the user to resolve errors.

The best user experience is often a combination of different methods depending on the type of data being collected, the length of the form, and application security protocols.

### Delayed validation

Delayed validation occurs on the client and refers to validating a field upon completion. This can generally be assessed by the field losing focus or the user `tabing` to subsequent fields.

Delayed validation is immediate enough by displaying errors directly after a field has been filled out, while not interrupting the user while they are in the process of filling out a field.

This method should be used **whenever possible** to resolve an error while the user is still in the context of the erroring field.

### Validation on submit

Validating a form on submission generally occurs on the client and can be used to display errors after interacting with the primary submit button in the form. This method can manifest in many use cases and can include:

- Validating that each required field in a form is filled.
- Validating that the formatting of data in the form matches the expectations of the application and the server.

## Displaying validation

Where validation is displayed to the user impacts the cognitive load on the user and can make resolving errors in long forms more challenging and time consuming.

### Inline validation

Display client-side errors within a specific field inline with the field using the built-in [invalid input state](/components/form/text-input?tab=code#validation) and the accompanying `Error` contextual component.

### Form-level validation

Display server-side errors using a Critical Inline [Alert](/components/alert) above the form listing **all** errors with links to each invalid field.

## Validation interaction

If a validation error occurs in a field outside of the viewport, scroll the user to the error.
