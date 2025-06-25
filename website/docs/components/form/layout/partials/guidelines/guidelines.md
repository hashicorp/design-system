## Usage

### When to use

- To structure and organize form elements and inputs into a consistent layout
- When creating a form of any size in our products, including forms nested within Flyout or Modal components

### When not to use

- To organize non-form content
- To create a form for key-value pairs, use the [Key Value Inputs](/components/forms/key-value-inputs) component

![The anatomy of the Form layout, indicating the header, sections, separator, and actions](/assets/components/form/layout/form-anatomy.png)

## Spacing

Spacing in forms is based on a decreasing scale on an 8px grid. From largest to smallest, the spacing structure is:

- The Form Header, Sections, Separators, and Footer are 32px apart.
- Stacked inputs are 24px apart.
- Side by side inputs within a Section Multi Field Group are 16px apart.
- Text elements within the Form Header and Form Section Headers are 8px apart.

![Representation of the various spacing sizes between Form layout components](/assets/components/form/layout/form-layout-spacing.png)

Visit the [Form Patterns](/patterns/form-patterns) guidelines for additional details on spacing in forms.

## Form

The Form component serves as the container for all Form layout components and form content. It establishes the spacing between the Form Header, Sections, Separators, and Form Footer.

## Form Header

The Form component has an optional header with styled text for a Title and Description. It also includes a space for custom content to use as needed.

![Form Header anatomy showing a Title, a Description, and a placeholder for additional content](/assets/components/form/layout/form-header-anatomy.png)

## Form-level error alert

Conventionally, input level validation is sufficient for error messaging within a form but overarching form-level messaging may be needed if validations happen on submission. Form-level error alerts should be applied in the case of form-level submission failures, timeouts during data submission, or when errors apply to multiple sections within the larger form.

The form-level error message will appear below the Header as its own Section and uses the Alert component.

![An Error Alert component used within a Form appearing above all the fields serving as a form-level error message](/assets/components/form/layout/form-layout-error.png)

## Form Section

Inputs within a form are organized in Sections. Multiple Sections may be used to group content for a more scannable and organized experience. Inputs that belong under the same heading or are related to the same topic should be within a Section.

### Section Header

Similar to the Form Header, the Section Header contains styled and spaced text elements, and a space for custom content to be used as needed.

![Section Header anatomy showing a Title, a Description, and a placeholder for additional content](/assets/components/form/layout/form-section-anatomy.png)

### Section Multi Field Group

The Section Multi Field Group organizes closely related form inputs in a single row, setting 16px between them, as opposed to 24px when stacked. This reinforces their relationship.

![Section Multi Field Group example depicting spacing between grouped fields](/assets/components/form/layout/form-section-fieldgroup.png)

In narrower screens, such as mobile devices, form inputs contained in a Section Multi Field Group automatically stack at the [“md” breakpoint](/foundations/breakpoints). 


!!! Do

Organize inputs together when they are closely related and beneficial to read together. No more than three inputs should be put within a single row.

![Three credit card information fields arranged with one full width field followed by a row of two side-by-side equal width fields](/assets/components/form/layout/form-do-rows.png)

!!!

!!! Dont

Place inputs in rows to save space or create columns within the form.

![Three equal width fields for credit card information arranged in a single row](/assets/components/form/layout/form-dont-rows.png)

!!!

## Form Separator

A Separator can be placed between Sections when a clearer visual distinction between Sections is needed.

!!! Do

Use a Separator to add space between Sections or before a new Section Header. 

![Separator used to add extra visual differentiation between two Sections](/assets/components/form/layout/divider-spacing-do.png)

!!!

!!! Dont

Don’t use a Separator between the last Section and Form Footer / Button Set.

![Separator being uses after all the content in a form](/assets/components/form/layout/divider-spacing-dont.png)

!!!

## Form Footer

The Form Footer typically houses Buttons to allow users to submit form information. When there's more than one Button or action, we recommend using the [Button Set](/patterns/form-patterns#button-sets) component for consistent spacing and layout.

## Width and resizing behavior

### Max-width

Sections have a default max-width of 672px, establishing a consistent line length throughout applications. It's possible to customize this max-width value if needed.


### Full-width

Individual Sections can be set to full-width, if needed. Any component requiring increased width for usability, e.g., a Radio Card Group, should be moved into a separate Section to allow for full width layout, even if they would otherwise be grouped with other associated fields.

![Full width Form content in comparison to constricted width content](/assets/components/form/layout/form-mixed-width-example.png)
