## Usage

A Segmented Group is intentionally published as an agnostic container element that wraps two or more inputs and actions, making the relevant use cases broad.

!!! Info

The way in which these components are published and assembled together is fundamentally different between the Figma and Ember components.

- In Figma, we publish multiple primitive components (`Segmented Button`, `Segmented Toggle`, and `Segmented Input`) that are intended to be assembled in an auto layout container. A pre-assembled `Base` component is also available for more simple instances.
- The Ember component acts as a container that enforces consistent styling and grouping of nested Helios form components. It does not handle any logic or functionality out of the box which is left up to the consumer to implement based on the nested components.
!!!

### When to use

- When filtering complex data, searching within a set of filters, and creating complex filtering patterns.
- When collecting information in a way that benefits from a "connected" visual representation, e.g., a key/value pair.
- When an action performs a generative function rather than a submit function, e.g., generating API credentials.
- As a complex data input within a form.

### When not to use

- To submit a form or set of inputs. A Segmented Group can exist within a form to collect complex data, but should not submit that data via a form method. Use the guidelines in [Form patterns](/patterns/form-patterns) instead.
- To connect multiple fields that each require their own label.
- When adding a prefix or suffix to an input field. This is not currently supported by Helios form components, instead consider using a simple text element preceding or following the form element.

## Primitive components

A Segmented Group can consist of multiple primitive sub-components that vary in their properties and intended input value. We recommend limiting usage in Figma to the defined `Segmented Button`, `Segmented Toggle` and `Segmented Input` primitives to ensure consistent styling and grouping. The Ember component supports a generic element in either the leading or trailing position if a custom solution is required.

### Segmented Button

A default button can perform a function or interaction within a Segmented Group, e.g., generating an object, string, or value in a field it is connected to. It is an extension of the Helios [Button](/components/button).

### Segmented Toggle

A toggle button can be used to filter or narrow the available parameters when searching within a data set or group of objects. This is an extension of the Helios [Toggle Button](/components/dropdown#toggle) and is often used in the context of a [Dropdown](/components/dropdown).

### Segmented Input

A `Segmented Input` is an extension of Helios form components and their variants, including:

- [Text Input](/components/form/text-input)
    - [Text](/components/form/text-input#text)
    - [Password](/components/form/text-input#password)
    - [Search](/components/form/text-input#search)
    - [Date and time](/components/form/text-input#date-and-time)
- [Select](/components/form/select)

Different Segmented Input types can be combined within a Segmented Group to collect more complex data and support complex filtering patterns. Use the type that makes the most sense for the intended value or data.

### Custom elements

If use of a custom component within a Segmented Group is necessary, ensure that the visual language and styling match the pre-defined primitives, or contact the Design Systems Team for [assistance](/about/support).

## Base component

In Figma, the `Base` component is a combination of a Segmented Button and Segmented Input and is intended for more simple use cases. The properties of each nested primitive are exposed in the component to support rapid customization.

![Base component example](/assets/components/form/segmented-group/segmented-group-base-component.png =500x*)

## Examples

Since a Segmented Group is intended to be agnostic in relation to the inputs and actions it contains, the number of potential use cases and examples are broad. These examples should serve as inspiration for the different scenarios, contexts, and combinations of elements supported by the Segmented Group guidelines.

### Within a filter pattern

A Segmented Group can be used in a filter pattern as a means to reduce or limit the items within a dataset. Multiple `Segmented Groups` may be used within a filter pattern depending on the complexity of the dataset.

![Filter pattern example](/assets/components/form/segmented-group/segmented-group-example-filter-pattern-01.png)

This example showcases a larger filter pattern that consists of two `Segmented Groups`; the first allowing the user to filter the parameters included in a search query, the second grouping similar filter parameters relationally.

![Open filter pattern example](/assets/components/form/segmented-group/segmented-group-example-filter-pattern-01-open.png)

### Within a form

While less common, a Segmented Group can be used within a form to collect related data or perform generative functions like creating API keys.

!!! Do

Use a Segmented Group to perform a generative function within a form.

![Segmented Group API key example](/assets/components/form/segmented-group/segmented-group-example-form-01.png =450x*)
!!!

!!! Do

Use a Segmented Group to determine the intended method of a request or connection.

![Segmented Group method example](/assets/components/form/segmented-group/segmented-group-example-form-02.png =450x*)
!!!

!!! Dont

Don't use a Segmented Group when fields are related, but aren't stored in the same object upon submission. This example features a payment form with a Segmented Group and label, but uses a placeholder instead of a label to communicate what information the field collects.

![Segmented Group payment method example](/assets/components/form/segmented-group/segmented-group-example-form-03.png =450x*)
!!!

#### Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.

## Content

The content within a Segmented Group is dependent on the context:

- If used in a form, the Segmented Group should be used within a [Form::Fieldset](/components/form/primitives) primitive and requires a single label.
- If used within a filtering pattern, no label is required.

## Related

- [Button](/components/button)
- [Toggle Button](/components/toggle-button)
- [Text Input](/components/form/text-input)
- [Select](/components/form/select)