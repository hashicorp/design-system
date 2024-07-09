## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="<:toggle>" @type="named block">
    A named block that works as "toggle" for the DisclosurePrimitive.
    <Doc::ComponentApi as |C|>
      <C.Property @name="[T].onClickToggle" @type="function">
        A function to be called by the interactive element to toggle visibility of the content.
      </C.Property>
      <C.Property @name="[T].isOpen" @type="boolead">
        Hook into this property to access the state of the internal `isOpen` tracked variable.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="<:content>" @type="named block">
    A named block for the content that is shown/hidden upon toggling.
    <Doc::ComponentApi as |C|>
      <C.Property @name="[C].close" @type="function">
        A function to programmatically close the DisclosurePrimitive.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="isOpen" @default="false" @type="boolean">
    Toggles the visibility of the content when the toggle button is interacted with. To display content on page load, set the value to true.
  </C.Property>
  <C.Property @name="onClose" @type="function">
    A callback function invoked when the DisclosurePrimitive is closed (if provided).
  </C.Property>
  <C.Property @name="onClickToggle" @type="function">
    A callback function invoked when the toggle is clicked.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
