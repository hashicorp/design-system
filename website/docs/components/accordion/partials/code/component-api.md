## Component API

### Accordion

The base `Accordion` component serves only as a wrapper to group together one or more `Accordion::Item` child components.

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium" />
  <C.Property @name="type" @type="enum" @values={{array "card" "flush" }} @default="card" />
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual Components

#### Accordion::Item

<Doc::ComponentApi as |C|>
  <C.Property @name="<:toggle>" @type="named block">
    A named block that works as “toggle” for the `Accordion::Item`.
  </C.Property>
  <C.Property @name="<:content>" @type="named block">
    A named block for the content that is shown/hidden upon toggling.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @default="&quot;Toggle display&quot;">
    Accepts a localized string. The `ariaLabel` value is applied to the HTML button which actually controls visibility of the content block content.
  </C.Property>
  <C.Property @name="isOpen" @default="false" @type="boolean">
    Toggles the visibility of the content when the toggle is interacted with. To display content on page load, set the value to `true`.
  </C.Property>
  <C.Property @name="isStatic" @default="false" @type="boolean">
    Removes the ability to interact with the toggle and hides the chevron element when set to `true`.
  </C.Property>
  <C.Property @name="containsInteractive" @default="false" @type="boolean">
    Controls whether the entire toggle block is interactive for toggling the content display or whether only the chevron button itself is interactive which allows for adding other interactive content in the toggle area.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
