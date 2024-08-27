## Component API

### ApplicationState

<Doc::ComponentApi as |C|>
  <C.Property @name="<[A].Media>" @type="yielded component">
    `ApplicationState::Media` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[A].Header>" @type="yielded component">
    `ApplicationState::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[A].Body>" @type="yielded component">
    `ApplicationState::Body` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[A].Footer>" @type="yielded component">
    `ApplicationState::Footer` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [A].Media

The `ApplicationState::Media` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "media" block.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [A].Header

The `ApplicationState::Header` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="errorCode" @type="string">
    The error code to be displayed.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Adds a leading icon to the title. Accepts any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="title" @type="string">
    The text of the title
  </C.Property>
  <C.Property @name="titleTag" @type="enum" @values={{array "div" "h1" "h2" "h3" "h4" "h5" "h6"}}>
    The HTML tag that wraps the title text.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [A].Body

The `ApplicationState::Body` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "body" block.
  </C.Property>
  <C.Property @name="text" @type="string">
    Note: use `@text` to pass directly text to the "body", with a predefined style. This component does not support `@text` on the component invocation if it is used with yielded content.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [A].Footer

The `ApplicationState::Footer` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Button>" @type="yielded component">
    The `Button` component, yielded as contextual component inside the `"footer"` block of the ApplicationState. It exposes the same API as the [`Button` component](/components/button).
  </C.Property>
  <C.Property @name="<[F].Dropdown>" @type="yielded component">
    The `Dropdown` component, yielded as contextual component inside the `"footer"` block of the ApplicationState. It exposes the same API as the [`Dropdown` component](/components/dropdown).
  </C.Property>
  <C.Property @name="<[F].LinkStandalone>" @type="yielded component">
    The `Link::Standalone` component, yielded as contextual component inside the `"footer"` block of the ApplicationState. It exposes the same API as the [`Link::Standalone` component](/components/link/standalone).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
