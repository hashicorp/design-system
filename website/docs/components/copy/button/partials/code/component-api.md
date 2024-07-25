## Component API

This component uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) under the hood.

### Copy::Button

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" }} @default="medium"/>
    <C.Property @name="isIconOnly" @type="boolean" @default="false">
    Indicates if the button will only contain an icon. An internal check is in place to ensure that accessible text is still applied to the component.
  </C.Property>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that a button should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="text" @required={{true}} @type="string">
    The text of the button or value of `aria-label` if `isIconOnly` is set to `true`. If no text value is defined, an error will be thrown.
  </C.Property>
  <C.Property @name="textToCopy" @type="string | number">
    The value to be copied.
  </C.Property>
  <C.Property @name="targetToCopy" @type="string | DOM element">
     Selector string of element or DOM element from which to copy text.
  </C.Property>
  <C.Property @name="onSuccess" @type="function">
    Callback function invoked (if provided) when the "copy" action succeeds.
  </C.Property>
  <C.Property @name="onError" @type="function">
    Callback function invoked (if provided) when the "copy" action fails.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
