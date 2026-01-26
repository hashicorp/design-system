## How to use this component

!!! Info

For guidance on button organization, grouping of button types, and related information please refer to the [button organization](/patterns/button-organization) pattern documentation.

!!!

The basic `ButtonSet` invocation should include two or more buttons to be provided as children. (If used with only one button there will be no noticeable visual difference.)

[[code-snippets/button-set-basic]]

Other button-like components, such as the [Dropdown](/components/dropdown), can also be used as children.

[[code-snippets/button-set-dropdown]]

### Equal width buttons

If you want buttons with equal widths, set `@isFullWidth` to `true` on the `Button` components. Since the ButtonSet is full-width (100%) by default, you will likely want to constrain its overall width by adding a `max-width` to the `ButtonSet` container (via an inline style or CSS class).

[[code-snippets/button-set-width]]

#### With loading state

This technique is useful if you need to show a loading state, to avoid the resizing and shifting of the buttons:

[[code-snippets/button-set-loading]]
