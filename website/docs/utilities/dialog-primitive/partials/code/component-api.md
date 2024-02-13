## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

The title, description, main content, actions, and backdrop are passed into the `DialogPrimitive::Wrapper` as yielded components, using the `Header`, `Description`, `Body`, `Footer`, and `Overlay` keys.

#### DialogPrimitive::Header

A container that yields its content as the title of the DialogPrimitive.

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Accepts any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="tagline" @type="string">
    String that helps the user maintain context when a DialogPrimitive dialog is open.
    <br/><br/>
     This is **not** the title text, but a small piece of text above the title text.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### DialogPrimitive::Description

A container that yields its content as the description of the DialogPrimitive dialog.

This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).

#### DialogPrimitive::Body

The body is an unstyled, generic container that yields as the main content of the DialogPrimitive dialog. When the yielded content exceeds the available space, a scrollbar is introduced to the container.

This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).

#### DialogPrimitive::Footer

A container that yields its content as the footer of the DialogPrimitive dialog. We recommend using it exclusively for actions using the [ButtonSet](/components/button-set) component. If a tertiary action is presented, it will always be aligned at the end of the row.

<Doc::ComponentApi as |C|>
  <C.Property @name="close" @type="function">
    Function to programmatically close the DialogPrimitive dialog. If an `onClose` callback function is provided it will be invoked when the dialog is closed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### DialogPrimitive::Overlay

A backdrop overlay which is displayed behind a modal dialog.
