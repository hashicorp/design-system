## Component API

### Modal

<Doc::ComponentApi as |C|>
  <C.Property @name="<[M].Header>" @type="yielded component">
    `DialogPrimitive::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[M].Body>" @type="yielded component">
    `DialogPrimitive::Body` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[M].Footer>" @type="yielded component">
    `DialogPrimitive::Footer` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium">
    Sets the width of the Modal.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "warning" "critical" }} @default="neutral">
    Sets the color scheme for the Modal Header elements: icon, tagline, and title.
  </C.Property>
  <C.Property @name="returnFocusTo" @type="string">
    The `id` of the element where the focus should be returned once the modal is closed (eg. if the element that initiated the event is not in the DOM anymore once closed).
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

!!! Warning

The previous `Modal::Header`, `Modal::Body`, and `Modal::Footer` subcomponents are now deprecated. View details in the [version history](/components/modal?tab=version-history) on how to migrate to the equivalent [DialogPrimitive](/utilities/dialog-primitive?tab=code#component-api) subcomponents.

!!!

#### [M].Header

The `DialogPrimitive::Header` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API as the [`DialogPrimitive::Header`](/utilities/dialog-primitive?tab=code#dialogprimitiveheader) component.
  </C.Property>
</Doc::ComponentApi>

#### [M].Body

The `DialogPrimitive::Body` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API as the [`DialogPrimitive::Body`](/utilities/dialog-primitive?tab=code#dialogprimitivebody) component.
  </C.Property>
</Doc::ComponentApi>

#### [M].Footer

The `DialogPrimitive::Footer` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API as the [`DialogPrimitive::Footer`](/utilities/dialog-primitive?tab=code#dialogprimitivefooter) component.
  </C.Property>
</Doc::ComponentApi>
