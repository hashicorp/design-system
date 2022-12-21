## Component API

The breadcrumb component is composed of three different parts, each with their own APIs:

- a main "container" (the breadcrumb itself)
- an "item" sub-component (a single "crumb")
- a "truncation" sub-component (a hidden list of "crumbs" that can be made visible via a toggle)

### Breadcrumb container

Here is the API for the main "container" component:

<Doc::ComponentApi as |C|>
<C.Property @name="itemsCanWrap" @type="boolean">
This controls if the breadcrumb items can wrap in case they don't fit in the container width.
</C.Property>
<C.Property @name="didInsert" @type="function">
This hook method is called when the component is inserted in the DOM. _Note: internally we use the "did-insert" modifier from `@ember/render-modifiers`._
</C.Property>
<C.Property @name="...attributes">
`...attributes` spreading is supported on this component. _Note: by default an attribute `aria-label="breadcrumbs"` is assigned to the component. If you want to localize it you can override it passing the same attribute with a different value._
</C.Property>
</Doc::ComponentApi>

### Breadcrumb::Item

Here is the API for the "item" sub-component:

<Doc::ComponentApi as |C|>
<C.Property @name="text" @type="string">
The text shown within the item, or "crumb".
</C.Property>
<C.Property @name="icon" @type="string">
Use this parameter to show an icon. Any [Flight](/foundations/icons) icon name is acceptable.
</C.Property>
<C.Property @name="route/models/model/query">
These are the parameters that are passed down as arguments to the `<LinkTo>` component.
</C.Property>
<C.Property @name="current" @type="boolean">
Determines if an item is the last item in the breadcrumb, in which case it doesn't generate a link.
</C.Property>
<C.Property @name="...attributes">
`...attributes` spreading is supported on this component.
</C.Property>
</Doc::ComponentApi>

### Breadcrumb::Truncation

Here is the API for the "truncation" sub-component:

<Doc::ComponentApi as |C|>
<C.Property @name="yield">
Elements passed as children of this sub-component are yielded to the content of the [Disclosure](../utilities/disclosure) component (used to show/hide the yielded breadcrumb items via a "toggle" button).
</C.Property>
<C.Property @name="...attributes">
`...attributes` spreading is supported on this component.
</C.Property>
</Doc::ComponentApi>
