## Component API

### AppFrame

<Doc::ComponentApi as |C|>
  <C.Property @name="<[AF].Header>" @type="yielded component">
    `AppFrame::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[AF].Sidebar>" @type="yielded component">
    `AppFrame::Sidebar` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[AF].Main>" @type="yielded component">
    `AppFrame::Main` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[AF].Footer>" @type="yielded component">
    `AppFrame::Footer` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[AF].Modals>" @type="yielded component">
    `AppFrame::Modals` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="hasHeader" @type="boolean" @default="true">
    Controls the rendering of the `header` container.
  </C.Property>
  <C.Property @name="hasSidebar" @type="boolean" @default="true">
    Controls the rendering of the `sidebar` container.
  </C.Property>
  <C.Property @name="hasFooter" @type="boolean" @default="true">
    Controls the rendering of the `footer` container.
  </C.Property>
  <C.Property @name="hasModals" @type="boolean" @default="true">
    Controls the rendering of the `modals` container.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [AF].Header

The `AppFrame::Header` component, yielded as contextual component.

To be used as container for the application's top navigation.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of an `<header>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [AF].Sidebar

The `AppFrame::Sidebar` component, yielded as contextual component.

To be used as container for the application's sidebar navigation.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of an `<aside>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [AF].Main

The `AppFrame::Main` component, yielded as contextual component.

To be used as container for the application's main page content.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<main>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [AF].Footer

The `AppFrame::Footer` component, yielded as contextual component.

To be used as container for the application's footer.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<footer>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [AF].Modals

The `AppFrame::Modals` component, yielded as contextual component.

To be used as container for modal elements.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<div>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
