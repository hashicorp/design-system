!!! Warning

While we provide the structure and visual consistency for validation, the messaging and functionality need to be implemented by the product teams.
!!!

Form validation ensures that fields are correctly formatted, required fields are not empty, and the data being submitted matches the requirements for application. A successful validation strategy relies on three key concepts:

1. **Uses clear language:** the validation message should be human readable and easy to understand.
2. **Displayed at the right time:** The validation message should be displayed as soon as possible to when the error occurred.
3. **Displayed in the right place:** the validation message should be noticeable and located where the error occurred.

!!! Info

At this time Helios components only support error validation. If you have a need for success validation in your application please submit a [request](/about/support).
!!!

## Types of validation

We recommend using a combination of client-side and server-side validation for the best user experience.

### Client-side

[Client-side validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) is an initial check in the browser to ensure that required fields aren’t empty and the values are in the correct format.

![Example of client side form validation](/assets/components/form/primitives/form-primitives-validation-client.png =600x*)

### Server-side

Server-side validation provides a more thorough check on the server once the data has been submitted and helps keep our applications safe.

![Example of server side form validation](/assets/components/form/primitives/form-primitives-validation-server.png =600x*)

## Validation methods

When validation is displayed to the user impacts the time it takes to complete a form and the amount of context-switching required by the user to resolve errors.

The best user experience is often a combination of different methods depending on the type of data being collected, the length of the form, and application security protocols.

!!! Warning

We do not recommend using HTML5 validation (for example, the `required` attribute). Despite being a standard its current implementation has major flaws:

- It moves the focus to the input, but it doesn’t play back the associated label, so screen reader users become unaware of their location on the page.
- The error message is not persistent – as soon as the user interacts with the page, it disappears. If you use the `pattern` attribute to define a required format, the error message is often generic (‘please match the required format’) which doesn’t help users to recover from this state.

For this reason, we recommend creating your validation mechanism using our form components, following our recommendations, and providing clear and specific error messages.

!!!

### Validation on focus change

Validation on focus change occurs on the client and refers to validating a field when it loses focus via an [`onblur`](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) event.

This method is immediate in the sense that it displays an error directly after a field has been filled out, while not interrupting the user while they are in the process of filling out a field.

Use this method **whenever possible** to resolve an error while the user is still in the context of the erroring field. This can help limit the amount of context switching necessary when filling out a form and reduce the cognitive load on the user.

<video controls loop width="100%">
  <source src="/assets/patterns/form-patterns/validation-on-focus-change.mp4" />
</video>

### Validation on submit

Validating a form on submission can occur on the client or the server and can be used to display errors after interacting with the primary submit button in the form. This method can manifest in many use cases including:

- Validating that each required field in a form is filled.
- Validating that the input data matches the formatting expectations of the application and the server.

<video controls loop width="100%">
  <source src="/assets/patterns/form-patterns/validation-on-submit-example.mp4" />
</video>

### Delayed validation

Delayed validation occurs on the client and refers to validating the field after a lapse in keystrokes or a specific interval of time, e.g., `500ms` or 0.5 seconds. Once the user has stopped input into the field or after the interval of time has expired, the field is validated without an `onblur` event occurring.

This method can be invasive and result in unintended validation errors by assuming the user has completed filling out a field. Thus, we recommend implementing either of the previous methods prior to delayed validation for most forms.

Consider a user entering their credit card information; they may repeatedly reference a physical card when inputting the card number, which can cause extended delays between keystrokes and result in displaying a validation error preemptively.

<video controls loop width="100%">
  <source src="/assets/patterns/form-patterns/delayed-validation-example.mp4" />
</video>

## Displaying validation

Where validation is displayed impacts the cognitive load on the user and can make resolving errors in long forms more challenging and time consuming.

### Inline validation

Display client-side validation errors within a specific field inline with the field using the built-in [invalid input state](/components/form/text-input?tab=code#validation) and the accompanying `Error` contextual component.

![Inline validation error](/assets/patterns/form-patterns/form-pattern-validation-inline-error.png =800x*)

### Form-level validation

Display server-side errors using a Critical Inline [Alert](/components/alert) above the form listing **all** errors with links to each invalid field.

![Form level validation error](/assets/patterns/form-patterns/form-pattern-validation-form-level-error.png =559x*)

## Validation interaction

If a validation error occurs in a field outside of the viewport, scroll the user to the error. If there are multiple fields in error, scroll the user to the first (or topmost) error in the form. Form-level validation errors should be scrolled to first and take precedence over individual fields in error. This commonly occurs in long, complex forms when a form-level error occurs.

<video controls loop width="100%">
  <source src="/assets/patterns/form-patterns/validation-scroll.mp4" />
</video>
