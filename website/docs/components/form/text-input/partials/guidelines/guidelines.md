## Usage

### When to use

- As a form element that provides users with a way to read, input, or edit data in a freeform way.

### When not to use

- If needing a multi-line text input, use [Textarea](/components/form/textarea/overview)
- If needing to allow the user to make a selection from a predetermined list of options, use [Checkbox](/components/form/checkbox/overview), [Radio button](/components/form/radio/overview), or [Select](/components/form/select/overview).

### Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

<Hds::Form::TextInput::Field @type="text" @isRequired={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::TextInput::Field>

For shorter, simpler forms (ie. login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::TextInput::Field @type="text" @isOptional={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::TextInput::Field>

### Readonly, disabled, and hidden fields

Readonly and disabled fields are similar in that the value is not editable by the user. Where they differ is in what happens to the data upon form submission. Data in readonly fields gets passed when the form is submitted, while data in disabled fields does not.

<Hds::Form::TextInput::Field @type="text" @width="300px" readonly as |F|>
  <F.Label>Readonly</F.Label>
</Hds::Form::TextInput::Field>

<Hds::Form::TextInput::Field @type="text" @width="300px" disabled as |F|>
  <F.Label>Disabled</F.Label>
</Hds::Form::TextInput::Field>

We recommend using a hidden field, if the data needs to be submitted but not reviewed by the user first.

Use these fields sparingly.

### Validation

!!! Warning

While we provide the structure and visual consistency for validation, the messaging and functionality are the responsibility of the product teams.
!!!

#### Types of validation

Use a combination of client side and server side validation for the best user experience. Catching basic errors with client side validation allows the user to quickly resolve the error **before** submitting the form.

##### Client side validation

Client side validation, sometimes also referred to as inline validation, is an initial check that happens in the browser to ensure required fields are filled out and that the value is in the correct format. Learn more about [client side validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).

![Example of client side form validation](/assets/components/form/primitives/form-validation-client.png)

##### Server side validation

Server side validation provides a more thorough check on the server once the data has been submitted and helps keep our applications safe.

When using server side validation, display an `AlertInline` in the `Critical` variant above the form listing **all** errors with links to each invalid field.

![Example of server side form validation](/assets/components/form/primitives/form-validation-server.png)

#### Displaying multiple error messages

We recommend showing **all** applicable error messages directly under their corresponding form field.

<Hds::Form::TextInput::Field @value="1-" @isInvalid={{true}} @width="300px" as |F|>
  <F.Label>Network ID</F.Label>
  <F.Error as |E|>
    <E.Message>Network ID must be 3 to 36 characters long.</E.Message>
    <E.Message>Network ID must start with a letter.</E.Message>
    <E.Message>Network ID must end with a letter or number.</E.Message>
  </F.Error>
</Hds::Form::TextInput::Field>

## Content

### Form::Label

- We recommend keeping labels clear and concise, about 1-3 words. They should not consist of full sentences.
- [3.3.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

### Form::HelperText

- Use `Form::HelperText` when needing to provide the user with extra details about the data you’re asking them to input, eg. formatting requirements such as MM-DD-YYYY.

### Form::Error

- Error messages need to provide the user with enough context to guide them in resolving the error.
- Keep messages short and to the point.
  - eg. "Enter a valid email address.", "Resource Share ARN starts with arn-"
- Avoid overt politeness; don’t use "please" or "thank you" in your messaging.
- [3.3.1 Error Identification (A)](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html): For web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming and correcting the information before finalizing the submission.
- [4.1.3 Status Messages(AA)](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html): In content implemented using markup language, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

Refer to [HashiCorp’s Style, Language, and Voice Guidelines (internal only)](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?usp=sharing) for more content tips.

## Related

- [Select](/components/form/select)
- [Textarea](/components/form/textarea)
