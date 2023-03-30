## Usage

An Input Group is intentionally published as an agnostic container element that wraps one or more inputs and actions, making the relevant use cases broad.

!!! Info

The way in which these components are published and assembled together are fundamenally different between the Figma Ember components.

- In Figma, multiple primitive components are published (`ButtonType` and `InputType`) that are intended to be assembled in an auto layout container. A pre-assembled `Base` component is also available for more simple instances.
- The Ember component acts as a container to enforce consistent styling and grouping of nested Helios form components. It does not handle any logic or functionality out of the box, this is left up to the nested form elements.
!!!

### When to use

- When filtering complex data, searching within a set of filters, and creating complex filtering patterns.
- When collecting information in a form that benefits from a "connected" visual representation, e.g., a key/value pair.
- When an action performs a generative function rather than a submit function, e.g., generating API credentials.
- As a complex data input, e.g., uploading a document or connecting to an external resource.

### When not to use

- To submit a form or set of inputs. An Input Group can exist within a form to collect multi-directional data, but should not submit that data via a form method. Use the guidelines in [Form patterns](/patterns/form-patterns) instead.
- To connect multiple fields that each require their own label.

## Primitive components

An Input Group can consist of a multiple primitive subcomponents that vary in their properties and intended input value. We recommend limiting usage in both Figma and code to those defined in the `ButtonType` and `InputType` primitives to ensure consistent styling and grouping.

### Button types

- **Default**: a default button can perform a function or interaction within an Input Group, e.g., generating an object, string, or value in a field it is connected to. This is an extension of the Helios [Button](/components/button).
- **Toggle**: a toggle button can be used to filter or narrow the available parameters when searching within a data set or group of objects. This is an extension of the Helios [Toggle Button](/components/toggle-button).

Different types of buttons within an Input Group will function and impact the UX in different ways, e.g., a `ToggleButton` can act as a filtering mechanism, while a the `Default` button can perform a function.

### Input Types

An Input Type is an extension of Helios form components and their variants, including:

- [Text Input](/components/form/text-input)
    - [Text](/components/form/text-input#text)
    - [Password](/components/form/text-input#password)
    - [Search](/components/form/text-input#search)
    - [Date and time](/components/form/text-input#date-and-time)
- [Select](/components/form/select)

Different Input Types can be combined within an Input Group to collect more complex data and support complex filtering patterns. Use the type that makes the most sense for the intended value or data.

### Custom elements

If you need to use a custom component within an Input Group, ensure that the visual language and styling matches the primitives, or reach out the Helios team for [assistance](/about/support).

## Base component

In Figma, the `Base` component is a combination of a single button primitive and single input primitive to account for more simple use cases. The properties of each nested primitive are exposed in the component to support rapid customization.

![Base component example](/assets/components/form/input-group/input-group-base-component.png =500x*)

## Examples

Since an Input Group is intended to be agnostic in relation to the inputs and actions it contains, the number of use cases and potential examples are broad. These examples should serve as inspiration for the different scenarios, contexts, and combinations of elements supported by the Input Group guidelines.

### Within a filter pattern

An Input Group can be used in a filter pattern as a means to reduce or limit the visible items in a dataset through the selection of specific parameters and values present in the dataset. Multiple Input Groups may be used within a filter pattern depending on the complexity of the dataset.

![Filter pattern example](/assets/components/form/input-group/input-group-example-filter-pattern-01.png)

This example showcases a larger filter pattern that consists of two Input Groups; the first allowing the user to filter what parameters are included in a search query, the second grouping similar filter parameters relationally.

![Open filter pattern example](/assets/components/form/input-group/input-group-example-filter-pattern-01-open.png)

### Within a form

While less common, an Input Group can be used within a form collect related data, perform generative functions like creating API keys, and for filtering within a search field.

!!! Do

Use an Input Group to perform a generative function within a form.

![Input Group API key example](/assets/components/form/input-group/input-group-example-form-01.png =450x*)
!!!

!!! Do

Use an Input Group to determine the intended method of request or connection.

![Input Group method example](/assets/components/form/input-group/input-group-example-form-02.png =450x*)
!!!

!!! Dont

Don't use an Input Group when fields are related, but aren't stored in the same object upon submission. This example features a payment form with an Input Group and label, but uses a placeholder instead of a label to communicate what information the field collects.

![Input Group payment method exmaple](/assets/components/form/input-group/input-group-example-form-03.png =450x*)
!!!

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