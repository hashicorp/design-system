## Usage

### When to use

- To allow user to make a selection from a pre-defined set of options in a form.
- When the length of the form is a concern or screen real estate is vital.

### When not to use

- When a user can select more than on option, consider using [Checkbox](/components/form/checkbox/overview).
- When there are fewer than 5 options, consider using [Radio](/components/form/radio/overview) instead.
- When need to display a list of buttons or links in a menu, us [Dropdown](/components/dropdown/overview).

## Required and optional

<Hds::Form::Select::Field @isRequired={{true}} as |F|>
    <F.Label>Label</F.Label>
    <F.Options>
        <option value="">--Required select--</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
    </F.Options>
</Hds::Form::Select::Field>
<Hds::Form::Select::Field @isOptional={{true}} as |F|>
    <F.Label>Label</F.Label>
    <F.Options>
        <option value="">--Optional select--</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
    </F.Options>
</Hds::Form::Select::Field>

### Best practices

- For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions.
    - If a field is required, consider adding a default value to help the user avoid and error.
- For shorter, simpler forms (ie. login/signup and feedback requests), indicate **optional** fields instead.
    - If a field is optional, avoid using a default value as that value will get passed as data to the form.

[Marking required fields in forms](https://www.nngroup.com/articles/required-fields/)

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

<Hds::Form::Select::Field @value="1-" @isInvalid={{true}} @width="300px" as |F|>
  <F.Label>Network ID</F.Label>
  <F.Error as |E|>
    <E.Message>Network ID must be 3 to 36 characters long.</E.Message>
    <E.Message>Network ID must start with a letter.</E.Message>
    <E.Message>Network ID must end with a letter or number.</E.Message>
  </F.Error>
</Hds::Form::Select::Field>

## Content

### Label

- We recommend keeping labels clear and concise, about 1-3 words. They should not consist of full sentences.
- [3.3.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

### Options

- We recommend keeping options clear and concise; avoid full sentences.
- Avoid using the same word at the beginning of a set of options.
- Order the set of options in a logical way based on the use case, ie. default or most commonly selected options first, alphabetically, or numerically.

### Helper text

- Use helper text when needing to provide the user with extra details about the data you’re asking them to select from.

### Error messages

- Error messages need to provide the user with enough context to guide them in resolving the error.
- Keep error messages short and to the point.
  - ie. "Network region is required. Select a region."
- Avoid overt politeness; don’t use "please" or "thank you" in your messages.
- [3.3.1 Error Identification (A)](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html): For web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllabel data in data storage systems, or that submit user test reponses, at least one of the following is true: submissions are reversible, data is checked and user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming, and correcting the information before finalizing the submission.
- [4.1.3 Status Messages (AA)](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html): In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

Refer to [HashiCorp’s Style, Language, and Voice Guidelines](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?usp=sharing) for more content tips.
