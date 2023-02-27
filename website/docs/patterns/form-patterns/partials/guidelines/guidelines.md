## Spacing

Spacing between sections, fields, text, and other elements of a form should follow a decreasing scale based off of the 8px grid. This creates a consistent vertical rhythm between elements and reinforces a natural hierarchy and association between elements.

### Form

A form wraps the content, fields, and actions while simultaneously handling the logic for submitting and action actions performed by the form. At a fundamental level, a form also acts as a layout mechanism, adding consistent spacing between sections.

### Sections

A **section** occupies the largest hierarchy within the form and is used as a descriptive term for organizing combinations of text, form elements (inputs, checkboxes, toggles, etc), and actions. Even in the simplist of circumstances a form can consist of multiple sections with differing content, each receiving a 32px vertical gap in between.

![Example of multiple sections in a form](/assets/patterns/form-patterns/form-sections.png =450x*)

### Fields

A **field** is a broad term used to describe a form control and label pairing for collecting user input, information, and data. This can include:

- [Text input](/components/text-input)
- [Select](/components/select)
- [Radio](/components/radio)
- Any other Helios form component or custom form elements

When combined within a section there should be a 24px gap between each field.

![Example of multiple fields in a section](/assets/patterns/form-patterns/section-fields.png =450x*)

### Groups

Fields may be **grouped** together either horizontally or vertically if they are collecting related information or information that is part of the same object. Within a group there should bea  16px gap either horizontally (creating multiple columns), or vertically between each field.

![Example of fields grouped together](/assets/patterns/form-patterns/field-groups.png =450x*)

!!! Dont

Don't group (either horizontally or vertically) input types that are related but not the same type, e.g., a text input and a toggle.

![Grouping different field types](/assets/patterns/form-patterns/different-field-type.png)
!!!

Common grouping of fields can include:

- Credit card information; card number, expiration data, security code.
- Multi-line address field
- First and last name

#### Alignment

Fields organized in a horizontal group should be aligned to the baseline of each element to account for fields which have helper text.

![Baseline alignment within a group](/assets/patterns/form-patterns/baseline-alignment.png =500x*)

#### Multi-column layout

Grouping form elements horizontally creates a multi-column layout within the form. When grouping elements,

- use a consistent number of columns throughout the form; e.g., don't organize a group of fields in two-columns and another group in three-columns.
- don't exceed more than three fields in a horizontal group.
- fields should stack vertically when the width of the viewport and form container shrinks.

Multi-column layouts can be impacted by the width of the overall form. Use grouping logically based on the layout, width of the page, and overall UX strategy in the application.

### Text

Sections consisting of text should use a 8px vertical gap between text elements.

![Example of a text section](/assets/patterns/form-patterns/text-section.png =600x*)

### Actions

#### Button grouping

Buttons should be grouped using the [ButtonSet](/components/button-set) guidlines, e.g., using a 16px horizontal gap between each button.

![Action grouping](/assets/patterns/form-patterns/action-group.png =500x*)

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

For exceedingly long, complex forms (e.g., creating a cluster), consider breaking the form into multiple steps or pages. A [Stepper](/components/stepper-indicator) can be used to annotate status and location in a multi-step form.

!!! Info

As a general note, special care should be taken to _reduce_ the number of fields whenever possible.

- Long forms are more challenging for the user which can result in a lower completion rate.
- If a field is optional, consider whether it should be included in the form at all. If the information isn't crucial to the experience or feature, why is it being collected at all?

!!!

#### Using dividers

Dividers can help introduce more visual hierarchy and differentiation in a long, complex forms.

Only use dividers between sections of a form, not between fields or other smaller elements within a section. A divider should be used to break up different types of content and categories within a form.

When using a divider, increase the spacing between sections to 48px from 32px (24px on the top and bottom of the divider). This helps to separate the divider from surrounding form elements, otherwise it can appear "attached" to a specific section or field.

_Insert image here_

!!! Dont

Dividers should not be used trailing the last section of a form between the fields and the button set or actions. Instead, the section spacing of 32px should be used.
!!!

## Width

The width of a form and the fields it contains is largely dependent on the context the form is in, but adhering to these high-level guidelines can make a complex form approachable and introduce consistency in the UX.

#### Form width

The width of a form should hug the content and fields it contains, the form width should not determine the width of the fields contained within.

_Insert supporting image_

#### Field width

The width of a field within a form should be wide enough to account for the estimated width of the content it accepts. This gives the user an accurate sense of the length and type of the content they should be inputting into the field and is important in setting expectations of the user.

_Insert supporting image_

#### Single column layout

If a form uses a single-column layout, consider setting a maximum width on the form; this can generally be best achieved by using a size or unit that is **relative** the page, viewport, or container size. This can commonly be achieved by using a viewport width unit (`vw`), percentage width (e.g., `50%`), or a character unit (`ch`).

!!! Info

The web is a fluid medium; a relative width will adjust based on the viewport and container width. Designing and building a form with a recommended maximum and minimum width will help to conceptualize the graceful expansion and contraction of the viewport
!!!

### Responsive properties

As the viewport shrinks, the width of the form should expand relative to the viewport width, eventually occupying the entire width of the viewport or page. Horizontally grouped fields that result in a multi-column layout should stack vertically as the viewport shrinks.

## Progressive disclosure

Users want power, but also want simplicity. Progressive disclosure refers only displaying the most important information (or elements of a form) and conditionally showing additional fields depending on:

1. the input state of other fields
2. if more complex settings are requested by the user.

_Insert supporting image_

## Required vs. optional fields

Displaying to the user what fields are required or optional can help users submit a form free of errors, but can also add visual weight the form.

- For shorter forms fields should be interpreted as required by default. Fields that are not required should be marked as optional.
- Don't mix required and optional labels, stick to one or the other. Using one method will imply that fields without a label are the inverse of whatever method you choose.

When determining whether to mark fields as optional or required, consider which method occurs the least. This can help reduce visual weight since unmarked fields are implied as the inverse of marked fields.

![Comparison of forms using optional vs required](/assets/patterns/form-patterns/required-optional-comparison.png)

### Client-side validation

### Server-side validation
