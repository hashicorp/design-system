## Component API

### Flyout

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Header>" @type="yielded component">
    `DialogPrimitive::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Description>" @type="yielded component">
    `DialogPrimitive::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Body>" @type="yielded component">
    `DialogPrimitive::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Footer>" @type="yielded component">
    `DialogPrimitive::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="size" @type="enum" @values={{array "medium" "large" }} @default="medium">
    Sets the width of the Flyout.
  </C.Property>
  <C.Property @name="returnFocusTo" @type="string">
    The `id` of the element where the focus should be returned once the flyout is closed (e.g., if the element that initiated the event is not in the DOM anymore once closed).
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

!!! Warning

The previous `Flyout::Header`, `Flyout::Description`, `Flyout::Body`, and `Flyout::Footer` subcomponents are now deprecated. View details in the [version history](/components/flyout?tab=version-history) on how to migrate to the equivalent [DialogPrimitive](/utilities/dialog-primitive?tab=code#component-api) subcomponents.

!!!

#### [F].Header

The `DialogPrimitive::Header` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API as the [`DialogPrimitive::Header`](/utilities/dialog-primitive?tab=code#dialogprimitiveheader) component.
  </C.Property>
</Doc::ComponentApi>

#### [F].Description

The `DialogPrimitive::Description` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API as the [`DialogPrimitive::Description`](/utilities/dialog-primitive?tab=code#dialogprimitivedescription) component.
  </C.Property>
</Doc::ComponentApi>

#### [F].Body

The `DialogPrimitive::Body` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API as the [`DialogPrimitive::Body`](/utilities/dialog-primitive?tab=code#dialogprimitivebody) component.
  </C.Property>
</Doc::ComponentApi>

#### [F].Footer

The `DialogPrimitive::Footer` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API as the [`DialogPrimitive::Footer`](/utilities/dialog-primitive?tab=code#dialogprimitivefooter) component.
  </C.Property>
</Doc::ComponentApi>
