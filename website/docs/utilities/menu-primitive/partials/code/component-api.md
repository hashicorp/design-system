## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="<:toggle>" @type="named block">
    A named block that works as "toggle" for the MenuPrimitive.
    <Doc::ComponentApi as |C|>
      <C.Property @name="[T].onClickToggle" @type="function">
        A function to be called by the interactive element to toggle visibility of the content.
      </C.Property>
      <C.Property @name="[T].isOpen" @type="boolean">
        Hook into this tracked property to access the state of `isOpen`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="<:content>" @type="named block">
    A named block for the content that is shown/hidden upon toggling.
    <Doc::ComponentApi as |C|>
      <C.Property @name="[C].close" @type="function">
        A function to programmatically close the MenuPrimitive.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="onClose" @type="function">
    A callback function invoked when the MenuPrimitive is closed (if provided).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
