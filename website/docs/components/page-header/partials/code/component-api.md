## Component API

### PageHeader

<Doc::ComponentApi as |C|>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [PH].Title

The `PageHeader::Title` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of an `<h1>` HTML element.
  </C.Property>
  <C.Property @name="close" @type="function">
    Function to programmatically close the Modal. If an `onClose` callback function is provided it will be invoked when the Modal is closed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [PH].Breadcrumb

A generic container, yielded as contextual component.

Conventionally used to add a [Breadcrumb](/components/breadcrumb) component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "breadcrumb" block.
  </C.Property>
</Doc::ComponentApi>

#### [PH].IconTile

A yielded `HDS::IconTile` component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API of the [`IconTile`](/components/icon-tile?tab=code#component-api) component, apart from the `@size` argument, which is pre-defined to be `medium`.
  </C.Property>
</Doc::ComponentApi>

#### [PH].Badges

The `PageHeader::Badges` component, yielded as contextual component.

Intended to indicate status via one or more [Badge](/components/badge) components.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "badges" block, as a list of badges.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [PH].Subtitle

The `PageHeader::Subtitle` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "metadata/subtitle" block.
    <br/>The content can be a simple string or a more complex/structured one. The content inherits the text style.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [PH].Description

The `PageHeader::Description` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "metadata/description" block.
    <br/>The content can be a simple string or a more complex/structured one. The content inherits the text style.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [PH].Generic

A generic container, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "metadata" block, after the "subtitle" and "description".
    <br/>The content can be a simple string or a more complex/structured one.
    <br/>The content **does not** inherit any text style.
  </C.Property>
</Doc::ComponentApi>

#### [PH].Actions

The `PageHeader::Actions` component, yielded as contextual component.

Intended for actions and buttons pertaining to the main page.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "actions" block
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
