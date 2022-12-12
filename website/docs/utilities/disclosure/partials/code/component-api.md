Here is the API for the component:

<Doc::ComponentApi as |C|>
  <C.Property @name="<:toggle>" @type="named block">
    This is a named block where to pass the interactive element that works as "toggle" for the disclosure.
  </C.Property>
  <C.Property @name="[:toggle].onClickToggle" @type="event handler">
    Function that needs to be called by the interactive element to toggle the visibility of the content.
  </C.Property>
  <C.Property @name="[:toggle].isOpen" @type="tracked property">
    Hook into this tracked property if you need to access the state of \`isOpen\`.
  </C.Property>
  <C.Property @name="<:content>" @type="named block">
    This is a named block where to pass the actual content that is shown/hidden upon toggling.
  </C.Property>
  <C.Property @name="[:content].close" @type="function">
    Function that can be called to programmatically close the dropdown.
  </C.Property>
  <C.Property @name="onClose" @type="function">
    Callback function invoked when the dropdown is closed (if provided).
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>