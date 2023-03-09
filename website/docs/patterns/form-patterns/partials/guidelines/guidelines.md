## Spacing

Spacing between sections, fields, text, and other form elements should follow a decreasing scale on an 8px grid. This creates a consistent vertical rhythm between elements and reinforces a natural hierarchy and association between elements.

### Form

A **form** acts as a layout mechanism by wrapping the content, fields and actions to apply consistent spacing while simultaneously handling the logic for submitting information and data collected by the fields.

As a layout mechanism, a form consistenting of more than one section should use a 32px gap in between sections.

### Sections

A **section** occupies the largest hierarchy within the form. Sections organize text, fields (inputs, checkboxes, toggles, etc.), and actions into logical groups. There should be a 32px vertical gap between each section, enforced the form container.

![Example of multiple sections in a form](/assets/patterns/form-patterns/form-sections.png =450x*)

### Fields

A **field** describes a form control and label pairing. When displaying multiple fields within a section, there should be a 24px gap between each field.

![Example of multiple fields in a section](/assets/patterns/form-patterns/section-fields.png =450x*)

Fields can be further divided into two types: **text fields** and **data fields**.

<!-- TODO
#### Text fields
| Form control | Usage | Examples |
|--------------|-------|----------|
| [Text input](/components/form/text-input) | lorem ipsum | Name, email, password, string and numerical data |
| [Textarea](/components/form/textrea) | Lorem ipsum | Messages, longer-form content |
-->

<!-- TODO
#### Data fields
| Form control | Usage | Examples |
|--------------|-------|----------|
| [Checkbox](/components/form/checkbox) | Lorem ipsum | Lorem ipsum |
| [Radio](/components/form/radio) | Lorem ipsum | Lorem ipsum |
| [Radio Card](/components/form/radio-card) | Lorem ipsum | Lorem ipsum |
| [Select](/components/form/select) | Lorem ipsum | Lorem ipsum |
| [Toggle](/components/form/toggle) | Lorem ipsum | Lorem ipsum |
-->

### Groups

Fields may be **grouped** together either horizontally or vertically if they are collecting related information or information that is part of the same object. Within a group there should bea  16px gap either horizontally (creating multiple columns), or vertically between each field.

![Example of fields grouped together](/assets/patterns/form-patterns/field-groups.png =450x*)

!!! Dont

Don't group (either horizontally or vertically) field types that are related but not of the same type, e.g., a text input and a toggle.

![Grouping different field types](/assets/patterns/form-patterns/different-field-type.png)
!!!

!!! Do

Do stack fields of different types vertically. 

![Grouping different field types](/assets/patterns/form-patterns/different-field-type-do.png =500x*)
!!!

Common grouping of fields can include:

- Credit card information: card number, expiration data, security code
- Multi-line address field
- First and last name

## Alignment

Fields organized in a horizontal group should be aligned to the baseline of each element to account for fields with helper text.

![Baseline alignment within a group](/assets/patterns/form-patterns/baseline-alignment.png =500x*)

## Layout

### Single-column

If a form uses a single-column layout, consider setting a maximum width on the form; this can generally be best achieved by using a size or unit that is **relative** the page, viewport, or container size. This can commonly be achieved by using a viewport width unit (`vw`), percentage width (e.g., `50%`), or a character unit (`ch`).

We recommend _most_ forms use a single column layout as it makes the information within the form easier to parse for the user and reinforces the sequential nature of filling out a form.

!!! Info

The web is a fluid medium. A relative width will adjust based on the viewport and container width. Designing and building a form with a maximum and minimum width will ensure a graceful expansion and contraction within the viewport.
!!!

### Multi-column

Grouping form elements horizontally creates a multi-column layout within the form.

!!! Do

Use a consistent number of columns through the form.

![Consistent number of columns](/assets/patterns/form-patterns/multi-column-consistent-columns.png =500x*)
!!!

!!! Dont

Don't organize a group of fields in two columns and another group in three columns.

![Inconsistent number of columns](/assets/patterns/form-patterns/multi-column-inconsistent-columns.png =500x*)
!!!

!!! Dont

Don't exceed more than three fields in a horizontal group. In most scenarios it's best to limit the number of columns in a form or section to two.

![Three field maximum in a group](/assets/patterns/form-patterns/multi-column-three-fields-max.png =500x*)
!!!

!!! Do

Stack fields vertically when the width of the viewport and form container shrinks.

![Stack fields](/assets/patterns/form-patterns/multi-column-stacking.png =350x*)
!!!

The width of the overall form can impact multi-column layouts. Use grouping logically based on the layout, width of the page, and overall UX strategy in the application.

## Text

In sections consisting of multiple blocks of text, use an 8px vertical gap between elements.

![Example of a text section](/assets/patterns/form-patterns/text-section.png =600x*)

Text elements within a form should use logical, step-based sizing to reinforce hierarchy within sections and the form itself. While specifics around type hierarchy should be determined at the application level, adhering to these guidelines will help establish consistency at the page level and when constrained within another element or component.

## Actions

### Button grouping

Group buttons based on the [ButtonSet](/components/button-set) guidelines, e.g., using a 16px horizontal gap between buttons.

![Action grouping](/assets/patterns/form-patterns/action-group.png =500x*)

<!-- Add this in when the docs are complete and approved
For more complex groupings of buttons, refer to the [Button alignment, grouping, and order](/patterns/button-alignment) pattern guidelines.
-->

## Order and organization

Fields within a form generally fall into three categories that can determine order and organization within a form: **technical and application needs**, **user needs**, and **business needs**. These categories don't exist in isolation but have a cumulative effect on how a user perceives a form and how likely they are to complete it.

### Technical and application needs

Sometimes the values or options for a given field depend on information or selection from a previous field.

Generally, fields that are dependencies for other fields benefit from being organized closer to the start of a form. For example, selecting a cluster tier reveals options for cluster sizes that are only available for the previously selected tier.

![Dependencies within forms example](/assets/patterns/form-patterns/cluster-tier-size-options.png)

Read more about showing elements conditionally with [progressive disclosure](#progressive-disclosure).

### User needs

Users benefit from logical grouping and progressive organization, organizing fields from easiest to hardest.

This can help increase form completion by:

- giving the user a sense of accomplishment early on through “quick wins”
- reducing the probability of the user abandoning a form when they’ve already completed the “easier” segments.

### Business needs

Organizing fields based on their importance (high to low) to complete the form can help minimize abandonment, a crucial aspect of meeting business goals and metrics.

### Logical grouping

Organize fields logically; consider how users fill in information based on the context.

For example, when filling out a payment form, organize and group the fields in the same order as they appear on a credit card or payment method: name, card number, expiration date, security code.

### Visual organization

Once a logical organization or grouping has been established,

- categorize elements and fields into sections, 
- introduce typographic elements to establish hierarchy,
- and, if necessary, use dividers to differentiate sections clearly.

Each one of these methods will help the user better parse and understand the relationships between each section and the fields contained within.

## Sizing

### Length

The complexity of the form can significantly impact whether a user successfully completes the form or abandons the task prior to completion. If the form includes a large number of fields, consider breaking it up by using sections and dividers and/or multiple steps or pages. 

#### Multiple sections

Using sections based on the relationship between fields can make a longer form seem less complex. Introducing typographic elements and dividers can further aid the hierarchy of the form and differentiate sections from one another.

##### Using dividers

Dividers introduce more visual hierarchy and differentiation in longer, complex forms.

Use dividers to break up different types of content and categories within a form. Only use dividers between sections, not between fields.

When using a divider, include a 24px gap above and below to separate the divider from the surrounding form elements; otherwise, it can appear "attached" to a specific section or field.

![Spacing using dividers](/assets/patterns/form-patterns/divider-spacing.png =500x*)

!!! Dont

Don’t use dividers at the end of the last section between the fields and the button set or actions. Instead, use 32px of space. 
!!!

#### Multiple steps or pages

Consider breaking the form into multiple steps or pages for exceedingly long and complex forms (e.g., creating a cluster). For multi-step forms, use a [Stepper](/components/stepper-indicator) to indicate status and the user’s location within the form.

#### Multiple steps or pages

For exceedingly long, complex forms (e.g., creating a cluster), consider breaking the form into multiple steps or pages. A [Stepper](/components/stepper-indicator) can be used to annotate status and location in a multi-step form.

!!! Info

As a general note, special care should be taken to _reduce_ the number of fields whenever possible.

- Long forms are more challenging for the user which can result in a lower completion rate.
- If a field is optional, consider whether it should be included in the form at all. If the information isn't crucial to the experience or feature, why is it being collected at all?
!!!

### Width

The width of a form and the fields it contains is largely dependent on the context the form is in, but adhering to these high-level guidelines can make a complex form approachable and introduce consistency in the UX.\

#### Field width

Generally, the width of a field should be wide enough to account for the estimated width of the content it accepts. This gives the user an accurate sense of the character length and type of content the field accepts and is important in setting user expectations.

#### Responsive properties

As the viewport shrinks, the form width should expand relative to the viewport width, eventually occupying the entire width of the viewport or page. Horizontally grouped fields that result in a multi-column layout should stack vertically as the viewport shrinks.

## Progressive disclosure

Users want power but also simplicity. Progressive disclosure refers to only displaying the most important information (or elements of a form) and conditionally showing additional fields depending on:

1. the input state of other fields
2. if more complex settings are requested by the user.

## Required optional

Displaying what fields are required or optional can help users submit a form free of errors, but can also add visual weight the form.

- For shorter forms fields should be interpreted as required by default. Fields that are not required should be marked as optional.
- Don't mix required and optional labels, stick to one or the other. Using one method will imply that fields without a label are the inverse of whatever method you choose.

When determining whether to mark fields as optional or required, consider which method occurs the least. This can help reduce visual weight since unmarked fields are implied as the inverse of marked fields.

!!! Do

Do list the method that occurs the least.

![Do list the method that occurs the least](/assets/patterns/form-patterns/do-required-fields.png =450x*)
!!!

!!! Dont

Don't list the method that occurs the most.

![Don't list the method that occurs the most](/assets/patterns/form-patterns/dont-optional-fields.png =450x*)
!!!