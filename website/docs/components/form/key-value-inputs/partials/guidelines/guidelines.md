## Usage

### When to use

- When two related inputs (often a key and value pair) are repeated for batch submission.
- When collective validation of each associated row is required.

### When not to use

- When inputs in each row are not closely related, use the [form layout helpers](/components/form/layout) instead.

## Header

Key value inputs use a header that includes a legend, helper text and generic content slot.

![](/assets/components/form/key-value-inputs/key-value-inputs-legend-content.png)

### Legend

A legend is required to provide context for the overall [fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset). A legend can be configured to render either as its default size, or as a heading depending on where the Key Value Inputs live within the page content.

When placed along with other form components, we recommend using the default legend style provided by the component.

![The key value inputs, which is part of a larger form, has the fieldset helper text visible describing to the user what files to upload.](/assets/components/form/key-value-inputs/key-value-inputs-legend-part-of-larger-form.png)

When using the Key Value Inputs as its own section, we recommend using a heading for the legend. The heading size to use is dependent on the existing heading structure.

![Key value inputs are the only form elements on the page, the heading using display 300.](/assets/components/form/key-value-inputs/key-value-inputs-legend-alone-in-form.png)

### Helper text and generic content

The helper text and generic content slot are optional and can be used to provide additional information that applies to all rows.

!!! DO

Use the helper text and generic content slot to reduce the amount of repeated information in each row. This focuses the user’s attention on data submission.

![Helper text used as a means to explain what the toggle in each row does. Generic slot used to include a button with more details.](/assets/components/form/key-value-inputs/key-value-inputs-helper-generic-do.png)

!!!

!!! DONT

Don’t repeat information in each row if it can be explained once at the top of the rows.

![Each row has an input, toggle with helper text enabled and a button in the generic slot. This has repetitive information in each row that over complicates the key value input component's usage.](/assets/components/form/key-value-inputs/key-value-inputs-helper-generic-dont.png)

!!!

### Validation

In addition to form-level validation, if a specific error is associated with the fieldset, it will be displayed below the add button.

![Below the legend and helper text is a compact critical alert showing a fieldset error.](/assets/components/form/key-value-inputs/key-value-inputs-fieldset-error.png)

Read more about this in our [form patterns validation documentation](/patterns/form-patterns?tab=validation).

## Input rows

Each row often has two inputs, one for a key and one for a value. However, there may be exceptions where a single input may be necessary. 

![Only one input per row instead of two. ](/assets/components/form/key-value-inputs/key-value-inputs-value-only.png)

### Input types

Key and value inputs can use various form elements, although there are some common patterns that represent the majority of HashiCorp use cases.

For the key input, this includes:

- Text Input
- Select

For the value input, this includes:

- Text Input
- File Input
- SuperSelect
- Masked Input

### Adding rows

Users can add rows to the set of existing rows via the add button.

![A user clicking the add user button where it shows one row of inputs that turns into two. The single row of inputs doesn't have a delete button.](/assets/components/form/key-value-inputs/key-value-inputs-adding-row.png)

#### Hitting a row limit

If there is a row limit and the user reaches it, the add button should be replaced with an inline alert notifying them of the limit.

![At the bottom of the input row is a neutral alert that says "Limit of four invites has been reached."](/assets/components/form/key-value-inputs/key-value-inputs-row-limit.png)

If the maximum number of rows has been reached and the user deletes a row, the alert should be replaced with the add button.

### Deleting rows

A single row is required at all times. A delete button will only appear for the first row if a second row has been added.

![A single row with a key and value input with no delete button on the side.](/assets/components/form/key-value-inputs/key-value-inputs-single-row.png)

If more than one row is present, users can opt to delete any of the rows.

![A user's cursor is hovering over the second row's delete button](/assets/components/form/key-value-inputs/key-value-inputs-ip-delete-any-row.png)

## Footer

The footer includes an add button or a compact alert.

### Add button

The add button is displayed by default and, when clicked, appends a new row to collect additional information. The labeling of this button follows our [content guidelines](/content/writing-style#add-and-remove), e.g., "Add {object}."

![A single secondary button with a leading plus icon with the label "Add user"](/assets/components/form/key-value-inputs/key-value-inputs-footer-add-button.png)

### Maximum number of rows reached

Use a compact alert to notify the user when they've reached a maximum number of rows. While the content can be customized, we recommend using the following message: "Only {maximum number} {objects} can be added at a time."

This uses the compact neutral alert, so it doesn’t visually compete with other higher-priority feedback, such as input errors.

![A compact neutral alert that says "Limit of fifteen invites has been reached."](/assets/components/form/key-value-inputs/key-value-inputs-footer-notification.png)

## Responsive behavior


### SM or more

In experiences that are greater than or equal to the [`sm` breakpoint](/foundations/breakpoints), a visible label and helper text are only present in the first row. This is because the form elements are condensed which will help reduce visual clutter.

![Key value input rows with the key and value are side by side along with a delete button to the right. Only one visible label and helper text per grouping of key and value inputs. Add new row button below the group of inputs.](/assets/components/form/key-value-inputs/key-value-inputs-ip-address-desktop.png)

### Less than SM

However, when the viewport is less than the [`sm` breakpoint](/foundations/breakpoints), all field elements stack and occupy 100% of the container and display the label and helper text for their associated inputs. Since the form height increases, the visible labels and helper text orient the user as they are scrolling down and filling in information. If repeating each input’s helper text isn’t useful to the user, consider putting that information in the fieldset helper text instead to reduce the visual noise.

![Key and value inputs per row stack on top of each other. The delete button is below the value input. Each input has their label and helper text visible.](/assets/components/form/key-value-inputs/key-value-inputs-ip-address-mobile.png)