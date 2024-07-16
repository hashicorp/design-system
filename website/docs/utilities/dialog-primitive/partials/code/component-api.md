## Component API

A custom dialog can be implemented by composing the `Wrapper`, `Header`, `Description`, `Body`, `Footer` (and potentially `Overlay`) DialogPrimitive sub-components.

### DialogPrimitive::Wrapper

This is the component used to provide the overall layout to the dialog.

<Doc::ComponentApi as |C|>
  <C.Property @name="<:header>" @type="named block">
    A named block where the content for the “header” area of the dialog is rendered. The `DialogPrimitive::Header` and `DialogPrimitive::Description` components should be added here.
  </C.Property>
  <C.Property @name="<:body>" @type="named block">
    A named block where the content for the “body” or main content of the dialog is rendered. The `DialogPrimitive::Body` component should be added here.
  </C.Property>
  <C.Property @name="<:footer>" @type="named block">
    A named block where the content for the “footer” section of the dialog is rendered. The `DialogPrimitive::Footer` component should be added here.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### DialogPrimitive::Header

A sub-component used to provide the header content.

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Accepts any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="tagline" @type="string">
    Text above the title that can be used to provide more context.
  </C.Property>
  <C.Property @name="yield">
    Content passed as children of this sub-component is yielded to the “title” block of the header.
  </C.Property>
   <C.Property @name="onDismiss" @type="function">
    Callback function invoked when the “dismiss” button in the header is clicked by the user.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### DialogPrimitive::Description

A sub-component used to provide an extra description to the header.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this sub-component are yielded inside the “description” block of the header. It comes with a pre-defined typographic style.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### DialogPrimitive::Body

A sub-component used to contain the main content of the dialog. When the yielded content exceeds the available space, a scrollbar is introduced to the container.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this sub-component are yielded inside the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### DialogPrimitive::Footer

A sub-component used to provide the footer’s content. We recommend using it exclusively for actions using the [ButtonSet](/components/button-set) component. If a tertiary action is included, it will always be aligned at the end of the row.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this sub-component are yielded inside the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

_The component also offers an `onDismiss` argument, yielded as `F.close`, but it’s only used internally in the `Modal` and `Flyout` components._

### DialogPrimitive::Overlay

An overlay element that can be used to display a backdrop behind a modal dialog.

Consumers will need to take care of combining the `DialogPrimitive::Overlay` with the `DialogPrimitive::Wrapper` (with header, body, and footer content) by wrapping them in a parent container and implementing the desired layout.