## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium">
    Sets the width of the modal.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "warning" "critical" }} @default="neutral">
    Sets the color scheme for the modal header elements: icon, tagline and title.
  </C.Property>
  <C.Property @name="onOpen" @type="function">
    Callback function invoked when the modal is opened.
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Callback function invoked when the modal is closed.
  </C.Property>
  <C.Property @name="isDismissDisabled" @type="boolean">
    Set this boolean to `true` if you want to prevent the modal from being closed (for instance, to avoid accidental data loss in an unsubmitted form). Make sure you communicate to users the reason why the modal is still open, and what they need to do to resolve the problem that is preventing the modal from being closed.
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

### Contextual components

The title, the content of the modal dialog, and the actions are passed into the modal as yielded components, using the `Header`, `Body`, `Footer` keys.

#### Modal::Header

It is a container that yields its content as the title of the modal dialog.

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    [Icon](/foundations/icons) name.
  </C.Property>
  <C.Property @name="tagline" @type="string">
    A string that helps the user maintain context when a modal dialog is open. _Note: this is NOT the title text, but a small piece of text above the title text._
  </C.Property>
  <C.Property @name="...attributes">
    This component supports `...attributes`.
  </C.Property>
</Doc::ComponentApi>

#### Modal::Body

The body of the Modal is an unstyled, generic container that yields as the main content of the modal dialog.

When the yielded content exceeds the available space, a srollbar is introduced to the container.

This component supports `...attributes`.

#### Modal::Footer

A container that yields its content as the footer of the modal dialog.

We recommend using it exclusively for actions using the [ButtonSet](/components/button-set/) component. If a tertiary action is presented, it will always be aligned at the end of the row.

<Doc::ComponentApi as |C|>
  <C.Property @name="close" @type="function"/>
  <C.Property @name="...attributes">
    This component supports `...attributes`.
  </C.Property>
</Doc::ComponentApi>