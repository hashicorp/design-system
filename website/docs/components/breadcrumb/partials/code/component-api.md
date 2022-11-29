The `Breadcrumb` component is composed by different parts, with their own APIs:

*   a main "container" (the breadcrumb itself)
*   an "item" sub-component (a single "crumb")
*   a "truncation" sub-component (a hidden list of "crumbs" that can be made visible via a toggle)

#### Breadcrumb

Here is the API for the main ("container") component:

<Doc::ComponentApi as |C|><C.Property @name="itemsCanWrap" @type="boolean" @value="–">This controls if the breadcrumb items can wrap in case they can't fit in the container width.</C.Property><C.Property @name="didInsert" @type="function" @value="–">This hook method is called when the component is inserted in the DOM. _Notice: internally we use the "did-insert" modifier from @ember/render-modifiers._</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component. _Notice: by default an attribute_</C.Property></Doc::ComponentApi>

#### Breadcrumb::Item

Here is the API for the "item" sub-component:

<Doc::ComponentApi as |C|><C.Property @name="text" @type="string" @value="–">The text to show as "crumb" for the item.</C.Property><C.Property @name="icon" @type="string" @value="–">Use this parameter to show an icon. Acceptable value: any Flight icon name.</C.Property><C.Property @name="route/models/model/query" @type="–" @value="–">These are the parameters that are passed down as arguments to the `<LinkTo>` component.</C.Property><C.Property @name="current" @type="boolean" @value="–">This controls if this is the last item in the breadcrumb (in which case it doesn't generate a link).</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component.</C.Property></Doc::ComponentApi>

#### Breadcrumb::Truncation

Here is the API for the "truncation" sub-component:

<Doc::ComponentApi as |C|><C.Property @name="yield" @type="–" @value="–">Elements passed as children of this sub-component are yielded to the content of the [Disclosure](../utilities/disclosure) component (used to show/hide the yielded breadcrumb items via a "toggle" button).</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component.</C.Property></Doc::ComponentApi>