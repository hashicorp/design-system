## Error validation

!!! Warning

While we provide the structure and visual consistency for validation, the messaging and functionality need to be implemented by the product teams.
!!!

We recommend using a combination of client-side and server-side validation for the best user experience.

### Client-side validation

[Client-side validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation), sometimes called inline validation, is an initial check in the browser to ensure that required fields aren’t empty and the value is in the correct format. Client-side validation allows the user to quickly resolve errors before submitting the form.

![Example of client side form validation](/assets/components/form/primitives/form-primitives-validation-client.png =600x*)

### Server-side validation

Server-side validation provides a more thorough check on the server once the data has been submitted and helps keep our applications safe.

When using server-side validation, display a Critical Inline [Alert](/components/alert) above the form listing **all** errors with links to each invalid field.

![Example of server side form validation](/assets/components/form/primitives/form-primitives-validation-server.png =600x*)

## Content

### Form::Label

- We recommend keeping labels clear and concise, about 1-3 words. They should not consist of full sentences.
- [3.2.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

### Form::HelperText

- Use helper text to give the user extra details about the data you’re asking them to input, e.g., formatting requirements such as MM-DD-YYYY.

### Form::Error

- Error messages should provide the user with enough context to guide them in resolving the error.
- Keep labels and legends short and to the point (ie. "Select one option")
- Avoid overt politeness; don’t use "please" or "thank you" in your messaging.
- [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html): For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and the user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming, and correcting the information before finalizing the submission.
- [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html): In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
