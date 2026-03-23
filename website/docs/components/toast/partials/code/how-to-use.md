While we provide visual styling for this component, the product team must implement other features like placement, transitions, and what happens on dismiss (e.g., with an Ember addon).

## How to use this component

The basic invocation requires the `type` argument, an `onDismiss` callback function, and the `title` and/or `description` content. By default a `neutral` Toast is generated.

[[code-snippets/toast-basic]]

### Title and description

Optionally, you can pass only `title` or only `description`.

[[code-snippets/toast-optional-blocks]]

### Color

A different color can be applied to the Toast using the `color` argument. This will determine the default icon used in the Toast, unless overwritten.

[[code-snippets/toast-color]]

### Icon

A different icon can be used in the Toast using the `icon` argument. This accepts any [icon](/icons/library) name.

[[code-snippets/toast-icon]]

If you need to hide the icon, pass `false` to the `icon` argument.

[[code-snippets/toast-no-icon]]

### Actions

Actions can be passed to the component using one of the suggested `Button` or `LinkStandalone` contextual components.

[[code-snippets/toast-actions]]

### Structured content

When needed, the `Description` contextual component can contain logic, rich HTML, or structured content.

We apply styling for a few simple HTML elements (e.g., `strong`, `em`, `a`, `code/pre`). If using other elements, you’ll need to style them accordingly.

[[code-snippets/toast-structured-content]]

You can pass more than one `D.Description` contextual components to have multiple description lines.

[[code-snippets/toast-multiple-descriptions]]

### Generic content

!!! Warning

Use this method with caution and as an escape hatch. [Contact the Design Systems Team](/about/support) to check that the solution is conformant and satisfies accessibility criteria.
!!!

Use the `Generic` contextual component to insert custom content. Generic content will appear after the title, description, and actions. Product teams will need to implement spacing, layout, and styling for generic content.

[[code-snippets/toast-generic]]
