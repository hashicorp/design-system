## Usage

An Input Group is intentionally published as an agnostic container element that wraps one or more inputs and actions, making the relevant use cases broad.

!!! Info

The way in which these components are published and assembled together are fundamenally different between Figma and the Ember component.

- In Figma, multiple components are published (`ButtonType` and `InputType`) that are intended to be assembled in an auto layout container, as well as a `Base` component for more simple pre-assembled instances.
- The Ember component acts as a container to enforce consistent styling and grouping of nested Helios form components, but does not handle any logic and functionality out of the box. <!-- Consider if we want to say this -->
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

### Within a filter pattern

### Within a form

#### Error validation

## Content

## Related

- [Button](/components/button)
- [Toggle Button](/components/toggle-button)
- [Text Input](/components/form/text-input)
- [Select](/components/form/select)