## Component API

### Flyout

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Header>" @type="yielded component">
    `Flyout::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Description>" @type="yielded component">
    `Flyout::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Body>" @type="yielded component">
    `Flyout::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Footer>" @type="yielded component">
    `Flyout::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="size" @type="enum" @values={{array "medium" "large" }} @default="medium">
    Sets the width of the Flyout.
  </C.Property>
  <C.Property @name="onOpen" @type="function">
    Callback function invoked when the Flyout is opened.
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Callback function invoked when the Flyout is closed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [F].Header

The `Flyout::Header` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    [Icon](/icons/library) name.
  </C.Property>
  <C.Property @name="tagline" @type="string">
    A string that helps the user maintain context when a Flyout is open.
    <br/>This is **not** the title text, but a small piece of text above the title text.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "title" block.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [F].Description

The `Flyout::Description` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "description" block.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [F].Body

The `Flyout::Body` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "body" block.
    <br/>The content is unstyled by default, so consumers will need to take care of layout and style of the content.
    <br/>When the content exceeds the available space, a scrollbar is introduced to the container.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [F].Footer

The `Flyout::Footer` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "footer" block.
    <br/>We recommend using it exclusively for declarative content or actions using the [ButtonSet](/components/button-set) component.
    <br/>If a tertiary action is presented, it will always be aligned at the end of the row.
  </C.Property>
  <C.Property @name="close" @type="function">
    Function to programmatically close the Flyout. If an `onClose` callback function is provided it will be invoked when the Flyout is closed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>