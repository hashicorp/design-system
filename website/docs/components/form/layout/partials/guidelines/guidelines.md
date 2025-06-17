## Usage

Form layout components in Ember and their related Layout “Template” component in Figma are structural components that provide the scaffolding for building consistent forms across products. These components establish spacing and layout standards that give users an experience focused on simplicity and ease of use.

### When to use

- To structure and organize form elements and inputs into a consistent layout
- When creating a form of any size in our products, including forms nested within Flyout or Modal components

### When not to use

- To organize non-form content
- To create key-value pairs, use the [Key Value Inputs](/components/forms/key-value-inputs) component

## Single column layout

The Form component ensures a consistent and streamlined user experience. We recommend using a single-column layout for forms, as multi-column layouts can disrupt the visual flow and reading order. Multi-column layouts can potentially result in missed inputs requiring resolution and thereby increasing friction. They should only be used when grouping related inputs improves the user experience.

![The anatomy of the Form layout, indicating the header, sections, separator, and actions](/assets/components/form/layout/form-anatomy.png)

### Spacing

Spacing in forms is based on a decreasing scale on an 8px grid. From largest to smallest, the spacing structure is:

- Sections are 32px apart
- Separators are 32px from Section elements on either vertical side
- Inputs within a Section are 24px apart; unless they are within a Section Field Group
- Inputs within a Section Field Group have 16px spacing in wider viewports. In small viewports, the stacking matches the 24px spacing that all other Section elements share
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

Visit the [Form Patterns][/patterns/form-patterns] guidelines for additional details on spacing in forms.

## Form Header

An optional header is available within the **Form component**. The Header has two variants, one for the form-level header and one for section-level headers. Each variant contains styled text for a Title and Description to serve as a starting point. All Header child elements have a gap of 8px applied between them.

The Title and Description content can be edited as needed. The space for custom content can also be edited or removed as needed.

![Form Header anatomy showing a Title, a Description, and a placeholder for additional content](/assets/components/form/layout/form-header-anatomy.png)

## Form-level error alert

Conventionally, input level validation is sufficient for error messaging within a form but overarching form-level messaging may be needed if validations happen on submission. Form-level error alerts should be applied in the case of form-level submission failures, timeouts during data submission, or when errors apply to multiple sections within the larger form.

The form-level error message will appear below the Header as its own Section and uses the Alert component.

![An Error Alert component used within a Form appearing above all the fields serving as a form-level error message](/assets/components/form/layout/form-layout-error.png)

## Form Section

Inputs within a form are organized in Sections. Multiple Sections may be used to group content for a more scannable and organized experience. Inputs that belong under the same heading or are related to the same topic should be within a Section.

### Section Header

Similar to the Form Header, the Section Header contains styled and spaced text elements.

The title and description can be customized, and a space for custom content can be edited or removed.

![Section Header anatomy showing a Title, a Description, and a placeholder for additional content](/assets/components/form/layout/form-section-anatomy.png)

### Section Field Group

The Section Field Group is used to lay out closely related form inputs in a single row and also sets tighter spacing between them to reinforce their relationship. (16px spacing vs. 24px)

In narrower screens, such as mobile devices, form inputs contained in a Section Field Group automatically “stack.”


![Section Field Group example depicting spacing between grouped fields](/assets/components/form/layout/form-section-fieldgroup.png)

## Separator

A Separator can be placed between Sections when a clearer visual distinction between Sections is needed.

!!! Do

A 32px gap is included above and below to divide the Separators and to avoid the appearance of being from the surrounding form elements; otherwise, it can appear “attached” to a specific section or field.

![Separator used to add extra visual differentiation between two Sections](/assets/components/form/layout/divider-spacing-actions-do-1.png)

!!!

!!! Dont

Don’t use a Separator between the last Section and the Button Set or form actions at the bottom of the Form content.

![Separator being uses after all the content in a form](/assets/components/form/layout/divider-spacing-dont.png)

!!!

## Button Set

Buttons are necessary saving or submitting form information. For consistent spacing and layout, we recommend using a [Button Set](/patterns/form-patterns#button-sets) to contain the buttons/actions to Save/Submit or Cancel the form.

## Width and resizing behavior

### Max-width

Sections have a default max-width of 672px, establishing a consistent line length throughout applications.

Where more control is needed, you can override the max-width property with any valid CSS value. In these cases, all sections should be set to the same max-width value.

### Full-width

Individual Sections can be set to full-width, if needed. Any component requiring increased width for usability, e.g., a Radio Card Group or Key Value Input, should be moved into a separate Section to allow for full width layout, even if they would otherwise be grouped with other associated fields.

![Full width Form content in comparison to constricted width content](/assets/components/form/layout/form-mixed-width-example.png)

Fields within a Section Field Group stack automatically at the ['md' breakpoint](/foundations/breakpoints). Forms inside [Flyout](/components/flyout) and [Modal](/components/modal) components should stack in all instances except when used in the **large** Flyout size variants.
