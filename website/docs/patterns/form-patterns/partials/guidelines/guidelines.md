## Spacing

Spacing between sections, fields, text, and other elements of a form should follow a decreasing scale based off of the 8px grid. This creates a consistent vertical rhythm between elements and reinforces a natural hierarchy and association between elements.

### Form

_Rewrite this_

- A form wraps the content, fields, and actions while simultaneously handling the logic for submitting and action actions performed by the form.
- A form is generally comprised of multiple different sections of varying types.

### Sections

A **section** occupies the largest hierarchy within the form and is used as a descriptive term for organizing content within a form. A section consists of varying combinations of text, form elements (inputs, checkboxes, toggles, etc), and actions. Even in the most simplist of circumstances a form can consist of multiple sections with different content, each receiving a 32px vertical gap in between.

_Insert image example of a form with sections_

### Fields

A **field** is a broad term used to describe an form control and label pairing within a form element for collecting user input, information, and data. This can include:

- [Text input](/components/text-input)
- [Select](/components/select)
- [Radio](/components/radio)
- Any other Helios form component or custom form elements

When combined within a section each fields should be spaced with a 24px gap between each field.

_Insert image about fields within a section_

### Groups

Fields may be **grouped** together in a horizontal or vertical layout if they are collecting related information or information that is part of the same object. Within a group fields should use a 16px gap either horizontally (creating multiple columns), or vertically.

!!! Dont

Don't group (either horizontally or vertically) input types that are related but not the same type, e.g., a text input and a toggle.

_Insert example image_
!!!

Common grouping of fields can include:

- Credit card information; card number, expiration data, security code.
- Multi-line address field
- First and last name (as separate fields)

#### Alignment

Fields organized in a horizontal group should be aligned to the baseline of each element to account for fields which have helper text.

_Insert image example_

#### Multi-column layout

Grouping form elements horizontally creates a multi-column layout within the form. When grouping elements,

- use a consistent number of columns throughout the form; e.g., don't organize a group of fields in two-columns and another group in three-columns.
- the maximum number of fields in a horizontal group should be three, resulting in three columns.
- fields should stack vertically when the width of the viewport and form container shrinks.

Multi-column layouts within a form are impacted by the width of the overall form, use grouping pragmatically based on the layout, width of the page, and overall UX strategy in the application.

### Text

Sections consisting of text should use a 8px vertical gap between text elements.

### Actions

// TODO

#### Button grouping

Buttons should be grouped using the [ButtonSet](/components/button-set) guidlines, e.g., using a 16px horizontal gap between each button.

For more complex groupings of buttons, refer to the [Button alignment, grouping, and order](/patterns/button-alignment) pattern guidelines.

### Order and organization

Fields within a form generally fall into three categories that can help determine how to order and organize fields within a form. These categories don't exist in isolation but rather have a cummulative effect on how a user percieves a form and how likely they are to complete it.

#### Technical and application needs

Fields in which the application or system may need prior to returning another piece of information or set of options within a form. This is often expressed through conditional logic which determines what is displayed to the user depending on what has been selected or input in previous fields.

Read more about showing elements conditionally with [progressive disclosure](#progressive-disclosure).

#### User needs

Users benefit from logical grouping and progressive organization; organizing fields from easiest to hardest relatively. This can help increase form completion by:

- giving the user a sense of accomplishment early on through "quick wins"
- reducing the probability of abandoning a form when they've already completed the "easier" segments; an example of sunk cost fallacy.

#### Business needs

Organizing fields based on their importance (high to low) to successful completion of a form can help minimize abandonment; a crucial aspect to meeting business goals and metrics.

// TODO

#### Logical grouping

Fields should be ordered "logically"; consider how a user will fill in information based on the context they are in:

- When filling out a payment form: organize and group the fields in teh same order that appears on a credit card or payment method.
  - Name, card number, expiration date, security code
- // TODO: add more examples

!!! Info

This is an intentionally vague definition as it's impossible to provide clear guidelines for every scenario.
!!!

#### Visual organization

Once a logical organization or grouping has been established, categorize elements and fields into sections, introduce typographic elements to influence hierarchy, and if necessary use dividers to more clearly differentiate sections.

// TODO: add more here

## Sizing

### Length

The length of a form, determined by the number of fields their complexity, can have a significant impact on whether a user successfully completes a form or abandons the task altogether. If a feature or flow relies on a large number of fields, consider breaking up the form using these strategies:

#### Multiple sections

Breaking up a form into multiple sections based on the relationship of the fields or the category the information corresponds with can make a long form seem less complex. Introducing typographic elements and dividers can further aid the hierarchy of the form and differentiate sections from one-another.

#### Multiple steps or pages

For exceedingly long, complex forms (e.g., creating a cluster), consider breaking the form into multiple steps or pages.

-
- A [Stepper](/components/stepper-indicator) can be used to annotate status and location in a multi-step form.

!!! Info

As a general note, special care should be taken to _reduce_ the number of fields whenever possible.

- Long forms are more challenging for the user which can result in a lower completion rate.
- If a field is optional, consider whether it should be included in the form at all. If the information isn't crucial to the experience or feature, why is it being collected at all?

!!!

#### Using dividers

### Width

### Responsive properties

### Progressive disclosure

### Required vs. optional fields

## Interactivity

## Layout

## Submission

## Error handling and validation

### Interaction

### Client-side validation

### Server-side validation
