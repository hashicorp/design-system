## Spacing

Spacing between sections, fields, text, and other form elements should follow a decreasing scale on an 8px grid. This creates a consistent vertical rhythm between elements and reinforces a natural hierarchy and association between elements.

### Form

A **form** acts as a layout mechanism by wrapping the content, fields and actions to apply consistent spacing while simultaneously handling the logic for submitting information and data collected by the fields.

As a layout mechanism, a form consisting of more than one section should use a 32px gap in between sections.

![Form container](/assets/patterns/form-patterns/form-container.png =450x*)

### Sections

A **section** occupies the largest hierarchy within the form. Sections organize text, fields (inputs, checkboxes, toggles, etc.), and actions into logical sets. There should be a 32px vertical gap between each section within the form container.

![Example of multiple sections in a form](/assets/patterns/form-patterns/form-sections.png =450x*)

### Fields

A **field** describes a form control and label pairing. When displaying multiple fields within a section, there should be a 24px gap between each field.

![Example of multiple fields in a section](/assets/patterns/form-patterns/section-fields.png =450x*)

<!-- TODO
Fields can be further divided into two types: **text fields** and **data fields**.

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

### Sets

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

#### Alignment

Fields organized in a horizontal set should be aligned to the baseline of each element to account for fields with helper text.

![Baseline alignment within a set](/assets/patterns/form-patterns/baseline-alignment.png =500x*)

### Button sets

Organize buttons based on the [Button Set](/components/button-set) guidelines, e.g., using a 16px horizontal gap between buttons. More specifications and examples can be found in the documentation for [button organization](/patterns/button-organization).

![Button set](/assets/patterns/form-patterns/button-set.png =500x*)

## Layout

### Single-column

We recommend _most_ forms use a single-column layout as it makes the information easier to parse and reinforces the sequential nature of filling out a form.

If a form uses a single-column layout, consider setting a maximum width on the form; this can be achieved by using a size or unit **relative** to the page, viewport, or container size, e.g., viewport width unit (`vw`), percentage width (`50%`), or a character unit (`ch`).


!!! Info

The web is a fluid medium. A relative width will adjust based on the viewport and container width. Designing and building a form with a maximum and minimum width will ensure a graceful expansion and contraction within the viewport.
!!!

### Multi-column

Horizontal sets of form elements creates a multi-column layout within the form.

!!! Do

Use a consistent number of columns through the form.

![Consistent number of columns](/assets/patterns/form-patterns/multi-column-consistent-columns.png =500x*)
!!!

!!! Dont

Don't organize a set of fields in two columns and another set in three columns.

![Inconsistent number of columns](/assets/patterns/form-patterns/multi-column-inconsistent-columns.png =500x*)
!!!

!!! Dont

Don't exceed more than three fields in a horizontal set. In most scenarios it's best to limit the number of columns in a form or section to two.

![Three field maximum in a set](/assets/patterns/form-patterns/multi-column-three-fields-max.png =500x*)
!!!

!!! Do

Stack fields vertically when the width of the viewport and form container shrinks.

![Stack fields](/assets/patterns/form-patterns/multi-column-stacking.png =350x*)
!!!

The width of the overall form can impact multi-column layouts. Use set organization logically based on the layout, width of the page, and overall UX strategy in the application.

Refer to the [button organization stacking guidelines](/patterns/button-organization#stacking-order) when determining how buttons should stack as the viewport condenses.

## Text

In sections consisting of multiple blocks of text, use an 8px vertical gap between elements.

![Example of a text section](/assets/patterns/form-patterns/text-section.png =600x*)

Text elements within a form should use logical, step-based sizing to reinforce hierarchy within sections and the form itself. While specifics around type hierarchy should be determined at the application level, adhering to these guidelines will help establish consistency at the page level and when constrained within another element or component.

## Order and organization

Fields within a form generally fall into three need-based categories that can determine order and organization within a form: **technical and application needs**, **user needs**, and **business needs**. These categories don't exist in isolation but have a cumulative effect on how a user perceives a form and how likely they are to complete it.

### Need-based organization

#### Technical and application needs

Sometimes the values or options for a given field depend on information or selection from a previous field.

Generally, fields that are dependencies for other fields benefit from being organized closer to the start of a form. For example, selecting a cluster tier reveals options for cluster sizes that are only available for the previously selected tier.

![Dependencies within forms example](/assets/patterns/form-patterns/cluster-tier-size-options.png)

#### User needs

Users benefit from logical organization and progressive organization, organizing fields from easiest to hardest.

This can help increase form completion by:

- giving the user a sense of accomplishment early on through “quick wins”
- reducing the probability of the user abandoning a form when they’ve already completed the “easier” segments.

#### Business needs

Organizing fields based on their importance (high to low) to completing the form can help minimize abandonment, a crucial aspect of meeting business goals and metrics.

### Logical organization

Organize fields logically; consider how users fill in information based on the context.

For example, when filling out a payment form, organize the fields in the same order as they appear on a credit card or payment method: name, card number, expiration date, security code.

### Visual organization

Once a logical organization has been established,

- categorize elements and fields into sections,
- introduce typographic elements to establish hierarchy,
- and, if necessary, [use dividers](#using-dividers) to differentiate sections clearly.

Each one of these methods will help the user better parse and understand the relationships between each section and the fields contained within.

## Sizing

### Length

Since longer forms can result in a lower completion rate, we recommend looking for ways to reduce the overall number of fields whenever possible.

!!! Insight

If a field is optional, consider whether it’s actually needed in the form. If the information isn’t critical to the experience or feature, can the field be removed?
!!!

#### Multiple sections

Using sections based on the relationship between fields can make a longer form seem less complex. Introducing typographic elements and dividers can further aid the hierarchy of the form and differentiate sections from one another.

##### Using dividers

Dividers introduce more visual hierarchy and differentiation in longer, complex forms.

Use dividers to break up different types of content and categories within a form. Only use dividers between sections, not between fields.

!!! Do

Include a 24px gap above and below to separate the divider from the surrounding form elements; otherwise, it can appear "attached" to a specific section or field.

![Spacing using dividers](/assets/patterns/form-patterns/divider-spacing-do.png =500x*)
!!!

!!! Dont

Don’t use dividers at the end of the last section between the fields and the button set or actions.

![Spacing using dividers](/assets/patterns/form-patterns/divider-spacing-dont.png =500x*)
!!!

!!! Do

Instead, use the section spacing value of 32px.

![Spacing between trailing actions](/assets/patterns/form-patterns/divider-spacing-actions-do.png =500x*)
!!!

#### Multiple steps or pages

Consider breaking the form into multiple steps or pages for exceedingly long and complex forms (e.g., creating a cluster). For multi-step forms, use a [Stepper](/components/stepper) to indicate status and the user’s location within the form.

### Width

The width of a form and the fields it contains are largely dependent on the context the form is in, but adhering to these high-level guidelines can make a complex form approachable and introduce consistency in the UX.

#### Field width

Generally, the width of a field should be wide enough to account for the estimated width of the content it accepts. This gives the user an accurate sense of the character length and type of content the field accepts and is important in setting user expectations.

#### Responsive properties

As the viewport shrinks, the form width should expand relative to the viewport width, eventually occupying the entire width of the viewport or page. Horizontal sets of fields that result in a multi-column layout should stack vertically as the viewport shrinks.

## Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don't have to make assumptions.

For shorter, simpler forms, indicate **optional** fields instead.

Don't mix required and optional labels, stick to one or the other. Using one method can imply that fields without a label are the inverse of whatever method you choose, though expecting the user to carry this knowledge through a complex form can cause unnecessary [validation](?tab=validation) errors when required fields aren't labeled.

## Copying an input value

If a user needs to copy the value within an input, consider pairing a [CopyButton](/components/copy/button) with the input control. This can reduce the manual friction of copying a value to a single targeted action.

![CopyButton paired with an input control](/assets/components/copy/copy-button-composition-single-line-input-simple.png)

Visit the [CopyButton guidelines](/components/copy/button#composition-with-other-components) for more details on this specific composition.