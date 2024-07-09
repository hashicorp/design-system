## Component API

This component uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) under the hood.

<Doc::ComponentApi as |C|>
  <C.Property @name="color" @type="enum" @values={{array "primary" "secondary" }} @default="primary"/>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that the component should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="textToCopy" @type="string | number" @required={{true}}>
    The value to be copied.
  </C.Property>
  <C.Property @name="isTruncated" @type="boolean" @default="false">
    Constrains text to one line and truncates it based on available width. Text will only be truncated if it does not fit within the available space.
    <br><br>
    Please be aware there are [serious accessibility concerns](/components/copy/snippet?tab=accessibility) with using this feature.
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
