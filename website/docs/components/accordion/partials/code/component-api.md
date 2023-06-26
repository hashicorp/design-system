## Component API

### Accordion

The base Accordion component serves only as a wrapper to group together one or more AccordionItem child components.

### AccordionItem

<Doc::ComponentApi as |C|>
  <C.Property @name="<:toggle>" @type="named block">
    A named block that works as “toggle” for the AccordionItem.
  </C.Property>
  <C.Property @name="<:content>" @type="named block">
    A named block for the content that is shown/hidden upon toggling.
  </C.Property>
  <C.Property @name="isOpen" @default="false" @type="boolean">
    Toggles the visibility of the content when the toggle is interacted with. To display content on page load, set the value to true.
  </C.Property>
  <C.Property @name="isClickable" @default="true" @type="boolean">
    Controls whether the entire toggle block is interactive for toggling the content display or whether only the chevron button itself is interactive.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
