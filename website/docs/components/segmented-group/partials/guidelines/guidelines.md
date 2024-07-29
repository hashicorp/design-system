## Usage

A Segmented Group is an agnostic container that wraps two or more Segments, making the relevant use cases broad.

!!! Info

How these components are published and assembled is fundamentally different between the Figma and Ember components.

- In Figma, we publish multiple primitive `Segment` components (`Segmented Button`, `Segmented Dropdown`, and `Segmented Input`) that are intended to be assembled in an auto layout container. A pre-assembled `Base` component is also made available for more simple instances.
- The Ember component is a container that enforces consistent styling and grouping of nested Helios input fields and action components. It does not manage any logic or functionality out of the box, these are left up to the consumer to implement based on the nested components.
!!!

### When to use

- When filtering complex data, searching within a set of filters, and in creating complex filter patterns.
- When collecting information in a way that benefits from a "connected" visual representation, e.g., a key/value pair.
- When an action performs a generative function rather than a submit function, e.g., generating API credentials.
- As a complex data input within a form.

### When not to use

- To submit a form or set of inputs. A Segmented Group can be used within a form to collect complex data, but an action within the group should not submit that data via a form method. Use the guidelines in [Form patterns](/patterns/form-patterns) instead.
- To connect multiple fields that each require their own label.
- When adding a prefix or suffix to an input field. This is not currently supported by Helios form components, instead consider using a simple text element preceding or following the form element.

## Segment components

A Segmented Group can consist of multiple primitive Segments that vary in their properties and intended input value. We recommend limiting usage in Figma to the defined `Segmented Button`, `Segmented Dropdown` and `Segmented Input` primitives to ensure consistent styling and grouping. If a custom solution is required, the Ember component yields any component that is passed to it.

### Segmented Button

A `Segmented Button` can perform a function or interaction within a Segmented Group, e.g., generating an object, string, or value in a field it is connected to. It is an extension of the Helios [Button](/components/button).

### Segmented Dropdown

A `Segmented Dropdown` can be used to filter or narrow the available parameters when searching within a dataset or group of objects. It is an extension of the Helios [Dropdown](/components/dropdown).

### Segmented Input

A `Segmented Input` is an extension of Helios form components and their variants, including:

- [Text Input](/components/form/text-input)
    - [Text](/components/form/text-input#text)
    - [Password](/components/form/text-input#password)
    - [Search](/components/form/text-input#search)
    - [Date and time](/components/form/text-input#date-and-time)
- [Select](/components/form/select)

Different Segmented Input types can be combined within a Segmented Group to collect complex data and support filtering patterns. Use the type that makes the most sense for the intended value or data.

### Custom elements

If a custom component within a Segmented Group is necessary, ensure that the visual language and styling match the pre-defined Segment primitives, or [contact the Design Systems team](/about/support) for support.

## Base component

In Figma, the `Base` component is a combination of a button (either a default button or dropdown) and a Segmented Input and is intended for less complex use cases. The properties of each nested Segment are exposed in the component to support rapid customization.

![Base component example](/assets/components/form/segmented-group/segmented-group-base-component.png =500x*)

## Examples

Since a Segmented Group is intended to be agnostic in relation to the inputs and actions it contains, the number of potential use cases and examples are broad. These examples should serve as inspiration for the different scenarios, contexts, and combinations of elements supported by the Segmented Group guidelines.

### Within a filter pattern

A Segmented Group can be used in a filter pattern as a means to reduce or limit the items within a dataset. Depending on the complexity of the pattern, multiple Segmented Groups may be used to filter complex datasets.

![Filter pattern example](/assets/components/form/segmented-group/segmented-group-example-filter-pattern-01.png)

This example showcases a larger filter pattern that consists of two Segmented Groups; the first supporting the limitation of the parameters included in a search query, the second grouping similar filter parameters relationally.

![Open filter pattern example](/assets/components/form/segmented-group/segmented-group-example-filter-pattern-01-open.png)

### Within a form

While less common, a Segmented Group can be used within a form to collect relational data or perform generative functions like generating API keys.

!!! Do

Use a Segmented Group to perform a generative function within a form.

![Segmented Group API key example](/assets/components/form/segmented-group/segmented-group-example-form-01.png =450x*)
!!!

!!! Do

Use a Segmented Group to determine the method of a request or connection.

![Segmented Group method example](/assets/components/form/segmented-group/segmented-group-example-form-02.png =450x*)
!!!

!!! Dont

Don’t use a Segmented Group when fields are related, but aren't stored in the same object or value upon submission. This example features a payment form with a Segmented Group and label, but uses a placeholder instead of a label to communicate what information the field collects.

![Segmented Group payment method example](/assets/components/form/segmented-group/segmented-group-example-form-03.png =450x*)
!!!

#### Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns) documentation.

## Content

The content within a Segmented Group is dependent on the context:

- If used in a form, the Segmented Group should be used within a [Form::Fieldset](/components/form/primitives) primitive and requires a single label.
- If used within a filtering pattern, no label is required.