## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="type" @required="true" @type="enum" @values={{array "page" "inline" "compact"}}>
    Sets the type of alert.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "highlight" "success" "warning" "critical"}} @default="neutral">
    Sets the color scheme for `background`, `border`, `title`, and `description`, which **cannot** be overridden.<br/><br/>`color` results in a default `icon`, which **can** be overridden.
  </C.Property>
  <C.Property @name="icon" @type="string | false">
    Override the default `icon` name, which is determined by the `color` argument.<br/><br/>Accepts any [icon](/foundations/icons) name, or `false`, for no icon.
  </C.Property>
  <C.Property @name="onDismiss" @type="function">
    The alert can be dismissed by the user. When a function is passed, the "dismiss" button is displayed.
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported.
  </C.Property>
</Doc::ComponentApi>

### Contextual components

Title, description, actions, and generic content are passed into the alert as yielded components, using the `Title`, `Description`, `Button`, `Link::Standalone`, `Generic` keys.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[A].Title>" @type="yielded component">
    A container that yields its content inside the `"title"` block. Content inherits its style.<br/><br/>`...attributes` spreading is supported.
  </C.Property>
  <C.Property @name="<[A].Description>" @type="yielded component">
    A container that yields its content inside the `"description"` block. Content inherits its style.<br/><br/>Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Application teams will need to style the rest of the content.<br/><br/>`...attributes` spreading is supported.
  </C.Property>
  <C.Property @name="<[A].Button>" @type="yielded component">
    A yielded `HDS::Button` component. It exposes the same API of the [`Button` component](/components/button/), apart from the `@size` argument, which is pre-defined to be `small`, and the `@color` argument that accepts only `secondary` or `tertiary`.
  </C.Property>
  <C.Property @name="<[A].Link::Standalone>" @type="yielded component">
    A yielded `HDS::Link::Standalone` component. It exposes the same API of the [`Link::Standalone` component](/components/link/standalone/), apart from the `@size` argument, which is pre-defined to be `small`.
  </C.Property>
  <C.Property @name="<[A].Generic>" @type="yielded component">
    A component that yields its content. See ["How to use > Generic content"](#how-to-use-generic).
  </C.Property>
</Doc::ComponentApi>

For more details about how to invoke these contextual components see the sections ["How to use > Description"](#how-to-use-description), ["How to use > Actions"](#how-to-use-actions) and ["How to use > Generic content"](#how-to-use-generic).