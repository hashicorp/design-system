## Anatomy

Elements and content within a form are variable but can be broken down into sections that correspond with different types of content.

**Form:** the exterior container that wraps other form elements and sections. The form (`<form>`) handles the logic and submission actions for the collected data.

**Text:** titles, headlines, descriptions, and supporting content that further describe the content of the form or specific sections within a form. Typically text elements are wrapped in a `<legend>`.

**Fields:** an array of one or more fields which can be any input type; text input, toggle, radio, textarea, or any other Helios Form component.

**Actions:** responsible for submitting the form or giving the user a method to cancel, clear the form, or "go back."

### Sections

| Type    | Description                                                             |
| ------- | ----------------------------------------------------------------------- |
| Form    | Consists of one or more sections                                        |
| Section | Consists of multiple content types (text, fields) and groups of content |
| Group   | Layout mechanism to group like elements together                        |
