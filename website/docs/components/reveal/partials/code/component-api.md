## Component API

### Reveal

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @required={{true}} @type="string">
    Plain text string that will appear on the toggle button which controls the hiding and showing of the content. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="textWhenOpen" @type="string">
    Plain text which displays on the toggle button while the content is displayed.
  </C.Property>
  <C.Property @name="isOpen" @default="false" @type="boolean">
    Toggles the visibility of the content when the toggle button is interacted with. To display content on page load, set the value to true.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
