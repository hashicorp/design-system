## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="type" @required={{true}} @type="enum" @values={{array "page" "inline" "compact"}}>
    Sets the type of alert.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "highlight" "success" "warning" "critical"}} @default="neutral">
    Sets the color scheme for `background`, `border`, `title`, and `description`, which **cannot** be overridden.<br/><br/>`color` results in a default `icon`, which **can** be overridden.
  </C.Property>
  <C.Property @name="icon" @type="string | false">
    Override the default `icon` name, which is determined by the `color` argument.<br/><br/>accepts any [icon](/icons/library) name, or `false`, for no icon.
  </C.Property>
  <C.Property @name="onDismiss" @type="function">
    The alert can be dismissed by the user. When a function is passed, the "dismiss" button is displayed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

Title, description, actions, and generic content are passed into the alert as yielded components, using the `Title`, `Description`, `Button`, `LinkStandalone`, `Generic` keys.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[A].Title>" @type="yielded component">
    A container that yields its content inside the `"title"` block. Content inherits its style.<br/><br/>This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[A].Description>" @type="yielded component">
    A container that yields its content inside the `"description"` block. Content inherits its style.<br/><br/>Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Application teams will need to style the rest of the content.<br/><br/>This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[A].Button>" @type="yielded component">
    A yielded `Hds::Button` component. It exposes the same API of the [`Button` component](/components/button), apart from the `@size` argument, which is pre-defined to be `small`, and the `@color` argument that accepts only `secondary` or `tertiary`.
  </C.Property>
  <C.Property @name="<[A].LinkStandalone>" @type="yielded component">
    A yielded `Hds::Link::Standalone` component. It exposes the same API of the [`Link::Standalone` component](/components/link/standalone), apart from the `@size` argument, which is pre-defined to be `small`.
  </C.Property>
  <C.Property @name="<[A].Generic>" @type="yielded component">
    A component that yields its content.
  </C.Property>
</Doc::ComponentApi>
