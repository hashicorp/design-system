## Spacing

Spacing between sections, fields, text, and other elements of a form should follow a decreasing scale based off of the 8px grid. This creates a consistent vertical rhythm between elements and reinforces a natural hierarchy and association between elements.

### Form

A form wraps the content, fields, and actions while simultaneously handling the logic for submitting and action actions performed by the form. At a fundamental level, a form also acts as a layout mechanism, adding consistent spacing between sections.

### Sections

A **section** occupies the largest hierarchy within the form and is used as a descriptive term for organizing combinations of text, form elements (inputs, checkboxes, toggles, etc), and actions. Even in the simplest of circumstances a form can consist of multiple sections with differing content, each receiving a 32px vertical gap in between.

![Example of multiple sections in a form](/assets/patterns/form-patterns/form-sections.png =450x*)

### Fields

A **field** is a broad term used to describe a form control and label pairing. When combined within a section there should be a 24px gap between each field.

![Example of multiple fields in a section](/assets/patterns/form-patterns/section-fields.png =450x*)

Fields can be further broken down into two types; text fields and data fields, each with it's own recommended usage and examples.

#### Text fields

<!-- TODO -->

| Form control | Usage | Examples |
|--------------|-------|----------|
| [Text input](/components/form/text-input) | lorem ipsum | Name, email, password, string and numerical data |
| [Textarea](/components/form/textrea) | Lorem ipsum | Messages, longer-form content |

#### Data fields

<!-- TODO -->

| Form control | Usage | Examples |
|--------------|-------|----------|
| [Checkbox](/components/form/checkbox) | Lorem ipsum | Lorem ipsum |
| [Radio](/components/form/radio) | Lorem ipsum | Lorem ipsum |
| [Radio Card](/components/form/radio-card) | Lorem ipsum | Lorem ipsum |
| [Select](/components/form/select) | Lorem ipsum | Lorem ipsum |
| [Toggle](/components/form/toggle) | Lorem ipsum | Lorem ipsum |

### Groups

Fields may be **grouped** together either horizontally or vertically if they are collecting related information or information that is part of the same object. Within a group there should bea  16px gap either horizontally (creating multiple columns), or vertically between each field.

![Example of fields grouped together](/assets/patterns/form-patterns/field-groups.png =450x*)

!!! Dont

Don't group (either horizontally or vertically) field types that are related but not of the same type, e.g., a text input and a toggle.

![Grouping different field types](/assets/patterns/form-patterns/different-field-type.png)
!!!

!!! Do

Instead, stack the fields vertically. 

![Grouping different field types](/assets/patterns/form-patterns/different-field-type-do.png =500x*)
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

In sections consisting of multiple blocks of text, an 8px vertical gap between text elements should be used.

![Example of a text section](/assets/patterns/form-patterns/text-section.png =600x*)

Text elements within a form should use logical, step-based sizing to reinforce hierarchy within sections, as well as within the form itself. While specifics around type hierarchy should be determined at the application level, adhering to these guidelines will help establish consistency both at the page level, and when constrained within another element or component.

<!-- TODO -->

### Actions

#### Button grouping

Buttons should be grouped using the [ButtonSet](/components/button-set) guidelines, e.g., using a 16px horizontal gap between each button.

![Action grouping](/assets/patterns/form-patterns/action-group.png =500x*)

For more complex groupings of buttons, refer to the [Button alignment, grouping, and order](/patterns/button-alignment) pattern guidelines.

### Order and organization

Fields within a form generally fall into three categories that can help determine order and organization within a form. These categories don't exist in isolation but rather have a cumulative effect on how a user perceives a form and how likely they are to complete it.

#### Technical and application needs

Sometimes the values or options for a given field are dependent on a prior field or piece of information provided to the application. These technical contraints within the application are often expressed through conditional logic within the form to determine what is displayed to the user depending on what has already been selected or input in previous fields.

Fields that are dependencies for other fields generally benefit from being organized closer to the start of a the form; e.g., selecting a cluster tier, which reveals options for cluster size that are dependent on the tier.

![Dependencies within forms example](/assets/patterns/form-patterns/cluster-tier-size-options.png)

Read more about showing elements conditionally with [progressive disclosure](#progressive-disclosure).

#### User needs

Users benefit from logical grouping and progressive organization; organizing fields from easiest to hardest. This can help increase form completion by:

- giving the user a sense of accomplishment early on through "quick wins"
- reducing the probability of a user abandoning a form when they've already completed the "easier" segments.

#### Business needs

<!-- TODO -->

Organizing fields based on their importance (high to low) to successful completion of a form can help minimize abandonment; a crucial aspect to meeting business goals and metrics.


#### Logical grouping

Fields should be ordered "logically"; consider how a user will fill in information based on the context they are in.

- When filling out a payment form: organize and group the fields in the same order as they appear on a credit card or payment method.
  - Name, card number, expiration date, security code
<!-- TODO: add more examples -->

#### Visual organization

Once a logical organization or grouping has been established,

- categorize elements and fields into sections, 
- introduce typographic elements to establish hierarchy,
- and if necessary use dividers to more clearly differentiate sections.

Each one of these methods will visually help the user to better parse and understand the relationships between each section and fields contained within.

## Sizing

### Length

Determined by the number of fields and supporting elements (text, titles, etc). form length can have a significant impact on whether a user successfully completes a form or abandons the task prior to completion. If a feature or flow relies on a large number of fields, consider breaking up the form using one or more of the following strategies.

#### Multiple sections

Breaking up a form into multiple sections based on the relationship between fields and categories of sections can make a long form seem less complex. Introducing typographic elements and dividers can further aid the hierarchy of the form and differentiate sections from one-another.

#### Multiple steps or pages

For exceedingly long, complex forms (e.g., creating a cluster), consider breaking the form into multiple steps or pages. A [Stepper](/components/stepper-indicator) can be used to annotate status and location in a multi-step form.

!!! Info

As a general note, special care should be taken to _reduce_ the number of fields whenever possible.

- Long forms are more challenging for the user which can result in a lower completion rate.
- If a field is optional, consider whether it should be included in the form at all. If the information isn't crucial to the experience or feature, why is it being collected at all?
!!!

#### Using dividers

Dividers introduce more visual hierarchy and differentiation in long, complex forms.

Only use dividers between sections of a form, not between fields or other smaller elements within a section. A divider should be used to break up different types of content and categories within a form.

When using a divider, include a 24px gap above and below to separate the divider from surrounding form elements, otherwise it can appear "attached" to a specific section or field.

![Spacing using dividers](/assets/patterns/form-patterns/divider-spacing.png =500x*)

!!! Dont

Dividers should not be used trailing the last section of a form between the fields and the button set or actions. Instead, the section spacing of 32px should be used.
!!!

## Width

The width of a form and the fields it contains is largely dependent on the context the form is in, but adhering to these high-level guidelines can make a complex form approachable and introduce consistency in the UX.

#### Form width

A form should hug the content and the fields it contains.

![Form width](/assets/patterns/form-patterns/form-width-example.png)

#### Field width

The width of a field within a form should be wide enough to account for the estimated width of the content it accepts. This gives the user an accurate sense of the length and type of the content the field accepts and is important in setting user expectations.

#### Single column layout

If a form uses a single-column layout, consider setting a maximum width on the form; this can generally be best achieved by using a size or unit that is **relative** the page, viewport, or container size. This can commonly be achieved by using a viewport width unit (`vw`), percentage width (e.g., `50%`), or a character unit (`ch`).

!!! Info

The web is a fluid medium; a relative width will adjust based on the viewport and container width. Designing and building a form with a recommended maximum and minimum width will help to conceptualize the graceful expansion and contraction of the viewport
!!!

<!-- Constrained vs unconstrained -->

### Responsive properties

As the viewport shrinks, the form width should expand relative to the viewport width, eventually occupying the entire width of the viewport or page. Horizontally grouped fields that result in a multi-column layout should stack vertically as the viewport shrinks.

## Progressive disclosure

Users want power, but also want simplicity. Progressive disclosure refers only displaying the most important information (or elements of a form) and conditionally showing additional fields depending on:

1. the input state of other fields
2. if more complex settings are requested by the user.

## Required vs. optional fields

Displaying to the user what fields are required or optional can help users submit a form free of errors, but can also add visual weight the form.

- For shorter forms fields should be interpreted as required by default. Fields that are not required should be marked as optional.
- Don't mix required and optional labels, stick to one or the other. Using one method will imply that fields without a label are the inverse of whatever method you choose.

When determining whether to mark fields as optional or required, consider which method occurs the least. This can help reduce visual weight since unmarked fields are implied as the inverse of marked fields.

![Comparison of forms using optional vs required](/assets/patterns/form-patterns/required-optional-comparison.png)

<!-- Validation -->