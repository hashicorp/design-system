## Component API

### Modal

<Doc::ComponentApi as |C|>
  <C.Property @name="<[M].Header>" @type="yielded component">
    `Flyout::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[M].Body>" @type="yielded component">
    `Flyout::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[M].Footer>" @type="yielded component">
    `Flyout::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium">
    Sets the width of the Modal.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "warning" "critical" }} @default="neutral">
    Sets the color scheme for the Modal Header elements: icon, tagline, and title.
  </C.Property>
  <C.Property @name="onOpen" @type="function">
    Callback function invoked when the Modal is opened.
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Callback function invoked when the Modal is closed.
  </C.Property>
  <C.Property @name="isDismissDisabled" @type="boolean" @default="false">
    Set this boolean to `true` if you want to prevent the Modal from being closed (for instance, to avoid accidental data loss in a form that hasn't been submitted). Make sure you communicate to users the reason why the Modal is still open, and what they need to do to resolve the problem that is preventing the Modal from being closed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [M].Header

The `Modal::Header` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    Accepts any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="tagline" @type="string">
    String that helps the user maintain context when a Modal dialog is open.
    <br/>This is **not** the title text, but a small piece of text above the title text.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "title" block.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>


#### [M].Body

The `Modal::Body` component, yielded as contextual component.

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

#### [M].Footer

The `Modal::Footer` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "footer" block.
    <br/>We recommend using it exclusively for actions using the [ButtonSet](/components/button-set) component.
    <br/>If a tertiary action is presented, it will always be aligned at the end of the row.
  </C.Property>
  <C.Property @name="close" @type="function">
    Function to programmatically close the Modal. If an `onClose` callback function is provided, it will be invoked when the Modal is closed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>