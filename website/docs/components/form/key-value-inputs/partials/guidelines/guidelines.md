## Usage

### When to use

- When two related inputs (often a key and value pair) are repeated for batch submission.
- When collective validation of each associated row is required.

### When not to use

- When inputs in each row are not closely related, use the [form layout helpers](/components/form/layout) instead.

## Header

The header for the Key Value Inputs includes a legend, helper text, and a generic content slot.

![](/assets/components/form/key-value-inputs/key-value-inputs-legend-content.png)

### Legend

A legend is required to provide context for the overall [fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset).

Regardless of whether the Key Value Inputs component is placed together with other form components, or used on its own, a legend is always mandatory.

#### With other elements

The legend's usage with other form elements present.

![The Key Value Inputs component used as part of a larger form. It includes a Legend explaining to the user what files they should use it to upload.](/assets/components/form/key-value-inputs/key-value-inputs-legend-part-of-larger-form.png)

#### Alone in form

The legend's usage when the Key Value Inputs are the only form element on the page.

![The Key Value Inputs component used as the sole form elements on a page.](/assets/components/form/key-value-inputs/key-value-inputs-legend-alone-in-form.png)

### Helper text and generic content

The optional helper text and generic content slot can be used to provide additional information that applies to all rows.

!!! Do

Use the helper text and generic content slot to reduce the amount of repeated information in each row. This focuses the user’s attention on data submission.

![Helper text used as a means to explain what the toggle in each row does. Generic slot used to include a button with more details.](/assets/components/form/key-value-inputs/key-value-inputs-helper-generic-do.png)

!!!

!!! Dont

Don’t repeat information in each row if it can be explained once at the top of the rows.

![Each row has an input, toggle with helper text enabled and a button in the generic slot. This has repetitive information in each row that over complicates the Key Value Input component's usage.](/assets/components/form/key-value-inputs/key-value-inputs-helper-generic-dont.png)

!!!

## Input rows

Each row typically includes two inputs, one for a key and one for a value. However, there may be exceptions where a single input may be necessary. 

![](/assets/components/form/key-value-inputs/key-value-inputs-value-only.png)

### Input types

The Key Value Inputs component can contain various types of form elements, although there are some common patterns that represent the majority of HashiCorp use cases.

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

![After the last input row, there is a neutral alert that says "Limit of four invites has been reached."](/assets/components/form/key-value-inputs/key-value-inputs-row-limit.png)

If the maximum number of rows has been reached and the user deletes a row, the alert should be replaced with the add button.

### Delete behavior

!!! Info

The interactions described in this section must be implemented by the consumer.

!!!

At least one row is required at all times.

#### Single row behavior

If the row's inputs are empty, the delete button will be hidden.

![A single row with empty key and value inputs. No delete button is visible.](/assets/components/form/key-value-inputs/key-value-inputs-single-row-empty-content.png)

Once content is entered in either of the two inputs, the delete button will become visible. Clicking it will remove the row's data and then hide the button.

![A single row with a key and value input. The key input includes entered data and a delete button is visible with a cursor pressing it. Below it is showing that same key value input with no data in it with no delete button next to it.](/assets/components/form/key-value-inputs/key-value-inputs-single-row-with-content.png)

#### More than one row behavior

If more than one row is present, users can opt to delete any of the rows.

![A user's cursor is hovering over the second row's delete button](/assets/components/form/key-value-inputs/key-value-inputs-ip-delete-any-row.png)

## Footer

The footer includes an add button, compact alert, or fieldset validation.

### Add button

The add button is displayed by default and, when clicked, appends a new row to collect additional information. The labeling of this button follows our [content guidelines](/content/writing-style#add-and-remove), e.g., "Add {object}."

![A single secondary button with a leading plus icon with the label "Add user"](/assets/components/form/key-value-inputs/key-value-inputs-footer-add-button.png)

### Maximum number of rows reached

Use a compact alert to notify the user when they've reached a maximum number of rows. While the content can be customized, we recommend using the following message: "Only {maximum number} {objects} can be added at a time."

This uses the compact `neutral` Alert to avoid visually competing with other high-priority feedback, such as input errors.

![A compact neutral alert that says "Limit of fifteen invites has been reached."](/assets/components/form/key-value-inputs/key-value-inputs-footer-notification.png)

### Validation

In addition to form-level validation, if a specific error is associated with the fieldset, it will be displayed below the add button.

![Below the legend and helper text is a compact critical alert showing a fieldset error that the user has reached the maximum number of rows.](/assets/components/form/key-value-inputs/key-value-inputs-fieldset-error.png)

Read more about this in our [form patterns validation documentation](/patterns/form-patterns?tab=validation).

## Responsive behavior

### Small or larger

In viewport sizes that are greater than or equal to the [medium (`md`) breakpoint](/foundations/breakpoints), the label and helper text are only visible for the first row of inputs. This reduces visual clutter by condensing the form elements.

![Key value input rows with the key and value are side by side along with a delete button to the right. Only one visible label and helper text per grouping of key and value inputs. Add new row button below the group of inputs.](/assets/components/form/key-value-inputs/key-value-inputs-ip-address-desktop.png)

### Less than small

When the viewport is less than the [medium (`md`) breakpoint](/foundations/breakpoints), all field elements stack to occupy 100% of the container width and display the label and helper text for their associated inputs. As the form height increases, the visible labels and helper text orient the user as they scroll down and fill in information. If repeating each input’s helper text isn’t useful to the user, consider placing that information in the fieldset helper text instead to reduce the visual noise.

![Key and value inputs stack on top of each other. The delete button is below the value input. Each input has their label and helper text visible.](/assets/components/form/key-value-inputs/key-value-inputs-ip-address-mobile.png)