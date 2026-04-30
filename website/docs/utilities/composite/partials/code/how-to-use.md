!!! Callout

This component is intended only for internal Helios use. If you need to use it, [contact the Design Systems Team](/about/support).
!!!

## How to use this component

`Composite` is a headless component that manages 1D and 2D keyboard navigation and focus management for a collection of items. It associates a "composite" container element with nested "item" and optional "group" elements.

The component automatically routes focus between items based on your configured orientation and grouping. It intercepts:

- **Directional keys**: `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
- **Boundary keys**: `Home`, `End`, `PageUp`, `PageDown`

Under the hood, the component implements the roving tabindex pattern.

!!! Insight

**Code tip**

- For details about the keyboard patterns implemented here, see: [W3C WAI-ARIA / Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
- For normative guidance on managing focus in composite widgets, see: [WAI-ARIA 1.3 / Managing Focus and Supporting Keyboard Navigation (Information for Authors)](https://www.w3.org/TR/wai-aria-1.3/#managingfocus_authors)
- In practice for `Composite`, ensure your items are keyboard-focusable, keep focus movement predictable when content changes dynamically, and return to a logical active item when users re-enter the widget.
- `Composite` uses a roving `tabindex` pattern (moving DOM focus between items), not `aria-activedescendant`.
- To understand how the internal DOM sorting resolves dynamic rendering orders, look at the `sortByDOMPosition` utility inside the component's source code.
!!!

### Basic invocation

The basic invocation of this primitive yields a hash of three different modifiers (`composite`, `item`, and `group`). Applying these modifiers registers the elements with the composite manager:

[[code-snippets/composite-basic]]

The primitive itself doesn't provide any visual styling or ARIA roles to the container or items, and doesn't generate any extra HTML beyond what is yielded. It solely provides the focus orchestration and keyboard routing functionalities to the elements the modifiers are applied to.

### Setting an Initial Active Item

Use `@defaultCurrentId` to set which registered item starts as active (`tabindex="0"`). The value should match the `id` of one of the elements using the `item` modifier.

Choosing a stable `@defaultCurrentId` can help preserve a consistent re-entry focus target, per WAI-ARIA focus management guidance.

[[code-snippets/composite-default-current-id]]

_Notice: Set `@defaultCurrentId={{null}}` if you want the composite container to receive initial focus instead of any item._

### Constraining Orientation

If your composite is strictly a horizontal toolbar or a vertical list, you can restrict the navigation axis using the `@orientation` argument.

[[code-snippets/composite-orientation]]

If set to `vertical`, left/right arrow keys will be ignored. If set to `horizontal`, up/down keys will be ignored.

### Grouping and 2D Navigation

If you register groups using the `group` modifier, the component acts as a smart router, changing from 1D linear navigation to 2D grid navigation.

[[code-snippets/composite-groups]]

When groups are present, `ArrowRight`/`ArrowLeft` navigate within the row (group), and `ArrowDown`/`ArrowUp` navigate the column index across groups. If an item does not exist at a specific column index in an adjacent group (an uneven grid), the routing logic will intelligently resolve to the closest enabled item.

!!! Warning

**Consumer responsibility**

Because this component is completely headless, you are strictly responsible for providing the correct semantic WAI-ARIA roles (e.g., `role="menu"`, `role="menuitem"`, `role="group"`, `role="grid"`) to your HTML elements.
!!!

### Looping and Wrapping

You can control how the focus behaves when a user reaches the start or end of the composite using the `@loop` and `@wrap` arguments.

- **Looping** (`@loop`): If true, reaching the end of a row/column will cycle focus back to the beginning of that same row/column.
- **Wrapping** (`@wrap`): If true (and in a 2D grouped context), reaching the end of a row will move focus to the beginning of the next row.

Use `@loop` when you want to cycle inside the same row/column:

[[code-snippets/composite-loop]]

Use `@wrap` when you want to move into the next/previous row or column in grouped layouts:

[[code-snippets/composite-wrap]]

_Notice: Both arguments accept either a boolean (`true`/`false`) or a specific axis string (`'horizontal'` or `'vertical'`) if you only want to loop/wrap in one direction._

_If both are enabled for the same axis, looping takes precedence and wrapping is not applied for that key press._

### Disabled Items

You can pass a `disabled` named argument directly to the item modifier. The component will automatically apply the correct `disabled` and `aria-disabled` attributes to the DOM node, and the internal navigation logic will intelligently skip over it when routing keyboard events.

[[code-snippets/composite-disabled]]
