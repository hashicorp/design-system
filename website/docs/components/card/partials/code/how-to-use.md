!!! Warning

**Consumer responsibility**

The layout of the Card itself, and its content, is left to the consumer of the component. The `Hds::Card::Container` is nothing more than a block container—a `<div>`—that provides styling for the `elevation`, `border`, and `background`. Sizing of the card, internal padding, and content alignment are all the consumer’s responsibility.
!!!

## How to use this component

[[code-snippets/card-container-basic]]

To style the Cards, you can add an external element that wraps the Card, with a custom class that controls the width of the wrapper itself and an internal element that wraps the content and applies padding around it (resulting in visual internal padding for the Card) and aligns the text to the center.

Alternatively, you could use the Card Containers in a CSS `flex` or `grid` container.

### HTML tag

To specify which HTML tag to use to render the component, use the `@tag` argument. The default tag is a `div` but you can optionally render the Card as an `li` to be used within a list.

Note: If you choose to use the `Card` as a list item, you must wrap it either in a `ul` or `ol` tag for the markup to be valid. Also note that you are responsible for the related styling for the list and list items.

[[code-snippets/card-container-tag]]

### Interactive states

The `@level`, `@levelHover`, and `@levelActive` arguments can be used to declare the specific elevation of the Card for each interactive state. Following the guidelines, this example transitions between _mid → high → mid_ elevation for the corresponding interactive states; _default → hover → active_.

[[code-snippets/card-container-interactive]]

Using SCSS, the `.doc-card-interactive-demo` class would look something like this:

[[code-snippets/card-container-interactive-styles]]

This example implements a basic interactive card which uses a link to wrap the entirety of the static content area. For further assistance on implementing interactive cards, [contact the Design System Team](https://helios.hashicorp.design/about/support).
