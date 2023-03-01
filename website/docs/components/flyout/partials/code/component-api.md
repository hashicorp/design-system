## Component API

<Doc::ComponentApi as |C|>
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

The title, description and the content are passed into the Flyout as yielded components, using the `Header`, `Description`, and `Body` keys.

#### Flyout::Header

It is a container that yields its content as the title of the Flyout.

<Doc::ComponentApi as |C|>
  <C.Property @name="icon" @type="string">
    [Icon](/icons/library) name.
  </C.Property>
  <C.Property @name="tagline" @type="string">
    A string that helps the user maintain context when a Flyout is open. _Note: this is NOT the title text, but a small piece of text above the title text._
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### Flyout::Description

A container that yields its content as the description of the Flyout.

This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).

#### Flyout::Body

The body is an unstyled, generic container that yields as the main content of the Flyout component.

When the yielded content exceeds the available space, a scrollbar is introduced to the container.

This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
