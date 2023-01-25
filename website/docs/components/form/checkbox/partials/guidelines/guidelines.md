## Usage

### When to use

- To allow users to check or uncheck an option or setting.
- To allow users to select one or more options from a list.

### When not to use

- When only one choice must be selected, use [Radio](/components/form/radio/) buttons.
- When the result of checking or unchecking the option is expected to happen immediately, use a [Toggle](/components/form/toggle).

### Layout

We recommend using **vertical** checkbox groups, especially with short option lists.

#### Horizontal

<Hds::Form::Checkbox::Group @layout="horizontal" as |G|>
  <G.Legend>Group label</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>

#### Vertical

<Hds::Form::Checkbox::Group @layout="vertical" as |G|>
  <G.Legend>Group label</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>

### Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

<Hds::Form::Checkbox::Group @layout="vertical" @isRequired={{true}} as |G|>
  <G.Legend>Group label</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>

For shorter, simpler forms (ie. login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::Checkbox::Group @layout="vertical" @isOptional={{true}} as |G|>
  <G.Legend>Group label</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>Label</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>

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

<Hds::Form::Checkbox::Group @layout="vertical" as |G|>
  <G.Legend>Valid datacenters</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Checkbox::Field>
  <G.Error>Select at least one option</G.Error>
</Hds::Form::Checkbox::Group>

## Content

### Form::Label

- We recommend keeping labels clear and concise, about 1-3 words. They should not consist of full sentences.
- [3.2.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

!!! Warning

**Labels and link**

Labels are part of the checkbox’s selectable area, making them interactive elements. This means that links inside them are nested interactive elements and cannot be reached by assistive technology. If you plan to add links to checkboxes, please contact the Design Systems Team for guidance.
!!!

### Form::HelperText

- Use helper text when needing to provide the user with extra details about the option(s) you’re asking them to select, ie. Learn more about our pricing.

### Form::Error

- Error messages need to provide the user with enough context to guide them in resolving the error.
- Keep messages short and to the point (ie. "Select at least one option")
- Avoid overt politeness; don’t use "please" or "thank you" in your messaging.
- [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html): For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and the user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming, and correcting the information before finalizing the submission.
- [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html): In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

Refer to [HashiCorp’s Style, Language, and Voice Guidelines](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?usp=sharing) for more content tips.

## Related

- [Radio](/components/form/radio)
- [Toggle](/components/form/toggle)
