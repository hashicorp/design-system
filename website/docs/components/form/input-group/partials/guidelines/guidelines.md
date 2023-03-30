## Usage

An Input Group is intentionally published as an agnostic container element that wraps one or more inputs and actions, making the relevant use cases broad.

!!! Info

The way in which these components are published and assembled together are fundamenally different between Figma and the Ember component.

- In Figma, multiple components are published (`ButtonType` and `InputType`) that are intended to be assembled in an auto layout container, as well as a `Base` component for more simple pre-assembled instances.
- The Ember component acts as a container to enforce consistent styling and grouping of nested Helios form components, but does not handle any logic and functionality out of the box.
!!!

### When to use

- When filtering complex data, searching within a set of filters, and creating complex filtering patterns.
- When collecting information in a form that benefits from a "connected" visual representation, e.g., a key/value pair.
- When an action performs a generative function rather than a submit function, e.g., generating API credentials.
- As a complex data input, e.g., uploading a document or connecting to another external resource.

### When not to use

- To submit a form or set of inputs. An Input Group can exist within a form to collect multi-directional data, but should not submit that data via a form method. Use the guidelines in [Form patterns](/patterns/form-patterns) instead.
- With a `readonly` or `disabled` input field. <!-- Add something else in here -->

## Acceptable sub components

The Input Group can consist of a variety of different components and subcomponents, however, we recommend limiting usage in both Figma and code to these subcomponents as they're styling and layout is handled out of the box in the component.

### Button types

Buttons of different types within an Input Group will inform and impact the UX in different ways:

- **Default**: a default button can perform a function or interaction within an Input Group, e.g., generating an object, string, or value in a field it is connected to. This is an extension of the Helios [Button](/components/button).
- **Toggle**: a toggle button can be used to filter or narrow the available parameters when searching within a data set or group of objects. This is an extension of the Helios [Toggle Button](/components/toggle-button).

### Input Types

An Input Group accepts Helios form components and their variants including:

- [Text Input](/components/form/text-input)
    - [Text](/components/form/text-input#text)
    - [Password](/components/form/text-input#password)
    - [Search](/components/form/text-input#search)
    - [Date and time](/components/form/text-input#date-and-time)
- [Select](/components/form/select)

### Custom elements

If you need to use a custom component within an Input Group, ensure that the visual language and styling matches the subcomponents outlined above, or reach out the Helios team for [assistance](/about/support).

## Examples

Since an Input Group is intended to be agnostic in relation to the inputs and actions it contains, the number of use cases and potential examples are broad. These examples should serve as inspiration for the different scenarios, contexts, and combinations of elements supported by the Input Group guidelines.

### Within a filter pattern

An Input Group can be used in filter pattern as a means to reduce or limit the visible items in a dataset through the selection of specific parameters and values present in the dataset. Multiple Input Groups may be used within a filter pattern depending on the complexity of the dataset.

![Filter pattern example](/assets/components/form/input-group/input-group-example-filter-pattern-01.png)

This example showcases a larger filter pattern that consists of two Input Groups; the first allowing the user to filter what parameters are included in a search query, the second grouping similar filter parameters relationally.

![Open filter pattern example](/assets/components/form/input-group/input-group-example-filter-pattern-01-open.png)

### Within a form

While less common, an Input Group can be used within a form when collecting related data, generating values like API keys, as well as for filtering within a search field.

!!! Do

Use an Input Group in to perform a generative function within a form.

![Input Group API key example](/assets/components/form/input-group/input-group-example-form-01.png =450x*)
!!!

!!! Do

Use an Input Group to determine the intended function of request or connection.

![Input Group method example](/assets/components/form/input-group/input-group-example-form-02.png =450x*)
!!!

!!! Dont

Don't use an Input Group when fields are related, but aren't stored in the same object upon submission. This example features a payment form with an Input Group and label, but uses a placeholder instead of a label to communicate what information the field collects.

![Input Group payment method exmaple](/assets/components/form/input-group/input-group-example-form-03.png =450x*)
!!!

#### Portability

These examples could also be considered more "portable" in that they can exist outside of a form and help with updating high-level settings, uploading files, or in the generative nature of a key/value pair.

#### Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.

## Content

The content with the Input Group is dependent on the context:

- If used a within a form, the Input Group should be used within a [Form::Fieldset](/components/form/primitives) primitive and requires a single label.
- If used within a filtering pattern, no label is required.

## Related

- [Button](/components/button)
- [Toggle Button](/components/toggle-button)
- [Text Input](/components/form/text-input)
- [Select](/components/form/select)