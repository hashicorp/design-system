## How to use this component

`Form::RadioCard::Group` creates:

- a `<fieldset>` container
- a `<legend>` element
- a list of rendered `<Form::RadioCard>` components (with `aria-describedby` attributes automatically generated).

!!! Warning

**Consumer responsibility**

The `<Hds::Form::RadioCard::Group>` component does not provide the logic for handling the mutually exclusive nature of radio controls (when a Radio Card is checked, any other Radio Cards with the same name that were previously checked become unchecked). You can implement this yourself in an `\{{on "change" this.onChange}}` function or manage the `checked` state of Radio Cards by updating the underlying data.
!!!

The `@name` argument offers an easy way to provide the same name for all the radio controls with a single declaration.

[[code-snippets/radio-card-basic]]

### Custom content

Customizable options include:

- Defining custom content using the `Generic` block
- Defining a custom width using the `maxWidth` argument
- Adding multiple [Badge](/components/badge) components

[[code-snippets/radio-card-custom-content]]

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication next to the legend text that the field is “required” or “optional”.

[[code-snippets/radio-card-indicators]]

### Layout and control position

To change how the cards are laid out in a group set the `@layout` argument to `vertical`. To change the position of the control elements within a card set the `@controlPosition` argument to `left`.

[[code-snippets/radio-card-layout-position]]
