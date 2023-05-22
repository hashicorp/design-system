## Component API

The Breadcrumb component is composed of three different parts, each with their own APIs:

- a container, Breadcrumb container
- an item child component, Breadcrumb::Item
- a truncation child component, Breadcrumb::Truncation

### Breadcrumb container

<Doc::ComponentApi as |C|>
  <C.Property @name="itemsCanWrap" @type="boolean" @values={{array "false" "true" }} @default="true">
    This controls if the Breadcrumb Items can wrap if they don’t fit within the container.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string">
    Accepts a localized string; the fallback is set to `breadcrumbs`.
  </C.Property>
  <C.Property @name="didInsert" @type="function">
    This hook method is called when the component is inserted in the DOM. Internally we use the `did-insert` modifier from `@ember/render-modifiers`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).<br/>
  </C.Property>
</Doc::ComponentApi>

### Breadcrumb::Item

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @type="string">
    The text displayed within the item.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use to show an icon. Any [icon](/icons/library) name is acceptable.
  </C.Property>
  <C.Property @name="route/models/model/query">
    These parameters are passed down as arguments to the `<LinkTo>` component.
  </C.Property>
  <C.Property @name="current" @type="boolean" @values={{array "false" "true" }} @default="false">
    Determines if an item is the last item in the Breadcrumb, in which case it doesn’t generate a link.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Breadcrumb::Truncation

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this child component are yielded to the content of the [Disclosure](/utilities/disclosure) component (used to show/hide the yielded Breadcrumb Items via a "toggle" button).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
