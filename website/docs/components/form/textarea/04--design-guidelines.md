---
title: Form::Textarea
category: components
group: form
component: textarea
section: design-guidelines
---

# Textarea - Design Guidelines

## When to use

- As a form element that provides users with a way to read, input, or edit data in a multi-line field.

## When not to use

- If needing a single-line input, use [TextInput](/components/form/text-input/overview).
- If needing to allow the user to make a selection from a predetermined list of options, use [Checkbox](/components/form/checkbox/overview), [Radio button](/components/form/radio/overview), [Select](/components/form/select/overview).

---

## Anatomy

![Textarea anatomy](/assets/components/form/textarea/textarea-anatomy.png)

#### Label

Required

#### Helper text

Optional

#### Base text

Options: empty, placeholder, filled. Shown in _"placeholder"_

#### Base control

Required

#### Error message

Triggered by system

---

## State

![Textarea state](/assets/components/form/textarea/textarea-states.png)

### Readonly vs Disabled

- Readonly and disabled fields are not editable by the user.
- Data in readonly fields gets passed to the form, while data in disabled fields does not.
- If the user doesn't need to review the data, consider using a hidden field instead.
- Use these fields sparingly.

---

## Required and optional

<section>
  <Hds::Form::Textarea::Field @isRequired={{true}} @width="300px" as |F|>
    <F.Label>Label</F.Label>
  </Hds::Form::Textarea::Field>
</section>

<section>
  <Hds::Form::Textarea::Field @isOptional={{true}} @width="300px" as |F|>
    <F.Label>Label</F.Label>
  </Hds::Form::Textarea::Field>
</section>

### Best practices

- For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don't have to make assumptions.
- For shorter, simpler forms (ie. login/signup and feedback requests), indicate **optional** fields instead.

[Marking required fields in forms](https://www.nngroup.com/articles/required-fields/)

---

## Validation

_Banner (warning):_ While we provide the structure and visual consistency for validation, the messaging and functionality are to be handled by the application teams.

### Single error message

<section>
  <Hds::Form::Textarea::Field @value="" @isRequired={{true}} @isInvalid={{true}} @width="300px" as |F|>
    <F.Label>Reason</F.Label>
    <F.Error>Reason cannot be blank</F.Error>
  </Hds::Form::Textarea::Field>
</section>

<section>
  <Hds::Form::Textarea::Field @value="5&3y" @isRequired={{true}} @isInvalid={{true}} @width="300px" as |F|>
    <F.Label>VPC ID</F.Label>
    <F.Error>VPC ID may only contain letters, numbers, or hyphens.</F.Error>
  </Hds::Form::Textarea::Field>
</section>

### Multiple error messages

Show **all** applicable error messages directly under their corresponding form field.

_Banner (informational):_ To display multiple error messages in your designs, hit `return` or `enter` between messages.

<section>
  <Hds::Form::Textarea::Field @value="" @isRequired={{true}} @isInvalid={{true}} @width="300px" as |F|>
    <F.Label>Network ID</F.Label>
    <F.HelperText>Must be a unique set of 3-36 characters. May include numbers, hyphens, and lowercase letters. Must start with a letter and end with a letter or number</F.HelperText>
    <F.Error as |E|>
      <E.Message>Network ID must be 3 to 36 characters long.</E.Message>
      <E.Message>Network ID must start with a letter.</E.Message>
      <E.Message>Network ID must end with a letter or number.</E.Message>
    </F.Error>
  </Hds::Form::Textarea::Field>
</section>

### Client side and Server side validation

Use a combination of client side and server side validation for the best user experience. Catching basic erros with client side validation allows the user to quickly resolve the error **before** submitting the form.

#### Client side (or inline) validation

Client side validation is an initial check that happens in the browser to ensure required fields are filled out and that the value is in the correct format.

[More about client side validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

![Example of client side (inline) validation](/assets/components/general/validation-client_side.png)

#### Server side validation

Server side validation provides a more thorough check on the server once the data has been submitted and helps keep our applications safe.

When using server side validation, display a Critical [AlertInline](/components/alerts/overview) above the form listing all errors with links to each invalid field.

![Example of server side validation](/assets/components/general/validation-server_side.png)

---

## Content

### Label

- We recommend keeping labels clear and concise.
- [3.2.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

_Banner (informational):_ Labels and link: Labels are part of the checkbox's selectable area, making them interactive elements. This means that links inside them are nested interactive elements and cannot be reached by assistive technology. If you plan to add links to checkboxes, please contact the design system team for guidance.

### Helper text

- Use helper text when needing to provide the user with extra details about the option(s) you're asking them to select, ie. Learn more about our pricing.

### Error messages

- Error messages need to provide the user with enough context to guide them in resolving the error.
- Keep messages short and to the point.
  - ie. "Select at least one option"
- Avoid over politeness; don't use 'please' or 'thank you' in your messages.
- [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html): For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-contrallable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and the user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming, and correcting the information before finalizing the submission.
- [4.1.4 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html): In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without recieving focus.

Refer to [HashiCorp's Style, Language, and Voice Guidelines](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?usp=sharing) for more content tips.
