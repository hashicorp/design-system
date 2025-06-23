The Form component serves as the container for all Form layout components and form content. It ensures a consistent and streamlined user experience. 

### When to use

- To structure and organize form elements and inputs into a consistent layout
- When creating a form of any size in our products, including forms nested within Flyout or Modal components

### When not to use

- To organize non-form content
- To create a form for key-value pairs, use the [Key Value Inputs](/components/forms/key-value-inputs) component

![The anatomy of the Form layout, indicating the header, sections, separator, and actions](/assets/components/form/layout/form-anatomy.png)


## Single column layout

The Form component ensures a consistent and streamlined user experience through the use of a single-column layout. Multi-column layouts can disrupt the visual flow and reading order of fields which can result in missed inputs and increased friction. Multiple fields can be places in a row only when grouping related inputs improves the user experience. See [Section Multi Field Group](/components/form/layout#form-section-multi-field-group)

![The anatomy of the Form layout, indicating the header, sections, separator, and actions](/assets/components/form/layout/form-anatomy.png)

## Spacing

Spacing in forms is based on a decreasing scale on an 8px grid. From largest to smallest, the spacing structure is:

- Sections are 32px apart
- Separators are 32px from Section elements on either vertical side
- When inputs are stacked, they are 24px apart. When inputs are within a Section Field Group and side by side, e.g., in wider viewports, they are 16px apart.
- Text elements inside the Form Header and Form Section Header are 8px apart

![Representation of the various spacing sizes between Form layout components](/assets/components/form/layout/form-layout-spacing.png)

!!! Do

Organize inputs together when they are closely related and beneficial to read together. No more than three inputs should be put within a single row.

![Three credit card information fields arranged with one full width field followed by a row of two side-by-side equal width fields](/assets/components/form/layout/form-do-rows.png)

!!!

!!! Dont

Place inputs in rows to save space or create columns within the form.

![Three equal width fields for credit card information arranged in a single row](/assets/components/form/layout/form-dont-rows.png)

!!!

Visit the [Form Patterns](/patterns/form-patterns) guidelines for additional details on spacing in forms.

## Form Header

The Form component has an optional header with styled text for a Title and Description. It also includes a space for custom content to use as needed.

![Form Header anatomy showing a Title, a Description, and a placeholder for additional content](/assets/components/form/layout/form-header-anatomy.png)

## Form-level error alert

Conventionally, input level validation is sufficient for error messaging within a form but overarching form-level messaging may be needed if validations happen on submission. Form-level error alerts should be applied in the case of form-level submission failures, timeouts during data submission, or when errors apply to multiple sections within the larger form.

The form-level error message will appear below the Header as its own Section and uses the Alert component.

![An Error Alert component used within a Form appearing above all the fields serving as a form-level error message](/assets/components/form/layout/form-layout-error.png)

## Form Section

Inputs within a form are organized in Sections. Multiple Sections may be used to group content for a more scannable and organized experience. Inputs that belong under the same heading or are related to the same topic should be within a Section.

### Form Section Header

Similar to the Form Header, the Section Header contains styled and spaced text elements, and a space for custom content to be used as needed.

![Section Header anatomy showing a Title, a Description, and a placeholder for additional content](/assets/components/form/layout/form-section-anatomy.png)

### Form Section Multi Field Group

The Section Multi Field Group organizes closely related form inputs in a single row, setting 16px between them, as opposed to 24px when stacked. This reinforces their relationship.

In narrower screens, such as mobile devices, form inputs contained in a Section Multi Field Group automatically “stack.”


![Section Multi Field Group example depicting spacing between grouped fields](/assets/components/form/layout/form-section-fieldgroup.png)

## Form Separator

A Separator can be placed between Sections when a clearer visual distinction between Sections is needed.

![Separator used to add extra visual differentiation between two Sections](/assets/components/form/layout/divider-spacing-do-1.png)

!!! Dont

Don’t use a Separator between the last Section and the Button Set or form actions at the bottom of the Form content.

![Separator being uses after all the content in a form](/assets/components/form/layout/divider-spacing-dont.png)

!!!

## Form Footer

The Form Footer typically houses a Button or Button Set to allow users to save or submit form information. When there's more than one action, we recommend using the [Button Set](/patterns/form-patterns#button-sets) component for consistent spacing and layout.

## Width and resizing behavior

### Max-width

Sections have a default max-width of 672px, establishing a consistent line length throughout applications.

Where more control is needed, you can override the max-width property with any valid CSS value. In these cases, all sections should be set to the same max-width value.

### Full-width

Individual Sections can be set to full-width, if needed. Any component requiring increased width for usability, e.g., a Radio Card Group or Key Value Input, should be moved into a separate Section to allow for full width layout, even if they would otherwise be grouped with other associated fields.

![Full width Form content in comparison to constricted width content](/assets/components/form/layout/form-mixed-width-example.png)

Fields within a Section Multi Field Group stack automatically at the ['md' breakpoint](/foundations/breakpoints). 
