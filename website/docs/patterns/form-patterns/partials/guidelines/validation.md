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