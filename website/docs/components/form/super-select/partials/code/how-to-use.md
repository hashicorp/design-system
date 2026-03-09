## How to use this component

Super Select is a custom select-like component aiming to overcome some limitations of the HTML `<select>` element.

It’s primarily a wrapper for [ember-power-select](https://ember-power-select.com) and uses the 8.2.0 version with specific accessibility and styling choices that best fit our design system.

!!! Warning

**Consumer responsibility**

This component depends on `ember-power-select` 8.0, and by extension requires [additional setup](https://ember-power-select.com/docs/installation) including adding a wormhole component and importing its styles to ensure correct rendering.

!!!

We provide two main components with similar APIs: `Form::SuperSelect::Single` and `Form::SuperSelect::Multiple`.

**There are two ways to use each of the Super Select component types:**

1. `Form::SuperSelect::Single::Base` or `Form::SuperSelect::Multiple::Base`—the base component with just the Super Select control. In these instances, you will need to add your own label, helper text, and error messaging.
2. `Form::SuperSelect::Single::Field` or `Form::SuperSelect::Multiple::Field`—the field parent component which includes the Super Select control, label, helper text, and error messaging (in a wrapping container).

We recommend using the Field variation as it provides built-in accessibility functionality. Use the Base variation for custom layouts or special use cases not otherwise covered.

### Form::SuperSelect::Single

In cases where the [Dropdown](/components/dropdown) or [Form Select](/components/form/select) components are not suitable, use `SuperSelect::Single`.

[[code-snippets/super-select-single-basic]]

### Form::SuperSelect::Multiple

Use `SuperSelect::Multiple` to allow users to select multiple options.

[[code-snippets/super-select-multiple-basic]]

### Pre-selected options

To pre-select an option, declare a value for the `selected` argument:

[[code-snippets/super-select-single-pre-selected]]

### Placeholder

Placeholder text can be added to provide additional context. However, this information should not be necessary for users to complete a task.

[[code-snippets/super-select-single-placeholder]]

### Grouped options

To group similar sets of options, pass a nested data structure specifying the `groupName` and associated `options`.

!!! Warning

**Code alert**

If options are implemented as an array of strings and have the same name, they will be treated as the same, so selecting one will select others with the same name. To avoid this, implement your options using objects. (e.g. [{name: "name", label: "label"}, ...])
!!!

[[code-snippets/super-select-multiple-grouped]]

### Rich-content options

Super Select allows you to add HTML tags within options to lay out and structure content vs. `Hds::FormSelect` which only allows plain text strings as option content.

#### Rich content with default display in SuperSelect::Single

[[code-snippets/super-select-single-rich-content]]

#### Rich content with default display in SuperSelect::Multiple

By default, all content of selected options displays in the “trigger”. Visually, this looks ok in `SuperSelect::Single`. However, in `SuperSelect::Multiple` the selected items are displayed as pill-shaped “tags” so can look quite busy.

[[code-snippets/super-select-multiple-rich-content]]

### Selected item component

To simplify the content displayed in the selected options, use `@selectedItemComponent` to specify a custom component with only the content you wish to display.

An example of a custom `selectedItemComponent` example:

[[code-snippets/example-selected-item-component execute=false]]

`SuperSelect::Multiple` invocation with `selectedItemComponent` specified:

[[code-snippets/super-select-multiple-selected-item-component]]

`SuperSelect::Single` invocation with `selectedItemComponent` specified:

[[code-snippets/super-select-single-selected-item-component]]

### Limiting width

If needed, you can use `dropdownMaxWidth` to limit the width of the dropdown content. Setting a value for `dropdownMaxWidth` automatically sets `matchTriggerWidth` to `false` meaning that the width of the dropdown content will not necessarily match the list of the toggle or trigger element as it does by default.

[[code-snippets/super-select-single-width]]

### Helper text

You can add extra information to the field using [Helper Text](/components/form/primitives#formhelpertext). When helper text is added, the component automatically adds an `aria-describedby` attribute to the Super Select control, associating it with the automatically generated `ID` of the helper text element.

[[code-snippets/super-select-single-helper-text]]

#### Extra content in label and helper text

!!! Info

**Accessibility consideration**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

For example:

[[code-snippets/super-select-single-extra-content]]

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is "required" or "optional".

[[code-snippets/super-select-single-indicators]]

### Base components

The Base components are intended for rare cases where the Field components can’t be used and a custom implementation is needed. Most of the details for the Field components also apply to the Base components, but see the [Component API](#component-api) for more details.

[[code-snippets/super-select-base]]
