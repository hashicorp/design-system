Form validation ensures that fields are correctly formatted, required fields are not empty, and the data being submitted matches the requirements for the application. A successful validation strategy relies on three key concepts:

1. **Clear language** The validation message should be human readable and easy to understand.
2. **Placement** The validation message should be displayed as soon as possible to when the error occurred.
3. **Timing** The validation message should be noticeable and located where the error occurred.

!!! Warning

While we provide the structure and visual consistency for validation, the messaging and functionality need to be implemented by the product teams.
!!!

## Clear validation language

Error messages should clearly, but briefly communicate the issue for each impacted input. Using plain language to state the problem and suggested solution helps reduce friction when users are resolving errors in their inputs. 

![Example of credit card information form with invalid expiration date](/assets/patterns/form-patterns/form-pattern-validation-error-message-example.png)


## Validation types

The location and styling of error messages may impact the cognitive load on the user. Carefully consider which type of validation would be most appropriate for a form based on:

- The complexity of the data being collected
- The number of inputs in the form and the length of time expected for a user to complete the form
- Whether interrupting the user’s flow to prompt them to fix errors will cause undue friction
- What patterns for errors are used elsewhere in the platform that the user may be expecting

### Field-level validation

The best time to inform a user of an input error is as soon as it’s detected. For [**client-side validation**](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation), inline validation at the **field level** informs the user of an error where and when it happens. Inline validation allows users to correct errors without waiting until the data is submitted. For example, a user creating a password will need to know what requirements haven’t been met when seeing the error message. 

Use the built-in [invalid input state](/components/form/text-input?tab=code#validation) and the accompanying `Error` contextual component to display field-level errors.

![Example of field-level validation on two fields in a form](/assets/patterns/form-patterns/form-pattern-validation-inline-error.png)

!!! Warning

We do not recommend using HTML5 validation (for example, the `required` attribute). Despite being a standard its current implementation has major flaws:

- It moves the focus to the input, but it doesn’t play back the associated label, so screen reader users become unaware of their location on the page.
- The error message is not persistent – as soon as the user interacts with the page, it disappears. If you use the `pattern` attribute to define a required format, the error message is often generic (‘please match the required format’) which doesn’t help users to recover from this state.

For this reason, we recommend creating your validation mechanism using our form components, following our recommendations, and providing clear and specific error messages.

!!!

### Form-level validation

Form-level validation should be used for server-side errors that cannot be checked before data submission or requires additional checks after data submission. This error type should appear at the top of the form and use a Critical Inline [Alert](/components/alert). Using an Alert makes the message a focal point for users to see what occurred during the submission to result in an error. 

For form-level validation that identifies multiple input-level errors, the alert should contain a message listing **all** errors with links to each invalid field. We recommend using an introductory sentence to give context before listing the errored items, e.g., “Please correct the following errors and resubmit the form”

!!! Do
Use form-level validation for overarching form submission errors or for a list of server-side validation errors that link to their respective errored fields.

![Sign in page with authentication error alert at the form level](/assets/patterns/form-patterns/do-form-level-error.png)

!!!

!!! Dont
Never use form-level alerts for  field-specific, inline validations.

![Credit card info form with a single field-level error and duplicative form-level alert](assets/patterns/form-patterns/dont-form-level-error.png)

!!!


### Combining inline and form-level validation

We recommend always using inline validation to provide immediate feedback, but for complex forms that require both client-side and server-side checks, a combined approach is best. 

![Form with multiple field-level errors and a form-level alert with jump links to each](assets/patterns/form-patterns/dont-form-level-error.png)


## Timing validation messages

### Validation on focus change

Client-side validation occurs when a user leaves the field via an [onblur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) event. This immediate feedback communicates errors as they happen.

Because this method minimizes interruption, use it **whenever possible** so users can resolve errors while still in the context of the form. This can limit the amount of context switching necessary to complete the form successfully and reduce the cognitive load on the user.

<video controls loop width="100%">
  <source src="/assets/patterns/form-patterns/validation-on-focus-change.mp4" />
</video>

### Validation on submission

Validating a form on submission can occur on the client or server-side and can be used to display errors after the form has been submitted. This method can manifest in many use cases, including:

- Validating that each required field in a form is filled.
- Validating that the input data matches the formatting expectations of the application and the server.

<video controls loop width="100%">
  <source src="/assets/patterns/form-patterns/validation-on-submit-example.mp4" />
</video>

### Delayed validation

Delayed validation occurs on the client side and refers to validating the field after a lapse in keystrokes or a specific interval of time, e.g., `500ms` or 0.5 seconds. Once the user has stopped input into the field or after the interval of time has expired, the field is validated without an `onblur` event occurring.

This method can be invasive and result in unintended validation errors by assuming the user is done filling out a field. We don’t recommend implementing delayed validation for most forms.

Consider a user entering their credit card information; they may repeatedly reference a physical card when inputting the card number, which can cause extended delays between keystrokes and result in a validation error being displayed preemptively.

<video controls loop width="100%">
  <source src="/assets/patterns/form-patterns/delayed-validation-example.mp4" />
</video>

## Validation interaction

If a validation error occurs in a field outside of the viewport, scroll the user to the error. If there are multiple fields in error, scroll the user to the first (or topmost) error in the form. Form-level validation errors should be scrolled to first and take precedence over individual fields in error. This commonly occurs in long, complex forms when a form-level error occurs.

<video controls loop width="100%">
  <source src="/assets/patterns/form-patterns/validation-scroll.mp4" />
</video>
