## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium">
    Sets the width of the modal.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "warning" "critical" }} @default="neutral">
    Sets the color scheme for the modal header elements: icon, tagline, and title.
  </C.Property>
  <C.Property @name="onOpen" @type="function">
    Callback function invoked when the modal is opened.
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Callback function invoked when the modal is closed.
  </C.Property>
  <C.Property @name="isDismissDisabled" @type="boolean" @default="false">
    Set this boolean to `true` if you want to prevent the modal from being closed (for instance, to avoid accidental data loss in a form that hasn't been submitted). Make sure you communicate to users the reason why the modal is still open, and what they need to do to resolve the problem that is preventing the modal from being closed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

The title, the content of the modal dialog, and the actions are passed into the modal as yielded components, using the `Header`, `Body`, `Footer` keys.

#### Modal::Header

A container that yields its content as the title of the Modal.

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Accepts any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="tagline" @type="string">
    String that helps the user maintain context when a modal dialog is open.
    <br/><br/>
     This is **not** the title text, but a small piece of text above the title text.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### Modal::Body

The body is an unstyled, generic container that yields as the main content of the Modal. When the yielded content exceeds the available space, a scrollbar is introduced to the container.

This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).

#### Modal::Footer

A container that yields its content as the footer of the Modal. We recommend using it exclusively for actions using the [ButtonSet](/components/button-set) component. If a tertiary action is presented, it will always be aligned at the end of the row.

<Doc::ComponentApi as |C|>
  <C.Property @name="close" @type="function">
    Function to programmatically close the Modal. If an `onClose` callback function is provided it will be invoked when the Modal is closed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
