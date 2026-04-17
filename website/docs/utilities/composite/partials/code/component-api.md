## Component API

### Composite

<Doc::ComponentApi as |C|>
  <C.Property @name="<[C].composite>" @type="yielded modifier">
    The `composite` modifier yielded as a contextual modifier (see below).
  </C.Property>
  <C.Property @name="<[C].group>" @type="yielded modifier">
    The `group` modifier yielded as a contextual modifier (see below).
  </C.Property>
  <C.Property @name="<[C].item>" @type="yielded modifier">
    The `item` modifier yielded as a contextual modifier (see below).
  </C.Property>
  <C.Property @name="defaultCurrentId" @type="string | null">
    The ID of the item that should hold the initial active state (and `tabindex="0"`). If explicitly set to `null`, no item is initially active and the composite container itself receives the focus. If left unset, the component automatically selects the first enabled item.
  </C.Property>
  <C.Property @name="loop" @type="boolean | string" @default="false">
    Controls whether navigation loops back to the beginning (or end) of the current row/column when a boundary is reached. Accepts a boolean to apply to all axes, or a specific axis string (`"horizontal"` or `"vertical"`).
  </C.Property>
  <C.Property @name="orientation" @type="string" @values={{array "horizontal" "vertical"}}>
    Restricts keyboard navigation to a single axis. If set to "vertical", Left/Right arrow keys are ignored. If set to "horizontal", Up/Down arrow keys are ignored. If left undefined, the component enables 2D navigation when groups are present.
  </C.Property>
  <C.Property @name="wrap" @type="boolean | string" @default="false">
    Controls whether navigation moves to the beginning of the next row/column when reaching the end of the current one in a 2D grouped context. Accepts a boolean to apply to all axes, or a specific axis string ("horizontal" or "vertical").
  </C.Property>
</Doc::ComponentApi>

### Contextual modifiers

Because `Composite` is a headless component, it yields element modifiers rather than UI components.

#### [C].composite

The container modifier, yielded contextually.

<Doc::ComponentApi as |C|>
  <C.Property @name="element" @type="HTMLElement">
    The element this modifier is applied to becomes the root controller. It attaches the core keyboard event listeners (`keydown`) and manages the roaming `tabindex` across its registered descendants.
  </C.Property>
</Doc::ComponentApi>

#### [C].group

The grouping modifier, yielded contextually.

<Doc::ComponentApi as |C|>
  <C.Property @name="element" @type="HTMLElement">
    Registers the DOM element as a structural group. Used internally by the composite manager to orchestrate 2D grid navigation, calculate adjacent wrapping bounds, and determine column/row indexes.
  </C.Property>
</Doc::ComponentApi>

#### [C].item

The interactive element modifier, yielded contextually.

<Doc::ComponentApi as |C|>
  <C.Property @name="element" @type="HTMLElement">
    Registers the element as a navigable item within the composite. It attaches a `focus` event listener to ensure mouse interactions keep the internal state synced with keyboard navigation.
  </C.Property>
  <C.Property @name="disabled" @type="boolean" @default="false">
    Passed as a named argument to the modifier (e.g., `<button {{C.item disabled=true}}>`). When true, the modifier automatically applies the `disabled` and `aria-disabled="true"` attributes to the element, and ensures the item is safely skipped during keyboard routing.
  </C.Property>
</Doc::ComponentApi>