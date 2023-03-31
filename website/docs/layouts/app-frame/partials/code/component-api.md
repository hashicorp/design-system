## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="hasHeader" @type="boolean" @values={{array "true" "false" }} @default="true">
    Controls the rendering of the `header` container
  </C.Property>
  <C.Property @name="hasSidebar" @type="boolean" @values={{array "true" "false" }} @default="true">
    Controls the rendering of the `sidebar` container
  </C.Property>
  <C.Property @name="hasFooter" @type="boolean" @values={{array "true" "false" }} @default="true">
    Controls the rendering of the `footer` container
  </C.Property>
  <C.Property @name="hasModals" @type="boolean" @values={{array "true" "false" }} @default="true">
    Controls the rendering of the `modals` container
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

The frame's elements acting as containers are passed into the `AppFrame` as yielded components, using the `Header`, `Sidebar`, `Main`, `Footer`, and `Modals` keys.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[Frame].Header>" @type="yielded component">
    Optional container that yields its content inside the `<header>` element.<br/><br/>This sub-component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

<Doc::ComponentApi as |C|>
  <C.Property @name="<[Frame].Sidebar>" @type="yielded component">
    Optional container that yields its content inside the `<aside>` element.<br/><br/>This sub-component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

<Doc::ComponentApi as |C|>
  <C.Property @name="<[Frame].Main>" @type="yielded component">
    Required container that yields its content inside the `<main>` element.<br/><br/>This sub-component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

<Doc::ComponentApi as |C|>
  <C.Property @name="<[Frame].Footer>" @type="yielded component">
    Required container that yields its content inside the `<footer>` element.<br/><br/>This sub-component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

<Doc::ComponentApi as |C|>
  <C.Property @name="<[Frame].Modals>" @type="yielded component">
    Required container that yields its content inside a special `<div>` element that can be used to contain modal elements.<br/><br/>This sub-component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>