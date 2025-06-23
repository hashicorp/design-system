## Anatomy

Elements and content within a form are variable but can be broken down into sections that correspond with different types of content.

![Form pattern anatomy](/assets/patterns/form-patterns/form-anatomy.png =650x*)

| Type | Description |
|------|-------------|
| Form | The exterior container that wraps other form elements and sections. The form (`<form>`) handles the logic and submission actions for the collected data. |
| Section | Consists of multiple content types (text, fields) and groups  content |
| Text | Titles, headlines, descriptions, and supporting content that further describe the content of the form or specific sections within a form. Typically text elements are wrapped in a `<legend>`. |
| Fields | An array of one or more fields which can be any input type; text input, toggle, radio, textarea, or any other Helios Form component. |
| Group | Layout mechanism to group like elements together |
| Actions | Responsible for submitting the form or giving the user a method to cancel, clear the form, or "go back." Refer to the [button organization](/patterns/button-organization) for more details. |

!!! Info

Using [Form Layout](/components/form/layout) will set up the spacing and structure of a form as a helper to implement this guidance.
!!!
