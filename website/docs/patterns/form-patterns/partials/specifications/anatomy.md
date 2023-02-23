## Anatomy

Elements and content within a form is variable, but can be broken down into sections that correspond with different types of content.

**Form:** the exterior container that wraps other form elements and sections. The form (semantic `<form>`) handles the logic and submission actions for the data being collected.

**Text:** titles, headlines, descriptions, and supporting content that describe the content of the form holistically or specific sections within a form. Semantically, text elements are wrapped in a `<legend>` element.

**Fields:** an array of one or more fileds which can be any input type; text input, toggle, radio, textarea, or any other Form component published in the Helios Design System.

**Actions:** responsible for submitting the form or giving the user an escape hatch to cancel, clear the form, or "go back."

### Sections

| Type    | Description                                                             |
| ------- | ----------------------------------------------------------------------- |
| Form    | Consists of one or more sections                                        |
| Section | Consists of multiple content types (text, fields) and groups of content |
| Group   | Layout mechanism to group like elements together                        |
