## Component API

### Alert

<Doc::ComponentApi as |C|>
  <C.Property @name="<[A].Title>" @type="yielded component">
    `Alert::Title` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[A].Description>" @type="yielded component">
    `Alert::Description` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[A].Button>" @type="yielded component">
    `Button` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[A].LinkStandalone>" @type="yielded component">
    `Link::Standalone` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[A].Generic>" @type="yielded component">
    A generic container yielded as contextual component (see below).
  </C.Property>
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

#### [A].Title

The `Alert::Title` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "title" block.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [A].Description

The `Alert::Description` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "description" block.
    <br/>Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc.
    <br/>Text content inherits its style. Predefined styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`, while consumers will need to style other HTML tags if used as children.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [A].Button

The `Button` component, yielded as contextual component inside the `"actions"` block of the Alert.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API of the [`Button`](/components/button) component, apart from the `@size` argument, which is pre-defined to be `small`, and the `@color` argument that accepts only `secondary` or `tertiary`.
  </C.Property>
</Doc::ComponentApi>

#### [A].LinkStandalone

The `Link::Standalone` component, yielded as contextual component inside the `"actions"` block of the Alert.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API of the [`Link::Standalone`](/components/link/standalone) component, apart from the `@size` argument, which is pre-defined to be
  </C.Property>
</Doc::ComponentApi>

#### [A].Generic

A generic container, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded after all the other elements.
    <br/>The content is unstyled by default, so consumers will need to take care of layout and style of the content.
  </C.Property>
</Doc::ComponentApi>
