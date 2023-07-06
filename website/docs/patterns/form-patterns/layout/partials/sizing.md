## Length

Since longer forms can result in a lower completion rate, we recommend looking for ways to reduce the overall number of fields whenever possible.

!!! Insight

If a field is optional, consider whether it’s actually needed in the form. If the information isn’t critical to the experience or feature, can the field be removed?
!!!

### Multiple sections

Using sections based on the relationship between fields can make a longer form seem less complex. Introducing typographic elements and dividers can further aid the hierarchy of the form and differentiate sections from one another.

#### Using dividers

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

### Multiple steps or pages

Consider breaking the form into multiple steps or pages for exceedingly long and complex forms (e.g., creating a cluster). For multi-step forms, use a [Stepper](/components/stepper-indicator) to indicate status and the user’s location within the form.

## Width

The width of a form and the fields it contains are largely dependent on the context the form is in, but adhering to these high-level guidelines can make a complex form approachable and introduce consistency in the UX.

### Field width

Generally, the width of a field should be wide enough to account for the estimated width of the content it accepts. This gives the user an accurate sense of the character length and type of content the field accepts and is important in setting user expectations.

### Responsive properties

As the viewport shrinks, the form width should expand relative to the viewport width, eventually occupying the entire width of the viewport or page. Horizontal sets of fields that result in a multi-column layout should stack vertically as the viewport shrinks.