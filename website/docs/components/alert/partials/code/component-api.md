## Component API

### Alert

<Doc::ComponentApi @component="alert" @section="api" />

### Contextual components

#### [A].Title

The `Alert::Title` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "title" block.
  </C.Property>
  <C.Property @name="tag" @type="enum" @values={{array "div" "h1" "h2" "h3" "h4" "h5" "h6"}} @default="div">
    The HTML tag that wraps the content of the "title" block.
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
    It exposes the same API as the [`Button`](/components/button) component, apart from the `@size` argument, which is pre-defined to be `small`, and the `@color` argument that accepts only `secondary` or `tertiary`.
  </C.Property>
</Doc::ComponentApi>

#### [A].LinkStandalone

The `Link::Standalone` component, yielded as contextual component inside the `"actions"` block of the Alert.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API as the [`Link::Standalone`](/components/link/standalone) component, apart from the `@size` argument, which is pre-defined to be
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
