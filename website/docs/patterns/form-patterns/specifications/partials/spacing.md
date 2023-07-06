Spacing between sections, fields, text, and other form elements should follow a decreasing scale on an 8px grid. This creates a consistent vertical rhythm between elements and reinforces a natural hierarchy and association between elements.

## Form

A **form** acts as a layout mechanism by wrapping the content, fields and actions to apply consistent spacing while simultaneously handling the logic for submitting information and data collected by the fields.

As a layout mechanism, a form consisting of more than one section should use a 32px gap in between sections.

![Form container](/assets/patterns/form-patterns/form-container.png =450x*)

## Sections

A **section** occupies the largest hierarchy within the form. Sections organize text, fields (inputs, checkboxes, toggles, etc.), and actions into logical sets. There should be a 32px vertical gap between each section within the form container.

![Example of multiple sections in a form](/assets/patterns/form-patterns/form-sections.png =450x*)

## Fields

A **field** describes a form control and label pairing. When displaying multiple fields within a section, there should be a 24px gap between each field.

![Example of multiple fields in a section](/assets/patterns/form-patterns/section-fields.png =450x*)

## Sets

Fields may be organized in a **set** either horizontally or vertically if they are collecting related information or information that is part of the same object. Within a set there should bea 16px gap either horizontally (creating multiple columns), or vertically between each field.

![Example of fields organized in a set](/assets/patterns/form-patterns/field-set.png =450x*)

!!! Dont

Don't horizontally organize field types in a set that are related but not of the same type, e.g., a text input and a toggle.

![Organizing different field types](/assets/patterns/form-patterns/different-field-type.png)
!!!

!!! Do

Do stack fields of different types vertically.

![Organizing different field types](/assets/patterns/form-patterns/different-field-type-do.png =500x*)
!!!

Common sets of fields can include:

- Credit card information: card number, expiration data, security code
- Multi-line address field
- First and last name

### Alignment

Fields organized in a horizontal set should be aligned to the baseline of each element to account for fields with helper text.

![Baseline alignment within a set](/assets/patterns/form-patterns/baseline-alignment.png =500x*)

## Button sets

Organize buttons based on the [Button Set](/components/button-set) guidelines, e.g., using a 16px horizontal gap between buttons. More specifications and examples can be found in the documentation for [button organization](/patterns/button-organization).

![Button set](/assets/patterns/form-patterns/button-set.png =500x*)